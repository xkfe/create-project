import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [],
  },
  {
    rules: {
      'no-console': 'warn',
      'no-new': 'off',
      'curly': 'off',
    },
  },
)
