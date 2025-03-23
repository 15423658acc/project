<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeIndex = ref('1')

const handleSelect = (key: string) => {
  switch (key) {
    case '1':
      router.push('/')
      break
    case '2':
      router.push('/career-map')
      break
    case '3':
      router.push('/salary')
      break
    case '4':
      router.push('/resume')
      break
    case '5':
      router.push('/contact')
      break
  }
}
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#fff"
    text-color="#333"
    active-text-color="var(--primary-color)"
  >
    <el-menu-item index="logo" @click="router.push('/')">
      <h2 style="color: var(--primary-color)">Employment Navigation</h2>
    </el-menu-item>
    <div style="flex-grow: 1"></div>
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">职业地图</el-menu-item>
    <el-menu-item index="3">薪资一览</el-menu-item>
    <el-menu-item index="4">简历生成</el-menu-item>
    <el-menu-item index="5">联系我们</el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu {
  display: flex;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>