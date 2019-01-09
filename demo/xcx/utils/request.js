import { envConfig } from './config/index.js'
import { getToken } from './usercenter'
import { errorStatusInterpreter, throwErrorInterpreter, loadingRequestInterpreter, loadingResponseInterpreter } from './interpreter/index'

/**
 * 创建请求队列
 * @param url
 * @param method
 * @param data
 * @options {
 *  header: {}, 需要额外配置的请求头
 *  cache: false, 是否需要缓存 @todo 待实现
 *  withGray: true, 是否携带 灰度标识 默认携带
 *  withToken: true, 是否携带 Token 默认携带
 *  silentFail: false, 是否静默失败，静默失败则不会主动展示任何请求异常提示
 *  showLoading: false, 是否展示loading窗口
 *  reportKey: String, 是否发送Feeds流 @todo待添加拦截扩展
 *  ...其他参数根据需要来添加与扩展
 * }
 * @return Promise
 */
function request(url, method, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    // 不依赖 token 直接发送
    if(options.withToken === false){
      sampleRequest({url, method, data, options, resolve, reject})
      return
    }

    requestQueue.push({url, method, data, options, resolve, reject})

    notifyRequestQueue(requestQueue)
  })
}

// 快捷GET
function get(url, data, options = {}){
  return request(url, 'GET', data, options)
}

// 快捷POST
function post(url, data, options = {}){
  return request(url, 'POST', data, options)
}

// 请求响应过滤中间件
const requestInterpreter = []
const responseInterpreter = []

request.setRequestInterpreter = function(fn){
  if(typeof fn === 'function'){
    requestInterpreter.push(fn)
  }
}

request.setResponseInterpreter = function(fn){
  if(typeof fn === 'function'){
    responseInterpreter.push(fn)
  }
}

function sampleRequest({url, method, data, options, resolve, reject, isFromQueue = false}) {
  const header = {}

  if(options.withGray !== false) header[ 'aijiatui' ] = envConfig.companyId
  if(options.withToken !== false) header[ 'i-token' ] = getToken()

  if(options.header){
    Object.assign(header, options.header)
  }

  requestInterpreter.forEach(fn => fn({header, url, method, data, options, isFromQueue}))

  wx.request({
    header, url, method, data,
    success: () => {},
    fail: () => {},
    complete: response => {
      responseInterpreter.forEach(fn => fn(response, {header, url, method, data, options, isFromQueue}))

      const statusCode = response.statusCode
      if(statusCode === 200){
        if(response.data.code === 0){
          resolve(response)
          return
        }
      }
      reject(response)
    }
  });
}

// 请求列表
const requestQueue = []

// 请求队列中正在进行的请求计数，当前正在请求数大于5个进行等待
let queueRequestingCount = 0

/**
 * 顺序执行请求队列
  */
function notifyRequestQueue() {
  if (!getToken()) return;
  
  while(queueRequestingCount < 5 && requestQueue.length){
    queueRequestingCount++
    sampleRequest({...requestQueue.shift(), isFromQueue: true})
  }
}

function requestQueueInterpreter(response, { isFromQueue }){
  if(isFromQueue){
    queueRequestingCount--
    notifyRequestQueue()
  }
}

// 不要改变以下拦截器装载顺序 否则可能会出现一些奇怪的行为 如toast闪退等
request.setResponseInterpreter(requestQueueInterpreter)
request.setRequestInterpreter(loadingRequestInterpreter)
request.setResponseInterpreter(loadingResponseInterpreter)
request.setResponseInterpreter(errorStatusInterpreter)
request.setResponseInterpreter(throwErrorInterpreter)

export {
  notifyRequestQueue,
  request,
  get,
  post
}
