<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'

// 职业大类选项
const occupations = [
  '全部',
  '专业技术人员',
  '国家机关工作人员',
  '企业管理人员',
  '商业服务业人员',
  '农林牧渔人员',
  '生产运输人员',
  '军人',
  '其他人员'
]

// 职业小类数据映射
const occupationSubcategories = {
  '专业技术人员': ['软件工程师', '医生', '教师', '会计师', '建筑师'],
  '国家机关工作人员': ['行政办公人员', '政策研究员', '公务员', '事业单位职员', '机关工作人员'],
  '企业管理人员': ['总经理', '人力资源经理', '财务总监', '运营总监', '项目经理'],
  '商业服务业人员': ['销售代表', '客户服务', '理财顾问', '房地产经纪人', '保险代理'],
  '农林牧渔人员': ['农艺师', '畜牧师', '园艺师', '渔业技术员', '林业工程师'],
  '生产运输人员': ['机械操作工', '电工', '焊工', '司机', '物流专员'],
  '军人': ['军官', '士官', '特种兵', '军事技术人员', '军事指挥'],
  '其他人员': ['自由职业者', '创业者', '艺术工作者', '体育工作者', '其他']
}

// 省份选项
const provinces = [
  '全国',
  '北京',
  '上海',
  '广东',
  '江苏',
  '浙江',
  '山东',
  '四川',
  '湖北',
  '河南',
  '河北'
]

// 响应式数据
const selectedProvince = ref('全国')
const selectedOccupation = ref('全部')
let myChart: echarts.ECharts | null = null

// 生成随机薪资数据（带缓存）
const salaryCache = new Map()
const getRandomSalary = (base: number, variance: number, key: string) => {
  if (!salaryCache.has(key)) {
    salaryCache.set(key, Math.floor(base + Math.random() * variance))
  }
  return salaryCache.get(key)
}

// 获取职业薪资数据
const getOccupationData = (occupation: string) => {
  if (occupation === '全部') {
    return occupations.slice(1).map(occ => ({
      name: occ,
      value: getRandomSalary(8000, 12000, `${selectedProvince.value}-${occ}`)
    }))
  } else {
    return occupationSubcategories[occupation as keyof typeof occupationSubcategories].map(sub => ({
      name: sub,
      value: getRandomSalary(
        occupation === '企业管理人员' ? 15000 : 8000,
        occupation === '企业管理人员' ? 20000 : 10000,
        `${selectedProvince.value}-${occupation}-${sub}`
      )
    }))
  }
}

// 初始化图表
const initChart = () => {
  const chartDom = document.getElementById('salaryChart')
  if (!chartDom) return
  
  // 销毁旧图表实例
  if (myChart) {
    myChart.dispose()
  }
  
  // 初始化ECharts实例
  myChart = echarts.init(chartDom)
  
  // 获取当前选择的职业数据
  const data = getOccupationData(selectedOccupation.value)
  
  // 图表配置项
  const option = {
    title: {
      text: `${selectedProvince.value}薪资统计`,
      subtext: selectedOccupation.value === '全部' ? 
        '所有职业大类平均薪资' : 
        `${selectedOccupation.value}热门职业平均薪资`,
      left: 'center',
      textStyle: {
        color: '#2c3e50',
        fontSize: 18,
        fontWeight: 'bold'
      },
      subtextStyle: {
        color: '#7f8c8d',
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}: {c}元',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#ddd',
      borderWidth: 1,
      textStyle: {
        color: '#333'
      },
      padding: [8, 12]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLabel: {
        interval: 0,
        rotate: 30,
        color: '#666',
        fontSize: 12
      },
      axisLine: {
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      name: '月薪（元）',
      nameTextStyle: {
        color: '#666',
        padding: [0, 0, 0, 40]
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      axisTick: {
        show: true
      },
      splitLine: {
        lineStyle: {
          color: '#f5f5f5'
        }
      }
    },
    series: [
      {
        type: 'bar',
        data: data.map(item => ({
          value: item.value,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#6366f1' },
              { offset: 1, color: '#818cf8' }
            ]),
            borderRadius: [4, 4, 0, 0],
            shadowColor: 'rgba(99, 102, 241, 0.3)',
            shadowBlur: 6,
            shadowOffsetY: 3
          },
          emphasis: {
            itemStyle: {
              shadowColor: 'rgba(99, 102, 241, 0.5)',
              shadowBlur: 10
            }
          }
        })),
        barWidth: '60%',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)',
          borderRadius: 4
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}元',
          color: '#6366f1',
          fontSize: 12
        }
      }
    ],
    animationDuration: 1000,
    animationEasing: 'cubicOut'
  }

  // 应用图表配置
  myChart.setOption(option)
}

