import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'




//Vue.config.productionTip = false

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

createApp(App).use(router).mount('#app')

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/