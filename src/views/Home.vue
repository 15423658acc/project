<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div class="home">
    <div class="hero">
      <h1>就业导航</h1>
      <h2>Employment Navigation</h2>
      <div class="subtitle">我们能为您做什么</div>

      <!-- 跑马灯 -->
  <div class="block text-center">
    <span class="demonstration">
      （提示）
    </span>
    <el-carousel height="150px" width="600px">
      <el-carousel-item v-for="item in {'职业规划': '如何平衡兴趣与市场需求？', '技能评估': '如何评估自己的技能是否匹配目标岗位？', '行业信息': ' 如何获取可靠的行业信息？'}" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
</div>

      <div class="features">
        <el-card v-for="(feature, index) in features" :key="index" class="feature-card">
          <template #header>
            <div class="card-header">
              <el-icon :size="24" :color="'var(--primary-color)'">
                <component :is="feature.icon"></component>
              </el-icon>
              <span>{{ feature.title }}</span>
            </div>
          </template>
          <div class="card-content">
            {{ feature.description }}
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  min-height: calc(100vh - 60px);
  
  .hero {
    text-align: center;
    padding: 4rem 2rem;
    
    h1 {
      font-size: 3rem;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }
    
    h2 {
      font-size: 2rem;
      color: var(--secondary-color);
      margin-bottom: 2rem;
    }
    
    .subtitle {
      font-size: 1.5rem;
      color: var(--text-color);
      margin-bottom: 3rem;
    }
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .feature-card {
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .card-content {
      color: #666;
    }
  }
}
// 跑马灯样式
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #826161;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item {
  background-color: #d3dce6;
}

</style>