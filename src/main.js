import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/common/stylus/style.styl'
import '@/mock'
import '@/common/stylus/transition.styl'
import store from '@/store'
import "@/util/validate.js"
import header from 'components/header/header.vue'

import http from '@/http'
Vue.prototype.$http = http
Vue.component('headerTo',header)

Vue.config.productionTip = false
Vue.prototype.bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
