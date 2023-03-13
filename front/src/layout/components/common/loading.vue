<template>
  <div>
    <div
      v-loading="true"
      element-loading-background="var(--ba-bg-color-overlay)"
      element-loading-text="Loading"
      class="default-main ba-main-loading"
    ></div>
    <div v-if="state.showReload" class="loading-footer">
      <el-button @click="refresh" type="warning">Reload</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, reactive } from 'vue'
import { useNavTabs } from '@/stores/navTabs'
import { isAdminApp } from '@/utils/common'
import { useRoute, useRouter } from 'vue-router'

let timer: NodeJS.Timer

const navTabs = useNavTabs()
const route = useRoute()
const router = useRouter()
const { query } = route
const pathh = JSON.parse(route.params.to).path

const state = reactive({
  maximumWait: 1000 * 6,
  showReload: false
})

if (isAdminApp() && navTabs.state.tabsViewRoutes) {
  setTimeout(() => {
    console.log(pathh, '***route.fullPath')
    router.replace({ path: pathh, query })
  }, 100)
}

timer = setTimeout(() => {
  state.showReload = true
}, state.maximumWait)

const refresh = () => {
  router.go(0)
}
onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped lang="scss">
.ba-main-loading {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
