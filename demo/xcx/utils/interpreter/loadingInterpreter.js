/**
 * 请求 loading 弹窗展示
 * @param {*} status 
 */
import { Loading } from '../public'

let loadingCount = 0
function loadingRequestInterpreter({header, url, method, data, options, isFromQueue}) {
  if(!options.showLoading) return
  if(loadingCount === 0){
    Loading.show('加载中...', {
      mask: true
    })
  }
  loadingCount++
}

function loadingResponseInterpreter(response, {header, url, method, data, options, isFromQueue}) {
  if(!options.showLoading) return

  loadingCount--
  // 防止依赖连续的请求loading中间出现闪烁
  setTimeout(() => {
    if(loadingCount === 0){
      Loading.hide()
    }
  }, 150)
}

export { loadingRequestInterpreter, loadingResponseInterpreter }