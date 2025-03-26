<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { ResumeFormData } from '../types'

export default defineComponent({
  name: 'SkillsForm',
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

    return {
      formData
    }
  }
})
</script>

<template>
  <el-collapse-item title="技能特长" name="5">
    <el-form-item label="技术技能">
      <el-input
        v-model="formData.technicalSkills"
        type="textarea"
        rows="4"
        placeholder="编程语言、框架、工具等"
      />
    </el-form-item>
    
    <el-form-item label="软技能">
      <el-input
        v-model="formData.softSkills"
        type="textarea"
        rows="3"
        placeholder="沟通能力、团队协作等"
      />
    </el-form-item>
    
    <el-form-item label="语言能力">
      <el-input
        v-model="formData.languages"
        type="textarea"
        rows="2"
        placeholder="语言水平、等级证书等"
      />
    </el-form-item>
    
    <el-form-item label="证书认证">
      <el-input
        v-model="formData.certifications"
        type="textarea"
        rows="3"
        placeholder="专业证书、技能认证等"
      />
    </el-form-item>
  </el-collapse-item>
</template>