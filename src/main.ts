import { createApp } from 'vue'
import './style.css'
import './assets/index.css'
import App from './App.vue'

import { createRouter,createWebHistory } from 'vue-router'
import Welcome from './views/welcome.vue'


const routes = [
  { path: '/', component: Welcome, name:'welcome' },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})


const app = createApp(App)
app.use(router)
app.mount('#app')
