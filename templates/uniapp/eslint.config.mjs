// eslint.config.mjs
import uniHelper from '@uni-helper/eslint-config'

export default uniHelper({
  unocss: true,
  // Ignored rule
  rules: {
    'no-console': 'off',
    'ts/no-unused-expressions': 'off',
  },
}, {
  // Ignore files
  ignores: [

  ],
})
