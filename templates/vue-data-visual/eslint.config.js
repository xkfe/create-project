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
