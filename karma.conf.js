const webpackConfig = require("./webpack.test.config");

module.exports = (config) => {
    config.set({
        basePath: "",
        frameworks: ["jasmine", "source-map-support"],
        files: [
            "./src/vendor-bundle.ts",
            "./src/main.ts",
            "./src/test.ts"
        ],
        preprocessors: {
            "src/vendor-bundle.ts": ["webpack"],
            "src/main.ts": ["webpack"],
            "src/test.ts": ["webpack"]
        },
        webpack: webpackConfig,
        webpackServer: { noInfo: true },
        reporters: ["mocha"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ["PhantomJS"],
        singleRun: true
    });
};