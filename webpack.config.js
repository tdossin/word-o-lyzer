const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const path = require('path');

const config = {
    entry: './src/index.js',
    resolve: {
        descriptionFiles: ['package.json'],
        modules: ['/node_modules']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          })
    ],
    mode: 'development'
};

module.exports = config;