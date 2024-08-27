import { useMessage, useToast } from 'wot-design-uni'

const messageBox = useMessage()
const toast = useToast()
/**
 * @description 操作数据信息 (二次确认【删除、禁用、启用】)
 * @param {Function} api 操作数据接口的api方法 (必传)
 * @param {object} params 携带的操作数据参数 {id,params} (必传)
 * @param {string} message 提示信息 (必传)
 * @returns {Promise}
 */
export function useHandleData(api: (params: any) => Promise<any>, params: any = {}, message: string) {
  return new Promise((resolve, reject) => {
    messageBox.confirm({
      msg: `是否${message}?`,
      title: '温馨提示',
      beforeConfirm: async ({ resolve }) => {
        const res = await api(params)
        if (!res) {
          return reject(new Error('操作失败'))
        }
        resolve(true)
        toast.success(`${message}成功!`)
      },
    }).then(() => {
      resolve(true)
    })
      .catch((error) => {
        reject(error)
      })
  })
}
