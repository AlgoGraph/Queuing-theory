const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
    mode: "development",
    entry: './src/app.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules | tests/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body",
        }),
    ]
};
