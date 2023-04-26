import request from '@/utils/axios'
// import request from '@/utils/request'

// export function getUserInfo(data: { userId: Number | null }) {
//   return request({
//     url: '/api/users/userInfo',
//     method: 'post',
//     data
//   })
// }

const baseApi = 'api/role'

export function rolesList(params: any) {
  return request({
    url: baseApi + '/list',
    method: 'get',
    params
  })
}
export function allRolesListApi() {
  return request({
    url: baseApi + '/allList',
    method: 'get'
  })
}
