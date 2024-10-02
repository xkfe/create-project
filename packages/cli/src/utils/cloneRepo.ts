import type { SOURCE_TYPES } from '@/config'
import type { AskQuestionsOptions } from '@/types'
import type { Ora } from './ora'
import { exec } from 'node:child_process'
import { join, resolve } from 'node:path'
import process from 'node:process'
import { templates } from '@/templateData'
import fs from 'fs-extra'
import { bold, green, red } from 'kolorist'
import figures from 'prompts/lib/util/figures.js'
import { ora } from './ora'
import { printFinish } from './printFinish'
import { replaceProjectName } from './setPackageName'

type TemplateName = typeof templates[number]['name']

const cwd = process.cwd()
const userAgent = process.env.npm_config_user_agent ?? ''
const packageManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm'

let loading: Ora

async function removeGitFolder(localPath: string): Promise<void> {
  const gitFolderPath = join(localPath, '.git')
  await fs.rm(gitFolderPath, { recursive: true, force: true })

  // 删除 dist 目录
  const distFolderPath = join(localPath, 'dist')
  console.log(distFolderPath, 222)
  await fs.rm(distFolderPath, { recursive: true, force: true })
}

async function cloneRepo(gitUrl: string, localPath: string): Promise<void> {
  let lastError = null

  try {
    await new Promise<void>((resolve, reject) => {
      exec(`git clone ${gitUrl} ${localPath}`, async (error) => {
        if (error) {
          reject(error)
          return
        }

        try {
          await removeGitFolder(localPath)
          resolve()
        }
        catch (error) {
          reject(error)
        }
      })
    })
    return
  }
  catch (error) {
    lastError = error
  }

  if (lastError)
    throw new Error(lastError)
}

function getRepoUrl(template: TemplateName, repoSource: typeof SOURCE_TYPES[number]) {
  return templates.find(t => t.name === template)?.[repoSource]
}

async function downloadUrlTemplate(options: AskQuestionsOptions & { root: string }) {
  const { template, source, root } = options
  const repoUrl = getRepoUrl(template as TemplateName, source)
  loading = ora(`${bold(`正在从 ${repoUrl} 拉取项目...`)}`).start()
  await cloneRepo(repoUrl, root)
}

async function downloadCliTemplate(options: AskQuestionsOptions & { root: string }) {
  const { template, root } = options
  loading = ora(`${bold('正在创建模板...')}`).start()
  // const __dirname = dirname(new URL(import.meta.url).pathname)
  const templateRoot = resolve(__dirname, './../templates')
  const templatePath = join(templateRoot, template)
  await fs.copy(templatePath, root)
  await removeGitFolder(root)
}

export async function dowload(options: AskQuestionsOptions & { root: string }) {
  const { projectName, source, root } = options
  try {
    if (source === 'cli templates') {
      await downloadCliTemplate(options)
    }
    else {
      await downloadUrlTemplate(options)
    }
    replaceProjectName(root, projectName)
    printFinish(root, cwd, packageManager, loading)
  }
  catch (error) {
    loading.fail(`${bold(source === 'cli templates' ? '创建模板失败!' : '拉取模版失败,请检查网络或仓库地址是否正确!')}`)
    console.log(`${red(figures.cross)} ${red(error)}`)
    console.log(`🚀 遇到问题? 快速反馈：${green('https://github.com/xkfe/project-templates/issues')}`)
    process.exit(1)
  }
}
