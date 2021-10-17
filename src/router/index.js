import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Learn from '../views/Learn.vue'
import Practice from '../views/Practice.vue'
import Test from '../views/Test.vue'
import Login from '../views/Login.vue'
import Edit from '../views/Edit.vue'
import EndScore from '../views/EndScore.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/learn',
    name: 'Learn',
    component: Learn
  },
  {
    path: '/practice',
    name: 'Practice',
    component: Practice
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/end-score',
    name: 'EndScore',
    component: EndScore
  },
  
]

const router = new VueRouter({
  routes
})

export default router
