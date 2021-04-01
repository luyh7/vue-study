// 要跳过的模块
const excludes = ['index']

const context = require.context(__dirname, false, /.js$/)
// 自动加载modules
const modules = context.keys().reduce((modules, file) => {
  const name = file.slice(2, -3)
  if (!excludes.includes(name)) {
    modules[name] = context(file).default
  }
  return modules
}, {})

export default modules
