/*
 * @Author: 小凯同学
 * @Date: 2025-03-10 19:11:21
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 22:14:52
 * @Description:
 */
import type { UserState } from '@/stores/interface/index'
import { STORE_PREFIX } from '@/config/app'
import piniaPersistConfig from '@/stores/persist'
import { defineStore } from 'pinia'

const id = `${STORE_PREFIX}user`
export const useUserStore = defineStore(id, () => {
  // State
  const state = reactive<UserState>({
    token: '',
    userInfo: {},
  })

  // Getters
  const getToken = computed(() => state.token)
  const getUserInfo = computed(() => state.userInfo)

  // Actions
  function setToken(token: string) {
    state.token = token
  }

  function setUserInfo(userInfo: UserState['userInfo']) {
    state.userInfo = userInfo
  }

  /** 退出登录 */
  async function logout() {
    // 1.执行退出登录接口
    // 2.清除 Token
    setToken('')
    // 3.清除用户信息
    setUserInfo({})
  }

  return {
    ...toRefs(state),
    getToken,
    getUserInfo,
    setToken,
    setUserInfo,
    logout,
  }
}, {
  persist: piniaPersistConfig(id),
})
