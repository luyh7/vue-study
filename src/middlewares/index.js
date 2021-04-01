/**
 * 加载所有中间件
 * 并且按照中间件的优先级写入axios配置
 * @param {*} axios的service实例
 */
const run = (service) => {
  // 找出当前目录下除index外的所有js文件
  const files = require
    .context(__dirname, false, /.js$/)
    .keys()
    .filter((file) => file.indexOf('index.js') === -1)

  // 有优先级的中间件
  const prioritiesRequest = []
  const prioritiesResponse = []
  // 遍历中间件
  files.forEach((file) => {
    const middleware = require(`${file}`).default
    if (middleware && typeof middleware === 'object' && middleware.request) {
      if (!('priority' in middleware)) {
        middleware.priority = 0
      }
      if (middleware.request) {
        const request = middleware.request
        request.priority = request.priority || 0
        prioritiesRequest.push(request)
      }
      if (middleware.response) {
        const response = middleware.response
        response.priority = response.priority || 0
        prioritiesResponse.push(response)
      }
    }
    // 根据优先级应用中间件
  })

  // 按优先级降序
  prioritiesRequest
    .sort((a, b) => b.priority - a.priority)
    .forEach((request) => {
      service.interceptors.request.use(request.do, request.error)
    })

  prioritiesResponse
    .sort((a, b) => b.priority - a.priority)
    .forEach((response) => {
      service.interceptors.response.use(response.do, response.error)
    })
}

export default { run }
