import type { PromptObject } from 'prompts'
import {
  existsSync,
  rmdirSync,
  unlinkSync,
} from 'node:fs'
import process from 'node:process'
import { canSkipEmptying } from './canSkipEmptying'
import { postOrderDirectoryTraverse } from './directoryTraverse'
import { cancelMesssage } from './onCancel'

export function confirmOverwrite(targetDir?: string): PromptObject<string>[] {
  return [
    {
      name: 'shouldOverwrite',
      type: prevValue => (canSkipEmptying(targetDir ?? prevValue) ? null : 'toggle'),
      message: (prevValue) => {
        const _targetDir = targetDir ?? prevValue
        const dirForPrompt = _targetDir === '.' ? '当前文件' : `目标文件"${_targetDir}"`

        return `${dirForPrompt}非空，是否覆盖？`
      },
      initial: false,
      active: '是',
      inactive: '否',
    },
    {
      name: 'overwriteChecker',
      type: (prevValues) => {
        if (prevValues === false) {
          console.log(cancelMesssage)
          process.exit(1)
        }

        return null
      },
    },
  ]
}

export function emptyDir(dir: string) {
  if (!existsSync(dir))
    return

  postOrderDirectoryTraverse(
    dir,
    dir => rmdirSync(dir),
    file => unlinkSync(file),
  )
}
