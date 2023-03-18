<script lang="ts" setup>
import { useConfig } from '@/stores/config'
import Default from '@/layout/container/default.vue'
import Classic from '@/layout/container/classic.vue'
import Streamline from '@/layout/container/streamline.vue'
import Double from '@/layout/container/double.vue'
import { useSiteConfig } from '@/stores/siteConfig'
import { useUserInfo } from '@/stores/userInfo'
import { handleAdminRoute, routePush, getFirstRoute } from '@/utils/router'
import { useRoute } from 'vue-router'
import { isEmpty } from 'lodash-es'
import { userInfoApi } from '@/api/user/index'
import router from '@/router'
import { useEventListener } from '@vueuse/core'
import { Session } from '@/utils/storage'
import { BEFORE_RESIZE_LAYOUT } from '@/stores/constant/cacheKey'

const route = useRoute()
const userInfo = useUserInfo()
const siteConfig = useSiteConfig()
const config = useConfig()

onMounted(() => {
  init()

  onSetNavTabsMinWidth()
  useEventListener(window, 'resize', onSetNavTabsMinWidth)
})

const onAdaptiveLayout = () => {
  let defaultBeforeResizeLayout = {
    layoutMode: config.layout.layoutMode,
    menuCollapse: config.layout.menuCollapse
  }
  let beforeResizeLayout = Session.get(BEFORE_RESIZE_LAYOUT)
  if (!beforeResizeLayout) Session.set(BEFORE_RESIZE_LAYOUT, defaultBeforeResizeLayout)

  const clientWidth = document.body.clientWidth
  if (clientWidth < 1024) {
    config.setLayout('menuCollapse', true)
    config.setLayout('shrink', true)
    config.setLayoutMode('Classic')
  } else {
    let beforeResizeLayoutTemp = beforeResizeLayout ?? defaultBeforeResizeLayout

    config.setLayout('menuCollapse', beforeResizeLayoutTemp.menuCollapse)
    config.setLayout('shrink', false)
    config.setLayoutMode(beforeResizeLayoutTemp.layoutMode)
  }
}

onBeforeMount(() => {
  onAdaptiveLayout()
  useEventListener(window, 'resize', onAdaptiveLayout)
})

const init = () => {
  userInfoApi().then((res) => {
    siteConfig.dataFill(res.data.siteConfig)
    userInfo.dataFill(res.data.info)
    if (res.data.menus) handleAdminRoute(res.data.menus)
  })
}

// 在实例挂载后为navTabs设置一个min-width，防止宽度改变时闪现滚动条
const onSetNavTabsMinWidth = () => {
  const navTabs = document.querySelector('.nav-tabs') as HTMLElement
  if (!navTabs) {
    return
  }
  const navBar = document.querySelector('.nav-bar') as HTMLElement
  const navMenus = document.querySelector('.nav-menus') as HTMLElement
  const minWidth = navBar.offsetWidth - (navMenus.offsetWidth + 20)
  navTabs.style.width = minWidth.toString() + 'px'
}
</script>
<!-- 只有在 components 选项中的组件可以被动态组件使用-->
<script lang="ts">
export default {
  components: { Default, Classic, Streamline, Double }
}
</script>
<template>
  <!-- <component :is="config.layout.layoutMode"></component> -->
  <Default></Default>
</template>

<style lang="scss" scoped></style>
