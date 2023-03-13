<template>
  <el-aside>
    <MenuVertical />
  </el-aside>
</template>

<script setup lang="ts">
import { useConfig } from '@/stores/config'
import MenuVertical from '@/layout/components/menus/menuVertical.vue'

const config = useConfig()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'layout/aside'
})
</script>

<style scoped lang="scss"></style>
