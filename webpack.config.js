const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const banner = [
    pkg.name + ' - ' + pkg.description,
    '@version v' + pkg.version,
    '@link ' + pkg.homepage,
    '@license ' + pkg.license,
    ''
].join('\n');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    absolute: __dirname,
    app: path.resolve(__dirname, 'src'),
    build: path.resolve(__dirname, 'build')
};

module.exports = {
    entry: [
        path.join(PATHS.app, 'main.js'),
        'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    ],
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /src\/scss\/.+\.scss$/,
                loaders: ExtractTextPlugin.extract('css!sass'),
                include: path.resolve(PATHS.app, 'scss'),
            },
            {
                test: /src\/.+\.js$/,
                exclude: /node_modules/,
                include: PATHS.app,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
          }
        ]
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './build',
        noInfo: true, //  --no-info option
        inline: true
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // new webpack.BannerPlugin(banner),
        // new ExtractTextPlugin('build/main.css', {
        //     allChunks: true
        // })
    ]
};

// var path = require("path");
//     module.exports = {
//         entry: {
//         app: ['./src/main.js']
//     },
//     output: {
//         path: path.resolve(__dirname, 'build'),
//         filename: 'bundle.js'
//     },
//     module: {
//         loaders: [{
//             test: /\.jsx?$/,
//             exclude: /(node_modules|bower_components)/,
//             loader: 'babel', // 'babel-loader' is also a legal name to reference
//             query: {
//                 presets: ['react', 'es2015']
//             }
//         }]
//     },
//     plugins: [
//         new webpack.optimize.CommonsChunkPlugin({
//             name:      'main', // Move dependencies to our main file
//             children:  true, // Look for common dependencies in all children,
//             minChunks: 2, // How many times a dependency must come up before being extracted
//         }),
//     ],
// };
