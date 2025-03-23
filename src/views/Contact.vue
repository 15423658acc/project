<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  console.log('提交表单', form.value)
}
</script>

<template>
  <div class="container">
    <h1 class="title">联系我们</h1>
    
    <div class="contact-container">
      <div class="info-section">
        <h2>联系方式</h2>
        <div class="info-item">
          <el-icon><Location /></el-icon>
          <span>北京市朝阳区xxx街道xxx号</span>
        </div>
        <div class="info-item">
          <el-icon><Phone /></el-icon>
          <span>400-123-4567</span>
        </div>
        <div class="info-item">
          <el-icon><Message /></el-icon>
          <span>contact@example.com</span>
        </div>
        
        <h2 class="mt-8">关注我们</h2>
        <div class="social-links">
          <a href="#" class="social-link">
            <el-icon><Platform /></el-icon>
            <span>微信公众号</span>
          </a>
          <a href="#" class="social-link">
            <el-icon><Platform /></el-icon>
            <span>微博</span>
          </a>
        </div>
      </div>
      
      <div class="form-section">
        <h2>发送消息</h2>
        <el-form :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" placeholder="请输入您的姓名" />
          </el-form-item>
          
          <el-form-item label="邮箱">
            <el-input v-model="form.email" placeholder="请输入您的邮箱" />
          </el-form-item>
          
          <el-form-item label="主题">
            <el-input v-model="form.subject" placeholder="请输入消息主题" />
          </el-form-item>
          
          <el-form-item label="消息">
            <el-input
              v-model="form.message"
              type="textarea"
              rows="4"
              placeholder="请输入您的消息"
            />
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="submitForm">发送消息</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 2rem;
  
  .title {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 2rem;
  }
  
  .contact-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    
    .info-section {
      h2 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
      }
      
      .info-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        
        .el-icon {
          color: var(--primary-color);
        }
      }
      
      .social-links {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        
        .social-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          text-decoration: none;
          
          &:hover {
            color: var(--secondary-color);
          }
        }
      }
    }
    
    .form-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      
      h2 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
      }
    }
  }
}

.mt-8 {
  margin-top: 2rem;
}
</style>