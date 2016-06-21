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
    build: path.resolve(__dirname, 'build'),
    dist: path.resolve(__dirname, 'dist'),
};

module.exports = {
    devtool: 'source-map',
    entry: {
        app: path.join(PATHS.app, 'js/elasticslider.js'),
    },
    output: {
        path: PATHS.dist,
        filename: `${pkg.name.toLowerCase()}.min.js`,
        libraryTarget: 'commonjs2',
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'lodash': '_',
        'elasticslider-core': 'ElasticSliderCore',
    },
    module: {
        loaders: [
            {
                test: /dist\/.+\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css'),
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass'),
                include: [PATHS.app, path.resolve(PATHS.app, 'scss')],
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
    plugins: [
        new ExtractTextPlugin('react-elasticslider.min.css'),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            },
        }),
        new webpack.BannerPlugin(banner),
    ]
};
