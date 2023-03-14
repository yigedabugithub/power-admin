import createAxios from '@/utils/axios'

export function loginApi(data: anyObj = {}): ApiPromise {
  return createAxios({
    url: 'api/users/login',
    method: 'post',
    data
  }) as ApiPromise
}
export function logoutApi(data: anyObj = {}): ApiPromise {
  return createAxios({
    url: 'api/users/logout',
    method: 'post',
    data
  }) as ApiPromise
}
export function userInfoApi(data: anyObj = {}): ApiPromise {
  return createAxios({
    url: 'api/users/userInfo',
    method: 'get',
    data
  }) as ApiPromise
}
