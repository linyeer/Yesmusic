<template>
  <div class="index">
    <el-container>
      <el-aside width="200">
        <Menu />
      </el-aside>
      <!-- 下方的contaier起类名时不要再包含container字段 -->
      <el-container class="headerWithcontent">
        <Header />
        <!-- 路由主界面 -->
        <el-mian>
          <el-scrollbar>
            <router-view />
          </el-scrollbar>
        </el-mian>
        <!-- 播放控件 -->
        <el-footer>
          <Player />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from '@/components/common/Header.vue'
import Menu from '@/components/common/Menu.vue'
import Player from '@/components/common/Player.vue'
</script>

<style scoped>
.headerWithcontent {
  @apply flex-col h-screen pb-15;
}

.el-footer {
  @apply flex items-center justify-between fixed bottom-0 bg-light-400 z-10;
  width: 90.5%
}
</style>
