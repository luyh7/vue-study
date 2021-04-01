import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(ElementUI, {
  locale,
})

// 加载自定义插件
import Plugins from '@/plugins'
Vue.use(Plugins)

Vue.prototype.isLogin = () => store.getters.token

// Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
