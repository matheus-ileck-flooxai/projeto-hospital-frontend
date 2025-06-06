const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config()
module.exports = {

    entry: __dirname + '/src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: './app.js'
    },
    devServer: {
        port: 8080,
        contentBase: './public',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(process.env.API_URL)
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })

    ],
    module: {
        loaders: [{

            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {

                presets: ['es2015', 'react'],
                plugins: ['transform-object-rest-spread']
            }
        }, {

            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')

        }, {

            test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
            loader: 'file'
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader?name=images/[name].[ext]'
        }]
    }

}