<template>
  <div class="flex items-center justify-center h-screen">
    <el-result icon="warning" title="404提示" sub-title="压根没有这个页面">
      <template #extra>
        <el-button type="primary" @click="goBack">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped></style>
