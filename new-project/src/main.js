import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueGeolocation from 'vue-browser-geolocation'

Vue.config.productionTip = false
Vue.use(VueGeolocation)

createApp(App).use(router).mount('#app')
