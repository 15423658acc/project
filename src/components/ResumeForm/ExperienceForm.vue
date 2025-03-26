<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { ResumeFormData } from '../types'

export default defineComponent({
  name: 'WorkExperienceForm',
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
     * 添加工作经验
     */
    const addExperience = () => {
      formData.value.experience.push({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      })
    }

    /**
     * 删除工作经验
     * @param index 要删除的索引
     */
    const removeExperience = (index: number) => {
      formData.value.experience.splice(index, 1)
    }

    return {
      formData,
      addExperience,
      removeExperience
    }
  }
})
</script>

<template>
  <el-collapse-item title="工作经验" name="3">
    <el-button type="primary" plain @click="addExperience" style="margin-bottom: 20px">
      添加工作经验
    </el-button>
    
    <div v-for="(exp, index) in formData.experience" :key="index" class="section-item">
      <div class="section-header">
        <h3>工作经验 #{{ index + 1 }}</h3>
        <el-button type="danger" plain @click="removeExperience(index)">删除</el-button>
      </div>
      
      <el-form-item label="公司">
        <el-input v-model="exp.company" placeholder="公司名称" />
      </el-form-item>
      
      <el-form-item label="职位">
        <el-input v-model="exp.position" placeholder="职位名称" />
      </el-form-item>
      
      <el-form-item label="起止时间">
        <el-date-picker
          v-model="exp.startDate"
          type="month"
          placeholder="开始时间"
          style="width: 45%"
        />
        <span style="margin: 0 10px">至</span>
        <el-date-picker
          v-model="exp.endDate"
          type="month"
          placeholder="结束时间"
          style="width: 45%"
        />
      </el-form-item>
      
      <el-form-item label="工作描述">
        <el-input
          v-model="exp.description"
          type="textarea"
          rows="4"
          placeholder="工作职责、成就等"
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