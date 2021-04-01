module.exports = {
  lintOnSave: false,
  css: {
    extract: false,
    sourceMap: true,
    loaderOptions: {
      sass: {
        additionalData: '@import "~@/style/variables.scss";',
      },
    },
  },
  devServer: {
    proxy: {
      //配置跨域
      '/api': {
        // target: 'http://api.weilingtech.com/',
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true, //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
              实际上访问的地址是：process.env.VUE_APP_BASE_API/core/getData/userInfo,因为重写了 /api
             */
          '^/api': '/',
        },
      },
    },
    port: 9393,
    open: true,
  },
}
