<script lang="ts">
// 导入Element Plus的消息提示组件
import { ElMessage } from 'element-plus';
// 导入Vue的组合式API函数
import { defineComponent, computed } from 'vue'
// 导入Element Plus的上传图标
import { Upload } from '@element-plus/icons-vue'
// 导入类型定义
import type { ResumeFormData } from '../types'

// 使用defineComponent定义组件
export default defineComponent({
  name: 'BasicInfoForm', // 组件名称
  components: {
    Upload // 注册上传图标组件
  },
  // 定义组件属性
  props: {
    modelValue: {
      type: Object as () => ResumeFormData, // 属性类型为ResumeFormData对象
      required: true // 必填属性
    }
  },
  // 定义组件触发的事件
  emits: ['update:modelValue'],
  // 组件的setup函数
  setup(props, { emit }) {
    // 创建计算属性formData，用于双向绑定
    const formData = computed({
      // 获取属性值
      get: () => props.modelValue,
      // 设置属性值并触发更新事件
      set: (value) => emit('update:modelValue', value)
    })

    /**
     * 处理头像上传的函数
     * @param {File} file - 上传的文件对象
     * @returns {boolean} 返回false阻止默认上传行为
     */
    const handleAvatarUpload = (file: File) => {
      // 检查文件类型是否为图片
      if (!file.type.match('image.*')) {
        ElMessage.error('只能上传图片文件');
        return false;
      }
      
      // 检查文件大小是否小于2MB
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        ElMessage.error('头像图片大小不能超过 2MB');
        return false;
      }
      
      // 创建文件阅读器
      const reader = new FileReader();
      // 文件读取成功回调
      reader.onload = (e) => {
        if (e.target?.result) {
          // 将图片数据URL赋值给formData
          formData.value.avatar = e.target.result as string;
          ElMessage.success('头像上传成功');
        }
      };
      // 文件读取失败回调
      reader.onerror = () => {
        ElMessage.error('图片读取失败');
      };
      // 开始读取文件内容
      reader.readAsDataURL(file);
      
      // 返回false阻止默认上传行为
      return false;
    }

    // 返回模板中需要使用的数据和方法
    return {
      formData,
      handleAvatarUpload
    }
  }
})
</script>

<template>
  <!-- 折叠面板项，标题为"基本信息"，name属性用于标识 -->
  <el-collapse-item title="基本信息" name="1">
    <!-- 基本信息表单容器，使用flex布局 -->
    <div class="basic-info-form">
      <!-- 头像上传区域 (单独一行) -->
      <div class="avatar-section">
        <!-- 表单项目，标签为"头像" -->
        <el-form-item label="头像" class="avatar-form-item">
          <!-- 头像上传器容器 -->
          <div class="avatar-uploader">
            <!-- Element Plus的上传组件 -->
            <el-upload
              action="" 
              :show-file-list="false" 
              :before-upload="handleAvatarUpload"
              accept="image/*"
            >
              <!-- 头像展示区域 -->
              <div class="square-avatar">
                <!-- 如果有头像则显示头像图片 -->
                <img v-if="formData.avatar" :src="formData.avatar" class="avatar-image" />
                <!-- 没有头像则显示上传提示 -->
                <div v-else class="upload-hint">
                  <el-icon><Upload /></el-icon>
                  <span>点击上传头像</span>
                </div>
              </div>
            </el-upload>
            <!-- 上传提示文字 -->
            <div class="upload-tips">建议尺寸：200x200像素，不超过2MB</div>
            <!-- 移除头像按钮 -->
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
        <!-- 姓名输入框 -->
        <el-form-item label="姓名" prop="name">
          <el-input 
            v-model="formData.name" 
            placeholder="请输入姓名" 
            clearable
          />
        </el-form-item>
        
        <!-- 职位输入框 -->
        <el-form-item label="职位" prop="title">
          <el-input 
            v-model="formData.title" 
            placeholder="期望职位" 
            clearable 
          />
        </el-form-item>
        
        <!-- 邮箱输入框 -->
        <el-form-item label="邮箱" prop="email">
          <el-input 
            v-model="formData.email" 
            placeholder="请输入邮箱" 
            clearable 
          />
        </el-form-item>
        
        <!-- 电话输入框 -->
        <el-form-item label="电话" prop="phone">
          <el-input 
            v-model="formData.phone" 
            placeholder="请输入电话" 
            clearable 
          />
        </el-form-item>
        
        <!-- 所在地输入框 -->
        <el-form-item label="所在地" prop="location">
          <el-input 
            v-model="formData.location" 
            placeholder="城市" 
            clearable 
          />
        </el-form-item>
        
        <!-- 个人网站输入框 -->
        <el-form-item label="个人网站" prop="website">
          <el-input 
            v-model="formData.website" 
            placeholder="个人网站/博客/GitHub" 
            clearable 
          />
        </el-form-item>
        
        <!-- 个人简介文本域 -->
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
/* 基本信息表单容器样式 */
.basic-info-form {
  display: flex; // 使用flex布局
  flex-direction: column; // 垂直排列
  gap: 20px; // 子元素间距
}

/* 头像区域样式 */
.avatar-section {
  display: flex;
  justify-content: center; // 水平居中
  margin-bottom: 20px; // 底部间距
  
  /* 头像表单项目样式 */
  .avatar-form-item {
    display: flex;
    flex-direction: column; // 垂直排列
    align-items: center; // 子元素水平居中
  }
}

/* 头像上传器样式 */
.avatar-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  /* 正方形头像容器样式 */
  .square-avatar {
    width: 150px;
    height: 150px;
    border: 1px dashed var(--el-border-color); // 虚线边框
    border-radius: 4px; // 圆角
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; // 鼠标手型
    overflow: hidden; // 内容溢出隐藏
    position: relative;
    background-color: #f5f7fa; // 背景色
    transition: all 0.3s ease; // 过渡动画
    
    /* 悬停效果 */
    &:hover {
      border-color: var(--el-color-primary); // 主色边框
      transform: translateY(-2px); // 上移效果
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // 阴影效果
    }

    /* 头像图片样式 */
    .avatar-image {
      width: 100%;
      height: 100%;
      object-fit: cover; // 保持比例填充
    }
  }
  
  /* 上传提示样式 */
  .upload-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #8c939d; // 文字颜色
    padding: 20px;
    
    /* 图标样式 */
    .el-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }
    
    /* 文字样式 */
    span {
      font-size: 14px;
      text-align: center;
    }
  }
  
  /* 上传提示文字样式 */
  .upload-tips {
    font-size: 12px;
    color: var(--el-text-color-secondary); // 次要文字颜色
    margin: 8px 0;
    text-align: center;
  }
  
  /* 移除按钮样式 */
  .remove-btn {
    width: 100%;
    margin-top: 4px;
  }
}

/* 表单区域样式 */
.form-section {
  width: 100%;
  
  /* 表单项目样式 */
  .el-form-item {
    margin-bottom: 18px; // 底部间距
  }
  
  /* 文本域样式 */
  .el-textarea {
    min-height: 120px; // 最小高度
  }
}

/* 移动端响应式样式 */
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