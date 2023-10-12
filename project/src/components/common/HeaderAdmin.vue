<template>
  <el-header>
    <el-icon @click="isCollapse = !isCollapse">
      <Expand v-show="isCollapse" />
      <Fold v-show="!isCollapse" />
    </el-icon>
    <h2 class="flex ml-auto">后台管理系统</h2>
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="32" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script setup>
import { isCollapse } from "@/utils/isCollapse"
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  // 执行退出登录操作，清除 token、role 和 userName
  localStorage.removeItem('token')
  localStorage.removeItem('role');
  localStorage.removeItem('userName');
  router.push('/login')
}
</script>

<style scoped>
.el-header {
  @apply flex items-center bg-light-400;

  .el-icon {
    @apply mr-4;
  }
}

.el-dropdown {
  @apply ml-auto;
}
</style>
