process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import FormData from 'form-data'
import fs from 'fs-extra'
import axios from 'axios'
import zipdir from 'zip-dir'
import { format } from 'date-fns'
import dotenv from 'dotenv'
import lodash from 'lodash';
dotenv.config({ path: '.env.local' });

class DeployApp {
    constructor() {
        // Load environment variables from .env.local

        this.listInstanceTarget = [
            {
                baseUrl: this.getEnvByKey('VITE_TARGET_HOST'),
                auth: {
                    username: this.getEnvByKey('VITE_DHIS_USER_NAME'),
                    password: this.getEnvByKey('VITE_DHIS_PASSWORD')
                }
            }
        ];

        this.appList = [
            {
                key: this.getEnvByKey('VITE_GLOBAL_KEY_APP'),
                folderName: this.getEnvByKey('VITE_GLOBAL_KEY_APP'),
                directFolderPath: './dist',
            }
        ];

        this.axiosInstance = axios.create({
            auth: this.listInstanceTarget[0].auth
        })

    }

    run = () => {
        this.showDeploymentInfo();
        this.startDeployment();
    };

    showDeploymentInfo = () => {
        const appConfig = this.appList[0];
        const instanceTarget = this.listInstanceTarget[0];
        console.log({
            baseUrl: instanceTarget.baseUrl,
            ...appConfig,
            zipFileName: `${appConfig.folderName}.zip`
        });
        return;
    };

    startDeployment = () => {
        this.appList.forEach((config) => this.startProcess());
    };

    startProcess = async function () {
        this.importBuildFolder();
    };

    reloadApp(instanceTarget) {
        console.log("Reload app list");
        let postData = new FormData();
        postData.append("appReload", "true");

        this.axiosInstance
            .post(`${instanceTarget.baseUrl}/api/maintenance`, postData, {
                headers: postData.getHeaders(),
                auth: instanceTarget.auth,
            })
            .then((response) => {
                console.log("✅ App list reload successful");
            })
            .catch((e) => {
                console.log(`❌ App reload error: ${e.message}`);
            });
    }

    prepareManifestFile = async function (props) {
        let { folderBuildPath } = props;
        let buildManifestFilePath = `${folderBuildPath}/manifest.webapp`;
        let buildManifestFile

        // Check for manifest files in order of preference
        try {
            buildManifestFile = JSON.parse(fs.readFileSync(buildManifestFilePath, "utf8"));
            console.log(`** Manifest found: ${buildManifestFilePath}`);
        } catch (e) {
            console.log(`** Manifest not found: ${buildManifestFilePath}`);
        }


        // Generate new version number
        let currentVersion = await this.axiosInstance({
            url: `${props.instanceTarget.baseUrl}/api/apps`
        }).then(listApp => {
            return listApp.data.find(e => e.folderName.includes(this.getEnvByKey('VITE_GLOBAL_KEY_APP')))?.version
        })
        let newVersion = currentVersion || "1.0.0";
        try {
            newVersion = parseInt(newVersion.replace(/\./g, "")) + 1;
            newVersion = (newVersion + '').match(/.{1,1}/g).join(".");
        } catch (e) {
            console.log(`Version generation error: ${e.message}`);
        }

        const MANIFEST_CONTENT = {
            description: "resource",
            appType: "RESOURCE",
            developer: {
                name: "nhic",
                url: "",
            },
            default_locale: "en",
            activities: {
                dhis: {
                    href: "*",
                },
            },
            ...buildManifestFile,
            version: newVersion,
        };




        let rs = fs.writeFileSync(
            `${folderBuildPath}/manifest.webapp`,
            JSON.stringify(MANIFEST_CONTENT, null, 2),
            function (err) {
                if (err) {
                    throw {
                        err: true,
                        msg: `Manifest error: ${err}`,
                    };
                }
            }
        )

        return {
            msg: `Manifest injected! Previous: ${currentVersion} → New: ${newVersion}`,
            newVersion
        }
    };



    importBuildFolder = async function () {
        const appConfig = this.appList[0];
        let folderBuildPath;

        folderBuildPath = appConfig.directFolderPath;

        try {
            let manifestResult = await this.prepareManifestFile({
                instanceTarget: this.listInstanceTarget[0],
                folderBuildPath,
            });

            if (manifestResult.err) {
                console.log(`** ${manifestResult.msg}`);
                return;
            }

            console.log(`** ${manifestResult.msg}`);

            zipdir(
                folderBuildPath,
                { saveTo: `${folderBuildPath}/${appConfig.folderName}.zip` },
                function (err, buffer) {
                    if (err) {
                        console.log(`** Zip creation failed: ${err}`);
                        return;
                    }

                    this.listInstanceTarget.forEach((instanceTarget) => {
                        let form = new FormData();
                        form.append(
                            "file",
                            fs.createReadStream(`${folderBuildPath}/${appConfig.folderName}.zip`),
                            {
                                filename: `${appConfig.folderName}.zip`,
                            }
                        );
                        console.log('Post:: ', instanceTarget.baseUrl + "/api/apps");
                        this.axiosInstance
                            .create({
                                auth: instanceTarget.auth,
                                headers: form.getHeaders(),
                            })
                            .post(instanceTarget.baseUrl + "/api/apps", form)
                            .then((response) => {
                                console.log(
                                    `✅ ${response.config.url}\nApp (${appConfig.folderName}) uploaded successfully!`,
                                    response.status
                                );
                                this.reloadApp(instanceTarget);
                            })
                            .catch((error) => {
                                if (error.response) {
                                    console.log(`❌ Upload failed:: ${error.config.url}`);
                                }
                                console.log(`❌ Error: ${error.message}`);
                            });
                    });
                }.bind(this)
            );
        } catch (error) {
            console.log(`❌ Build folder import failed: ${error.message}`);
        }
    };

    getEnvByKey = (key) => {
        if (!key) return '';
        let value = lodash.get(process.env, key, '')
            // Remove extra backslashes
            .replace(/\\+/g, '');
        return value;
    }
}

new DeployApp().run(); 