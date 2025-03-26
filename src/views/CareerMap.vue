<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { ElDialog, ElSlider, ElTimeline, ElTimelineItem } from 'element-plus';
import * as echarts from 'echarts';
import { china } from 'china-map-data';

// 注册中国地图数据
echarts.registerMap('china', china);

// 定义响应式数据
const mapChart = ref(null);
const pieChart = ref(null);
const selectedYear = ref(2024);
const dialogVisible = ref(false);
const selectedProvince = ref('');
let mapInstance = null;
let pieInstance = null;

// 省份历史数据（用于时间轴）
const provinceHistory = {
  '北京': [
    { year: 2020, rate: 92.5, event: '数字经济快速发展' },
    { year: 2021, rate: 93.2, event: '高新技术企业增加' },
    { year: 2022, rate: 93.8, event: '京津冀协同发展' },
    { year: 2023, rate: 94.5, event: '国际科技创新中心建设' },
    { year: 2024, rate: 95.1, event: '数字经济标杆城市建设' }
  ],
  '上海': [
    { year: 2020, rate: 91.8, event: '自贸区扩容' },
    { year: 2021, rate: 92.4, event: '科创板发展' },
    { year: 2022, rate: 93.1, event: '长三角一体化' },
    { year: 2023, rate: 93.7, event: '国际金融中心建设' },
    { year: 2024, rate: 94.3, event: '数字化转型加速' }
  ],
  // 其他省份数据...
  '广东': [
    { year: 2020, rate: 90.2, event: '粤港澳大湾区建设' },
    { year: 2021, rate: 91.0, event: '制造业升级' },
    { year: 2022, rate: 91.8, event: '数字经济示范区' },
    { year: 2023, rate: 92.5, event: '外贸转型升级' },
    { year: 2024, rate: 93.2, event: '科技创新走廊建设' }
  ]
};

// 生成模拟数据函数
const generateMockData = (year) => {
  const baseRates = {
    '北京': 90 + year - 2020,
    '上海': 89 + year - 2020,
    '广东': 88 + year - 2020,
    '江苏': 87 + year - 2020,
    '浙江': 86 + year - 2020,
    '山东': 85 + year - 2020,
    '四川': 84 + year - 2020,
    '湖北': 83 + year - 2020,
    '河南': 82 + year - 2020,
    '河北': 81 + year - 2020
  };
  
  return china.features.reduce((acc, feature) => {
    const name = feature.properties.name;
    acc[name] = baseRates[name] || (80 + Math.random() * 10);
    return acc;
  }, {});
};

// 职业分布数据
const getOccupationData = (province) => {
  const baseData = [
    { value: 35, name: '技术开发' },
    { value: 25, name: '金融财务' },
    { value: 15, name: '教育培训' },
    { value: 10, name: '医疗卫生' },
    { value: 5, name: '行政管理' },
    { value: 4, name: '销售营销' },
    { value: 3, name: '文化创意' },
    { value: 3, name: '其他职业' }
  ];
  
  // 根据不同省份调整数据
  if (province === '北京') {
    return baseData.map(item => ({
      ...item,
      value: item.name === '技术开发' ? 45 : item.name === '行政管理' ? 10 : item.value
    }));
  } else if (province === '上海') {
    return baseData.map(item => ({
      ...item,
      value: item.name === '金融财务' ? 35 : item.value
    }));
  }
  return baseData;
};

