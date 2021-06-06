// vue.config.js
module.exports = {
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        compress: false,
        disableHostCheck: true,
        port: 8080,
        host: '0.0.0.0'
    }
}