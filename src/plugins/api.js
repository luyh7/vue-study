import request from '@/request'
import middlewares from '@/middlewares'
export default {
  install: (Vue, options) => {
    // 加载中间件
    middlewares.run(request)
    Vue.prototype.$api = (url, data) =>
      request({
        url: url,
        data: data,
        method: 'post',
      })
  },
  api: (url, data) => {
    return request({
      url: url,
      data: data,
      method: 'post',
    })
  },
}
