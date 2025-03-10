// import type { UserInfo } from '@/api/modules/user/types'
// ? temp
export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  email: string
  phone: string
  roles: string[]
  permissions: string[]
}

/* UserState */
export interface UserState {
  token: string
  userInfo: Partial<UserInfo>
}
