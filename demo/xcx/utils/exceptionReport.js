import { envConfig, env } from './config/index'
import apiUrl from './urls'

// 目前埋点位置 及对应type 值
// 1 => 请求响应不为200 或响应code值不为0 
// 2 => 所有页面入口参数 及 解析后参数
// 3 => 页面未找到事件捕获
// 4 => 页面onError事件捕获
// 5 => 获取微信Code失败

const systemInfo = JSON.stringify(wx.getSystemInfoSync())

function exceptionReport(options){
  try{
    const app = getApp()
    const pages = getCurrentPages()
    const routes = pages.map(i => i.route)

    const data = {
      createDate: `${Date.now()}`, // 报告时间
      // type: `${options.type}`, // 报告类型 
      env: `${env}`, // 当前运行环境
      host: `${envConfig.host}`,
      systemInfo: `${systemInfo}`, // 系统信息
      companyId: `${envConfig.companyId}`, // 企业id
      cardId: `${app.globalData.cardId}`, // 名片id
      route: `${routes.join(',')}`, // 当前页面栈
      exception: `${JSON.stringify(options.content)}`
    }

    const userInfo = app.globalData.userInfo
    if(userInfo){
      data.userInfo = `${JSON.stringify(userInfo)}`
    }
    
    // 入口参数
    if(wx.getLaunchOptionsSync){
      const options = wx.getLaunchOptionsSync()  
      data.options= `${JSON.stringify(options)}`
    }

    // const error = new Error()
    // data.push(`stack=${error.stack}`)

    pushReport(data)
  } catch(e) {
    throw new Error(e)
  }
}

const logs = []
function pushReport(log){
  logs.push(log)
  digestReport()
}

// 推迟发送 避免影响主进程
const delay = 1000
let timer = null
function digestReport(){
  if(!logs.length || timer) return

  timer = setTimeout(() => {
    sendReport(logs.shift())
    clearTimeout(timer)
    timer = null
    digestReport()
  }, delay)
}

function sendReport(data){
  wx.request({
    method: 'POST',
    url: apiUrl.exceptionReportUrl,
    data
  })
}

export default exceptionReport