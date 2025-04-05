<script lang="ts">
import { defineComponent } from 'vue';
import { formatDate } from '../utils';
import type { ResumeFormData } from '../types';
import BasicInfoPreview from './BasicInfoPreview.vue';
import EducationPreview from './EducationPreview.vue';
import ExperiencePreview from './ExperiencePreview.vue';
import ProjectPreview from './ProjectPreview.vue';
import SkillsPreview from './SkillsPreview.vue';

export default defineComponent({
  name: 'ResumePreview',
  components: {
    BasicInfoPreview,
    EducationPreview,
    ExperiencePreview,
    ProjectPreview,
    SkillsPreview
  },
  props: {
    formData: {
      type: Object as () => ResumeFormData,
      required: true
    }
  },
  methods: {
    formatDate
  }
});
</script>

<template>
  <div id="resume-preview" class="preview-content">
  <div class="resume-preview">
    <!-- 简历头部 -->
    <BasicInfoPreview :form-data="formData" />

    <!-- 个人简介 -->
    <div class="resume-section" v-if="formData.summary">
      <h2>个人简介</h2>
      <p>{{ formData.summary }}</p>
    </div>

    <!-- 教育经历 -->
    <EducationPreview :form-data="formData" :format-date="formatDate" />
    
    <!-- 工作经验 -->
    <ExperiencePreview :form-data="formData" :format-date="formatDate" />
    
    <!-- 项目经验 -->
    <ProjectPreview :form-data="formData" :format-date="formatDate" />
    
    <!-- 技能特长 -->
    <SkillsPreview :form-data="formData" />
  </div>
  </div>
</template>

<style scoped lang="scss">
.resume-preview {
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-height: 800px;
  box-sizing: border-box; // 防止内容溢出

  .resume-section {
    margin-bottom: 2rem;

    h2 {
      color: var(--el-color-primary);
      border-bottom: 2px solid var(--el-color-primary);
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }
  }
}
</style>