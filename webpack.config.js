const path = require("path"),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        "flickr-stream": "./src/main.ts",
        "vendor-bundle": "./src/vendor-bundle.ts"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    devServer: {
        contentBase: "./dist"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                enforce: "pre",
                loader: "tslint-loader"
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader?name=fonts/[name].[ext]"
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            compilerOptions: {
                                declaration: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                exclude: ["./src/index.html"],
                loader: "raw-loader"
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "vendor-bundle"
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, "src/index.html")
        })
    ]
};
