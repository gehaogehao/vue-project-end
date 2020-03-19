import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import http from '@/http'
import store from '@/store'

import '@/common/stylus/style.styl'
import '@/mock'
import '@/common/stylus/transition.styl'
import "@/util/validate.js"

import header from 'components/header/header.vue'

Vue.prototype.bus = new Vue()
Vue.prototype.$http = http
Vue.component('headerTo',header)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
