import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import map from '../views/map.vue'
import payment from '../views/payment.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/map',
    name: 'map',
    component: map
  },
    {
    path: '/payment',
    name: 'payment',
    component: payment
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
