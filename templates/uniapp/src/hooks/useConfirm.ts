import type { Message } from 'wot-design-uni/components/wd-message-box/types'
import type { Toast } from 'wot-design-uni/components/wd-toast/types'

interface BaseConfirmOptions {
  message: string
  messageBox: Message
  title?: string
}

interface ApiConfirmOptions extends BaseConfirmOptions {
  api: (params: any) => Promise<any>
  params?: any
  toast: Toast
}

type ConfirmOptions = ApiConfirmOptions | BaseConfirmOptions

/**
 * @description 操作数据信息 (二次确认【删除、禁用、启用, 退出】等)
 * @param {Function} api 操作数据接口的api方法
 * @param {object} params 携带的操作数据参数 {id,params} (传递api时必传)
 * @param {string} message 提示信息 (必传)
 * @param {object} messageBox wot-design-uni 的 messageBox hooks
 * @param {object} toast wot-design-uni 的 toast hooks (传递api时必传)
 * @returns {Promise}
 */

export function useConfirm(options: ApiConfirmOptions): Promise<{ action: 'confirm' | 'cancel' | 'modal' }>
export function useConfirm(options: BaseConfirmOptions): Promise<{ action: 'confirm' | 'cancel' | 'modal' }>
export function useConfirm(options: ConfirmOptions): Promise<{ action: 'confirm' | 'cancel' | 'modal' }> {
  return new Promise((resolve, reject) => {
    const { message, messageBox, title = '提示' } = options

    if ('api' in options) {
      const { api, params = {}, toast } = options
      messageBox.confirm({
        msg: message,
        title,
        beforeConfirm: async ({ resolve }) => {
          const res = await api(params)
          if (!res) {
            return reject(new Error('操作失败'))
          }
          resolve(true)
          toast.success('操作成功!')
        },
      }).then(() => {
        resolve({ action: 'confirm' })
      }).catch((error) => {
        reject(error)
      })
    }
    else {
      messageBox.confirm({
        msg: `是否${message}?`,
        title,
      }).then(() => {
        resolve({ action: 'confirm' })
      }).catch((error) => {
        reject(error)
      })
    }
  })
}
