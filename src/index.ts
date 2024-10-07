#!/usr/bin/env node

import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { Command } from 'commander'
import { green } from 'kolorist'
import packageJson from '../package.json'
import {
  askQuestions,
  cancelMesssage,
  dowload,
  emptyDir,
  printBanner,
} from './utils'

// 初始化 commander
const program = new Command()
program
  .name(packageJson.name)
  .usage('<project-name> [options]')
  .version(packageJson.version)
  .arguments('[project-name]')
  .option('-t, --template <template>', 'Specify the frontend template')
  .option('-s, --source <source>', 'Specify the source to pull template from (github, gitee)')
  .action((projectName, options) => {
    options.projectName = projectName
  })
  .parse(process.argv)

const options = program.opts()

// 主函数
async function run() {
  printBanner()

  const result = await askQuestions(options)
  const cwd = process.cwd()
  const root = join(cwd, result.projectName!)

  if (existsSync(root) && result.shouldOverwrite) {
    emptyDir(root)
  }

  else if (!existsSync(root)) {
    mkdirSync(root)
  }

  await dowload({ ...result, root })
}

// 执行
run().catch((error) => {
  console.log(cancelMesssage)
  console.log(error.message.includes('操作已取消') ? '' : error)
  console.log(`🚀 遇到问题? 快速反馈：${green('https://github.com/xkfe/project-templates/issues')}`)
  process.exit(0)
})
