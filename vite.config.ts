import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: '0.0.0.0',
    port: 3001,
    proxy: {
      //   '/api': 'http://clt.its:8000'
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      components: `${path.resolve(__dirname, './src/components/')}`,
      public: `${path.resolve(__dirname, './public/')}`,
      pages: path.resolve(__dirname, './src/App/pages'),
      types: `${path.resolve(__dirname, './src/@types')}`,
      assets: `${path.resolve(__dirname, './src/assets')}`,
    },
  },
});
