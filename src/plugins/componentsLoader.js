export default {
	install: (Vue, options) => {
		//自动全局导入公共components
		const componentsContext = require.context('@/components/common', true, /.vue$/)
		componentsContext.keys().forEach(component => {
			const componentConfig = componentsContext(component).default
			if (!componentConfig.name) {
				throw new Error(componentConfig.__file + ':组件必须声明name')
			}
			Vue.component(componentConfig.name, componentConfig)
		})
	}
}
