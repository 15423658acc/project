<!-- 
1.使用说明
注册Formspree：
访问 formspree.io
注册免费账户
创建新表单获取 YOUR_FORM_ID
2.替换代码中的ID：
// 将这一行中的YOUR_FORM_ID替换为您实际的表单ID
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
3.测试流程：
填写表单并提交
检查您的Formspree收件箱
确认收到测试邮件 
-->

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Location, Phone, Message, Platform } from '@element-plus/icons-vue'

// 保持原有表单数据不变
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})
const isSubmitting = ref(false)

// 保持原有验证逻辑不变
const validateForm = () => {
  if (!form.value.name) {
    ElMessage.warning('请输入您的姓名')
    return false
  }
  if (!form.value.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    ElMessage.warning('请输入有效的邮箱地址')
    return false
  }
  if (!form.value.subject) {
    ElMessage.warning('请输入消息主题')
    return false
  }
  if (!form.value.message) {
    ElMessage.warning('请输入您的消息')
    return false
  }
  return true
}

// 新增：使用Formspree发送邮件（核心功能）
const submitForm = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    // 请替换为您的Formspree表单ID
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _replyto: form.value.email, // 自动回复地址
        name: form.value.name,
        subject: form.value.subject,
        message: form.value.message,
        _format: 'plain' // 简化邮件格式
      })
    })
    
    if (response.ok) {
      ElMessage.success('消息已发送成功！')
      // 保持原有表单清空逻辑
      form.value = { name: '', email: '', subject: '', message: '' }
    } else {
      throw new Error('发送失败，请重试')
    }
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <!-- 完全保持原有template结构不变 -->
  <div class="container">
    <h1 class="title">联系我们</h1>

    <div class="contact-container">
      <div class="info-section">
        <h2>联系方式</h2>
        <div class="info-item">
          <el-icon><Location /></el-icon>
          <span>山东省济南市章丘区双山街道</span>
        </div>
        <div class="info-item">
          <el-icon><Phone /></el-icon>
          <span>1970709246</span>
        </div>
        <div class="info-item">
          <el-icon><Message /></el-icon>
          <span>938284226@qq.com</span>
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
            <!-- 仅修改了按钮的click事件 -->
            <el-button 
              type="primary" 
              @click="submitForm" 
              :loading="isSubmitting"
            >
              {{ isSubmitting ? '发送中...' : '发送消息' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<!-- 完全保持原有style不变 -->
<style scoped lang="scss">
.container {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f9f9f9, #ffffff);
}

.title {
  text-align: center;
  color: #409eff;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .info-section {
    h2 {
      color: #409eff;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      .el-icon {
        font-size: 1.5rem;
        color: #409eff;
      }

      span {
        font-size: 1rem;
        color: #333;
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
        color: #409eff;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #66b1ff;
        }
      }
    }
  }

  .form-section {
    h2 {
      color: #409eff;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .el-form {
      width: 100%;

      .el-input,
      .el-textarea {
        width: 100%;
      }

      .el-button {
        width: 100%;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #66b1ff;
        }
      }
    }
  }
}

.mt-8 {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 2rem;

    .form-section {
      padding: 1.5rem;
    }
  }
}
</style>