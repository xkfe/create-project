/*
 * @Author: xkfe xkfe16@gmail.com
 * @Date: 2024-10-01 15:53:39
 * @LastEditors: xkfe xkfe16@gmail.com
 * @LastEditTime: 2024-10-01 23:22:18
 * @Description: 请求封装
 */
import { un } from '@uni-helper/uni-network'
import type { UnConfig, UnError, UnInstance } from '@uni-helper/uni-network'
import { ResultEnum } from './httpEnum'
import { showFullScreenLoading, tryHideFullScreenLoading } from './serviceLoading'
import NProgress from './nprogress'
import { checkStatus } from './checkStatus'
import { RequestCanceler } from './cancel'
import { TOKENNAME } from '@/config'

const PLATFORM = uni.getSystemInfoSync().uniPlatform
console.groupCollapsed('uniSystemInfo :>> ', uni.getSystemInfoSync())
console.groupEnd()

export interface RequestConfig extends UnConfig {
  loading?: boolean
  cancel?: boolean
  noShowToast?: boolean
}

const config: UnConfig = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_SERVER_BASEURL as string,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
}
const requestCanceler = new RequestCanceler()

class RequestHttp {
  service: UnInstance
  public constructor(config: UnConfig) {
    // instantiation
    this.service = un.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的 token,存储到 pinia/本地储存当中
     */
    this.service.interceptors.request.use((config: RequestConfig) => {
      const userStore = useUserStore()
      // 开启进度条动画
      PLATFORM === 'web' && NProgress.start()
      // 重复请求不需要取消，在 api 服务中通过指定的第三个参数: { cancel: false } 来控制
      config.cancel ??= true
      config.cancel && requestCanceler.addPending(config)

      // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { loading: false } 来控制
      config.loading ??= true
      config.loading && showFullScreenLoading()

      const token = userStore.USER_INFO.token
      if (token && config.headers) {
        config.headers[TOKENNAME] = token
      }

      return config
    }, (error: UnError) => {
      // 关闭进度条动画
      PLATFORM === 'web' && NProgress.done()
      return Promise.reject(error)
    })

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     *  response: any 临时解决一下
     */
    this.service.interceptors.response.use((response: any & { config: RequestConfig }) => {
      const { data, config } = response
      // 关闭进度条动画
      PLATFORM === 'web' && NProgress.done()

      // const userStore = useUserStore();
      requestCanceler.removePending(config)

      config.loading && tryHideFullScreenLoading()

      // 登陆失效
      if (data && (data.code === ResultEnum.OVERDUE || data.code === ResultEnum.NOTLOGGED)) {
        response.config?.noShowToast || checkStatus(data.code, data.message)
        return Promise.reject(data)
      }

      // 全局错误信息拦截
      if (data.code && data.code !== ResultEnum.SUCCESS) {
        response.config?.noShowToast || checkStatus(data.code, data.message)
        return Promise.reject(data)
      }

      return data
    }, (error) => {
      // 关闭进度条动画
      PLATFORM === 'web' && NProgress.done()
      // loading -> false
      tryHideFullScreenLoading()
      const { response } = error
      if (response) {
        checkStatus(response.code, response.message)
      }

      return Promise.reject(response)
    })
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.get(url, { params, ..._object })
  }

  post<T>(url: string, params?: object | string, _object = {}): Promise<T> {
    return this.service.post(url, params, _object)
  }

  put<T>(url: string, params?: object, _object = {}): Promise<T> {
    return this.service.put(url, params, _object)
  }

  delete<T>(url: string, params?: any, _object = {}): Promise<T> {
    return this.service.delete(url, { params, ..._object })
  }
}

export default new RequestHttp(config)
