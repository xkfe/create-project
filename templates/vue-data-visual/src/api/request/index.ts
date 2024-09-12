/*
 * @Author: xkfe
 * @Date: 2024-09-10 23:29:56
 * @LastEditors: xkfe
 * @LastEditTime: 2024-09-12 22:47:00
 * @Description: 基于 alova 封装的请求
 * @see https://alova.js.org/
 */
import { createAlova } from 'alova'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import NProgress from './nprogress'
import { ResultEnum } from './httpEnum'

const alovaInstance = createAlova({
  requestAdapter: fetchAdapter(),
  statesHook: VueHook,
  baseURL: import.meta.env.VITE_API_URL,
  timeout: ResultEnum.TIMEOUT as number,
  beforeRequest(method) {
    NProgress.start()
    method.config.headers.token = 'token'
  },
  responded: {
    onSuccess: async (response) => {
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      const json = await response.json()
      // if (json.code !== 200) {
      //   throw new Error(json.message)
      // }

      // 解析的响应数据将传给method实例的transform钩子函数，这些函数将在后续讲解
      // return json.data
      return json
    },
    onError: (error) => {
      console.error(error.message)
    },
    onComplete: async (method) => {
      console.log('method :>> ', method)
      NProgress.done()
    },
  },
})

export default alovaInstance
