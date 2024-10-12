import CopyWebpackPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

import HtmlWebpackPlugin from "html-webpack-plugin";
import FileManagerPlugin from 'filemanager-webpack-plugin';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Change to parent directory
const __backendDir = path.join(__dirname, '../backend/public');
const __viewDir = path.join(__dirname, '../backend/app/Views');
const __jsfileDir = path.join(__dirname, '/dist/jsfiles');

export default {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        'index': './src/index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: __jsfileDir,
        library: {
            type: 'module',
        },
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '../index.html',
            scriptLoading: 'module'
        }),
        new FileManagerPlugin({
            events: {
              onStart: { 
                delete: [
                 {
                   source: path.join(__backendDir,'jsfiles/'), 
                    options:{
                      force: true,
                      recursive : true,
                      },
                  },
                ],
              },
              onEnd: {
                copy: [
                    { source:  path.resolve(__dirname,'dist/jsfiles/*'), destination: path.resolve(__backendDir,'jsfiles/') },
                    { source:  path.resolve(__dirname,'dist/index.html'), destination: path.resolve(__viewDir,'index.html') },
                    { source:  path.resolve(__dirname,'src/index.css'), destination: path.resolve(__backendDir,'index.css') },
                  ],

                },
            },
        }),

       
    ],
    devServer: {
        static: {
            directory: __dirname
        },
        port: 8080
    },
    experiments: {
        outputModule: true,
    },
};
