<template>
  <el-aside>
    <MenuVertical />
  </el-aside>
</template>

<script setup lang="ts">
import MenuVertical from '@/layout/components/menus/menuVertical.vue'

</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'layout/aside'
})
</script>

<style scoped lang="scss"></style>
