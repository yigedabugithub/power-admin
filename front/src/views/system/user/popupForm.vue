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
          <el-form-item prop="userName" label="用户名">
            <el-input v-model="paTable.form.items!.userName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="userName" label="密码">
            <el-input v-model="paTable.form.items!.passWord" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="mobile" label="手机号">
            <el-input v-model="paTable.form.items!.mobile" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="sex" label="性别">
            <el-select style="width: 100%" v-model="paTable.form.items!.sex" placeholder="请选择">
              <el-option label="男" :value="0" />
              <el-option label="女" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item prop="sex" label="角色">
            <el-select
              style="width: 100%"
              multiple
              v-model="paTable.form.items!.roleList"
              placeholder="请选择"
            >
              <el-option
                v-for="item in rolesList"
                :key="item._id"
                :label="item.roleName"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="userEmail" label="邮箱">
            <el-input v-model="paTable.form.items!.userEmail" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="paTable.form.items!.deptId" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="岗位">
            <el-input v-model="paTable.form.items!.job" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-model="paTable.form.items!.state" placeholder="请输入"></el-input>
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
import { allRolesListApi } from '@/api/role/index'
import type { ElForm, FormItemRule } from 'element-plus'

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

const rolesList = ref([] as any)

onMounted(() => {
  allRolesListApi().then((res) => {
    rolesList.value = res.data || []
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
