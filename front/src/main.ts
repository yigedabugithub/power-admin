import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import router from './router'
import { registerIcons } from '@/utils/common'
import '@/styles/index.scss'
import pinia from '@/stores/index'

const app = createApp(App)
registerIcons(app) // icons

app.use(router).use(ElementPlus).use(pinia).mount('#app')
