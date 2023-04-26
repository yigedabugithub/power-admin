// import request from '@/utils/request'
import request from '@/utils/axios'

import { AxiosPromise } from 'axios'
const baseApi = 'api/menu'

/**
 * 获取路由列表
 */
export function listRoutes(params?: any) {
  return request({
    url: baseApi + '/routes',
    method: 'get',
    params
    // mock: true
  })
}
export function listMenusAll(params?: any) {
  return request({
    url: baseApi + '/index',
    method: 'get',
    params
    // mock: true
  })
}