// 处理窗口大小变化
const handleResize = () => {
  if (myChart) {
    myChart.resize()
  }
}

// 监听省份和职业选择变化
watch([selectedProvince, selectedOccupation], () => {
  initChart()
})

// 组件挂载时初始化图表
onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

// 组件卸载时清理
onUnmounted(() => {
  if (myChart) {
    myChart.dispose()
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="container">
    <!-- 页面标题 -->
    <h1 class="title">薪资数据可视化</h1>
    
    <!-- 筛选控制区 -->
    <div class="controls">
      <!-- 省份选择器 -->
      <el-select 
        v-model="selectedProvince" 
        placeholder="选择地区" 
        class="select-item"
        popper-class="select-popper"
      >
        <el-option
          v-for="province in provinces"
          :key="province"
          :label="province"
          :value="province"
        />
      </el-select>
      
      <!-- 职业选择器 -->
      <el-select 
        v-model="selectedOccupation" 
        placeholder="选择职业" 
        class="select-item"
        popper-class="select-popper"
      >
        <el-option
          v-for="occupation in occupations"
          :key="occupation"
          :label="occupation"
          :value="occupation"
        />
      </el-select>
    </div>
    
    <!-- 图表容器 -->
    <div id="salaryChart" class="chart-container"></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4f0fb 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><path d="M30 10L10 30M90 10L70 30M90 70L70 90M10 70L30 90" stroke="%23e0e0e0" stroke-width="0.5" stroke-linecap="round"/></svg>');
    opacity: 0.15;
    z-index: 0;
  }
  
  .title {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 2rem;
    font-size: 2.2rem;
    font-weight: 600;
    position: relative;
    z-index: 1;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    
    &::after {
      content: "";
      display: block;
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #6366f1, #818cf8);
      margin: 0.5rem auto 0;
      border-radius: 2px;
    }
  }
  
  .controls {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
    
    .select-item {
      width: 240px;
      
      &:deep(.el-input__wrapper) {
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
        border-radius: 8px;
        background: white;
        
        &:hover {
          box-shadow: 0 2px 12px rgba(99, 102, 241, 0.2);
        }
      }
      
      &:deep(.el-input__inner) {
        color: #4b5563;
      }
    }
  }
  
  .chart-container {
    width: 100%;
    height: 600px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    padding: 16px;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
    }
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
    
    .title {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
    }
    
    .controls {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      
      .select-item {
        width: 100%;
        max-width: 300px;
      }
    }
    
    .chart-container {
      height: 500px;
    }
  }
}
.select-popper {
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  border: none !important;
  
  .el-select-dropdown__item {
    padding: 0 20px !important;
    height: 40px !important;
    line-height: 40px !important;
    border-radius: 4px !important;
    margin: 4px;
    
    &:hover {
      background-color: #f3f4f6 !important;
    }
    
    &.selected {
      color: #6366f1 !important;
      font-weight: 500;
      background-color: #f0f1ff !important;
    }
  }
  
  .el-select-dropdown__empty {
    padding: 12px 0 !important;
    color: #9ca3af !important;
  }
}
</style>