<template>
  <el-header class="layout-header">
    <component :is="config.layout.layoutMode + 'NavBar'"></component>
  </el-header>
</template>
<script setup lang="ts">
import { useConfig } from '@/stores/config'
import DefaultNavBar from '@/layout/components/navBar/default.vue'
import ClassicNavBar from '@/layout/components/navBar/classic.vue'
import DoubleNavBar from '@/layout/components/navBar/double.vue'

const config = useConfig()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'layout/header',
  components: { DefaultNavBar, ClassicNavBar, DoubleNavBar }
})
</script>

<style scoped lang="scss">
.layout-header {
  height: auto;
  padding: 0;
}
</style>
