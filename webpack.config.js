var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var banner = [
    pkg.name + ' - ' + pkg.description,
    '@version v' + pkg.version,
    '@link ' + pkg.homepage,
    '@license ' + pkg.license,
    ''
].join('\n');

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: './dist/react-elasticslider.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
              test: /src\/.+.js$/,
              exclude: /node_modules|bower_components/,
              include: path.join(__dirname, 'src'),
              loader: 'babel-loader'
          }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin(banner)
    ]
};
