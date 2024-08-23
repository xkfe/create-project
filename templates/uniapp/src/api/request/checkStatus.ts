type Icon = 'success' | 'loading' | 'none' | 'error'
function ErrorMsg(title: string, icon: Icon = 'none') {
  uni.showToast({ title, icon })
}

/**
 * @description: 校验网络请求状态码
 * @param {number} status
 * @return void
 */
export function checkStatus(status: number | undefined, msg?: string) {
  switch (status) {
    case 1:
      handleMsg(status, msg || '网络超时')
      break
    case 400:
      handleMsg(status, msg || '请求失败！请您稍后重试')
      break
    case 401:
      handleMsg(status, msg || '登录失效！请您重新登录')
      break
    case 403:
      handleMsg(status, msg || '当前账号无权限访问')
      break
    case 404:
      handleMsg(status, msg || '你所访问的资源不存在')
      break
    case 405:
      handleMsg(status, msg || '请求方式错误！请您稍后重试')
      break
    case 408:
      handleMsg(status, msg || '请求超时！请您稍后重试')
      break
    case 500:
      handleMsg(status, msg || '服务异常！请您稍后重试')
      break
    case 502:
      handleMsg(status, msg || '网关错误')
      break
    case 503:
      handleMsg(status, msg || '服务不可用')
      break
    case 504:
      handleMsg(status, msg || '网关超时')
      break
    default:
      handleMsg(status, msg || '服务异常！请您稍后重试')
  }
}

function handleMsg(_status: number | undefined, msg: string) {
  ErrorMsg(`${msg}`)
}
