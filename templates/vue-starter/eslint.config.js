/*
 * @Author: 小凯同学
 * @Date: 2025-03-10 20:50:17
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 20:50:24
 * @Description:
 */
import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-restricted-syntax': 'off',
    'antfu/if-newline': 'off',
  },
})
