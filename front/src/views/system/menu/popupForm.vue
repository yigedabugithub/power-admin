<template>
  <!-- 对话框表单 -->
  <el-dialog
    class="ba-operate-dialog"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :model-value="paTable.form.operate ? true : false"
    @close="paTable.toggleForm"
  >
    <template #header>
      <div class="title">
        {{ paTable.form.operate }}
      </div>
    </template>
    <el-scrollbar v-loading="paTable.form.loading" class="ba-table-form-scrollbar">
      <div class="ba-operate-form">
        <el-form
          ref="formRef"
          @keyup.enter="paTable.onSubmit(formRef)"
          :model="paTable.form.items"
          :rules="rules"
          label-width="auto"
          v-if="!paTable.form.loading"
          style="padding: 0 30px"
        >
          <el-form-item prop="parentId" label="上级菜单">
            <el-tree-select
              style="width: 100%"
              v-model="paTable.form.items!.parentId"
              :data="parentMenu"
              check-strictly
              :props="{ label: 'title', value: '_id' }"
              placeholder="请选择"
            />
          </el-form-item>
          <el-form-item prop="menu_type" label="菜单类型">
            <el-radio-group v-model="paTable.form.items!.menu_type">
              <el-radio :label="0" border>目录</el-radio>
              <el-radio :label="1" border>菜单项</el-radio>
              <el-radio :label="2" border>按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="title" label="菜单名称">
            <el-input v-model="paTable.form.items!.title" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="path" label="路由地址">
            <el-input v-model="paTable.form.items!.path" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="menu_type" v-if="paTable.form.items!.menu_type !== 2" label="组件路径">
            <el-input v-model="paTable.form.items!.component" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="menu_type" v-if="paTable.form.items!.menu_type !== 0" label="权限标识">
            <el-input v-model="paTable.form.items!.menuCode" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="keepAlive" label="缓存状态">
            <el-radio-group v-model="paTable.form.items!.keepAlive">
              <el-radio :label="0" border>启用</el-radio>
              <el-radio :label="1" border>禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="hidden" label="显示状态">
            <el-radio-group v-model="paTable.form.items!.hidden">
              <el-radio :label="0" border>显示</el-radio>
              <el-radio :label="1" border>隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>
    <template #footer>
      <div style="padding: 0 30px">
        <el-button @click="paTable.toggleForm('')">取消</el-button>
        <el-button
          v-blur
          :loading="paTable.form.submitLoading"
          @click="paTable.onSubmit(formRef)"
          type="primary"
        >
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, inject, watch } from 'vue'
import type baTableClass from '@/utils/paTable'
import type { ElForm, FormItemRule } from 'element-plus'
import { listRoutes } from '@/api/menu/index'
const formRef = ref<InstanceType<typeof ElForm>>()
const paTable = ref(inject('paTable') as baTableClass)

const rules: Partial<Record<string, FormItemRule[]>> = reactive({
  // username: [buildValidatorData({ name: 'required', title: t('user.user.User name') }), buildValidatorData({ name: 'account' })],
  // nickname: [buildValidatorData({ name: 'required', title: t('user.user.nickname') })],
  // email: [buildValidatorData({ name: 'email', title: t('user.user.email') })],
  // mobile: [buildValidatorData({ name: 'mobile' })],
  // password: [
  //     {
  //         validator: (rule: any, val: string, callback: Function) => {
  //             if (paTable.form.operate == 'add') {
  //                 if (!val) {
  //                     return callback(new Error(t('Please input field', { field: t('user.user.password') })))
  //                 }
  //             } else {
  //                 if (!val) {
  //                     return callback()
  //                 }
  //             }
  //             if (!regularPassword(val)) {
  //                 return callback(new Error(t('validate.Please enter the correct password')))
  //             }
  //             return callback()
  //         },
  //         trigger: 'blur',
  //     },
  // ],
})

const parentMenu = ref([])

onMounted(() => {
  listRoutes().then((res) => {
    parentMenu.value = res.data || []
  })
})
</script>

<style scoped lang="scss">
.avatar-uploader {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: var(--el-border-radius-small);
  box-shadow: var(--el-box-shadow-light);
  border: 1px dashed var(--el-border-color);
  cursor: pointer;
  overflow: hidden;
  width: 110px;
  height: 110px;
}
.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}
.avatar {
  width: 110px;
  height: 110px;
  display: block;
}
.image-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
