import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'

import Home from './views/Home.vue'
import Admissions from './views/Admissions.vue'
import Referrals from './views/Referrals.vue'
import Error from './views/Error.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/admissions/', name: 'Admissions', component: Admissions },
  { path: '/referrals/', name: 'Referrals', component: Referrals },
  { path: '/:pathMatch(.*)*', name: 'Error', component: Error }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')