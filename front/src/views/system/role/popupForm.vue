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
          <el-form-item prop="roleName" label="角色">
            <el-input v-model="paTable.form.items!.roleName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="备注">
            <el-input v-model="paTable.form.items!.remark" placeholder="请输入"></el-input>
          </el-form-item>
          <el-tree
            :data="parentMenu"
            show-checkbox
            node-key="_id"
            :default-expanded-keys="[1]"
            :default-checked-keys="paTable.form.items!.checkedKeys"
            :props="defprops"
            @check="handleCheckChange"
          />
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
import { listMenusAll } from '@/api/menu/index'

const formRef = ref<InstanceType<typeof ElForm>>()
const paTable = inject('paTable') as baTableClass
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
const defprops = { label: 'title', value: '_id' }
const handleCheckChange = (val: any, num: any) => {
  console.log(val, num, '*-*-*-*-*-')
  paTable.form.items!.checkedKeys = num.checkedKeys
  paTable.form.items!.halfCheckedKeys = num.halfCheckedKeys
}

onMounted(() => {
  listMenusAll().then((res) => {
    parentMenu.value = res.data.list || []
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
