import createAxios from '@/utils/axios'

export function loginApi(data: anyObj = {}): ApiPromise {
  return createAxios({
    url: 'api/user/login',
    method: 'post',
    data
  }) as ApiPromise
}
export function logoutApi(data: anyObj = {}): ApiPromise {
  return createAxios({
    url: 'api/user/logout',
    method: 'post',
    data
  }) as ApiPromise
}
export function userInfoApi(data: anyObj = {}): ApiPromise {
  return createAxios({
    url: 'api/user/userInfo',
    method: 'get',
    data
  }) as ApiPromise
}
