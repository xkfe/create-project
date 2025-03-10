/*
 * @Author: 小凯同学
 * @Date: 2025-01-03 22:15:26
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 20:58:56
 * @Description: 操作单条数据信息 (二次确认【删除、禁用、启用、重置密码】)
 */
import type { MessageProps, NotificationProps } from 'element-plus'
import type { Ref } from 'vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

type NotificationType = NotificationProps['type']
type MessageType = MessageProps['type']

interface HandleDataOptions {
  api: (params: any) => Promise<any>
  params?: any
  message?: string
  confirmType?: MessageType | NotificationType
  loading?: Ref<boolean>
  messageType?: 'message' | 'notification'
}

/**
 * @description 操作单条数据信息 (二次确认【删除、禁用、启用、重置密码】)
 * @param {HandleDataOptions} options 配置参数对象
 * @returns {Promise}
 */
export default function useConfirmAction(options: HandleDataOptions) {
  const {
    api,
    params = {},
    message,
    loading,
    confirmType = 'warning',
    messageType = 'message',
  } = options

  const showMessage = (type: MessageType | NotificationType, content: string) => {
    messageType === 'notification'
      ? ElNotification({ type: type as NotificationType, title: content })
      : ElMessage({ type: type as MessageType, message: content })
  }

  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(`是否${message}?`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: confirmType,
      draggable: true,
    })
      .then(async () => {
        try {
          if (loading)
            loading.value = true
          const res = await api(params)
          if (!res)
            return reject(new Error('Operation failed'))
          message && showMessage('success', `${message}成功!`)
          resolve(true)
        }
        catch (error) {
          message && showMessage('error', `${message}失败!`)
          reject(error)
        }
        finally {
          if (loading)
            loading.value = false
        }
      })
      .catch(() => {})
  })
}
