import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
// import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes,
})

// router.beforeEach((to, from, next) => {
// 	if(to.name === 'login' || store.getters.token) next()
// 	else next('/login')
// })
export default router
