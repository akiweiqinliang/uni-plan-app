import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store'
import './uni.promisify.adaptor'
import uvUI from '@climblee/uv-ui'
Vue.use(uvUI);
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store
const app = new Vue({
	store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif