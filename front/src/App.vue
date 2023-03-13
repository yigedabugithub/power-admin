<template>
  <el-config-provider>
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import iconfontInit from '@/utils/iconfont'
onMounted(() => {
  iconfontInit()

  // Modules onMounted mark, Please do not remove.
})
</script>

<style lang="scss"></style>
