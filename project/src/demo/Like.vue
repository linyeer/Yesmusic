<template>
  <div>
    <el-text class="ml-2 text-2xl font-bold">我喜欢</el-text>
    <div class="ml-2 mb-2">
      <el-button type="text" @click="currentLike = 'likeSong'">歌曲</el-button>
      <el-button type="text" @click="currentLike = 'likeSonglist'">歌单</el-button>
      <el-button type="text" @click="currentLike = 'likeSongalbum'">专辑</el-button>
    </div>

    <div v-show="currentLike === 'likeSong'">
      <el-table :data="musics" style="width: 100%">
        <el-table-column prop="mName" label="歌曲" />
        <el-table-column prop="mSinger" label="歌手" />
        <el-table-column prop="mAlbu" label="专辑" />
      </el-table>
    </div>

    <div v-show="currentLike === 'likeSonglist'">喜欢的歌单</div>
    <div v-show="currentLike === 'likeSongalbum'">喜欢的专辑</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getMusic } from '@/api/getmusic'

const musics = ref([])
const currentLike = ref('likeSong')

const fetchMusic = async () => {
  const response = await getMusic()
  musics.value = response.data
}

fetchMusic()
</script>

<style scoped></style>
