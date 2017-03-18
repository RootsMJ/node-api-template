var path        = require('path'),
    webpack     = require('webpack');


module.exports = {
 entry: './src/server.ts',
 output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, 'dist'),
   filename: '[name].js'
 },
 module: {
   rules: [
     {
       test: /\.tsx?$/,
       loader: 'ts-loader',
       exclude: /node_modules/,
     },
   ]
 },
 resolve: {
   extensions: [".tsx", ".ts", ".js"]
 },
};