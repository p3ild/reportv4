import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import mkcert from 'vite-plugin-mkcert'
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    mkcert(),
    react()
  ],
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "src/core"),
    }
  },
  build: {
    // sourcemap: true
  },
  server: {
    https: true,
    port: 3000,
  },
})
