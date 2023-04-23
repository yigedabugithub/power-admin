<template>
  <div class="page">
    <!-- 表格顶部菜单 -->
    <TableHeader :buttons="['refresh', 'add']" quick-search-placeholder="请输入" />
    <!-- 表格 -->
    <TableTT ref="tableRef" />
    <!-- 表单 -->
    <PopupForm />
  </div>
</template>

<script lang="ts" setup>
import PopupForm from './popupForm.vue'
import TableHeader from '@/components/PaTable/header/index.vue'
import baTableClass from '@/utils/paTable'
import TableTT from '@/components/PaTable/index.vue'
import { users } from '@/api/controllerUrls'
import { baTableApi } from '@/api/common'
import { tableUserColumnTT } from './config'

const tableRef = ref()
const paTable = new baTableClass(new baTableApi(users), {
  column: tableUserColumnTT
})
paTable.mount()
paTable.getIndex()
provide('paTable', paTable)
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
}
</style>
