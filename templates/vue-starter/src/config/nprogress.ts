/*
 * @Author: 小凯同学
 * @Date: 2025-03-10 20:59:54
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 21:00:00
 * @Description:
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
})

export default NProgress
