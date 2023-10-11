<!-- setup语法糖和组合式api -->

<template>
  <div>
    <el-button @click="add">{{ count }}</el-button>
    <el-button type="warning" @click="add2">{{ form.count }}</el-button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

let count = ref(0)

function add() {
  count.value++
  console.log(count.value)
}

let form = reactive({
  count: 1
})

function add2(params) {
  form.count++
  console.log(form);
}
</script>

<style scoped></style>