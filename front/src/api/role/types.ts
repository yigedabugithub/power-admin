export interface UserInfo {
  nickname: string
  avatar: string
  roles: string[]
  perms: string[]
  userId: string
}

export interface LoginForm {
  userName: string
  passWord: string
}
