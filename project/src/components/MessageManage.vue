<template>
  <div>
    <el-tag class="ml-2 my-2" type="danger">匿名留言信息</el-tag>
    <div class="ml-2">
      <el-input v-model="search" class="pr-2" placeholder="请输入留言内容搜索" />
      <el-table :data="filteredMessages" style="width: 100%">
        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" />
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="showEditForm(row)">回复</el-button>
            <el-button size="small" type="danger" @click="deleteMes(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 回复留言 -->
      <el-dialog v-model="editFormVisible" title="留言">
        <el-form :model="editForm">
          <el-form-item>
            <el-input type="textarea" v-model="editForm.messageRes" placeholder="请输入回复内容" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEditForm">回复</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getMessages, replyMessage, deleteMessage } from '@/api/getmessage'

const messages = ref([])
const search = ref('')
const columns = [
  { prop: 'messageId', label: 'ID' },
  { prop: 'messageContent', label: '留言内容' },
  { prop: 'messageRes', label: '回复内容' }
]
const editFormVisible = ref(false)
const editForm = ref({})

const filteredMessages = computed(() => {
  return messages.value.filter(message => message.messageContent.includes(search.value))
})

const fetchMessages = async () => {
  const response = await getMessages()
  messages.value = response.data
}

const showEditForm = (message) => {
  editForm.value = { ...message }
  editFormVisible.value = true
}

const submitEditForm = async () => {
  await replyMessage(editForm.value)
  // 更新成功后，更新messages中的留言信息
  messages.value = messages.value.map(message => message.messageId === editForm.value.messageId ? editForm.value : message)
  editFormVisible.value = false
}

const deleteMes = async (message) => {
  await deleteMessage(message.messageId)
  messages.value = messages.value.filter(m => m.messageId !== message.messageId)
}

fetchMessages()
</script>

<style scoped>
.id-label {
  @apply tracking-7px;
}
</style>
