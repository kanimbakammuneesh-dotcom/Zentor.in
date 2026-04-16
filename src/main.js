import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'

import Home from './views/Home.vue'
import Admissions from './views/Admissions.vue'
import Referrals from './views/Referrals.vue'
import PrivacyPolicy from './views/PrivacyPolicy.vue'
import Terms from './views/Terms.vue'
import Contact from './views/Contact.vue'
import Error from './views/Error.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/admissions/', name: 'Admissions', component: Admissions },
  { path: '/referrals/', name: 'Referrals', component: Referrals },
  { path: '/privacy/', name: 'PrivacyPolicy', component: PrivacyPolicy },
  { path: '/terms/', name: 'Terms', component: Terms },
  { path: '/contact/', name: 'Contact', component: Contact },
  { path: '/:pathMatch(.*)*', name: 'Error', component: Error }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 20 }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
