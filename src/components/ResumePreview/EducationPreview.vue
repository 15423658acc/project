<script lang="ts">
import { defineComponent } from 'vue'
import type { ResumeFormData } from '../types'

export default defineComponent({
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
  // 保持原有逻辑不变
  setup(props) {
    return {
      // 暴露所有props到模板
      ...props
    }
  }
})
</script>

<template>
  <div class="resume-section" v-if="formData.education.length">
    <h2>教育经历</h2>
    <div v-for="(edu, index) in formData.education" :key="index" class="resume-item">
      <div class="item-header">
        <div class="item-title">
          <h3>{{ edu.school }}</h3>
          <p>{{ edu.degree }} · {{ edu.major }}</p>
        </div>
        <div class="item-date" v-if="edu.startDate || edu.endDate">
          {{ formatDate(edu.startDate) }} - {{ formatDate(edu.endDate) }}
        </div>
      </div>
      <p class="item-description" v-if="edu.description">{{ edu.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 保持样式不变 */
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
}
</style>