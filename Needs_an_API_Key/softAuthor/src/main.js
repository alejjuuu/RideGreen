// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */

const firebaseConfig = {
  apiKey: "AIzaSyBlHAodGDhBVpbZkwpp-4KEc_cf3JZosQ0",
  authDomain: "edigitalvalue.firebaseapp.com",
  projectId: "edigitalvalue",
  storageBucket: "edigitalvalue.appspot.com",
  messagingSenderId: "300430549040",
  appId: "1:300430549040:web:2798a8fa6e6c73b826cdf5",
  measurementId: "G-67EGBZJSCQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
