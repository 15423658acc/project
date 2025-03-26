<script lang="ts">
import { defineComponent } from 'vue'
import type { ResumeFormData } from '../types'

export default defineComponent({
  name: 'SkillsSection',
  props: {
    formData: {
      type: Object as () => ResumeFormData,
      required: true
    }
  },
  setup(props) {
    return {
      props
    }
  }
})
</script>

<template>
  <div class="resume-section" v-if="formData.technicalSkills || formData.softSkills || formData.languages || formData.certifications">
    <h2>技能特长</h2>
    <div v-if="formData.technicalSkills" class="skill-item">
      <h3>技术技能</h3>
      <p>{{ formData.technicalSkills }}</p>
    </div>
    <div v-if="formData.softSkills" class="skill-item">
      <h3>软技能</h3>
      <p>{{ formData.softSkills }}</p>
    </div>
    <div v-if="formData.languages" class="skill-item">
      <h3>语言能力</h3>
      <p>{{ formData.languages }}</p>
    </div>
    <div v-if="formData.certifications" class="skill-item">
      <h3>证书认证</h3>
      <p>{{ formData.certifications }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.skill-item {
  margin-bottom: 1rem;

  h3 {
    color: var(--el-text-color-primary);
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    white-space: pre-line;
    line-height: 1.6;
    color: var(--el-text-color-regular);
  }
}
</style>