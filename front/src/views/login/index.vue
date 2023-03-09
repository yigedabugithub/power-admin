<script lang="ts" setup>
import type { ElForm, ElInput } from 'element-plus'
import { buildValidatorData } from '@/utils/validate'

const formRef = ref<InstanceType<typeof ElForm>>()
const userNameRef = ref<InstanceType<typeof ElInput>>()
const passWordRef = ref<InstanceType<typeof ElInput>>()
const form = reactive({
  userName: '',
  passWord: '',
  captcha: '',
  loading: false
})

// 表单验证规则
const rules = reactive({
  username: [
    buildValidatorData({ name: 'required', message: '请输入用户名' }),
    buildValidatorData({ name: 'account' })
  ],
  password: [
    buildValidatorData({ name: 'required', message: '请输入密码' }),
    buildValidatorData({ name: 'password' })
  ]
})

// 提交
const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  // formEl.validate((valid) => {
  //   if (valid) {
  //     form.loading = true
  //     form.captcha_id = state.captchaId
  //     login('post', form)
  //       .then((res) => {
  //         form.loading = false
  //         adminInfo.dataFill(res.data.userInfo)
  //         ElNotification({
  //           message: res.msg,
  //           type: 'success'
  //         })
  //         router.push({ path: res.data.routePath })
  //       })
  //       .catch(() => {
  //         onChangeCaptcha()
  //         form.loading = false
  //       })
  //   } else {
  //     onChangeCaptcha()
  //     return false
  //   }
  // })
}
</script>

<template>
  <div class="page-login">
    <div id="loginBji" class="loginBji">
      <!-- <canvas id="bubble-canvas" class="bubble-canvas"></canvas> -->
    </div>
    <div class="login">
      <div class="login-box">
        <div class="head">
          <!-- <img src="~assets/login-header.png" alt="" /> -->
        </div>
        <div class="form">
          <!-- <img class="profile-avatar" src="~assets/avatar.png" alt="" /> -->
          <div class="content">
            <el-form @keyup.enter="onSubmit(formRef)" ref="formRef" :rules="rules" :model="form">
              <el-form-item prop="userName">
                <el-input
                  ref="userNameRef"
                  type="text"
                  clearable
                  v-model="form.userName"
                  placeholder="请输入用户名"
                >
                </el-input>
              </el-form-item>
              <el-form-item prop="passWord">
                <el-input
                  ref="passWordRef"
                  v-model="form.passWord"
                  type="password"
                  placeholder="请输入密码"
                  show-password
                >
                </el-input>
              </el-form-item>

              <el-form-item>
                <el-button
                  :loading="form.loading"
                  class="submit-button"
                  round
                  type="primary"
                  size="large"
                  @click="onSubmit(formRef)"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-login {
  // background-color: #6286e8;
  overflow: hidden;
  background: url(@/assets/login/login-bg.png) repeat;

  .login {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 400px;
      height: 600px;
      background-color: #ebeded;
      .form {
        width: 100%;
        padding: 20px 40px;
      }
    }
  }
}
</style>
