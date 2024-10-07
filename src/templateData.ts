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
] as const
