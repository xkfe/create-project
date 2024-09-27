import process from 'node:process'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import ci from 'miniprogram-ci'
import dayjs from 'dayjs'
import zhCn from 'dayjs/locale/zh-cn.js'
import { loadEnv } from 'vite'

dayjs.locale(zhCn)

const GIT_GLOBAL_USERNAME = execFileSync('git', ['config', '--global', 'user.name'], { encoding: 'utf-8' })
const packageJSON = JSON.parse(readFileSync('./package.json'))

const MODE = process.argv.slice(2)?.pop() || 'production'
const ENV = loadEnv(MODE, 'env')
console.log('upload ENV APP_ID :>> ', ENV.VITE_APP_ID)

;(async () => {
  const localeNow = dayjs().format('YYYY年M月D日Ahh点mm分')
  const project = new ci.Project({
    appid: ENV.VITE_APP_ID,
    type: 'miniProgram',
    projectPath: `${process.cwd()}/dist/build/mp-weixin`,
    privateKeyPath: `${process.cwd()}/private.wx.key`,
    ignores: ['node_modules/**/*'],
  })
  try {
    await ci.upload({
      project,
      version: packageJSON.version,
      desc: `${localeNow} - by@${GIT_GLOBAL_USERNAME || '小凯同学'}`,
      setting: {
        minify: true,
        minifyJS: true,
        minifyWXML: true,
        minifyWXSS: true,
        // es6: true,
      },
      // onProgressUpdate: (e) => {
      //   console.log('上传中：', e)
      // },
    })
    // console.log('上传成功')
    console.log('上传成功')
  }
  catch (error) {
    console.log('上传失败：', error)
  }
})()