// 初始化地图图表
const initMap = () => {
  if (!mapChart.value) return;
  
  // 销毁旧实例
  if (mapInstance) {
    mapInstance.dispose();
  }
  
  mapInstance = echarts.init(mapChart.value, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  
  const data = generateMockData(selectedYear.value);
  
  // 地图配置项
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: `${selectedYear.value}年全国就业率分布图`,
      left: 'center',
      top: 10,
      textStyle: {
        color: '#2c3e50',
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: params => {
        return `<div style="font-weight:bold">${params.name}</div>
                <div>就业率: ${params.value}%</div>
                <div>点击查看详情</div>`;
      },
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#ddd',
      borderWidth: 1,
      padding: 10,
      textStyle: {
        color: '#333'
      }
    },
    visualMap: {
      min: 70,
      max: 100,
      text: ['高', '低'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['#D6EAF8', '#2874A6']
      },
      textStyle: {
        color: '#666'
      },
      bottom: 30
    },
    series: [{
      name: '就业率',
      type: 'map',
      map: 'china',
      roam: true,
      zoom: 1.2,
      center: [105, 35],
      aspectScale: 0.75,
      layoutCenter: ['50%', '50%'],
      layoutSize: '100%',
      selectedMode: false,
      label: {
        show: true,
        fontSize: 10,
        color: '#333'
      },
      itemStyle: {
        areaColor: '#EAF2F8',
        borderColor: '#fff',
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 5,
        shadowOffsetX: 2,
        shadowOffsetY: 2
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 12,
          fontWeight: 'bold',
          color: '#2c3e50'
        },
        itemStyle: {
          areaColor: '#3498db',
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10
        }
      },
      data: Object.entries(data).map(([name, value]) => ({
        name,
        value,
        itemStyle: {
          areaColor: getColorForValue(value)
        }
      }))
    }]
  };

  mapInstance.setOption(option);
  
  // 添加地图点击事件
  mapInstance.on('click', (params) => {
    selectedProvince.value = params.name;
    dialogVisible.value = true;
    nextTick(() => {
      initPieChart();
    });
  });
};

// 根据就业率获取颜色
const getColorForValue = (value) => {
  if (value >= 95) return '#1E8449';
  if (value >= 90) return '#27AE60';
  if (value >= 85) return '#2ECC71';
  if (value >= 80) return '#58D68D';
  return '#A9DFBF';
};

// 初始化饼图
const initPieChart = () => {
  if (!pieChart.value) return;
  
  if (pieInstance) {
    pieInstance.dispose();
  }
  
  pieInstance = echarts.init(pieChart.value);
  
  const data = getOccupationData(selectedProvince.value);
  
  const option = {
    title: {
      text: `${selectedProvince.value}职业分布`,
      left: 'center',
      textStyle: {
        color: '#2c3e50',
        fontSize: 16,
        fontWeight: 'bold'
      },
      subtext: '数据来源: 国家统计局',
      subtextStyle: {
        color: '#7f8c8d',
        fontSize: 12
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#ddd',
      borderWidth: 1
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: {
        color: '#666'
      }
    },
    series: [{
      name: '职业分布',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 5,
        shadowOffsetX: 2,
        shadowOffsetY: 2
      },
      label: {
        show: false,
        position: 'center',
        formatter: '{b}\n{c}%',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#2c3e50'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18
        },
        itemStyle: {
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10
        }
      },
      labelLine: {
        show: false
      },
      data: data.map(item => ({
        ...item,
        itemStyle: {
          color: getPieColor(item.name)
        }
      })),
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }]
  };

  pieInstance.setOption(option);
};

// 获取饼图颜色
const getPieColor = (name) => {
  const colors = {
    '技术开发': '#3498db',
    '金融财务': '#2ecc71',
    '教育培训': '#f39c12',
    '医疗卫生': '#e74c3c',
    '行政管理': '#9b59b6',
    '销售营销': '#1abc9c',
    '文化创意': '#d35400',
    '其他职业': '#95a5a6'
  };
  return colors[name] || '#bdc3c7';
};

// 年份变化处理
const handleYearChange = () => {
  initMap();
};

// 窗口大小变化处理
const handleResize = () => {
  if (mapInstance) mapInstance.resize();
  if (pieInstance) pieInstance.resize();
};

// 组件挂载时初始化
onMounted(() => {
  initMap();
  window.addEventListener('resize', handleResize);
});

