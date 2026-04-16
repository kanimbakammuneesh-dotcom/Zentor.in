import { createApp } from 'vue'
import { createUnhead } from 'unhead'
import { useHead } from '@unhead/vue'
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
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

const head = createHead({
  tags: [
    { tag: 'link', rel: 'canonical', href: 'https://zentor.in' },
    { tag: 'link', rel: 'sitemap', type: 'application/xml', href: 'https://zentor.in/sitemap.xml' },
    { tag: 'meta', name: 'theme-color', content: '#030305' },
    { tag: 'meta', name: 'color-scheme', content: 'dark' },
    { tag: 'link', rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { tag: 'link', rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ]
})

const app = createApp(App)
app.use(router)
app.use(head)
app.mount('#app')
