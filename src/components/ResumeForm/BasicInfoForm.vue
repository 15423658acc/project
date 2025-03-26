<script lang="ts">
import { ElMessage } from 'element-plus';
import { defineComponent, computed } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import type { ResumeFormData } from '../types'

export default defineComponent({
  name: 'BasicInfoForm',
  components: {
    Upload
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
    })

    const handleAvatarUpload = (file: File) => {
      if (!file.type.match('image.*')) {
        ElMessage.error('只能上传图片文件');
        return false;
      }
      
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        ElMessage.error('头像图片大小不能超过 2MB');
        return false;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          formData.value.avatar = e.target.result as string;
          ElMessage.success('头像上传成功');
        }
      };
      reader.onerror = () => {
        ElMessage.error('图片读取失败');
      };
      reader.readAsDataURL(file);
      
      return false;
    }

    return {
      formData,
      handleAvatarUpload
    }
  }
})
</script>

<template>
  <el-collapse-item title="基本信息" name="1">
    <div class="basic-info-form">
      <!-- 头像上传区域 (单独一行) -->
      <div class="avatar-section">
        <el-form-item label="头像" class="avatar-form-item">
          <div class="avatar-uploader">
            <el-upload
              action=""
              :show-file-list="false"
              :before-upload="handleAvatarUpload"
              accept="image/*"
            >
              <div class="square-avatar">
                <img v-if="formData.avatar" :src="formData.avatar" class="avatar-image" />
                <div v-else class="upload-hint">
                  <el-icon><Upload /></el-icon>
                  <span>点击上传头像</span>
                </div>
              </div>
            </el-upload>
            <div class="upload-tips">建议尺寸：200x200像素，不超过2MB</div>
            <el-button 
              v-if="formData.avatar" 
              type="danger" 
              size="small" 
              @click="formData.avatar = ''"
              class="remove-btn"
            >
              移除头像
            </el-button>
          </div>
        </el-form-item>
      </div>

      <!-- 基本信息表单 (单独一行) -->
      <div class="form-section">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入姓名" clearable />
        </el-form-item>
        
        <el-form-item label="职位" prop="title">
          <el-input v-model="formData.title" placeholder="期望职位" clearable />
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" clearable />
        </el-form-item>
        
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入电话" clearable />
        </el-form-item>
        
        <el-form-item label="所在地" prop="location">
          <el-input v-model="formData.location" placeholder="城市" clearable />
        </el-form-item>
        
        <el-form-item label="个人网站" prop="website">
          <el-input v-model="formData.website" placeholder="个人网站/博客/GitHub" clearable />
        </el-form-item>
        
        <el-form-item label="个人简介" prop="summary">
          <el-input
            v-model="formData.summary"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            placeholder="简短的个人介绍"
            maxlength="300"
            show-word-limit
          />
        </el-form-item>
      </div>
    </div>
  </el-collapse-item>
</template>

<style scoped lang="scss">
.basic-info-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  
  .avatar-form-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.avatar-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .square-avatar {
    width: 150px;
    height: 150px;
    border: 1px dashed var(--el-border-color);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    background-color: #f5f7fa;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--el-color-primary);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .avatar-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .upload-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #8c939d;
    padding: 20px;
    
    .el-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }
    
    span {
      font-size: 14px;
      text-align: center;
    }
  }
  
  .upload-tips {
    font-size: 12px;
    color: var(--el-text-color-secondary);
    margin: 8px 0;
    text-align: center;
  }
  
  .remove-btn {
    width: 100%;
    margin-top: 4px;
  }
}

.form-section {
  width: 100%;
  
  .el-form-item {
    margin-bottom: 18px;
  }
  
  .el-textarea {
    min-height: 120px;
  }
}

@media (max-width: 768px) {
  .avatar-section {
    margin-bottom: 15px;
  }
  
  .form-section {
    .el-form-item {
      margin-bottom: 16px;
    }
  }
}
</style>