<template>
  <el-row :gutter="12">
    <el-col v-for="message in messages" :key="message.messageId" :span="12">
      <el-card shadow="hover" class=" m-3">
        <div>
          <span>留言：{{ message.messageId }}</span>
        </div>
        <div class="mb-3">
          内容：{{ message.messageContent }}
        </div>
        <div>
          <span class="text-blue-500">回复：{{ message.messageRes }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMessages } from '@/api/getmessage'

const messages = ref([])

onMounted(async () => {
  const response = await getMessages()
  messages.value = response.data
})
</script>

<style scoped></style>
