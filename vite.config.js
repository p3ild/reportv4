import { defineConfig, loadEnv } from 'vite'
import viteConfigSetup from './src/core/project.config/viteConfigSetup.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return viteConfigSetup({ env, dirname: __dirname, mode });
});
