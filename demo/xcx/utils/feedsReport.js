import apiUrl from './urls'
import { post } from './request'

function feedsReport(key, params, options = {}){
  const app = getApp()

  if (!key) {
    throw new Error('缺少feeds流类型')
    return
  }

  const {cardId, userInfo} = app.globalData
	const formData = {
    templateId: key,
    to: cardId,
    from: userInfo.userId,
    userName: userInfo.nickName,
    ...options,
    params: params || {}
	}
	
	post(apiUrl.feedsReportUrl, formData, {silentFail: true}).then(res => {}, () => {})
}

export default feedsReport