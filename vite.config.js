/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import dns from 'dns';

dns.setDefaultResultOrder('verbatim');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 8000,
  },
  test: {
    globals: true,
    environment: 'jsdom',

    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
