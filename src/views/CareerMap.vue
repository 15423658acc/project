<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { ElDialog, ElSlider, ElTimeline, ElTimelineItem } from 'element-plus';
import * as echarts from 'echarts';
import { china } from 'china-map-data';
import { debounce } from 'lodash-es';

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

// 新增：数据缓存
const dataCache = new Map();

// 省份历史数据（用于时间轴）
const provinceHistory = {
  // 直辖市
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
  '天津': [
    { year: 2020, rate: 88.6, event: '北方国际航运枢纽' },
    { year: 2021, rate: 89.3, event: '国家会展中心运营' },
    { year: 2022, rate: 90.0, event: '智能制造高质量发展' },
    { year: 2023, rate: 90.7, event: '京津冀人才一体化' },
    { year: 2024, rate: 91.4, event: '绿色低碳循环经济' }
  ],
  '重庆': [
    { year: 2020, rate: 86.2, event: '内陆国际物流枢纽' },
    { year: 2021, rate: 87.1, event: '智造重镇建设' },
    { year: 2022, rate: 88.0, event: '西部陆海新通道' },
    { year: 2023, rate: 89.0, event: '数字经济创新发展' },
    { year: 2024, rate: 90.0, event: '长江文化艺术湾区' }
  ],

  // 东部沿海
  '广东': [
    { year: 2020, rate: 90.2, event: '粤港澳大湾区建设' },
    { year: 2021, rate: 91.0, event: '制造业升级' },
    { year: 2022, rate: 91.8, event: '数字经济示范区' },
    { year: 2023, rate: 92.5, event: '外贸转型升级' },
    { year: 2024, rate: 93.2, event: '科技创新走廊建设' }
  ],
  '江苏': [
    { year: 2020, rate: 90.5, event: '长三角一体化推进' },
    { year: 2021, rate: 91.2, event: '先进制造业集群建设' },
    { year: 2022, rate: 91.9, event: '沿海经济带升级' },
    { year: 2023, rate: 92.6, event: '苏南自主创新示范区' },
    { year: 2024, rate: 93.3, event: '数字经济发展先行区' }
  ],
  '浙江': [
    { year: 2020, rate: 89.8, event: '数字经济一号工程' },
    { year: 2021, rate: 90.6, event: '跨境电商综合试验区' },
    { year: 2022, rate: 91.4, event: '共同富裕示范区' },
    { year: 2023, rate: 92.1, event: '大湾区智慧化建设' },
    { year: 2024, rate: 92.9, event: '民营经济高质量发展' }
  ],
'山东': [
  { year: 2020, rate: 89.1, event: '新旧动能转换' },
  { year: 2021, rate: 89.9, event: '海洋强省建设' },
  { year: 2022, rate: 90.7, event: '工业互联网示范区' },
  { year: 2023, rate: 91.5, event: '绿色低碳发展' },
  { year: 2024, rate: 92.3, event: '乡村振兴齐鲁样板' }
],
  '福建': [
    { year: 2020, rate: 88.4, event: '数字中国峰会' },
    { year: 2021, rate: 89.2, event: '海丝核心区建设' },
    { year: 2022, rate: 90.0, event: '金砖创新基地' },
    { year: 2023, rate: 90.8, event: '闽台融合示范区' },
    { year: 2024, rate: 91.6, event: '新能源产业创新' }
  ],
  '天津': [
    { year: 2020, rate: 88.6, event: '北方国际航运枢纽' },
    { year: 2021, rate: 89.3, event: '国家会展中心运营' },
    { year: 2022, rate: 90.0, event: '智能制造高质量发展' },
    { year: 2023, rate: 90.7, event: '京津冀人才一体化' },
    { year: 2024, rate: 91.4, event: '绿色低碳循环经济' }
  ],
  // 中部地区
  '河南': [
    { year: 2020, rate: 86.3, event: '粮食生产核心区' },
    { year: 2021, rate: 87.2, event: '空中丝绸之路建设' },
    { year: 2022, rate: 88.1, event: '国家大数据试验区' },
    { year: 2023, rate: 89.0, event: '先进制造业集群' },
    { year: 2024, rate: 90.0, event: '黄河文化生态带' }
  ],
  '湖北': [
    { year: 2020, rate: 86.8, event: '光谷科技创新大走廊' },
    { year: 2021, rate: 87.7, event: '疫后经济重振计划' },
    { year: 2022, rate: 88.6, event: '长江中游城市群协同' },
    { year: 2023, rate: 89.5, event: '新型显示产业基地' },
    { year: 2024, rate: 90.4, event: '中部物流枢纽建设' }
  ],
  '湖南': [
    { year: 2020, rate: 85.7, event: '长江中游城市群' },
    { year: 2021, rate: 86.6, event: '工程机械产业升级' },
    { year: 2022, rate: 87.5, event: '岳麓山大学科技城' },
    { year: 2023, rate: 88.4, event: '数字文创产业基地' },
    { year: 2024, rate: 89.3, event: '湘赣边区域合作' }
  ],
  '安徽': [
    { year: 2020, rate: 86.0, event: '长三角一体化发展' },
    { year: 2021, rate: 86.9, event: '量子科技创新中心' },
    { year: 2022, rate: 87.8, event: '新能源汽车之都' },
    { year: 2023, rate: 88.7, event: '皖江城市带升级' },
    { year: 2024, rate: 89.6, event: '数字江淮建设' }
  ],
  '江西': [
    { year: 2020, rate: 84.9, event: '内陆开放型试验区' },
    { year: 2021, rate: 85.8, event: 'VR产业创新发展' },
    { year: 2022, rate: 86.7, event: '赣南苏区振兴' },
    { year: 2023, rate: 87.6, event: '长江中游航运中心' },
    { year: 2024, rate: 88.5, event: '生态产品价值实现' }
  ],
  
  // 西部地区
  '四川': [
    { year: 2020, rate: 85.2, event: '成渝双城经济圈启动' },
    { year: 2021, rate: 86.0, event: '西部科学城建设' },
    { year: 2022, rate: 87.1, event: '国家数字经济试验区' },
    { year: 2023, rate: 88.3, event: '清洁能源基地建设' },
    { year: 2024, rate: 89.5, event: '长江上游生态屏障' }
  ],

  '陕西': [
    { year: 2020, rate: 84.3, event: '一带一路核心区建设' },
    { year: 2021, rate: 85.2, event: '秦创原创新驱动平台' },
    { year: 2022, rate: 86.1, event: '半导体产业集聚发展' },
    { year: 2023, rate: 87.0, event: '能源数字化转型' },
    { year: 2024, rate: 88.0, event: '黄河流域生态保护' }
  ],
  '广西': [
    { year: 2020, rate: 83.2, event: '西部陆海新通道' },
    { year: 2021, rate: 84.1, event: '中国-东盟博览会' },
    { year: 2022, rate: 85.0, event: '跨境金融创新' },
    { year: 2023, rate: 86.0, event: '平陆运河建设' },
    { year: 2024, rate: 87.0, event: '边境经济合作区' }
  ],
  '云南': [
    { year: 2020, rate: 81.5, event: '辐射中心建设' },
    { year: 2021, rate: 82.5, event: '大滇西旅游环线' },
    { year: 2022, rate: 83.6, event: '绿色能源基地' },
    { year: 2023, rate: 84.7, event: '跨境电子商务' },
    { year: 2024, rate: 85.8, event: '生物多样性保护' }
  ],
  '贵州': [
    { year: 2020, rate: 82.4, event: '大数据综合试验区' },
    { year: 2021, rate: 83.3, event: '中国天眼科技' },
    { year: 2022, rate: 84.3, event: '数字经济发展' },
    { year: 2023, rate: 85.3, event: '生态文明论坛' },
    { year: 2024, rate: 86.3, event: '新能源材料基地' }
  ],
  '内蒙古': [
    { year: 2020, rate: 80.1, event: '能源基地转型' },
    { year: 2021, rate: 81.2, event: '绿色农畜产业' },
    { year: 2022, rate: 82.4, event: '稀土产业升级' },
    { year: 2023, rate: 83.6, event: '中蒙俄经济走廊' },
    { year: 2024, rate: 84.8, event: '草原碳汇经济' }
  ],
  '新疆': [
    { year: 2020, rate: 78.5, event: '丝绸之路经济带核心区' },
    { year: 2021, rate: 79.8, event: '能源资源绿色开发' },
    { year: 2022, rate: 81.2, event: '跨境贸易便利化改革' },
    { year: 2023, rate: 82.6, event: '现代农业示范基地' },
    { year: 2024, rate: 84.0, event: '风光水储一体化' }
  ],
  '宁夏': [
    { year: 2020, rate: 78.8, event: '黄河流域生态保护' },
    { year: 2021, rate: 79.9, event: '葡萄酒产业带' },
    { year: 2022, rate: 81.0, event: '东数西算枢纽' },
    { year: 2023, rate: 82.2, event: '新能源综合示范' },
    { year: 2024, rate: 83.4, event: '内陆开放型经济' }
  ],
  '青海': [
    { year: 2020, rate: 76.2, event: '国家公园示范省' },
    { year: 2021, rate: 77.4, event: '清洁能源示范省' },
    { year: 2022, rate: 78.7, event: '盐湖产业基地' },
    { year: 2023, rate: 80.0, event: '生态旅游发展' },
    { year: 2024, rate: 81.3, event: '碳达峰先行区' }
  ],
  '西藏': [
    { year: 2020, rate: 75.0, event: '边境小康村建设' },
    { year: 2021, rate: 76.5, event: '高原特色产业' },
    { year: 2022, rate: 78.0, event: '国家生态文明高地' },
    { year: 2023, rate: 79.6, event: '国际旅游文化' },
    { year: 2024, rate: 81.2, event: '清洁能源基地' }
  ],
  '甘肃': [
    { year: 2020, rate: 79.3, event: '丝绸之路经济带' },
    { year: 2021, rate: 80.4, event: '新能源装备制造' },
    { year: 2022, rate: 81.6, event: '数字敦煌建设' },
    { year: 2023, rate: 82.8, event: '乡村振兴示范' },
    { year: 2024, rate: 84.0, event: '黄河文化传承' }
  ],
  
  // 东北地区
  '辽宁': [
    { year: 2020, rate: 84.0, event: '老工业基地振兴' },
    { year: 2021, rate: 84.8, event: '智能制造示范区' },
    { year: 2022, rate: 85.6, event: '沿海经济带开发' },
    { year: 2023, rate: 86.5, event: '数字辽宁建设' },
    { year: 2024, rate: 87.4, event: '东北亚开放枢纽' }
  ],
  '吉林': [
    { year: 2020, rate: 82.7, event: '冰雪经济试验区' },
    { year: 2021, rate: 83.6, event: '汽车产业电动化' },
    { year: 2022, rate: 84.6, event: '卫星产业发展' },
    { year: 2023, rate: 85.6, event: '黑土地保护工程' },
    { year: 2024, rate: 86.6, event: '沿边开放带建设' }
  ],
  '黑龙江': [
    { year: 2020, rate: 81.5, event: '现代农业产业园' },
    { year: 2021, rate: 82.4, event: '对俄合作升级' },
    { year: 2022, rate: 83.4, event: '数字冰雪经济' },
    { year: 2023, rate: 84.4, event: '生物经济规划' },
    { year: 2024, rate: 85.4, event: '东北虎豹公园' }
  ],
  
  // 特别行政区
  '香港': [
    { year: 2020, rate: 89.5, event: '国际金融中心' },
    { year: 2021, rate: 89.8, event: '国安法实施' },
    { year: 2022, rate: 90.2, event: '北部都会区规划' },
    { year: 2023, rate: 90.6, event: '科技创新走廊' },
    { year: 2024, rate: 91.0, event: '粤港澳大湾区融合' }
  ],
  '澳门': [
    { year: 2020, rate: 87.3, event: '世界旅游休闲中心' },
    { year: 2021, rate: 87.8, event: '横琴深度合作' },
    { year: 2022, rate: 88.3, event: '现代金融发展' },
    { year: 2023, rate: 88.8, event: '中葡平台升级' },
    { year: 2024, rate: 89.3, event: '多元产业转型' }
  ],
  '海南': [
    { year: 2020, rate: 82.1, event: '自由贸易港建设启动' },
    { year: 2021, rate: 83.5, event: '国际旅游消费中心' },
    { year: 2022, rate: 84.9, event: '零关税政策实施' },
    { year: 2023, rate: 86.3, event: '航天科技创新基地' },
    { year: 2024, rate: 87.7, event: '热带特色高效农业' }
  ],
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
      text: `查看 ${selectedProvince.value} 应届生在八大职业中的就业率分布`,
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
/* 增加性能优化相关样式 */
.map-container {
  will-change: transform; /* 启用GPU加速 */
  contain: strict; /* 限制渲染边界 */
}
.loading-tip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
/* 优化过渡效果 */
.el-dialog {
  transition: opacity 0.3s;
}

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
      background: linear-gradient(90deg,#a8c0ff,#6190e8,);
      margin-right: 0;
      
      .el-dialog__title {
        color: black;
        font-weight: bold;
        margin-top: 20px;
      }
      
      .el-dialog__headerbtn {
        top: 15px;
        
        .el-icon {
          color: black;
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