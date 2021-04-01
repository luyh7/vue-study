export default {
  // 自动安装当前目录下的所有plugins
  install: (Vue, options) => {
    // 找出当前目录下除index外的所有js文件
    const files = require
      .context(__dirname, false, /.js$/)
      .keys()
      .filter((file) => file.indexOf('index.js') === -1)
    // 遍历安装plugins
    files.forEach((file) => {
      const plugin = require(`${file}`).default
      Vue.use(plugin)
    })
  },
}
