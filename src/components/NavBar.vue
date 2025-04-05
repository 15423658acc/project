<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const activeIndex = ref('1') // 默认显示首页

    // 路由变化时自动更新activeIndex
    watch(() => route.path, (newPath) => {
      switch(newPath) {
        case '/':
          activeIndex.value = '1'
          break
        case '/career-map':
          activeIndex.value = '2'
          break
        case '/salary':
          activeIndex.value = '3'
          break
        case '/resume':
          activeIndex.value = '4'
          break
        case '/contact':
          activeIndex.value = '5'
          break
      }
    })

    const handleSelect = (key: string) => {
      const pathMap: Record<string, string> = {
        'logo': '/',
        '1': '/',
        '2': '/career-map',
        '3': '/salary',
        '4': '/resume',
        '5': '/contact'
      }
      router.push(pathMap[key])
    }

    return {
      activeIndex,
      handleSelect
    }
  }
})
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
  <el-menu-item index="logo" class="logo-item">
      <h2 style="color: var(--primary-color)" to="/">Employment Navigation</h2>
    </el-menu-item>
    <div style="margin-left: 688px;"></div>
    <el-menu-item index="1" class="nav-link" active-class="active" exact-active-class="exact-active">
      <router-link to="/">首页</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/career-map">职业地图</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/salary">薪资一览</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link to="/resume">简历生成</router-link>
    </el-menu-item>
    <el-menu-item index="5">
      <router-link to="/contact">联系我们</router-link>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu {
  display: flex;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
router-link {
  background: rgba(106, 70, 219, 0.1);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(106, 70, 219, 0.1);
}
.router-link-active {
  color: #6a4daf !important;
  font-weight: 500;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #6a4daf;
    transition: all 0.3s ease;
  }
}

/* 精确匹配时的激活状态 */
.exact-active {
  font-weight: 600;
}

/* 移除Element Plus默认下划线 */
.el-menu-item a {
  text-decoration: none !important;
}

/* 悬停效果 */
.nav-link:hover {
  background: rgba(106, 70, 219, 0.05);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(106, 70, 219, 0.1);
}
</style>