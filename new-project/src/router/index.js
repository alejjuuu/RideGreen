import testing from '@/views/testing.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import maps from '../views/maps.vue'
import notFound from '../views/notFound.vue'
//import VueGeolocation from 'vue-browser-geolocation'

/*
Vue.config.productionTip = false
Vue.use(VueGeolocation)

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: ''
  }
})
*/

//import about from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    //component: about
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/testing',
    name:'testing',
    component: testing
  },
    {
    path:'/maps',
    name:'maps',
    component: maps
  },
      {
    path:'/Map',
    name:'Map',
    component: Map
  },

  //catchall 404 
  {
    path:'/:catchAll(.*)',
    name: 'notFound',
    component: notFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
