const path    = require('path');
const pkg     = require('./package.json');
const webpack = require('webpack');

const dist = path.join(__dirname, 'dist');
const mode = process.env.NODE_ENV || 'development';

module.exports = {
    devServer: {
        contentBase: dist
    },
    entry: './src/mousetip.js',
    mode,
    module: {
        rules: [
            {
                test:    /\.js$/,
                use:     'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:  [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'lazyStyleTag'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules:       true
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    output: {
        filename: 'mousetip.js',
        path: dist,
        library: 'MouseTip',
        libraryExport: 'default',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `${ pkg.name } v${ pkg.version } | ${ pkg.license } | ${ pkg.homepage }`
        })
    ]
}
