/**
 * 功能点：
 * 1.取消重复请求
 * 2.loading层
 * 3.错误处理
 * 4.mock请求
 * 5.自动携带token
 */

import axios from 'axios'
import type { AxiosRequestConfig, AxiosPromise } from 'axios'
import { ElLoading, LoadingOptions, ElNotification } from 'element-plus'
import { useUserInfo } from '@/stores/userInfo'
import { Local } from '@/utils/storage'
import { useRoute } from 'vue-router'
import { USER_INFO } from '@/stores/constant/cacheKey'

const route = useRoute()
const userInfo = useUserInfo()

interface LoadingInstance {
  target: any
  count: number
}
interface Options {
  cancelDuplicateRequest?: boolean // 是否开启取消重复请求, 默认为 true
  loading?: boolean // 是否开启loading层效果, 默认为false
  reductDataFormat?: boolean // 是否开启简洁的数据结构响应, 默认为true
  showErrorMessage?: boolean // 是否开启接口错误信息展示,默认为true
  showCodeMessage?: boolean // 是否开启code不为200(失败)时的信息提示, 默认为true
  showSuccessMessage?: boolean // 是否开启code为200(成功)时的信息提示, 默认为false
  anotherToken?: string // 当前请求使用另外的用户token
  mock?: boolean // mock接口
  mockUrl?: string // mock接口地址
}

// window.requests = []
// window.tokenRefreshing = false
const pendingMap = new Map()
const loadingInstance: LoadingInstance = { target: null, count: 0 }

// 根据运行环境获取基础请求URL
let baseURL = ref(import.meta.env.VITE_APP_BASE_API)

// 生成每个请求的唯一key
function getPendingKey(config: AxiosRequestConfig) {
  let { data } = config
  const { url, method, params, headers } = config
  if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
  return [
    url,
    method,
    // headers && (headers as anyObj).batoken ? (headers as anyObj).batoken : '',
    headers && (headers as anyObj)['Authorization'] ? (headers as anyObj)['Authorization'] : '',
    JSON.stringify(params),
    JSON.stringify(data)
  ].join('&')
}

// 储存每个请求的唯一cancel回调, 以此为标识
function addPending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ??
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) pendingMap.set(pendingKey, cancel)
    })
}

// 删除重复的请求
function removePending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

// 关闭Loading层实例
function closeLoading(options: Options) {
  if (options.loading && loadingInstance.count > 0) loadingInstance.count--
  if (loadingInstance.count === 0) {
    loadingInstance.target.close()
    loadingInstance.target = null
  }
}

// 处理异常
function httpErrorStatusHandle(error: any) {
  // 处理被取消的请求
  if (axios.isCancel(error)) {
    return console.error('axios.Automatic cancellation due to duplicate request:' + error.message)
  }
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = 'axios.Interface redirected!'
        break
      case 400:
        message = 'axios.Incorrect parameter!'
        break
      case 401:
        message = 'axios.You do not have permission to operate!'
        break
      case 403:
        message = 'axios.You do not have permission to operate!'
        break
      case 404:
        message = 'axios.Error requesting address:' + error.response.config.url
        break
      case 408:
        message = 'axios.Request timed out!'
        break
      case 409:
        message = 'axios.The same data already exists in the system!'
        break
      case 500:
        message = 'axios.Server internal error!'
        break
      case 501:
        message = 'axios.Service not implemented!'
        break
      case 502:
        message = 'axios.Gateway error!'
        break
      case 503:
        message = 'axios.Service unavailable!'
        break
      case 504:
        message = 'axios.The service is temporarily unavailable Please try again later!'
        break
      case 505:
        message = 'axios.HTTP version is not supported!'
        break
      default:
        message = 'axios.Abnormal problem, please contact the website administrator!'
        break
    }
  }
  if (error.message.includes('timeout')) message = 'axios.Network request timeout!'
  if (error.message.includes('Network'))
    message = window.navigator.onLine ? 'axios.Server exception!' : 'axios.You are disconnected!'

  ElNotification({ type: 'error', message })
}

/*
 * 创建Axios
 * 默认开启`reductDataFormat(简洁响应)`,返回类型为`ApiPromise`
 * 关闭`reductDataFormat`,返回类型则为`AxiosPromise`
 */

function createAxios(
  axiosConfig: AxiosRequestConfig,
  options: Options = {},
  loading: LoadingOptions = {}
): ApiPromise | AxiosPromise {
  // axios实例
  const Axios = axios.create({ baseURL: baseURL.value, timeout: 1000 * 5 })

  // mock接口
  if (import.meta.env.MODE === 'development') {
    if ((options?.mock && !options?.mockUrl) || (!options?.mock && options?.mockUrl)) {
      ElNotification({
        type: 'error',
        message: '请检查mock配置！'
      })
      return Promise.reject('请检查mock配置！') as ApiPromise
    }
    if (options?.mock && options?.mockUrl) baseURL.value = options?.mockUrl
  }

  // 自定义配置
  options = Object.assign(
    {
      cancelDuplicateRequest: true, // 是否开启取消重复请求, 默认为 true
      loading: false, // 是否开启loading层效果, 默认为false
      reductDataFormat: true, // 是否开启简洁的数据结构响应, 默认为true
      showErrorMessage: true, // 是否开启接口错误信息展示,默认为true
      showCodeMessage: true, // 是否开启code不为1时的信息提示, 默认为true
      showSuccessMessage: false, // 是否开启code为1时的信息提示, 默认为false
      anotherToken: '' // 当前请求使用另外的用户token
    },
    options
  )

  // 请求拦截
  Axios.interceptors.request.use(
    (config) => {
      removePending(config)
      options.cancelDuplicateRequest && addPending(config)
      // 创建loading实例
      if (options?.loading) {
        loadingInstance.count++
        if (loadingInstance.count === 1) {
          loadingInstance.target = ElLoading.service(loading)
        }
      }

      // 自动携带token,无token退出
      if (userInfo?.token) {
        config.headers['Authorization'] = `${Local.get(USER_INFO).token}`
      }

      if (!userInfo?.token && route.path !== 'login') {
        userInfo.logout()
        ElNotification({
          type: 'error',
          message: 'token无效，请重新登录'
        })
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截
  Axios.interceptors.response.use(
    (response) => {
      removePending(response.config)
      options.loading && closeLoading(options) // 关闭loading

      if (response?.data?.code !== 200) {
        if (options.showCodeMessage) {
          ElNotification({
            type: 'error',
            message: response.data.msg
          })
        }
        // 自动跳转到路由name或path，仅限server端返回302的情况
        //  ...
        // code不等于1, 页面then内的具体逻辑就不执行了
        return Promise.reject(response.data)
      }
      if (options.showSuccessMessage && response?.data?.code === 200) {
        ElNotification({
          message: response.data.msg ? response.data.msg : 'axios.Operation successful',
          type: 'success'
        })
      }

      return options.reductDataFormat ? response.data : response
    },
    (error) => {
      error.config && removePending(error.config)
      options.loading && closeLoading(options) // 关闭loading
      options.showErrorMessage && httpErrorStatusHandle(error) // 处理错误状态码
      return Promise.reject(error) // 错误继续返回给到具体页面
    }
  )
  return options.reductDataFormat
    ? (Axios(axiosConfig) as ApiPromise)
    : (Axios(axiosConfig) as AxiosPromise)
}

export default createAxios
