<template>
  <div>
    <el-tag class="ml-2 my-2" type="primary">歌曲信息</el-tag>
    <div class="ml-2">
      <el-input v-model="search" class="pr-2" placeholder="请输入歌名搜索" />
      <el-table :data="filteredMusic" style="width: 100%">
        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label" />
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="showEditForm(row)">修改</el-button>
            <el-button size="small" type="danger" @click="deleteMusicById(row.mId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑用户信息 -->
      <el-dialog v-model="editFormVisible" title="编辑歌曲信息">
        <el-form :model="editForm">
          <el-form-item v-for="column in columns" :key="column.prop" :label="column.addLabel || column.label"
            :class="{ 'id-label': column.prop === 'mId' }">
            <el-input v-if="column.prop !== 'mText'" v-model="editForm[column.prop]" :disabled="column.prop === 'mId'" />
            <!-- 歌词输入框变成富文本框 -->
            <el-input v-else type="textarea" v-model="editForm[column.prop]" :disabled="column.prop === 'mId'" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEditForm">提交</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
  <el-button class="ml-2 my-2" type="primary" :icon="DocumentAdd" @click="showAddForm"></el-button>

  <!-- 添加歌曲信息 -->
  <el-form class="ml-2 my-2" v-if="addFormVisible" :model="addForm">
    <el-form-item v-for="column in columns" :key="column.prop" :label="column.addLabel || column.label"
      :class="{ 'id-label': column.prop === 'mId' }">
      <el-input class="pr-2" v-if="column.prop !== 'mText'" v-model="addForm[column.prop]"
        :disabled="column.prop === 'mId'" />
      <el-input class="pr-2" v-else type="textarea" v-model="addForm[column.prop]" :disabled="column.prop === 'mId'" />
    </el-form-item>
    <el-button type="primary" @click="submitAddForm">提交</el-button>
    <el-button @click="addFormVisible = false">取消</el-button>
  </el-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getMusic, deleteMusic, editMusic, addMusic } from '@/api/getmusic'
import { DocumentAdd } from '@element-plus/icons-vue'

const music = ref([])
const search = ref('')
const columns = [
  { prop: 'mId', label: 'ID' },
  { prop: 'mName', label: '歌名' },
  { prop: 'mCate', label: '类型' },
  { prop: 'mAlbu', label: '专辑' },
  { prop: 'mSinger', label: '歌手' },
  { prop: 'mPopu', label: '人气排行', addLabel: '排名' },
  { prop: 'mDate', label: '上榜日期', addLabel: '上榜' },
  { prop: 'mText', label: '歌词内容', addLabel: '歌词' }
]
const editFormVisible = ref(false)
const editForm = ref({})

const filteredMusic = computed(() => {
  return music.value.filter(m => m.mName.includes(search.value))
})

const fetchMusic = async () => {
  const response = await getMusic()
  music.value = response.data
}

const showEditForm = (m) => {
  editForm.value = { ...m }
  editFormVisible.value = true
}

const submitEditForm = async () => {
  await editMusic(editForm.value)
  // 更新成功后，更新music中的歌曲信息
  music.value = music.value.map(m => m.mId === editForm.value.mId ? editForm.value : m)
  editFormVisible.value = false
}

const deleteMusicById = async (mId) => {
  await deleteMusic(mId)
  // 删除成功后，从music中移除该歌曲
  music.value = music.value.filter(m => m.mId !== mId)
}

const addFormVisible = ref(false)
const addForm = ref({})

const showAddForm = () => {
  // 清空新歌曲的信息
  addForm.value = {}
  addFormVisible.value = true
}

const submitAddForm = async () => {
  await addMusic(addForm.value)
  // 添加成功后，重新获取所有的歌曲信息
  await fetchMusic()
  addFormVisible.value = false
}

fetchMusic()
</script>

<style scoped>
/* 为了统一表单ID的间距问题 */
.id-label {
  @apply tracking-7px;
}
</style>
