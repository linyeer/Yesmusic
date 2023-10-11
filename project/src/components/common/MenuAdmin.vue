<template>
  <el-aside>
    <el-menu router :collapse="isCollapse">
      <a href="/admin/index" class="logo">
        <img src="@/assets/logo2.png" alt="">
        <h1 class="text-yellow-500">Yesmusic</h1>
      </a>
      <!-- 当isCollapse为true时，title会被设置为空字符串，从而隐藏标题 -->
      <el-sub-menu v-for="(item, index) in menu" :index="`${index + 1}`" :key="item.name">
        <template #title>
          <el-icon>
            <!-- 动态绑定图标组件 -->
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <!-- 子选项 -->
        <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name" :disabled="child.disabled">
          <el-icon>
            <!-- 动态绑定图标组件 -->
            <component :is="child.icon" />
          </el-icon>
          <span>{{ child.name }}</span>
        </el-menu-item>

      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import menu from "@/mock/admin"
import { isCollapse } from "@/utils/isCollapse"
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

.el-sub-menu {
  @apply max-w-full;
  overflow-x: hidden
}

.el-menu-item:hover {
  @apply bg-blue-200;
}
</style>
