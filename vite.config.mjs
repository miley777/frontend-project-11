import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer';
//const sass = require('sass');
//import HtmlWebpackPlugin from 'html-webpack-plugin';
//import miniCssExtractPlugin from 'mini-css-extract-plugin';


//const autoprefixer = require('autoprefixer')
//const HtmlWebpackPlugin = require('html-webpack-plugin')
//const miniCssExtractPlugin = require('mini-css-extract-plugin')



//const result = sass.renderSync({
 // silenceDeprecations: ['legacy-js-api'],
//});

export default defineConfig({
      optimizeDeps: {
         entries: ['./index.html'],
         include: ['react-dom'],
      },
    //entry: './src/index.html',
    silenceDeprecations: ['legacy-js-api'],
  plugins: [
    react(),
    //new HtmlWebpackPlugin({ template: './src/index.html' }),
    //new miniCssExtractPlugin(),
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
    //client: {
    //  overlay: false,
    //},
    //static: path.resolve(__dirname, 'dist'),
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        //filename: 'main.js',
        //path: path.resolve(__dirname, 'dist'),
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  //module: {
    //  rules: [
    //    {
     //     test: /\.(scss)$/,
      //    use: [
          
       //     {
              // Extracts CSS for each JS file that includes CSS
       //       loader: miniCssExtractPlugin.loader
       //     },
        //    {
              // Interprets `@import` and `url()` like `import/require()` and will resolve them
       ///       loader: 'css-loader'
        //    },
        //    {
              // Loader for webpack to process CSS with PostCSS
        //      loader: 'postcss-loader',
       //       options: {
       //         postcssOptions: {
       //           plugins: [
        //            autoprefixer
        //          ]
        //        }
         ///     }
         //   },
        //    {
              // Loads a SASS/SCSS file and compiles it to CSS
        //      loader: 'sass-loader'
        //    }
        //  ]
        //}
    //  ],
      
    //},
});