import type { AskQuestionsOptions } from '@/types'
import type { PromptObject } from 'prompts'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { SOURCE_TYPES } from '@/config'
import { hint } from '@/constants'
import prompts from 'prompts'
import { templates } from '../templateData'
import { confirmOverwrite } from './confirmOverwrite'
import { onCancel } from './onCancel'
import { validateSource, validateTemplate } from './validate'

/**
 * 询问用户输入或使用传入的选项
 * @param {AskQuestionsOptions} [options] - 命令行传入的选项
 * @returns {Promise<AskQuestionsOptions>} 返回包含用户输入或命令行的选项
 */
export async function askQuestions(options: AskQuestionsOptions): Promise<AskQuestionsOptions> {
  const questions: PromptObject<string>[] = []
  try {
    if (!options.projectName) {
      questions.push({
        type: 'text',
        name: 'projectName',
        message: '请输入项目名称:',
        initial: 'project-name',
        hint,
      })
    }
    else {
      const projectPath = join(process.cwd(), options.projectName)
      if (existsSync(projectPath)) {
        // 文件夹已存在，询问是否覆盖
        const overwrite = await prompts({
          type: 'toggle',
          name: 'overwrite',
          message: `项目名称 "${options.projectName}" 已存在，是否覆盖?`,
          initial: false,
          active: '是',
          inactive: '否',
        })

        if (!overwrite.overwrite) {
          console.log('操作已取消。')
          process.exit(1)
        }
      }
    }

    questions.push(...confirmOverwrite())

    if (!options.template) {
      questions.push({
        type: 'select',
        name: 'template',
        message: '请选择项目模板？',
        choices: templates.map(t => ({ title: t.name, description: t.description })),
        initial: 0,
        hint,
      })
    }
    else {
      validateTemplate(options.template)
    }

    if (!options.source) {
      // questions.push({
      //   type: 'select',
      //   name: 'source',
      //   message: '请选择拉取源:',
      //   choices: SOURCE_TYPES.map((t) => {
      //     return {
      //       title: t,
      //       disabled: t !== 'cli templates',
      //     }
      //   }),
      //   initial: 0,
      //   hint,
      //   warn: '拉取指定仓库目录,正寻求方案中...',
      // })
    }
    else {
      validateSource(options.source)
    }

    const answers = await prompts(questions, { onCancel })
    answers.template = typeof answers.template === 'number' ? templates[answers.template].name : (answers.template || options.template)
    answers.source = typeof answers.source === 'number' ? SOURCE_TYPES[answers.source] : (answers.source || options.source || 'cli templates')
    return { ...options, ...answers }
  }
  catch (cancelled) {
    console.log((<{ message: string }>cancelled).message)
    process.exit(1)
  }
}
