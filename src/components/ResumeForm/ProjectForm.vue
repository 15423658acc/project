<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { ResumeFormData } from '../types'

export default defineComponent({
  name: 'ProjectExperienceForm',
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
     * 添加项目经验
     */
    const addProject = () => {
      formData.value.projects.push({
        name: '',
        role: '',
        startDate: '',
        endDate: '',
        description: '',
        technologies: ''
      })
    }

    /**
     * 删除项目经验
     * @param index 要删除的索引
     */
    const removeProject = (index: number) => {
      formData.value.projects.splice(index, 1)
    }

    return {
      formData,
      addProject,
      removeProject
    }
  }
})
</script>

<template>
  <el-collapse-item title="项目经验" name="4">
    <el-button type="primary" plain @click="addProject" style="margin-bottom: 20px">
      添加项目经验
    </el-button>
    
    <div v-for="(proj, index) in formData.projects" :key="index" class="section-item">
      <div class="section-header">
        <h3>项目经验 #{{ index + 1 }}</h3>
        <el-button type="danger" plain @click="removeProject(index)">删除</el-button>
      </div>
      
      <el-form-item label="项目名称">
        <el-input v-model="proj.name" placeholder="项目名称" />
      </el-form-item>
      
      <el-form-item label="担任角色">
        <el-input v-model="proj.role" placeholder="项目中的角色" />
      </el-form-item>
      
      <el-form-item label="起止时间">
        <el-date-picker
          v-model="proj.startDate"
          type="month"
          placeholder="开始时间"
          style="width: 45%"
        />
        <span style="margin: 0 10px">至</span>
        <el-date-picker
          v-model="proj.endDate"
          type="month"
          placeholder="结束时间"
          style="width: 45%"
        />
      </el-form-item>
      
      <el-form-item label="项目描述">
        <el-input
          v-model="proj.description"
          type="textarea"
          rows="4"
          placeholder="项目背景、职责、成果等"
        />
      </el-form-item>
      
      <el-form-item label="技术栈">
        <el-input
          v-model="proj.technologies"
          placeholder="使用的技术、工具等"
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