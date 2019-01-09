/**
 * 
 * @param {*} status 
 */
import { showToast } from '../public'
import exceptionReport from '../exceptionReport'

function throwErrorInterpreter(response, {header, url, method, data, options, isFromQueue}) {
  if((response.statusCode !== 200 || response.data.code !== 0) && !options.silentFail){
  	exceptionReport({content: {response, header, url, method, data, options, isFromQueue}, type: 1})
    showToast(`网络异常，请刷新重试`)
    console.log(`数据加载异常(${response.data && response.data.code || response.statusCode})`)
    // showToast((response.data && response.data.msg) || `${response.errMsg}(${response.statusCode})`)
  }
}

export { throwErrorInterpreter }