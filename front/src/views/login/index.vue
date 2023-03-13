<script lang="ts" setup>
import { ElForm, ElInput, ElNotification } from 'element-plus'
import { buildValidatorData } from '@/utils/validate'
import { loginApi } from '@/api/user/index'
import router from '@/router'
import { useUserInfo } from '@/stores/userInfo'

const userInfo = useUserInfo()

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
  formEl.validate((valid) => {
    if (valid) {
      form.loading = true
      loginApi(form)
        .then((res) => {
          form.loading = false
          userInfo.dataFill(res.data)
          ElNotification({
            message: res.msg,
            type: 'success'
          })
          router.push({ path: '/admin/dashboard' })
        })
        .catch(() => {
          form.loading = false
        })
    }
  })
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
  overflow: hidden;
  background: url(@/assets/login/login-bg.png) repeat;

  .login {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(000, 000, 000, 0.1);
    .login-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 400px;
      height: 600px;
      background-color: #fff;
      box-shadow: 0px 0px 5px #a0cfff;
      border-radius: 10px;
      .form {
        width: 100%;
        padding: 20px 40px;
      }
    }
  }
}
</style>
