import { showToast, Loading } from './public'
import exceptionReport from './exceptionReport'

//登录请求重试
// const maxRetry = 2
let retryCount = 0

let timer = null
let promise = null
let wxCode = null

function getCode(){
  console.log('准备预加载code')
  wxCode = null
  clearTimeout(timer)

  promise = new Promise((resolve, reject) => {
    const login = () => {
      wx.login({
        complete(res) {
          let code = res.code
          if(code) {
            retryCount = 0
            wxCode = code
            // 成功若是没被使用则废弃 五分钟后重新获取
            clearTimeout(timer)
            timer = setTimeout(getCode, 5 * 60 * 1000)
            console.log('预加载code成功', code)
            resolve(code)
            return
          }

          retryCount++
          exceptionReport({type: 5, content: {res, retryCount, content: '获取微信code失败'}})

          // 失败重试
          login()

          // retryCount++
          // if(retryCount < maxRetry) {
          //   console.error('获取微信code失败，重试中...')
          //   login()
          //   return
          // }

          // console.error('获取微信code失败', res)
          // retryCount = 0
          // promise = null
          // reject({msg: '登录失败'})
        }
      })
    }
    login();
  })
}

getCode()

function loginByWechat() {
  // 如果有缓存的code 直接使用 并立即生成新code备用
  if(wxCode) {
    const code = wxCode
    getCode()
    return Promise.resolve(code)
  }

  // 如果没有备用code 
  return new Promise((resolve, reject) => {
    if(!promise) getCode()
    
    Loading.show('正在授权...')
    promise.then(code => {
      Loading.hide()
      getCode()
      resolve(code)
    }, error => {
      Loading.hide()
      showToast('授权失败')
      reject(error)
    })
  })
}

export { loginByWechat }