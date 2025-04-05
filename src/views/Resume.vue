<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import ResumeForm from "../components/ResumeForm/index.vue";
import ResumePreview from "../components/ResumePreview/index.vue";
import type { ResumeFormData } from '../components/types';

// 简历表单数据
const formData = ref<ResumeFormData>({
  // 基本信息
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  summary: '',
  avatar: '', // 新增头像字段


  // 教育经历
  education: [],

  // 工作经验
  experience: [],

  // 项目经验
  projects: [],

  // 技能特长
  technicalSkills: '',
  softSkills: '',
  languages: '',
  certifications: '',
  skills: function (arg0: string, skills: any): unknown {
    throw new Error('Function not implemented.');
  }
});

// 加载状态
// const isLoading = ref(false);

// 监听 formData 的变化
watchEffect(() => {
  console.log('简历数据已更新:', formData.value);
});

// 页面标题和描述
const pageTitle = '简历生成器';
const pageDescription = '创建并预览您的专业简历，支持自定义基本信息、教育经历、工作经验、技能特长等。';
</script>

<template>
  <div class="container">
    <!-- 页面头部 -->
    <header class="page-header">
      <h1 class="title">{{ pageTitle }}</h1>
      <p class="description">{{ pageDescription }}</p>
    </header>

    <!-- 内容部分 -->
    <div class="content-wrapper">
      <!-- 表单部分 -->
      <div class="form-section">
        <ResumeForm v-model="formData" />
      </div>

      <!-- 预览部分 -->
      <div class="preview-section">
        <ResumePreview :form-data="formData" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 2rem;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;

  .title {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 1rem;
    color: #7f8c8d;
    line-height: 1.6;
  }
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
}

.form-section, .preview-section {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #ebedf0;

  @media (max-width: 1200px) {
    margin-bottom: 2rem;
  }
}
</style>