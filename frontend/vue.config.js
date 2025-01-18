module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://backend:3001',
                changeOrigin: true
            }
        }
    }
}