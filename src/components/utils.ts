// src/utils/pdfGenerator.ts
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import html2pdf from 'html2pdf.js';
import type { ResumeFormData } from './types';

/**
 * 格式化日期为 YYYY.MM 格式
 * @param date 日期字符串
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: string): string => {
  return date ? dayjs(date).format('YYYY.MM') : '';
};

/**
 * 生成完整的简历HTML内容
 * @param formData 简历数据
 * @returns 生成的HTML字符串
 */
const generateResumeHTML = (formData: ResumeFormData): string => {
  return `
    <div style="width:210mm; margin:0 auto; padding:15mm; font-family:Arial; box-sizing:border-box;">
      <!-- 头部信息 -->
      <div style="text-align:center; margin-bottom:20px;">
        ${formData.avatar ? `
        <img src="${formData.avatar}" style="width:80px; height:80px; object-fit:cover; border-radius:50%; margin-bottom:10px;">
        ` : ''}
        <h1 style="margin:0; font-size:24pt;">${formData.name || '姓名'}</h1>
        <h2 style="margin:0; color:#555; font-size:16pt;">${formData.title || '职位'}</h2>
      </div>

      <!-- 联系信息 -->
      <div style="display:flex; justify-content:center; flex-wrap:wrap; gap:15px; margin-bottom:20px;">
        ${formData.email ? `<div>📧 ${formData.email}</div>` : ''}
        ${formData.phone ? `<div>📱 ${formData.phone}</div>` : ''}
        ${formData.location ? `<div>📍 ${formData.location}</div>` : ''}
        ${formData.website ? `<div>🌐 ${formData.website}</div>` : ''}
      </div>

      <!-- 个人简介 -->
      ${formData.summary ? `
      <div style="margin-bottom:20px;">
        <h3 style="border-bottom:1px solid #eee; padding-bottom:5px;">个人简介</h3>
        <p style="line-height:1.6;">${formData.summary}</p>
      </div>
      ` : ''}

      <!-- 教育经历 -->
      ${formData.education?.length ? `
      <div style="margin-bottom:20px;">
        <h3 style="border-bottom:1px solid #eee; padding-bottom:5px;">教育经历</h3>
        ${formData.education.map(edu => `
          <div style="margin-bottom:15px;">
            <div style="display:flex; justify-content:space-between;">
              <strong>${edu.school || ''}</strong>
              <span>${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : '至今'}</span>
            </div>
            <div>${edu.degree || ''} ${edu.major ? `· ${edu.major}` : ''}</div>
            ${edu.description ? `<p style="margin-top:5px; line-height:1.5;">${edu.description}</p>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- 其他部分类似添加... -->
    </div>
  `;
};

/**
 * 生成PDF简历
 * @param formData 简历数据
 */
export const generatePDF = async (formData: ResumeFormData): Promise<void> => {
  const element = document.createElement('div');
  try {
    // 1. 创建打印内容
    element.innerHTML = generateResumeHTML(formData);
    element.style.width = '210mm';
    element.style.minHeight = '297mm';
    element.style.padding = '20mm';
    element.style.boxSizing = 'border-box';
    element.style.visibility = 'hidden';
    element.style.position = 'fixed';
    element.style.left = '0';
    element.style.top = '0';
    document.body.appendChild(element);

    // 2. 生成PDF配置
    const options = {
      margin: 10,
      filename: `${formData.name || '我的简历'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };

    // 3. 生成并下载PDF
    await html2pdf().set(options).from(element).save();
    ElMessage.success('简历PDF生成成功');
  } catch (error) {
    console.error('PDF生成失败:', error);
    ElMessage.error(`PDF生成失败: ${(error as Error).message}`);
  } finally {
    if (document.body.contains(element)) {
      document.body.removeChild(element);
    }
  }
};