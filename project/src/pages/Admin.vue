<template>
  <div class="index">
    <el-container>
      <el-aside width="200">
        <Menu />
      </el-aside>
      <el-container class="headerWithcontent">
        <Header />
        <!-- 路由主界面 -->
        <el-mian>
          <el-scrollbar>
            <router-view />
          </el-scrollbar>
        </el-mian>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from '@/components/common/HeaderAdmin.vue'
import Menu from '@/components/common/MenuAdmin.vue'
</script>

<style scoped>
.headerWithcontent {
  @apply flex-col h-screen pb-15;
}

.el-footer {
  @apply flex items-center w-full fixed bottom-0 bg-light-400;
}
</style>
