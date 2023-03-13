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

const route = useRoute()
const userInfo = useUserInfo()
const siteConfig = useSiteConfig()
const config = useConfig()

onMounted(() => {
  init()
})

const init = () => {
  userInfoApi().then((res) => {
    siteConfig.dataFill(res.data.siteConfig)
    userInfo.dataFill(res.data.info)
    if (res.data.menus) handleAdminRoute(res.data.menus)
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
