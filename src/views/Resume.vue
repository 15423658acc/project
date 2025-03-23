<script setup lang="ts">
import { ref, computed } from 'vue'
import html2pdf from 'html2pdf.js'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'

interface Education {
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
  description: string
}

interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

interface Project {
  name: string
  role: string
  startDate: string
  endDate: string
  description: string
  technologies: string
}

const formData = ref({
  // Basic Info
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  summary: '',
  
  // Education
  education: [] as Education[],
  
  // Work Experience
  experience: [] as Experience[],
  
  // Projects
  projects: [] as Project[],
  
  // Skills
  technicalSkills: '',
  softSkills: '',
  languages: '',
  certifications: '',
})

const addEducation = () => {
  formData.value.education.push({
    school: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
  })
}

const removeEducation = (index: number) => {
  formData.value.education.splice(index, 1)
}

const addExperience = () => {
  formData.value.experience.push({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  })
}

const removeExperience = (index: number) => {
  formData.value.experience.splice(index, 1)
}

const addProject = () => {
  formData.value.projects.push({
    name: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
    technologies: ''
  })
}

const removeProject = (index: number) => {
  formData.value.projects.splice(index, 1)
}

const formatDate = (date: string) => {
  return date ? dayjs(date).format('YYYY.MM') : ''
}

