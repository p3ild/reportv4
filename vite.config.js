import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import mkcert from 'vite-plugin-mkcert'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_TARGET_BUILD_INSTANCE;
  console.log(target)
  return {
    base: "./",
    plugins: [
      mkcert(),
      react()
    ],
    resolve: {
      alias: {
        "@core": path.resolve(__dirname, "src/core"),
        "@instanceConfig": path.resolve(__dirname, `src/instanceConfig/${target}`),
      }
    },
    build: {
      // sourcemap: true
    },
    server: {
      https: true,
      port: 3000,
    },
  }
});
