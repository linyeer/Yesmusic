<template>
  <div>
    <el-text class="ml-2 text-2xl font-bold">我喜欢</el-text>
    <div class="ml-2 mb-2">
      <el-button type="text" @click="currentLike = 'likeSong'">歌曲</el-button>
      <el-button type="text" @click="currentLike = 'likeSonglist'">歌单</el-button>
      <el-button type="text" @click="currentLike = 'likeSongalbum'">专辑</el-button>
    </div>

    <div v-show="currentLike === 'likeSong'">
    <el-input style="display: none;" v-model="search" class="pr-2" placeholder="请输入歌名搜索" />
    <el-table :data="filteredMusics" style="width: 100%">
      <el-table-column 
      label="歌曲" 
      >
        <template #default="{ row }">
          <el-link type="primary" @click="playMusic(row)">{{ row.mName }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="mSinger" label="歌手" />
      <el-table-column prop="mAlbu" label="专辑" />
    </el-table>
  </div>
    <!-- 后续可以改成路由，现在先占着位置 -->
    <div class="ml-2 mb-2" v-show="currentLike === 'likeSonglist'">歌单还没做</div>
    <div class="ml-2 mb-2" v-show="currentLike === 'likeSongalbum'">专辑也还没做</div>
  </div>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue'
import { getMusic } from '@/api/getmusic'
import { playMusic } from '@/utils/audio'

const musics = ref([])
const currentLike = ref('likeSong')
const search = ref(localStorage.getItem('searchKeyword') || '')

onMounted(async () => {
  const response = await getMusic()
  musics.value = response.data
})

const filteredMusics = computed(() => {
  if (search.value) {
    return musics.value.filter(music => music.mName.includes(search.value));
  } else {
    return musics.value;
  }
});
</script>


<style scoped></style>
