export const setupEnvironment = ({ instanceTarget, customAuth }) => {
    let rs = {}
    let ENV_BASEURL = import.meta.env.VITE_TARGET_HOST;

    let domain = window.location.href.split('api')[0];
    if (['localhost', '10.10'].some(x => domain.includes(x))) {
        rs['host'] = instanceTarget.BASE_URL || ENV_BASEURL;
        rs['auth'] = {
            username: import.meta.env.VITE_DHIS_USER_NAME,
            password: import.meta.env.VITE_DHIS_PASSWORD
        }
        if (!rs) throw new Error('Must assign value to process.env.VITE_TARGET_HOST variable');
    } else {
        rs['host'] = domain.substring(0, domain.length - 1);
        // this.host = domain
    }

    customAuth && (rs['auth'] = customAuth)//FOR TESTING
    return rs;
}


export const ping = ({
    networkUtils, setLoggedIn
}) => {
    setInterval(async () => {
        let pingRs = await networkUtils.ping({});

        setLoggedIn(pingRs)
    }, 2000)
}

export class PerformanceTime {
    listBenchmark = [];
    constructor() {
        this.listBenchmark = []
        return this
    }

    start = function ({ key }) {
        let data = {
            key,
            startTime: performance.now()
        };
        let foundTaskByKey = this.listBenchmark.find(e => e.key === key)

        if (foundTaskByKey) {
            foundTaskByKey = { ...data }
        } else {
            this.listBenchmark.push(data)
        }


        this.startTime = performance.now();
    }

    end = function ({ key }) {

        let foundTaskByKey = this.listBenchmark.find(e => e.key === key)
        if (!foundTaskByKey) {
            return {
                error: `${key} not found`
            }
        }

        if (foundTaskByKey.ended) {
            return {
                error: `${key} had ended`,
                ...foundTaskByKey
            }
        }

        const elapsedTime = (performance.now() - this.startTime);
        foundTaskByKey = {
            ...foundTaskByKey,
            elapsedTimeAsMili: Math.round(elapsedTime),
            elapsedTimeAsSec: Math.round(elapsedTime / 1000),
            ended: true
        }
        return foundTaskByKey;
    }
}

export function wait(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), timeout)
    })
}