<template>
  <el-main class="layout-main">
    <el-scrollbar class="layout-main-scrollbar" ref="mainScrollbarRef">
      <router-view v-slot="{ Component }">
        <transition :name="config.layout.mainAnimation" mode="out-in">
          <component :is="Component" :key="state.componentKey" />
        </transition>
      </router-view>
    </el-scrollbar>
  </el-main>
</template>

<script setup lang="ts">
import { useRoute, RouteLocationNormalized } from 'vue-router'

import { useConfig } from '@/stores/config'
import useCurrentInstance from '@/utils/useCurrentInstance'

const { proxy } = useCurrentInstance()
const route = useRoute()
const config = useConfig()

const state: { componentKey: string } = reactive({
  componentKey: route.path
})

watch(
  () => route.path,
  () => {
    state.componentKey = route.path
  }
)
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'layout/main'
})
</script>

<style scoped lang="scss">
.layout-container .layout-main {
  padding: 0 !important;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.layout-main-scrollbar {
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
