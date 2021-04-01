import { MessageBox, Message } from 'element-ui'
import store from '@/store'
const request = {
  do: (config) => {
    // 拿本地token
    if (store.getters.token) {
      if (config.data == null) {
        config.data = {}
      }
      config.data.token = store.getters.token
    }
    return config
  },
  error: (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  },
  priority: 99,
}
const response = {
  do: (response) => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || '错误代码: ' + res.code,
        type: 'error',
        duration: 5 * 1000,
      })

      if (res.code === -6) {
        // to re-login
        MessageBox.confirm('登录已失效，请重新登录', '重新登录', {
          confirmButtonText: '登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          store.dispatch('user/logout').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error: (error) => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
  priority: -1,
}

export default { request, response }
