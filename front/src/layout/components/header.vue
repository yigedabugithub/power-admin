<template>
  <el-header class="layout-header">
    <div>Header</div>
    <!-- <component :is="config.layout.layoutMode + 'NavBar'"></component> -->
  </el-header>
</template>
<script setup lang="ts"></script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'layout/header'
  // components: { DefaultNavBar, ClassicNavBar, StreamlineNavBar, DoubleNavBar },
})
</script>

<style scoped lang="scss">
.layout-header {
  height: auto;
  padding: 0;
}
</style>
