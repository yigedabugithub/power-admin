import PaIcon from '@/components/PaIcon/index.vue'
import * as elIcons from '@element-plus/icons-vue'
import type { App } from 'vue'
import router from '@/router/index'

/**
 * 是否是外部链接
 * @param path
 */
export function isExternal(path: string): boolean {
  return /^(https?|ftp|mailto|tel):/.test(path)
}

export function registerIcons(app: App) {
  app.component('PaIcon', PaIcon)
  /*
   * 全局注册element Plus的icon
   */
  const icons = elIcons as any
  for (const i in icons) {
    app.component(`el-icon-${icons[i].name}`, icons[i])
  }
}

/**
 * 加载网络css文件
 * @param url css资源url
 */
export function loadCss(url: string): void {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  link.crossOrigin = 'anonymous'
  document.getElementsByTagName('head')[0].appendChild(link)
}

/**
 * 加载网络js文件
 * @param url js资源url
 */
export function loadJs(url: string): void {
  const link = document.createElement('script')
  link.src = url
  document.body.appendChild(link)
}

/**
 * 是否在后台应用内
 * @param path 不传递则通过当前路由 path 检查
 */
export const isAdminApp = (path = '') => {
  if (path) {
    return /^\/admin/.test(path)
  }
  if (
    /^\/admin/.test(router.currentRoute.value.fullPath) ||
    window.location.hash.indexOf('#/admin') === 0
  ) {
    return true
  }
  return false
}
