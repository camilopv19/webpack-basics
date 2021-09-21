var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

let htmlPageNames = ['users'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

module.exports = {
    mode: 'development',
    entry: {
        app: './src/js/app.js',
        users: './src/js/users.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        assetModuleFilename: 'assets/[name].[ext]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/inline',
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunks: ['app']
        }),
        new CleanWebpackPlugin()
    ].concat(multipleHtmlPlugins)
    ,
}