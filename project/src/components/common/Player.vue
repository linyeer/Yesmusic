<template>
  <el-button type="success" :icon="Download" @click="downloadMusic" circle />
  <!-- 播放/暂停按钮 -->
  <el-button type="warning" @click="togglePlay" circle>
    <template v-if="isPlaying">
      <el-icon>
        <VideoPause />
      </el-icon>
    </template>
    <template v-else>
      <el-icon>
        <VideoPlay />
      </el-icon>
    </template>
  </el-button>
  <div class="mr-1">
    <span v-if="currentTime !== null">{{ formattedCurrentTime }} / {{ formattedTotalTime }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { Download } from '@element-plus/icons-vue'
import { currentAudio, currentTime, totalTime } from '@/utils/audio'

let isPlaying = ref(false)

// 监听当前音频的播放状态
watchEffect(() => {
  if (currentAudio.value) {
    currentAudio.value.onplay = () => {
      isPlaying.value = true
    }
    currentAudio.value.onpause = () => {
      isPlaying.value = false
    }

  }
})

// 切换播放/暂停按钮图标
const togglePlay = () => {
  if (currentAudio.value) {
    if (isPlaying.value) {
      currentAudio.value.pause()
    } else {
      currentAudio.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const downloadMusic = () => {
  if (currentAudio.value) {
    const link = document.createElement('a')
    link.href = currentAudio.value.src
    link.download = 'music.mp3'  // 设置下载文件的文件名
    link.click()
  }
}


const formattedTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const formattedCurrentTime = computed(() => formattedTime(currentTime.value))
const formattedTotalTime = computed(() => formattedTime(totalTime.value))
</script>

<style scoped></style>
