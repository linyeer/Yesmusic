<template>
  <el-aside>
    <el-menu router :collapse="isCollapse">
      <a href="/user/index" class="logo">
        <img src="@/assets/logo1.png" alt="">
        <h1>Yesmusic</h1>
      </a>
      <!-- 当isCollapse为true时，title会被设置为空字符串，从而隐藏标题 -->
      <el-menu-item-group v-for="(item, index) in menu.slice(0, 2)" :key="index" :title="isCollapse ? '' : item.name">
        <!-- 给二级菜单项绑定index属性，用于路由跳转 -->
        <el-menu-item v-for="(subItem, subIndex) in item.children" :key="subIndex" :index="subItem.path">
          <el-icon>
            <!-- 动态绑定图标组件 -->
            <component :is="subItem.icon" />
          </el-icon>
          <!-- 当 isCollapse 为 true 时，隐藏文字 -->
          <span v-show="!isCollapse">{{ subItem.name }}</span>
        </el-menu-item>
      </el-menu-item-group>

      <!-- 创建的歌单模块 -->
      <!-- 当 isCollapse 为 true 时，隐藏整个创建的歌单模块 -->
      <div v-show="!isCollapse">
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

      <!-- 信息中心模块 -->
      <el-menu-item-group v-if="menu[2]" :title="isCollapse ? '' : menu[2].name">
        <!-- 给二级菜单项绑定index属性，用于路由跳转 -->
        <el-menu-item v-for="(subItem, subIndex) in menu[2].children" :key="subIndex" :index="subItem.path">
          <el-icon>
            <!-- 动态绑定图标组件 -->
            <component :is="subItem.icon" />
          </el-icon>
          <!-- 当 isCollapse 为 true 时，隐藏文字 -->
          <span v-show="!isCollapse">{{ subItem.name }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </el-aside>
</template>

<script setup>
import menu from "@/mock/index"
import { ref } from "vue"
import { isCollapse } from "@/utils/isCollapse"

const playlist = ref(["歌单1", "歌单2"])
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
.el-aside {
  @apply min-h-screen bg-light-400;
}

.el-menu {
  @apply bg-light-400;
  border-right: none;

  &.el-menu--collapse {

    width: 60px;

    & h1 {
      display: none;
    }
  }
}

.logo {
  @apply flex items-center justify-center h-15 text-2xl text-black no-underline;

  img {
    width: 32px;
    height: 32px;
  }
}

.el-menu-item:hover {
  @apply bg-blue-200;
}

.playlist-title {
  @apply flex items-center mt-3;
}

.playlist-name {
  @apply text-gray-400 text-xs ml-5;
}

.playlist-content {
  @apply ml-6
}

.playlist-item {
  @apply flex items-center my-7 relative text-sm;
}

.playlist-item .delete {
  @apply absolute;
  right: 1.2rem;
  display: none;
}

.playlist-item:hover .delete {
  @apply block;
}
</style>
