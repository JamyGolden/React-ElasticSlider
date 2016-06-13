const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PATHS = {
    absolute: __dirname,
    app: path.resolve(__dirname, 'src'),
    build: path.resolve(__dirname, 'build'),
    dist: path.resolve(__dirname, 'dist'),
};

module.exports = {
    entry: {
        app: path.join(PATHS.app, 'demo/main.js'),
    },
    output: {
        path: PATHS.build,
        filename: `${pkg.name.toLowerCase()}-demo.js`
    },
    module: {
        loaders: [
            {
                test: /.+\.css$/,
                loaders: ['style', 'css'],
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass'),
                include: [PATHS.app, path.resolve(PATHS.app, 'scss')],
            },
            {
                test: /.+\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.html$/,
                loader: ExtractTextPlugin.extract('html'),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('index.html'),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: false,
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),
    ]
};
