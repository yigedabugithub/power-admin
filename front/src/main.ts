import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import router from './router'
import { registerIcons } from '@/utils/common'
import '@/styles/index.scss'
import pinia from '@/stores/index'
import mitt from 'mitt'
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文

async function start() {
  const app = createApp(App)
  app.use(pinia)
  app.use(router)
  app.use(ElementPlus, { locale })
  // 全局注册
  // directives(app) // 指令
  registerIcons(app) // icons
  app.mount('#app')
  app.config.globalProperties.eventBus = mitt()
}
start()
