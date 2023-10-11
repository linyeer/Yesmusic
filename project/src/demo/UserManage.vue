<template>
  <div>
    <el-tag class="ml-2 my-2" type="success">用户信息</el-tag>
    <div class="ml-2">
      <el-table :data="users" style="width: 100%">
        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" />
        <el-table-column align="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="showEditForm(row)">修改</el-button>
            <el-button size="small" type="danger" @click="deleteUserById(row.userId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog v-model="editFormVisible" title="编辑用户信息">
        <el-form :model="editForm">
          <el-form-item label="用户名">
            <el-input v-model="editForm.userName" />
          </el-form-item>
          <!-- 在这里添加更多的表单项 -->
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
import { ref } from 'vue'
import { getUsers, deleteUser, editUser } from '@/api/getuser'

const users = ref([])
const columns = [
  { prop: 'userId', label: 'ID' },
  { prop: 'userName', label: '用户名' },
  { prop: 'userPass', label: '密码' },
  { prop: 'userAge', label: '年龄' },
  { prop: 'userSex', label: '性别' },
  { prop: 'userBirth', label: '出生日期' },
  { prop: 'userCity', label: '所在城市' },
  { prop: 'userHobby', label: '个人爱好' }
]
const editFormVisible = ref(false)
const editForm = ref({})

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

<style scoped></style>
