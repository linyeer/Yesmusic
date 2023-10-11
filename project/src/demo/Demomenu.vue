<template>
  <el-aside>
    <el-menu>
      <!-- 在线音乐模块 -->
      <el-menu-item-group title="在线音乐">
        <el-menu-item>
          <el-icon>
            <Star />
          </el-icon>
          <span>推荐</span>
        </el-menu-item>
        <el-menu-item>
          <el-icon>
            <Headset />
          </el-icon>
          <span>音乐馆</span>
        </el-menu-item>
        <el-menu-item>
          <el-icon>
            <VideoCamera />
          </el-icon>
          <span>视频</span>
        </el-menu-item>
      </el-menu-item-group>
      <!-- 我的音乐模块 -->
      <el-menu-item-group title="我的音乐">
        <el-menu-item>
          <el-icon>
            <StarFilled />
          </el-icon>
          <span>我喜欢</span>
        </el-menu-item>
        <el-menu-item>
          <el-icon>
            <Download />
          </el-icon>
          <span>本地和下载</span>
        </el-menu-item>
        <el-menu-item>
          <el-icon>
            <WalletFilled />
          </el-icon>
          <span>已购音乐</span>
        </el-menu-item>
      </el-menu-item-group>
      <!-- 创建的歌单模块 -->
      <div>
        <div class="playlist-title">
          <h3 class="playlist-name">创建的歌单</h3>
          <el-icon @click="addPlaylist" class="mx-1" color="#909399">
            <Plus />
          </el-icon>
          <el-icon @click="togglePlaylist" color="#909399">
            <ArrowUp v-if="showPlaylist" />
            <ArrowDown v-else />
          </el-icon>
        </div>

        <!-- 分组内容 -->
        <div class="playlist-content" v-show="showPlaylist">
          <div class="playlist-item" v-for="(item, index) in playlist" :key="index">
            {{ item }}
            <el-icon color="#909399" class="delete" @click="deletePlaylist(index)">
              <Delete />
            </el-icon>
          </div>
        </div>
      </div>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref } from "vue"
const playlist = ref(["歌单1", "歌单2", "歌单3"])
const showPlaylist = ref(true)

// 定义添加歌单的方法
const addPlaylist = () => {
  const length = playlist.value.length
  const newItem = `歌单${length + 1}`
  playlist.value.push(newItem)
}

// 定义删除歌单的方法
const deletePlaylist = (index) => {
  // 根据索引删除对应的歌单
  playlist.value.splice(index, 1)
}

// 定义切换显示或隐藏歌单内容的方法
const togglePlaylist = () => {
  // 取反当前的显示状态
  showPlaylist.value = !showPlaylist.value
}
</script>

<style scoped>
.playlist-title {
  @apply flex items-center;
}

.playlist-name {
  @apply text-gray-400 text-xs ml-5;
}

.playlist-content {
  @apply ml-6
}

.playlist-item {
  @apply flex items-center my-5 relative text-sm;
}

.playlist-item .delete {
  @apply absolute;
  right: 1.2rem;
  display: none;
}

.playlist-item:hover .delete {
  display: block;
}
</style>
