<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ResumeFormData } from '../types'
import { ElIcon } from 'element-plus'
import { Message, Phone, Location, Link, User  } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'BasicInfoPreview',
  components: {
    ElIcon,
    Message,
    Phone,
    Location,
    Link,
    User
  },
  props: {
    formData: {
      type: Object as PropType<ResumeFormData>,
      required: true
    }
  }
})
</script>

<template>
  <div class="resume-header">
    <!-- 基本信息区域 -->
    <div class="resume-info">
      <h1 class="resume-name">{{ formData.name || '姓名' }}</h1>
      <h2 class="resume-title" v-if="formData.title">{{ formData.title }}</h2>
      
      <div class="resume-contact">
        <div class="contact-item" v-if="formData.email">
          <el-icon class="contact-icon"><Message /></el-icon>
          <span class="contact-text">{{ formData.email }}</span>
        </div>
        <div class="contact-item" v-if="formData.phone">
          <el-icon class="contact-icon"><Phone /></el-icon>
          <span class="contact-text">{{ formData.phone }}</span>
        </div>
        <div class="contact-item" v-if="formData.location">
          <el-icon class="contact-icon"><Location /></el-icon>
          <span class="contact-text">{{ formData.location }}</span>
        </div>
        <div class="contact-item" v-if="formData.website">
          <el-icon class="contact-icon"><Link /></el-icon>
          <a :href="formData.website" target="_blank" class="contact-text">{{ formData.website }}</a>
        </div>
      </div>
      
      <div class="resume-summary" v-if="formData.summary">
        <p>{{ formData.summary }}</p>
      </div>
    </div>
    
    <!-- 头像区域 -->
    <div class="avatar-display">
      <div v-if="formData.avatar" class="avatar-image-container">
        <img :src="formData.avatar" alt="个人头像" class="avatar-image">
      </div>
      <div v-else class="empty-avatar">
        <el-icon><User /></el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.resume-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--el-border-color);
  
  .resume-info {
    flex: 1;
    padding-right: 30px;
  }
  
  .resume-name {
    font-size: 28px;
    margin-bottom: 8px;
    color: var(--el-color-primary);
    font-weight: 600;
    letter-spacing: 1px;
  }

  .resume-title {
    font-size: 18px;
    color: var(--el-text-color-regular);
    margin-bottom: 16px;
    font-weight: 500;
  }

  .resume-contact {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 16px;
    
    .contact-item {
      display: flex;
      align-items: center;
      font-size: 14px;
      
      .contact-icon {
        margin-right: 8px;
        color: var(--el-color-primary);
      }
      
      .contact-text {
        color: var(--el-text-color-regular);
        word-break: break-all;
      }
      
      a {
        color: var(--el-color-primary);
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  
  .resume-summary {
    margin-top: 16px;
    
    p {
      color: var(--el-text-color-regular);
      line-height: 1.6;
      font-size: 14px;
    }
  }

  .avatar-display {
    width: 120px;
    height: 160px;
    flex-shrink: 0;
    border: 1px solid var(--el-border-color);
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .avatar-image-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      
      .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .empty-avatar {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f7fa;
      
      .el-icon {
        font-size: 48px;
        color: #8c939d;
      }
    }
  }
}

@media (max-width: 768px) {
  .resume-header {
    flex-direction: column-reverse;
    
    .resume-info {
      padding-right: 0;
      margin-top: 20px;
    }
    
    .avatar-display {
      align-self: center;
      margin-bottom: 16px;
    }
  }
}
</style>