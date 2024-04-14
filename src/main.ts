import { createApp } from 'vue'
import './style.css'
import './assets/index.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import Welcome from './views/welcome.vue'
import Payroll from './views/payroll.vue'
import Employee from './views/employee.vue'
import Attendance from './views/attendance.vue'
import Settings from './views/settings.vue'

const routes = [
  { path: '/', component: Welcome, name: 'welcome' },
  { path: '/payroll', component: Payroll, name: '工资表' },
  { path: '/employee', component: Employee, name: '员工管理' },
  { path: '/attendance', component: Attendance, name: '考勤管理' },
  { path: '/settings', component: Settings, name: '设置' },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
