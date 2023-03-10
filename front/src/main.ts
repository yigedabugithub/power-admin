import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import { createPinia } from 'pinia'
import router from './router'
import { registerIcons } from '@/utils/common'
import '@/styles/index.scss'

const app = createApp(App)
registerIcons(app) // icons

app.use(router).use(ElementPlus).use(createPinia()).mount('#app')
