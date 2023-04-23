<template>
  <el-config-provider>
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import iconfontInit from '@/utils/iconfont'
onMounted(() => {
  iconfontInit()
})
</script>

<style lang="scss"></style>
