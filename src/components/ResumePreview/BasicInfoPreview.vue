<script lang="ts">
// 导入Vue的组合式API函数defineComponent和PropType类型
import { defineComponent, type PropType } from 'vue'
// 导入自定义的简历表单数据类型
import type { ResumeFormData } from '../types'
// 导入Element Plus的图标组件
import { ElIcon } from 'element-plus'
// 导入Element Plus提供的具体图标组件
import { Message, Phone, Location, Link, User } from '@element-plus/icons-vue'

// 使用defineComponent定义组件
export default defineComponent({
  // 组件名称，用于调试和递归引用
  name: 'BasicInfoPreview',
  
  // 注册子组件
  components: {
    ElIcon,      // Element Plus的图标容器组件
    Message,     // 邮件图标
    Phone,       // 电话图标
    Location,    // 位置图标
    Link,        // 链接图标
    User         // 用户图标(默认头像)
  },
  
  // 定义组件props
  props: {
    // 表单数据prop，包含简历的所有基本信息
    formData: {
      // 使用PropType指定类型为ResumeFormData
      type: Object as PropType<ResumeFormData>,
      // 标记为必填prop
      required: true
    }
  }
})
</script>

<template>
  <!-- 简历头部容器，包含基本信息和个人头像 -->
  <div class="resume-header">
    <!-- 基本信息区域 -->
    <div class="resume-info">
      <!-- 姓名显示，如果没有提供则显示默认值"姓名" -->
      <h1 class="resume-name">{{ formData.name || '姓名' }}</h1>
      <!-- 职位标题，仅在formData.title存在时显示 -->
      <h2 class="resume-title" v-if="formData.title">{{ formData.title }}</h2>
      
      <!-- 联系方式区域，使用网格布局 -->
      <div class="resume-contact">
        <!-- 邮箱信息，仅在formData.email存在时显示 -->
        <div class="contact-item" v-if="formData.email">
          <el-icon class="contact-icon"><Message /></el-icon>
          <span class="contact-text">{{ formData.email }}</span>
        </div>
        <!-- 电话信息，仅在formData.phone存在时显示 -->
        <div class="contact-item" v-if="formData.phone">
          <el-icon class="contact-icon"><Phone /></el-icon>
          <span class="contact-text">{{ formData.phone }}</span>
        </div>
        <!-- 位置信息，仅在formData.location存在时显示 -->
        <div class="contact-item" v-if="formData.location">
          <el-icon class="contact-icon"><Location /></el-icon>
          <span class="contact-text">{{ formData.location }}</span>
        </div>
        <!-- 网站链接，仅在formData.website存在时显示 -->
        <div class="contact-item" v-if="formData.website">
          <el-icon class="contact-icon"><Link /></el-icon>
          <!-- 网站链接使用a标签，在新窗口打开 -->
          <a :href="formData.website" target="_blank" class="contact-text">{{ formData.website }}</a>
        </div>
      </div>
      
      <!-- 个人简介/摘要，仅在formData.summary存在时显示 -->
      <div class="resume-summary" v-if="formData.summary">
        <p>{{ formData.summary }}</p>
      </div>
    </div>
    
    <!-- 头像显示区域 -->
    <div class="avatar-display">
      <!-- 如果有头像URL，则显示头像图片 -->
      <div v-if="formData.avatar" class="avatar-image-container">
        <img :src="formData.avatar" alt="个人头像" class="avatar-image">
      </div>
      <!-- 如果没有头像URL，则显示默认用户图标 -->
      <div v-else class="empty-avatar">
        <el-icon><User /></el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 简历头部容器样式 */
.resume-header {
  /* 使用flex布局，两端对齐 */
  display: flex;
  justify-content: space-between;
  /* 顶部对齐 */
  align-items: flex-start;
  /* 底部外边距和下边框 */
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--el-border-color);
  
  /* 基本信息区域样式 */
  .resume-info {
    /* 占据剩余空间 */
    flex: 1;
    /* 右侧内边距，为头像留出空间 */
    padding-right: 30px;
  }
  
  /* 姓名样式 */
  .resume-name {
    font-size: 28px;
    margin-bottom: 8px;
    /* 使用Element Plus的主色 */
    color: var(--el-color-primary);
    font-weight: 600;
    /* 字母间距 */
    letter-spacing: 1px;
  }

  /* 职位标题样式 */
  .resume-title {
    font-size: 18px;
    color: var(--el-text-color-regular);
    margin-bottom: 16px;
    font-weight: 500;
  }

  /* 联系方式区域样式 */
  .resume-contact {
    /* 使用CSS网格布局 */
    display: grid;
    /* 自动填充列，最小200px，最大1fr */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    /* 网格间隙 */
    gap: 12px;
    margin-bottom: 16px;
    
    /* 单个联系信息项样式 */
    .contact-item {
      display: flex;
      align-items: center;
      font-size: 14px;
      
      /* 图标样式 */
      .contact-icon {
        margin-right: 8px;
        color: var(--el-color-primary);
      }
      
      /* 联系文本样式 */
      .contact-text {
        color: var(--el-text-color-regular);
        /* 允许在任意字符间断行 */
        word-break: break-all;
      }
      
      /* 链接样式 */
      a {
        color: var(--el-color-primary);
        text-decoration: none;
        
        /* 鼠标悬停时显示下划线 */
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  
  /* 个人简介区域样式 */
  .resume-summary {
    margin-top: 16px;
    
    /* 段落文本样式 */
    p {
      color: var(--el-text-color-regular);
      line-height: 1.6;
      font-size: 14px;
    }
  }

  /* 头像显示区域样式 */
  .avatar-display {
    /* 固定宽度和高度 */
    width: 120px;
    height: 160px;
    /* 禁止缩小 */
    flex-shrink: 0;
    border: 1px solid var(--el-border-color);
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* 头像图片容器样式 */
    .avatar-image-container {
      width: 100%;
      height: 100%;
      /* 隐藏溢出内容 */
      overflow: hidden;
      
      /* 头像图片样式 */
      .avatar-image {
        width: 100%;
        height: 100%;
        /* 保持图片比例同时填充容器 */
        object-fit: cover;
      }
    }
    
    /* 空头像占位样式 */
    .empty-avatar {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f7fa;
      
      /* 默认用户图标样式 */
      .el-icon {
        font-size: 48px;
        color: #8c939d;
      }
    }
  }
}

/* 响应式设计：屏幕宽度小于768px时的样式 */
@media (max-width: 768px) {
  .resume-header {
    /* 改为垂直布局，基本信息在下 */
    flex-direction: column-reverse;
    
    /* 调整基本信息区域样式 */
    .resume-info {
      padding-right: 0;
      margin-top: 20px;
    }
    
    /* 调整头像显示区域样式 */
    .avatar-display {
      align-self: center;
      margin-bottom: 16px;
    }
  }
}
</style>