/**
 * @description 开启 Loading
 */
function startLoading() {
  uni.showLoading({ title: '加载中...', mask: true })
}

/**
 * @description 结束 Loading
 */
function endLoading() {
  uni.hideLoading()
}

/**
 * @description 显示全屏加载
 */
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0)
    startLoading()

  needLoadingRequestCount++
}

/**
 * @description 隐藏全屏加载
 */
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0)
    return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0)
    endLoading()
}
