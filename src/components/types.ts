/**
 * 简历数据类型定义
 */
// 教育经历接口
export interface Education {
    school: string
    degree: string
    major: string
    startDate: string
    endDate: string
    description: string
  }
  
  // 工作经验接口
  export interface Experience {
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }
  
  // 项目经验接口
  export interface Project {
    name: string
    role: string
    startDate: string
    endDate: string
    description: string
    technologies: string
  }
  
  // 简历表单数据接口
  export interface ResumeFormData {
    skills(arg0: string, skills: any): unknown
    avatar?: string   //头像
    name: string
    title: string
    email: string
    phone: string
    location: string
    website: string
    summary: string
    education: Education[]
    experience: Experience[]
    projects: Project[]
    technicalSkills: string
    softSkills: string
    languages: string
    certifications: string
  }
