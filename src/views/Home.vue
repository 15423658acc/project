<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Opportunity, Star, TrendCharts, Document, ArrowDown } from '@element-plus/icons-vue'

// 定义功能卡片数据
const features = ref([
  {
    title: '职业规划',
    description: '为您提供个性化的职业发展路径建议，基于AI算法分析您的背景和市场需求',
    icon: Opportunity,
    color: '#59cde9'
  },
  {
    title: '技能评估',
    description: '全面评估您的技能与目标岗位的匹配度，提供提升建议',
    icon: Star,
    color: '#0a2a88'
  },
  {
    title: '行业分析',
    description: '获取最新行业趋势和就业市场数据，帮助您把握机会',
    icon: TrendCharts,
    color: '#2774ae'
  },
  {
    title: '简历优化',
    description: '专业指导帮助您打造完美简历，通过率提升80%',
    icon: Document,
    color: '#002e5d'
  }
])

// 动态气泡控制
const bubblesCount = ref(15)
const isReducedMotion = ref(false)

// 检测用户是否偏好减少动画
const checkReducedMotion = () => {
  isReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

onMounted(() => {
  checkReducedMotion()
  window.addEventListener('resize', adjustBubblesCount)
})

onUnmounted(() => {
  window.removeEventListener('resize', adjustBubblesCount)
})

// 根据屏幕尺寸调整气泡数量
const adjustBubblesCount = () => {
  bubblesCount.value = window.innerWidth < 768 ? 8 : 15
}
</script>

<template>
  <div class="home">
    <!-- 动态背景元素 - 只在非减少动画模式下显示 -->
    <div class="dynamic-bg" v-if="!isReducedMotion">
      <div class="bubbles">
        <span 
          v-for="i in bubblesCount" 
          :key="i" 
          :style="{
            '--size': `${Math.random() * 4 + 1}rem`,
            '--distance': `${Math.random() * 20 + 60}vw`,
            '--position': `${Math.random() * 100}%`,
            '--time': `${Math.random() * 8 + 8}s`,
            '--delay': `${Math.random() * 5}s`,
            '--opacity': `${Math.random() * 0.4 + 0.2}`
          }"
        ></span>
      </div>
    </div>
    
    <!-- 首页主视觉区域 -->
    <main class="hero">
      <article>
        <h1>就业导航</h1>
        <h2>Employment Navigation</h2>
        <p class="tagline">智能职业发展平台 · 助力您的职业梦想</p>
      </article>
      
      <div class="subtitle">
        <span>我们能为您做什么</span>
        <el-icon class="arrow-icon"><ArrowDown /></el-icon>
      </div>

      <!-- 功能卡片区域 - 2×2排列 -->
      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index" 
          class="feature-card"
          :style="{ '--card-color': feature.color }"
        >
          <div class="card-header">
            <el-icon :size="28">
              <component :is="feature.icon" />
            </el-icon>
            <h3>{{ feature.title }}</h3>
          </div>
          <div class="card-content">
            <p>{{ feature.description }}</p>
            <el-button type="primary" plain round class="action-btn">了解更多</el-button>
          </div>
        </div>
      </div>
      
      <!-- 新增统计展示区域 -->
      <div class="stats">
        <div class="stat-item">
          <div class="stat-number">10,000+</div>
          <div class="stat-label">成功案例</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">98%</div>
          <div class="stat-label">用户满意度</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">50+</div>
          <div class="stat-label">合作企业</div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
/* 变量定义 */
:root {
  --primary-color: #0a2a88;
  --secondary-color: #59cde9;
  --text-color: #2c3e50;
  --light-text: #6c7a89;
  --bg-color: #f5f7fa; /* 更柔和的背景色 */
  --card-bg: rgba(255, 255, 255, 0.98);
  --border-radius: 16px; /* 更大的圆角 */
  --box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  --feature-grid-gap: 24px;
}

/* 基础样式 */
.home {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: 'Geist', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* 动态背景 */
.dynamic-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  
  .bubbles {
    position: absolute;
    width: 100%;
    height: 100%;
    
    span {
      position: absolute;
      bottom: -10%;
      left: var(--position);
      width: var(--size);
      height: var(--size);
      background: linear-gradient(135deg, var(--secondary-color), rgba(89, 205, 233, 0.3));
      border-radius: 50%;
      opacity: var(--opacity);
      animation: float-up var(--time) var(--delay) infinite linear;
      
      @media (prefers-reduced-motion) {
        animation: none;
        display: none;
      }
    }
  }
}

@keyframes float-up {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: var(--opacity);
  }
  50% {
    transform: translateX(calc(var(--distance) - 50vw)) scale(1.1);
    opacity: calc(var(--opacity) + 0.1);
  }
  100% {
    transform: translateY(-110vh) translateX(calc(var(--distance) - 50vw)) scale(0.8);
    opacity: 0;
  }
}

/* 主视觉区域 */
.hero {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 5rem 2rem 8rem;
  max-width: 1200px;
  margin: 0 auto;
  
  article {
    margin-bottom: 3rem;
    
    h1 {
      font-size: clamp(2.5rem, 5vw, 3.5rem);
      font-weight: 800;
      margin-bottom: 0.5rem;
      background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      line-height: 1.2;
      letter-spacing: -0.5px;
    }
    
    h2 {
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: 600;
      color: var(--light-text);
      margin-bottom: 1rem;
      letter-spacing: 1px;
    }
    
    .tagline {
      font-size: 1.1rem;
      color: var(--light-text);
      max-width: 600px;
      margin: 0 auto;
      opacity: 0.9;
    }
  }
  
  .subtitle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    color: var(--primary-color);
    margin-bottom: 3rem;
    font-weight: 500;
    
    .arrow-icon {
      animation: bounce 2s infinite;
    }
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* 功能卡片 - 2×2网格布局 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 固定2列 */
  gap: var(--feature-grid-gap);
  max-width: 1000px; /* 更紧凑的宽度 */
  margin: 0 auto 4rem;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 移动端单列 */
    padding: 0 1rem;
    gap: 20px;
  }
}

.feature-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  transition: all 0.3s ease;
  border-top: 4px solid var(--card-color);
  text-align: left;
  position: relative;
  overflow: hidden;
  height: 100%; /* 统一高度 */
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    
    &::after {
      opacity: 0.1;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--card-color);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
    
    .el-icon {
      color: var(--card-color);
      background: rgba(89, 205, 233, 0.1);
      padding: 0.5rem;
      border-radius: 50%;
      flex-shrink: 0;
    }
    
    h3 {
      font-size: 1.3rem;
      font-weight: 600;
      margin: 0;
      color: var(--text-color);
    }
  }
  
  .card-content {
    position: relative;
    z-index: 1;
    
    p {
      color: var(--light-text);
      line-height: 1.6;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
    }
    
    .action-btn {
      border-color: var(--card-color);
      color: var(--card-color);
      padding: 8px 16px;
      font-size: 0.9rem;
      
      &:hover {
        background: rgba(89, 205, 233, 0.1);
      }
    }
  }
}

/* 统计区域 */
.stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 4rem;
  flex-wrap: wrap;
  
  .stat-item {
    text-align: center;
    min-width: 120px;
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
      background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    
    .stat-label {
      font-size: 1rem;
      color: var(--light-text);
    }
  }
  
  @media (max-width: 768px) {
    gap: 2rem;
    
    .stat-item {
      min-width: 100px;
      
      .stat-number {
        font-size: 2rem;
      }
    }
  }
}
</style>