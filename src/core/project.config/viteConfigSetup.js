import { existsSync } from "fs";
import path from "path";
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';

export default ({ env, dirname }) => {
    const target = env.VITE_TARGET_BUILD_INSTANCE;

    if (!target) {
        throw new Error('VITE_TARGET_BUILD_INSTANCE not set');
    }
    let aliasPath = path.resolve(dirname, `src/instanceConfig/${target}/index.js`);

    if (!existsSync(aliasPath)) {
        throw new Error(`\n\n ❗❗❗ Instance ${target} not exists. Check your variable VITE_TARGET_BUILD_INSTANCE in env.local again ----------`);
    } else {
        console.log('\n✨Use instance: ', target)
        console.log('✨Path config: ', aliasPath)
    }

    const baseConfig = {
        base: env.VITE_BASE_PATH || "./",
        plugins: [
            mkcert(),
            react()
        ],
        resolve: {
            alias: {
                "@core": path.resolve(dirname, "src/core"),
                "@instanceConfig": aliasPath,
            }
        },
        build: {
            sourcemap: env.VITE_SOURCEMAP === 'true'
        },
        server: {
            https: env.VITE_HTTPS !== 'false',
            port: parseInt(env.VITE_PORT) || 3000,
        }
    };

    return baseConfig;
}