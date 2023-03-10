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

const route = useRoute()
const userInfo = useUserInfo()
const siteConfig = useSiteConfig()
const config = useConfig()

onMounted(() => {
  init()
})

const init = () => {
  index().then((res: any) => {
    siteConfig.dataFill(res.data.siteConfig)
    userInfo.dataFill(res.data.adminInfo)

    if (res.data.menus) {
      handleAdminRoute(res.data.menus)

      // 预跳转到上次路径
      if (route.params.to) {
        const lastRoute = JSON.parse(route.params.to as string)
        if (lastRoute.path != adminBaseRoute.path) {
          let query = !isEmpty(lastRoute.query) ? lastRoute.query : {}
          routePush({ path: lastRoute.path, query: query })
          return
        }
      }

      // 跳转到第一个菜单
      let firstRoute = getFirstRoute(navTabs.state.tabsViewRoutes)
      if (firstRoute) routePush(firstRoute.path)
    }
  })
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
