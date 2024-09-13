/*
 * @Author: xkfe
 * @Date: 2024-09-10 23:29:56
 * @LastEditors: xkfe
 * @LastEditTime: 2024-09-13 16:22:25
 * @Description: 基于 alova 封装的请求
 * @see https://alova.js.org/
 */
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import NProgress from './nprogress'
import { ResultEnum } from './httpEnum'

const alovaInst = createAlova({
  requestAdapter: adapterFetch(),
  statesHook: VueHook,
  baseURL: import.meta.env.VITE_API_URL,
  timeout: ResultEnum.TIMEOUT as number,
  beforeRequest(method) {
    NProgress.start()
    if (!method.meta?.ignoreToken) {
      method.config.headers.token = 'token'
    }
  },
  responded: {
    onSuccess: async (response) => {
      const json = await response.json()
      return json
    },
    onError: () => {
      debugger
    },
    onComplete: () => {
      NProgress.done()
    },
  },
})

export default alovaInst
