<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎进入</div>
        <div>Yesmusicisamazing</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]" @keyup.enter.native="onSubmit">
        <el-form-item prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名">
            <!-- 引入element plus图标 -->
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="userPass">
          <el-input v-model="form.userPass" type="password" show-password placeholder="请输入密码">
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 添加登录类型选择 -->
        <el-form-item>
          <el-select v-model="form.userRole" placeholder="请选择登录类型" style="width: 100%" @change="toggleRegisterButton">
            <el-option label="用户" value="user"></el-option>
            <el-option label="管理员" value="admin"></el-option>
          </el-select>
        </el-form-item>

        <!-- 添加注册按钮 -->
        <el-form-item>
          <el-button round color="#f58220" type="button" @click="onRegister" v-show="showRegisterButton"
            class="register">注册</el-button>
          <el-button round color="#818cf8" type="submit" @click="onSubmit" class="login"
            :style="{ width: form.userRole === 'admin' ? '250px' : '' }">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router';
import { login, register } from '@/api/user'

const router = useRouter()

// do not use same name with ref
const form = reactive({
  userName: '',
  userPass: '',
  userRole: 'user' // 用于存储选择的登录类型
})

const rules = {
  userName: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ],
  userPass: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 3,
      message: '密码不得少于3位',
      trigger: 'blur'
    }
  ]
}

const formRef = ref(null)
let showRegisterButton = ref(true)

const toggleRegisterButton = () => {
  showRegisterButton.value = form.userRole === 'user'
}

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    login(form.userName, form.userPass, form.userRole)
      .then((res) => {
        // 将token保存到localStorage
        localStorage.setItem('token', res.data.token)
        ElNotification({
          message: '登录成功',
          type: 'success',
          duration: 3000
        })
        router.push('/')
      })
      .catch((err) => {
        ElNotification({
          message: err.response.data.message || '登录失败', //如果没有msg就显示登录失败
          type: 'error',
          duration: 3000
        })
      })
  })
}

const onRegister = () => {
  register(form.userName, form.userPass)
    .then((res) => {
      if (res.data.success) {
        ElNotification({
          message: '已注册',
          type: 'success',
          duration: 3000
        })
      } else {
        ElNotification({
          message: '请注册',
          type: 'info',
          duration: 3000
        })
      }
    })
    .catch((err) => {
      ElNotification({
        message: err.response.data.message || '注册失败',
        type: 'error',
        duration: 3000
      })
    })
}
</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-indigo-400;
}

.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}

.login-container .right {
  @apply flex-col bg-light-50;
}

.left>div>div:first-child {
  @apply font-bold text-xl text-light-50 mb-2;
}

.left>div>div:last-child {
  @apply text-gray-200 text-sm;
}

.right .title {
  @apply font-bold text-2xl text-gray-700 mt-3;
}

.right>div {
  @apply flex items-center justify-center my-4 space-x-2 text-gray-300;
}

.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}

.right .login,
.register {
  @apply w-[119px] text-light-50;
}
</style>
