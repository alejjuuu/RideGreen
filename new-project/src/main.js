import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueGeolocation from 'vue-browser-geolocation'
Vue.config.productionTip = false
Vue.use(VueGeolocation)

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, options,{
  load:{
    key:''
  },
  installComponents:false
})



createApp(App).use(router).mount('#app')

/*
new Vue({
  render: h => h(App),
}).$mount('#app')
*/