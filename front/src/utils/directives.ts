import { App, nextTick } from 'vue'
import { useEventListener } from '@vueuse/core'

export function directives(app: App) {
  // 点击后自动失焦指令
  blurDirective(app)
}

/**
 * 点击后自动失焦指令
 * @description v-blur
 */
function blurDirective(app: App) {
  app.directive('blur', {
    mounted(el) {
      useEventListener(el, 'focus', () => el.blur())
    }
  })
}
