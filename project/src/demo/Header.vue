<template>
  <el-header>
    <el-icon @click="isCollapse = !isCollapse">
      <Expand v-show="isCollapse" />
      <Fold v-show="!isCollapse" />
    </el-icon>
    <!-- 前进后退 -->
    <el-icon>
      <ArrowLeft />
    </el-icon>
    <el-icon>
      <ArrowRight />
    </el-icon>
    <!-- 搜索框 -->
    <el-input class="w-50" placeholder="搜索音乐" :prefix-icon="Search" />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="32" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 留言按钮 -->
    <el-button text type="warning" class="p-0 ml-3" @click="showEditForm">留言</el-button>
  </el-header>

  <!-- 添加留言 -->
  <el-dialog v-model="editFormVisible" title="留言添加">
    <el-form :model="editForm">
      <el-form-item>
        <el-input type="textarea" v-model="editForm.messageContent" placeholder="请输入留言内容" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">取消</el-button>
      <el-button type="primary" @click="submitEditForm">提交</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postMessage } from '@/api/getmessage'

const router = useRouter()
const isCollapse = ref(false)
const editFormVisible = ref(false)
const editForm = ref({ messageContent: '' })

const logout = () => {
  // 清除 token
  localStorage.removeItem('token');
  router.push('/login')
}

const showEditForm = () => {
  editFormVisible.value = true
}

const submitEditForm = async () => {
  await postMessage(editForm.value.messageContent)
  editForm.value.messageContent = ''
  editFormVisible.value = false
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
