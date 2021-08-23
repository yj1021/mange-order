const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api', createProxyMiddleware({  //代理上传接口
            target: 'https://www.mocky.io/v2',
            changeOrigin: true
        })
    )
}