const generatePDF = () => {
  if (!formData.value.name) {
    ElMessage.warning('请至少填写姓名后再生成简历')
    return
  }

  const element = document.getElementById('resume-preview')
  const opt = {
    margin: 0.5,
    filename: `${formData.value.name}的简历_${dayjs().format('YYYY-MM-DD')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }
  
  html2pdf().set(opt).from(element).save()
}
</script>

<template>
  <div class="container">
    <div class="content-wrapper">
      <!-- 表单部分 -->
      <div class="form-section">
        <h1 class="title">简历生成器</h1>
        <el-form :model="formData" label-width="100px" class="resume-form">
          <el-collapse accordion>
            <!-- 基本信息 -->
            <el-collapse-item title="基本信息" name="1">
              <el-form-item label="姓名">
                <el-input v-model="formData.name" placeholder="请输入姓名" />
              </el-form-item>
              
              <el-form-item label="职位">
                <el-input v-model="formData.title" placeholder="期望职位" />
              </el-form-item>
              
              <el-form-item label="邮箱">
                <el-input v-model="formData.email" placeholder="请输入邮箱" />
              </el-form-item>
              
              <el-form-item label="电话">
                <el-input v-model="formData.phone" placeholder="请输入电话" />
              </el-form-item>
              
              <el-form-item label="所在地">
                <el-input v-model="formData.location" placeholder="城市" />
              </el-form-item>
              
              <el-form-item label="个人网站">
                <el-input v-model="formData.website" placeholder="个人网站/博客/GitHub" />
              </el-form-item>
              
              <el-form-item label="个人简介">
                <el-input
                  v-model="formData.summary"
                  type="textarea"
                  rows="4"
                  placeholder="简短的个人介绍"
                />
              </el-form-item>
            </el-collapse-item>

            <!-- 教育经历 -->
            <el-collapse-item title="教育经历" name="2">
              <el-button type="primary" plain @click="addEducation" style="margin-bottom: 20px">
                添加教育经历
              </el-button>
              
              <div v-for="(edu, index) in formData.education" :key="index" class="section-item">
                <div class="section-header">
                  <h3>教育经历 #{{ index + 1 }}</h3>
                  <el-button type="danger" plain @click="removeEducation(index)">删除</el-button>
                </div>
                
                <el-form-item label="学校">
                  <el-input v-model="edu.school" placeholder="学校名称" />
                </el-form-item>
                
                <el-form-item label="学位">
                  <el-input v-model="edu.degree" placeholder="学位" />
                </el-form-item>
                
                <el-form-item label="专业">
                  <el-input v-model="edu.major" placeholder="专业" />
                </el-form-item>
                
                <el-form-item label="起止时间">
                  <el-date-picker
                    v-model="edu.startDate"
                    type="month"
                    placeholder="开始时间"
                    style="width: 45%"
                  />
                  <span style="margin: 0 10px">至</span>
                  <el-date-picker
                    v-model="edu.endDate"
                    type="month"
                    placeholder="结束时间"
                    style="width: 45%"
                  />
                </el-form-item>
                
                <el-form-item label="描述">
                  <el-input
                    v-model="edu.description"
                    type="textarea"
                    rows="3"
                    placeholder="在校经历、成绩等"
                  />
                </el-form-item>
              </div>
            </el-collapse-item>

            <!-- 工作经验 -->
            <el-collapse-item title="工作经验" name="3">
              <el-button type="primary" plain @click="addExperience" style="margin-bottom: 20px">
                添加工作经验
              </el-button>
              
              <div v-for="(exp, index) in formData.experience" :key="index" class="section-item">
                <div class="section-header">
                  <h3>工作经验 #{{ index + 1 }}</h3>
                  <el-button type="danger" plain @click="removeExperience(index)">删除</el-button>
                </div>
                
                <el-form-item label="公司">
                  <el-input v-model="exp.company" placeholder="公司名称" />
                </el-form-item>
                
                <el-form-item label="职位">
                  <el-input v-model="exp.position" placeholder="职位名称" />
                </el-form-item>
                
                <el-form-item label="起止时间">
                  <el-date-picker
                    v-model="exp.startDate"
                    type="month"
                    placeholder="开始时间"
                    style="width: 45%"
                  />
                  <span style="margin: 0 10px">至</span>
                  <el-date-picker
                    v-model="exp.endDate"
                    type="month"
                    placeholder="结束时间"
                    style="width: 45%"
                  />
                </el-form-item>
                
                <el-form-item label="工作描述">
                  <el-input
                    v-model="exp.description"
                    type="textarea"
                    rows="4"
                    placeholder="工作职责、成就等"
                  />
                </el-form-item>
              </div>
            </el-collapse-item>

            <!-- 项目经验 -->
            <el-collapse-item title="项目经验" name="4">
              <el-button type="primary" plain @click="addProject" style="margin-bottom: 20px">
                添加项目经验
              </el-button>
              
              <div v-for="(proj, index) in formData.projects" :key="index" class="section-item">
                <div class="section-header">
                  <h3>项目经验 #{{ index + 1 }}</h3>
                  <el-button type="danger" plain @click="removeProject(index)">删除</el-button>
                </div>
                
                <el-form-item label="项目名称">
                  <el-input v-model="proj.name" placeholder="项目名称" />
                </el-form-item>
                
                <el-form-item label="担任角色">
                  <el-input v-model="proj.role" placeholder="项目中的角色" />
                </el-form-item>
                
                <el-form-item label="起止时间">
                  <el-date-picker
                    v-model="proj.startDate"
                    type="month"
                    placeholder="开始时间"
                    style="width: 45%"
                  />
                  <span style="margin: 0 10px">至</span>
                  <el-date-picker
                    v-model="proj.endDate"
                    type="month"
                    placeholder="结束时间"
                    style="width: 45%"
                  />
                </el-form-item>
                
                <el-form-item label="项目描述">
                  <el-input
                    v-model="proj.description"
                    type="textarea"
                    rows="4"
                    placeholder="项目背景、职责、成果等"
                  />
                </el-form-item>
                
                <el-form-item label="技术栈">
                  <el-input
                    v-model="proj.technologies"
                    placeholder="使用的技术、工具等"
                  />
                </el-form-item>
              </div>
            </el-collapse-item>

            <!-- 技能特长 -->
            <el-collapse-item title="技能特长" name="5">
              <el-form-item label="技术技能">
                <el-input
                  v-model="formData.technicalSkills"
                  type="textarea"
                  rows="4"
                  placeholder="编程语言、框架、工具等"
                />
              </el-form-item>
              
              <el-form-item label="软技能">
                <el-input
                  v-model="formData.softSkills"
                  type="textarea"
                  rows="3"
                  placeholder="沟通能力、团队协作等"
                />
              </el-form-item>
              
              <el-form-item label="语言能力">
                <el-input
                  v-model="formData.languages"
                  type="textarea"
                  rows="2"
                  placeholder="语言水平、等级证书等"
                />
              </el-form-item>
              
              <el-form-item label="证书认证">
                <el-input
                  v-model="formData.certifications"
                  type="textarea"
                  rows="3"
                  placeholder="专业证书、技能认证等"
                />
              </el-form-item>
            </el-collapse-item>
          </el-collapse>

          <el-form-item style="margin-top: 20px">
            <el-button type="primary" @click="generatePDF">下载PDF简历</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 预览部分 -->
      <div class="preview-section">
        <h2 class="preview-title">实时预览</h2>
        <div id="resume-preview" class="resume-preview">
          <!-- 简历头部 -->
          <div class="resume-header">
            <h1 class="resume-name">{{ formData.name || '姓名' }}</h1>
            <h2 class="resume-title" v-if="formData.title">{{ formData.title }}</h2>
            <div class="resume-contact">
              <p v-if="formData.email"><el-icon><Message /></el-icon> {{ formData.email }}</p>
              <p v-if="formData.phone"><el-icon><Phone /></el-icon> {{ formData.phone }}</p>
              <p v-if="formData.location"><el-icon><Location /></el-icon> {{ formData.location }}</p>
              <p v-if="formData.website"><el-icon><Link /></el-icon> {{ formData.website }}</p>
            </div>
          </div>

          <!-- 个人简介 -->
          <div class="resume-section" v-if="formData.summary">
            <h2>个人简介</h2>
            <p>{{ formData.summary }}</p>
          </div>

          <!-- 教育经历 -->
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

          <!-- 工作经验 -->
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

          <!-- 项目经验 -->
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

          <!-- 技能特长 -->
          <div class="resume-section" v-if="formData.technicalSkills || formData.softSkills || formData.languages || formData.certifications">
            <h2>技能特长</h2>
            <div v-if="formData.technicalSkills" class="skill-item">
              <h3>技术技能</h3>
              <p>{{ formData.technicalSkills }}</p>
            </div>
            <div v-if="formData.softSkills" class="skill-item">
              <h3>软技能</h3>
              <p>{{ formData.softSkills }}</p>
            </div>
            <div v-if="formData.languages" class="skill-item">
              <h3>语言能力</h3>
              <p>{{ formData.languages }}</p>
            </div>
            <div v-if="formData.certifications" class="skill-item">
              <h3>证书认证</h3>
              <p>{{ formData.certifications }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 2rem;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.form-section {
  .title {
    text-align: center;
    color: var(--el-color-primary);
    margin-bottom: 2rem;
  }

  .resume-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  .section-item {
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h3 {
        margin: 0;
        color: var(--el-color-primary);
      }
    }
  }
}

.preview-section {
  position: sticky;
  top: 2rem;
  
  .preview-title {
    text-align: center;
    color: var(--el-color-primary);
    margin-bottom: 2rem;
  }
}

.resume-preview {
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-height: 800px;

  .resume-header {
    text-align: center;
    margin-bottom: 2rem;
    
    .resume-name {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: var(--el-color-primary);
    }

    .resume-title {
      font-size: 1.25rem;
      color: var(--el-text-color-regular);
      margin-bottom: 1rem;
    }

    .resume-contact {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      color: var(--el-text-color-secondary);

      p {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }

  .resume-section {
    margin-bottom: 2rem;
    
    h2 {
      color: var(--el-color-primary);
      border-bottom: 2px solid var(--el-color-primary);
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }

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

    .skill-item {
      margin-bottom: 1rem;

      h3 {
        color: var(--el-text-color-primary);
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        white-space: pre-line;
        line-height: 1.6;
        color: var(--el-text-color-regular);
      }
    }
  }
}

@media (max-width: 1200px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .preview-section {
    position: static;
  }
}
</style>