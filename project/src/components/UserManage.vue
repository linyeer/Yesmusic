<template>
  <div>
    <el-tag class="ml-2 my-2" type="success">用户信息</el-tag>
    <div class="ml-2">
      <el-input v-model="search" class="pr-2" placeholder="请输入用户名搜索" />
      <el-table :data="filteredUsers" style="width: 100%">
        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" />
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="showEditForm(row)">修改</el-button>
            <el-button size="small" type="danger" @click="deleteUserById(row.userId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑用户信息 -->
      <el-dialog v-model="editFormVisible" title="编辑用户信息">
        <el-form :model="editForm">
          <el-form-item v-for="column in columns" :key="column.prop" :label="column.addLabel || column.label"
            :class="{ 'id-label': column.prop === 'userId' }">
            <el-input v-model="editForm[column.prop]" :disabled="column.prop === 'userId'" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEditForm">提交</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getUsers, deleteUser, editUser } from '@/api/getuser'

const users = ref([])
const search = ref('')
const columns = [
  { prop: 'userId', label: 'ID' },
  { prop: 'userName', label: '用户名', addLabel: '用户' },
  { prop: 'userPass', label: '密码' },
  { prop: 'userAge', label: '年龄' },
  { prop: 'userSex', label: '性别' },
  { prop: 'userBirth', label: '出生日期', addLabel: '生日' },
  { prop: 'userCity', label: '所在城市', addLabel: '城市' },
  { prop: 'userHobby', label: '个人爱好', addLabel: '爱好' }
]
const editFormVisible = ref(false)
const editForm = ref({})

const filteredUsers = computed(() => {
  return users.value.filter(user => user.userName.includes(search.value))
})

const fetchUsers = async () => {
  const response = await getUsers()
  users.value = response.data
}

const showEditForm = (user) => {
  editForm.value = { ...user }
  editFormVisible.value = true
}

const submitEditForm = async () => {
  await editUser(editForm.value)
  // 更新成功后，更新users中的用户信息
  users.value = users.value.map(user => user.userId === editForm.value.userId ? editForm.value : user)
  editFormVisible.value = false
}

const deleteUserById = async (userId) => {
  await deleteUser(userId)
  // 删除成功后，从users中移除该用户
  users.value = users.value.filter(user => user.userId !== userId)
}

fetchUsers()
</script>

<style scoped>
.id-label {
  @apply tracking-7px;
}
</style>
