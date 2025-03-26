<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { ResumeFormData } from '../types'

export default defineComponent({
  name: 'EducationForm',
  props: {
    modelValue: {
      type: Object as () => ResumeFormData,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    /**
     * 添加教育经历
     */
    const addEducation = () => {
      formData.value.education.push({
        school: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
      })
    }

    /**
     * 删除教育经历
     * @param index 要删除的索引
     */
    const removeEducation = (index: number) => {
      formData.value.education.splice(index, 1)
    }

    return {
      formData,
      addEducation,
      removeEducation
    }
  }
})
</script>

<template>
  <el-collapse-item title="教育经历" name="2">
    <el-button type="primary" plain @click="addEducation" style="margin-bottom: 20px">
      添加教育经历
    </el-button>
    
    <div v-for="(edu, index) in formData.education" :key="index" class="section-item">
      <div class="section-header">
        <h3>教育经历 #{{ index + 1 }}</h3>
        <el-button type="danger" plain @click="removeEducation(index)">删除</el-button>
      </div>
      
      <el-form-item label="学校">
        <el-input v-model="edu.school" placeholder="学校名称" />
      </el-form-item>
      
      <el-form-item label="学位">
        <el-input v-model="edu.degree" placeholder="学位" />
      </el-form-item>
      
      <el-form-item label="专业">
        <el-input v-model="edu.major" placeholder="专业" />
      </el-form-item>
      
      <el-form-item label="起止时间">
        <el-date-picker
          v-model="edu.startDate"
          type="month"
          placeholder="开始时间"
          style="width: 45%"
        />
        <span style="margin: 0 10px">至</span>
        <el-date-picker
          v-model="edu.endDate"
          type="month"
          placeholder="结束时间"
          style="width: 45%"
        />
      </el-form-item>
      
      <el-form-item label="描述">
        <el-input
          v-model="edu.description"
          type="textarea"
          rows="3"
          placeholder="在校经历、成绩等"
        />
      </el-form-item>
    </div>
  </el-collapse-item>
</template>

<style scoped lang="scss">
.section-item {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      margin: 0;
      color: var(--el-color-primary);
    }
  }
}
</style>