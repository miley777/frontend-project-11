import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


//const result = sass.renderSync({
 // silenceDeprecations: ['legacy-js-api'],
//});

export default defineConfig({
      optimizeDeps: {
         entries: ['./index.html'],
         include: ['react-dom'],
      },
  plugins: [
    react()
    ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    port: 8000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  css: {
  preprocessorOptions: {
    scss: {
      api: 'modern-compiler',
      silenceDeprecations: ['import', 'color-functions', 'if-function', 'global-builtin']
    }
  }
}
});