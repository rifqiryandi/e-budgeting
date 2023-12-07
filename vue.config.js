module.exports = {
    configureWebpack: {
        performance: {
            maxAssetSize: 114857600, // int (in bytes),
            maxEntrypointSize: 114857600, // int (in bytes)
        },
    },
    
    chainWebpack: config => {
        // remove the prefetch plugin
        config.plugins.delete('prefetch')
        config.optimization.usedExports(true)

    }
}