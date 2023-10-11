<template>
  <div>
    <el-header>
      <el-icon @click="isCollapse = !isCollapse">
        <Expand v-show="isCollapse" />
        <Fold v-show="!isCollapse" />
      </el-icon>
      <!-- 前进后退 -->
      <el-icon @click="goBack">
        <ArrowLeft />
      </el-icon>
      <el-icon @click="goForward">
        <ArrowRight />
      </el-icon>
      <!-- 搜索框 -->
      <el-input class="w-50" placeholder="搜索音乐" v-model="searchKeyword" />
      <el-button @click="searchSongs">搜索</el-button>
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="32" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="showUserCenter">个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
            <el-dropdown-item divided @click="cancel">注销</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 留言按钮 -->
      <el-button type="text" class="ml-2" @click="showEditForm">留言</el-button>
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

    <el-drawer v-model="userCenterVisible" title="个人中心">
      <el-form :model="editUserData">
        <el-form-item v-for="column in userColumns" :key="column.prop" :label="column.addLabel || column.label"
          :class="{ 'id-label': column.prop === 'userId' }">
          <el-input v-model="editUserData[column.prop]" :disabled="column.prop === 'userId'" />
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="editDrawerVisible = true">修改</el-button>
      </div>
    </el-drawer>

    <!-- 修改信息确认抽屉 -->
    <el-drawer v-model="editDrawerVisible" title="确认修改" :append-to-body="true" :modal-append-to-body="true">
      <el-text class="mx-1" type="danger">确认是否修改用户信息？</el-text>
      <div class="mt-3">
        <el-button @click="editDrawerVisible = false">不是</el-button>
        <el-button type="primary" @click="confirmEdit">是</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { isCollapse } from "@/utils/isCollapse"
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postMessage } from '@/api/getmessage'
import { getUsers, editUser, deleteUser } from '@/api/getuser'

const router = useRouter()

// 后退
const goBack = () => {
  router.back()
}

// 前进
const goForward = () => {
  router.forward()
}
const editFormVisible = ref(false)
const editForm = ref({ messageContent: '' })

const userColumns = [
  { prop: 'userId', label: 'ID' },
  { prop: 'userName', label: '用户名', addLabel: '用户' },
  { prop: 'userPass', label: '密码' },
  { prop: 'userAge', label: '年龄' },
  { prop: 'userSex', label: '性别' },
  { prop: 'userBirth', label: '出生日期', addLabel: '生日' },
  { prop: 'userCity', label: '所在城市', addLabel: '城市' },
  { prop: 'userHobby', label: '个人爱好', addLabel: '爱好' }
]

const logout = () => {
  // 执行退出登录操作，清除 token 和 userName
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  router.push('/login')
}

// 模态框相关
const showEditForm = () => {
  editFormVisible.value = true
}

const submitEditForm = async () => {
  await postMessage(editForm.value.messageContent)
  // 清空表单
  editForm.value.messageContent = ''
  editFormVisible.value = false
}

// Drawer抽屉相关
const userCenterVisible = ref(false)
const editDrawerVisible = ref(false)
const editUserData = ref({})

let currentUser = null; // 定义一个外部变量来存储当前用户信息

// 从本地存储获取用户信息
const userName = localStorage.getItem('userName');
const fetchUserData = async (userName) => {
  const response = await getUsers();
  const user = response.data.find(item => item.userName === userName);
  if (user) {
    editUserData.value = { ...user };
    currentUser = { ...user }; // 保存当前用户信息
  } else {
    console.error('未找到匹配的用户');
  }
};

const showUserCenter = () => {
  fetchUserData(userName)
  userCenterVisible.value = true
}

const confirmEdit = async () => {
  try {
    await editUser(editUserData.value)
    editDrawerVisible.value = false
    userCenterVisible.value = false
  } catch (error) {
    console.error('用户信息更新失败', error)
  }
}

// 注销相关
const cancel = async () => {
  const confirmed = window.confirm('是否注销该账号？此操作不可恢复。');
  if (confirmed) {
    try {
      if (currentUser) {
        const userId = currentUser.userId; // 使用外部变量获取用户ID
        await deleteUser(userId);
        // 执行退出登录操作，清除 token 和 userName
        logout();
      } else {
        console.error('无法获取当前用户信息');
      }
    } catch (error) {
      console.error('注销失败', error);
    }
  }
};

// 搜索相关
const searchKeyword = ref('');

const searchSongs = () => {
  // 将搜索关键词存储到本地存储
  localStorage.setItem('searchKeyword', searchKeyword.value);
  // 刷新/user/like这个路由
  router.go(0);
};
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

.id-label {
  @apply tracking-7px;
}
</style>
