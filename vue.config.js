module.exports = {
    configureWebpack: {
        performance: {
            maxAssetSize: 1048576, // int (in bytes),
            maxEntrypointSize: 114857600, // int (in bytes)
        },
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            },

        }
    }
}