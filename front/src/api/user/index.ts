import createAxios from '@/utils/axios'

export function loginApi(method: 'get' | 'post', params: anyObj = {}): ApiPromise {
  return createAxios({
    url: 'api/users/login',
    data: params,
    method
  }) as ApiPromise
}
