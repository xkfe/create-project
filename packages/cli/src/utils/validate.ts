import process from 'node:process'
import { SOURCE_TYPES } from '@/config'
import { templates } from '@/templateData'
import { bold, red } from 'kolorist'
import figures from 'prompts/lib/util/figures.js'

export function validateTemplate(template) {
  const templateNames = templates.map(t => t.name)
  if (!templateNames.includes(template)) {
    console.error((`${red(figures.cross)} ${bold(`无效的模板名称: "${template}", 有效模板为: ${templateNames.join(' | ')}`)}`))
    process.exit(1)
  }
}

export function validateSource(source) {
  if (!SOURCE_TYPES.includes(source)) {
    console.error((`${red(figures.cross)} ${bold(`无效的拉取源: "${source}", 。有效的拉取源为: ${SOURCE_TYPES.join(' | ')}`)}`))
    process.exit(1)
  }
  else if (source !== 'cli templates') {
    console.error((`${red(figures.cross)} ${bold(`暂不支持的拉取源: "${source}", 请使用 "cli templates" 拉取源`)}`))
    process.exit(1)
  }
}
