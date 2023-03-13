<template>
  <el-header class="layout-header">
    <div style="height: 50px; background-color: #b1b1b1">Header</div>
  </el-header>
</template>
<script setup lang="ts"></script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'layout/header'
})
</script>

<style scoped lang="scss">
.layout-header {
  height: auto;
  padding: 0;
}
</style>
