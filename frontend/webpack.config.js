import CopyWebpackPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

import HtmlWebpackPlugin from "html-webpack-plugin";
import FileManagerPlugin from 'filemanager-webpack-plugin';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Change to parent directory
const __parentDir = path.join(__dirname, '../backend/public');
const __viewDir = path.join(__dirname, '../backend/app/Views');

export default {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        'dist/main': './main.js',
        'dist/main.min': './main.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: __dirname,
        library: {
            type: 'module',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        // Copy .wasm files to dist folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'node_modules/onnxruntime-web/dist/*.jsep.*',
                    to: 'dist/[name][ext]'
                },
            ],
        }),
        new FileManagerPlugin({
            events: {
              onEnd: {
                copy: [
                    { source:  path.resolve(__dirname,'dist/*'), destination: path.resolve(__parentDir,'dist/') },
                    { source: 'index.html', destination: path.resolve(__viewDir,'index.html') },
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
