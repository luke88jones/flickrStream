const glob = require("glob"),
    path = require("path"),
    UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    CompressionPlugin = require("compression-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    PurifyCSSPlugin = require("purifycss-webpack"),
    autoprefixer = require("autoprefixer"),
    flexibility = require("postcss-flexibility"),
    webpackConfig = require("./webpack.config");

const extractSass = new ExtractTextPlugin({
    filename: "css/[name].css",
    disable: process.env.NODE_ENV === "development"
});

const purifyCss = new PurifyCSSPlugin({
    paths: glob.sync("./src/**/*.html"),
    purifyOptions: {
        whitelist: []
    }
});

webpackConfig.module.rules[1] = {
    test: /\.scss$/,
    use: extractSass.extract({
        use: [
            {
                loader: "css-loader",
                options: {
                    minimize: true,
                    sourceMap: true,
                    importLoaders: 2
                }
            },
            {
                loader: "postcss-loader",
                options: {
                    sourceMap: true,
                    plugins: () => [
                        autoprefixer,
                        flexibility
                    ]
                }
            },
            {
                loader: "sass-loader",
                options: {
                    outputStyle: "expanded",
                    sourceMap: true,
                    sourceMapContents: true
                }
            }
        ],
        // use style-loader in development
        fallback: "style-loader"
    })
};

// ensure ts lint fails the build
webpackConfig.module.rules[0].options = {
    failOnHint: true
};

webpackConfig.plugins[1].minify = {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
};

webpackConfig.plugins = [...webpackConfig.plugins,
    extractSass,
    purifyCss,
new UglifyJsPlugin({
    include: /\.js$/,
    minimize: true
}),
new CompressionPlugin({
    asset: "[path].gz[query]",
    test: /\.js$/
})
];

module.exports = webpackConfig;