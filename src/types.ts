import type { SOURCE_TYPES } from './config'

export interface AskQuestionsOptions {
  /** 项目名称 */
  projectName?: string
  /** 是否覆盖 */
  shouldOverwrite?: boolean
  /** 项目模板 */
  template?: string
  /** 拉取源 */
  source?: typeof SOURCE_TYPES[number]
}
