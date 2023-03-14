// 变量名对应含义请在 /stores/* 里边找
import { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'

export interface Layout {
  showDrawer: boolean
  shrink: boolean
  layoutMode: string
  mainAnimation: string
  isDark: boolean
  menuWidth: number
  menuDefaultIcon: string
  menuCollapse: boolean
  menuUniqueOpened: boolean
  menuShowTopBar: boolean
  menuBackground: string[]
  menuColor: string[]
  menuActiveBackground: string[]
  menuActiveColor: string[]
  menuTopBarBackground: string[]
  headerBarTabColor: string[]
  headerBarBackground: string[]
  headerBarHoverBackground: string[]
  headerBarTabActiveBackground: string[]
  headerBarTabActiveColor: string[]
}

export interface AdminInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  lastlogintime: string
  token: string
  refreshToken: string
  super: boolean
}

export interface UserInfo {
  _id: number
  username: string
  nickname: string
  email: string
  mobile: string
  gender: number
  birthday: string
  money: number
  score: number
  avatar: string
  lastlogintime: string
  lastloginip: string
  jointime: string
  motto: string
  token: string
  refreshToken: string
  super: boolean
}

export interface SiteConfig {
  siteName: string
  recordNumber?: string
  version: string
  cdnUrl: string
  apiUrl: string
  upload: {
    mode: string
    maxsize: number
    mimetype: string
    savename: string
    url?: string
    params?: anyObj
  }
}
export interface NavTabs {
  activeIndex: number
  activeRoute: RouteLocationNormalized | null
  tabsView: RouteLocationNormalized[]
  tabFullScreen: boolean
  tabsViewRoutes: RouteRecordRaw[]
  authNode: Map<string, string[]>
}
