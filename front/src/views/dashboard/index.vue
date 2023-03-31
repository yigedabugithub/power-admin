<script lang="ts" setup>
import PaIcon from '@/components/PaIcon/index.vue'
</script>

<template>
  <div class="default-main">
    <!-- # font-awesome的图标，使用 fa 作为前缀（带个空格） -->
    <PaIcon name="fa fa-pencil" color="#8595F4" size="20" />

    <!-- # element-plus 的图标，使用 el-icon 作为前缀，图标名称请使用：首字母大写的驼峰语法 -->
    <PaIcon name="el-icon-Close" color="#8595F4" size="20" />

    <!-- # 本地`/web/src/assets/icons`文件夹内的SVG图标，使用 local 作为前缀，文件名作为后缀 # -->
    <!-- 文件自动加载，新增请重新编译 -->
    <PaIcon name="local-dark" class="aa" color="#8595F4" size="20" />
    <!-- # 阿里iconfont的图标，使用 iconfont 作为前缀（带个空格） -->
    <PaIcon name="iconfont icon-xiazai" color="#8595F4" size="20" />
  </div>
</template>

<style lang="scss" scoped>

</style>
