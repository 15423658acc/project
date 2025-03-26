<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { generatePDF } from '../utils';
import type { ResumeFormData } from '../types';
import BasicInfoForm from './BasicInfoForm.vue';
import EducationForm from './EducationForm.vue';
import ExperienceForm from './ExperienceForm.vue';
import ProjectForm from './ProjectForm.vue';
import SkillsForm from './SkillsForm.vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
  components: {
    BasicInfoForm,
    EducationForm,
    ExperienceForm,
    ProjectForm,
    SkillsForm
  },
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
    });

    const isGenerating = ref(false);

    /**
     * 处理PDF生成
     */
    const handleGeneratePDF = async () => {
      isGenerating.value = true;
      try {
        // 添加延迟确保DOM更新
        await new Promise(resolve => setTimeout(resolve, 100));
        await generatePDF(formData.value);
      } catch (error) {
        console.error('生成PDF失败:', error);
        ElMessage.error(`生成失败: ${(error as Error).message}`);
      } finally {
        isGenerating.value = false;
      }
    };

    return {
      formData,
      isGenerating,
      handleGeneratePDF
    };
  }
});
</script>

<template>
  <div class="resume-generator">
    <h1 class="title">简历生成器</h1>
    <el-form :model="formData" label-width="100px" class="resume-form">
      <el-collapse accordion>
        <BasicInfoForm v-model="formData" />
        <EducationForm v-model="formData" />
        <ExperienceForm v-model="formData" />
        <ProjectForm v-model="formData" />
        <SkillsForm v-model="formData" />
      </el-collapse>

      <el-form-item style="margin-top: 20px">
        <el-button 
          type="primary" 
          @click="handleGeneratePDF"
          :loading="isGenerating"
          :disabled="isGenerating"
        >
          {{ isGenerating ? '正在生成PDF...' : '下载PDF简历' }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.resume-generator {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;

  .title {
    text-align: center;
    margin-bottom: 20px;
    color: #2c3e50;
  }

  .resume-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
}
</style>