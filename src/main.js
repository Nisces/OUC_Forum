import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from "axios"
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, {
  MessageBox
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/fontawesome-free-5.11.2-web/css/all.min.css"
import "./assets/css/normalize.min.css"
import "./assets/css/common.css"


Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(ElementUI);

// axios.defaults.baseURL = "http://sunshine-sun.cn:8080/"
// axios.defaults.baseURL = "http://10.132.149.48:8080"
// axios.defaults.baseURL = "http://localhost:8080"
axios.defaults.baseURL = "http://123.57.102.109:8080"
axios.defaults.headers.common['Content-Type'] = "application/json";
axios.defaults.headers.common

router.beforeEach((to, from, next) => {
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next : 下一步执行的函数钩子
  if (to.path === '/login') {
    next()
  } else { // 如果即将进入登录路由，则直接放行
    if (to.meta.requiresAuth && !sessionStorage.getItem('user')) {
      MessageBox({
        title: "请先登录",
        message: "您还没有登录",
        type: "info",
        center: true,
      })
      next({
        path: '/login'
      })
    } else { //不需要权限，直接放行
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
