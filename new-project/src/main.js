import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//error here
import VueGeolocation from 'vue-browser-geolocation';


Vue.config.productionTip = false
Vue.use(VueGeolocation)

createApp(App).use(router).mount('#app')

new Vue({
  render: h => h(App),
}).$mount('#app')