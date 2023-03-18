<template>
  <el-aside
    v-if="!navTabs.state.tabFullScreen"
    :class="
      'layout-aside-' + config.layout.layoutMode + ' ' + (config.layout.shrink ? 'shrink' : '')
    "
  >
    <Logo v-if="config.layout.menuShowTopBar" />

    <MenuVertical />
  </el-aside>
</template>

<script setup lang="ts">
import MenuVertical from '@/layout/components/menus/menuVertical.vue'
import { useConfig } from '@/stores/config'
import Logo from '@/layout/components/logo.vue'
import { useNavTabs } from '@/stores/navTabs'
const navTabs = useNavTabs()

console.log(navTabs.state, '9******************')

const config = useConfig()
const menuWidth = computed(() => config.menuWidth())
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'layout/aside'
})
</script>

<style scoped lang="scss">
.layout-aside-Default {
  background: var(--ba-bg-color-overlay);
  margin: 16px 0 16px 16px;
  height: calc(100vh - 32px);
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  overflow: hidden;
  transition: width 0.3s ease;
  width: v-bind(menuWidth);
}
.layout-aside-Classic,
.layout-aside-Double {
  background: var(--ba-bg-color-overlay);
  margin: 0;
  height: 100vh;
  overflow: hidden;
  transition: width 0.3s ease;
  width: v-bind(menuWidth);
}
.shrink {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
}
</style>
