import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import payment from '../views/payment.vue'

const stripe = require('stripe')('pk_test_51L0vEzDjx4QOpJ22C9T8lcYNss9g6viO1382VSv096t4MiZ7Y4CO5GguDHZf9LP0Hxm3VC92DHLNHX4WBX7BBEpt003irItIuf')
const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
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