// 组件卸载时清理
onUnmounted(() => {
  if (mapInstance) mapInstance.dispose();
  if (pieInstance) pieInstance.dispose();
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="employment-map">
    <!-- 年份选择滑块 -->
    <div class="year-selector">
      <div class="slider-title">{{ selectedYear }}年就业数据</div>
      <el-slider
        v-model="selectedYear"
        :min="2020"
        :max="2024"
        :step="1"
        show-input
        :marks="{
          2020: '2020',
          2021: '2021',
          2022: '2022',
          2023: '2023',
          2024: '2024'
        }"
        @change="handleYearChange"
      />
    </div>
    
    <!-- 地图容器 -->
    <div ref="mapChart" class="map-container"></div>

    <!-- 省份详情弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="`${selectedProvince}就业详情`"
      width="70%"
      top="5vh"
      class="province-dialog"
    >
      <div class="dialog-content">
        <!-- 饼图容器 -->
        <div ref="pieChart" class="pie-chart"></div>
        
        <!-- 时间轴 -->
        <div class="timeline-section" v-if="provinceHistory[selectedProvince]">
          <h3>{{ selectedProvince }}就业率历史变化</h3>
          <el-timeline>
            <el-timeline-item
              v-for="item in provinceHistory[selectedProvince]"
              :key="item.year"
              :timestamp="`${item.year}年`"
              placement="top"
            >
              <el-card shadow="hover">
                <h4>就业率: {{ item.rate }}%</h4>
                <p>{{ item.event }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.employment-map {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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
    opacity: 0.1;
    z-index: 0;
  }

  .year-selector {
    width: 80%;
    max-width: 800px;
    margin: 0 auto 20px;
    padding: 15px 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 1;
    
    .slider-title {
      font-size: 16px;
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 10px;
      text-align: center;
    }
    
    :deep(.el-slider) {
      .el-slider__marks-text {
        color: #7f8c8d;
        font-size: 12px;
      }
      
      .el-slider__button {
        width: 16px;
        height: 16px;
        border: 2px solid #3498db;
      }
      
      .el-slider__runway {
        background-color: #e0e0e0;
      }
      
      .el-slider__bar {
        background-color: #3498db;
      }
    }
  }

  .map-container {
    flex: 1;
    width: 100%;
    min-height: 500px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    position: relative;
    z-index: 1;
    padding: 10px;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
    }
  }

  .pie-chart {
    height: 400px;
    width: 100%;
    margin-bottom: 20px;
  }
  
  .timeline-section {
    margin-top: 30px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    
    h3 {
      color: #2c3e50;
      margin-bottom: 20px;
      text-align: center;
      font-size: 16px;
    }
    
    :deep(.el-timeline) {
      padding-left: 10px;
      
      .el-timeline-item__timestamp {
        color: #7f8c8d;
        font-size: 14px;
      }
      
      .el-card {
        border: none;
        background-color: #f8f9fa;
        
        h4 {
          color: #3498db;
          margin-bottom: 5px;
        }
        
        p {
          color: #666;
          font-size: 14px;
        }
      }
    }
  }
}

// 弹窗样式
:deep(.province-dialog) {
  .el-dialog {
    border-radius: 12px;
    overflow: hidden;
    
    &__header {
      background: linear-gradient(90deg, #3498db, #2ecc71);
      margin-right: 0;
      
      .el-dialog__title {
        color: white;
        font-weight: bold;
      }
      
      .el-dialog__headerbtn {
        top: 15px;
        
        .el-icon {
          color: white;
        }
      }
    }
    
    &__body {
      padding: 20px;
    }
  }
}

@media (max-width: 768px) {
  .employment-map {
    padding: 10px;
    
    .year-selector {
      width: 95%;
      padding: 10px 15px;
    }
    
    .dialog-content {
      flex-direction: column;
    }
    
    :deep(.province-dialog) {
      width: 95% !important;
      
      .el-dialog__body {
        padding: 15px;
      }
    }
  }
}
</style>