import { createApp } from 'vue'
import App from './App.vue'
import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);


import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, options,{
  load:{
    key:''
    //API key here
  },
  installComponents: true
})
createApp(App).mount('#app')

/*
new Vue({
  render: h => h(App),
}).$mount('#app')*/