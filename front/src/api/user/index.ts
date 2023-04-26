import createAxios from '@/utils/axios'

const baseApi = 'api/user'
export function loginApi(data: anyObj = {}): ApiPromise {
  return createAxios({
    url: baseApi + '/login',
    method: 'post',
    data
  }) as ApiPromise
}
export function logoutApi(data: anyObj = {}): ApiPromise {
  return createAxios({
    url: baseApi + '/logout',
    method: 'post',
    data
  }) as ApiPromise
}
export function userInfoApi(data: anyObj = {}): ApiPromise {
  return createAxios({
    url: baseApi + '/userInfo',
    method: 'get',
    data
  }) as ApiPromise
}
