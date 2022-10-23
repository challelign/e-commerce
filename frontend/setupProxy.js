
const { createProxyMiddleware} = require('http-proxy-middleware')
import app from "./app"
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target:'http://127.0.0.1:4000',
            changeOrigin:true
        })
    )

}



























