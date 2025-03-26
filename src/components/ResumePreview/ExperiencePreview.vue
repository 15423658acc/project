<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ResumeFormData } from '../types'

export default defineComponent({
  name: 'ExperiencePreview',
  props: {
    formData: {
      type: Object as PropType<ResumeFormData>,
      required: true
    },
    formatDate: {
      type: Function as PropType<(date: string) => string>,
      required: true
    }
  }
})
</script>

<template>
  <div class="resume-section" v-if="formData.experience.length">
    <h2>工作经验</h2>
    <div v-for="(exp, index) in formData.experience" :key="index" class="resume-item">
      <div class="item-header">
        <div class="item-title">
          <h3>{{ exp.company }}</h3>
          <p>{{ exp.position }}</p>
        </div>
        <div class="item-date" v-if="exp.startDate || exp.endDate">
          {{ formatDate(exp.startDate) }} - {{ formatDate(exp.endDate) }}
        </div>
      </div>
      <p class="item-description" v-if="exp.description">{{ exp.description }}</p>
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
}
</style>