import { defineStore } from 'pinia'

const initState = { nickname: '', avatar: '', token: '' }
type UserInfo = typeof initState

export const useUserStore = defineStore('user', () => {
  const USER_INFO = ref<UserInfo>({ ...initState })

  const IS_LOGIN = computed(() => !!USER_INFO.value.token)
  const SET_USER_INFO = (val: UserInfo) => {
    USER_INFO.value = val
  }

  const CLEAR_USER_INFO = () => {
    USER_INFO.value = { ...initState }
  }

  return {
    USER_INFO,
    IS_LOGIN,
    SET_USER_INFO,
    CLEAR_USER_INFO,
  }
}, {
  persist: {
    enabled: true,
    H5Storage: window?.localStorage,
  },
})
