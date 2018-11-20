import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import {SET_TOKEN, SET_RETURN_PATH, SET_USER} from './vuex/mutation-types'
import MesUI from './components/index'
var VueCookie = require('vue-cookie')

// 本地模拟api
// import Mock from './mock'
// Mock.bootstrap()

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(MesUI)
Vue.use(VueCookie)

NProgress.configure({ showSpinner: false })

const router = new VueRouter({
  mode: 'history', // 去掉url后面的#
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 设置token, 避免刷新丢失token
  if (localStorage.getItem('token')) {
    store.commit(SET_TOKEN, localStorage.getItem('token'))
  }
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = {}
  try {
    user = JSON.parse(sessionStorage.getItem('user'))
    if (!user && to.path !== '/login') {
      next({path: '/login'})
    } else {
      store.commit(SET_USER, user)
      // 设置登录之后返回的路径
      if (to.fullPath !== '/login') {
        store.commit(SET_RETURN_PATH, to.fullPath)
      }
      next()
    }
  } catch (e) {
    next({path: '/login'})
  }
})

router.afterEach(transition => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
