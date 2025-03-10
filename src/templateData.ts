/*
 * @Author: 小凯同学
 * @Date: 2024-10-02 16:12:07
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 22:28:19
 * @Description: 模版数据
 */
import { PREFIX_GITEE, PREFIX_GITHUB } from '@/config'

// 模版配置
export const templates = [
  {
    name: 'uniapp',
    description: 'vscode+uniapp基于最新技术栈的快速开发模板',
    github: `${PREFIX_GITHUB}/uniapp`,
    gitee: `${PREFIX_GITEE}/uniapp`,
  },
  {
    name: 'vue-data-visual',
    description: 'Vue + ECharts 基于最新技术栈的自适应数据大屏开发模版',
    github: `${PREFIX_GITHUB}/vue-data-visual`,
    gitee: `${PREFIX_GITEE}/vue-data-visual`,
  },
  {
    name: 'vue-starter',
    description: '适合官网、后台的vue3快速开发模版',
    github: `${PREFIX_GITHUB}/vue-starter`,
    gitee: `${PREFIX_GITEE}/vue-starter`,
  },
] as const
