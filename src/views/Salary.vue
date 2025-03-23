<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { Type } from 'typescript'

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

// 职业小类数据
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

const selectedProvince = ref('全国')
const selectedOccupation = ref('全部')

// 模拟数据生成
const getRandomSalary = (base: number, variance: number) => {
  return Math.floor(base + Math.random() * variance)
}

const getOccupationData = (occupation: string) => {
  if (occupation === '全部') {
    return occupations.slice(1).map(occ => ({
      name: occ,
      value: getRandomSalary(8000, 12000)
    }))
  } else {
    return occupationSubcategories[occupation as keyof typeof occupationSubcategories].map(sub => ({
      name: sub,
      value: getRandomSalary(
        occupation === '企业管理人员' ? 15000 : 8000,
        occupation === '企业管理人员' ? 20000 : 10000
      )
    }))
  }
}

const initChart = () => {
  const chartDom = document.getElementById('salaryChart')
  if (!chartDom) return
  
  const myChart = echarts.init(chartDom)
  
  const data = getOccupationData(selectedOccupation.value)
  
  const option = {
  title: {
    text: `${selectedProvince.value}薪资统计`,
    subtext: selectedOccupation.value === '全部' ? 
      '所有职业大类平均薪资' : 
      `${selectedOccupation.value}热门职业平均薪资`,
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: '{b}: {c}元'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: data.map(item => item.name),
    axisLabel: {
      interval: 0,
      rotate: 30
    }
  },
  yAxis: {
    type: 'value',
    name: '月薪（元）'
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
          ])
        }
      })),
      barWidth: '60%',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
}


  myChart.setOption(option)
  
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

watch([selectedProvince, selectedOccupation], () => {
  initChart()
})

onMounted(() => {
  initChart()
})
</script>

<template>
  <div class="container">
    <h1 class="title">薪资一览</h1>
    <div class="controls">
      <el-select v-model="selectedProvince" placeholder="选择地区" class="select-item">
        <el-option
          v-for="province in provinces"
          :key="province"
          :label="province"
          :value="province"
        />
      </el-select>
      <el-select v-model="selectedOccupation" placeholder="选择职业" class="select-item">
        <el-option
          v-for="occupation in occupations"
          :key="occupation"
          :label="occupation"
          :value="occupation"
        />
      </el-select>
    </div>
    <div id="salaryChart" style="width: 100%; height: 600px;"></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 2rem;
  
  .title {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 2rem;
  }
  
  .controls {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    
    .select-item {
      width: 200px;
    }
  }
}
</style>