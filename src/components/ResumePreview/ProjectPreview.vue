<script lang="ts">
import { defineComponent } from 'vue'
import type { ResumeFormData } from '../types'

export default defineComponent({
  name: 'ProjectExperience',
  props: {
    formData: {
      type: Object as () => ResumeFormData,
      required: true
    },
    formatDate: {
      type: Function,
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
  <div class="resume-section" v-if="formData.projects.length">
    <h2>项目经验</h2>
    <div v-for="(proj, index) in formData.projects" :key="index" class="resume-item">
      <div class="item-header">
        <div class="item-title">
          <h3>{{ proj.name }}</h3>
          <p>{{ proj.role }}</p>
        </div>
        <div class="item-date" v-if="proj.startDate || proj.endDate">
          {{ formatDate(proj.startDate) }} - {{ formatDate(proj.endDate) }}
        </div>
      </div>
      <p class="item-description" v-if="proj.description">{{ proj.description }}</p>
      <p class="item-tech" v-if="proj.technologies">技术栈：{{ proj.technologies }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.resume-item {
  margin-bottom: 1.5rem;

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;

    .item-title {
      h3 {
        margin: 0;
        color: var(--el-text-color-primary);
        font-size: 1.1rem;
      }

      p {
        margin: 0.25rem 0 0;
        color: var(--el-text-color-regular);
      }
    }

    .item-date {
      color: var(--el-text-color-secondary);
      font-size: 0.9rem;
    }
  }

  .item-description {
    margin: 0.5rem 0;
    white-space: pre-line;
    line-height: 1.6;
    color: var(--el-text-color-regular);
  }

  .item-tech {
    margin: 0.5rem 0 0;
    color: var(--el-text-color-secondary);
    font-size: 0.9rem;
  }
}
</style>