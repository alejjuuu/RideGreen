import { createApp } from 'vue'
import App from './App.vue'
import VueGeolocation from 'vue-browser-geolocation'

createApp(App).mount('#app')

Vue.config.productionTip = false
Vue.use(VueGeolocation)

/*
new Vue({
  render: h => h(App),
}).$mount('#app')*/