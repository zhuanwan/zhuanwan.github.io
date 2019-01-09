const app = getApp();
import { cardDetailUrl, authPhoneUrl } from '../urls'
import { post } from '../request'
import { CARD_DETAIL_KEY } from '../storage.key'
import { envConfig } from '../config/index'
import { Storage, Loading, showModal } from '../public'
import feedsReport from '../feedsReport';
import { AUTHORPHONE_FEED } from '../feeds.actions'

function getCardDetail(cardId) {
  return post(cardDetailUrl, {
    cardId,
    companyId: envConfig.companyId
  }).then(res => {
    Storage.setSync(CARD_DETAIL_KEY, res.data)
    app.globalData.cardId = cardId
    return res.data
  })
}

// 授权手机号
function getPhoneNum(params) {
  Loading.show('授权中', {icon: "loading"})
  return post(authPhoneUrl, params).then(res => {
    Loading.hide()
    // TODO: 发送获取手机的feeds流
    feedsReport(AUTHORPHONE_FEED, {mobile: res.data.data.mobile})
    return res.data
  }).catch(err => {
    Loading.hide()
    showModal('失败提示', '手机号码授权失败，请重试', {showCancel: false})
    return Promise.reject(err)
  }); 
} 

export {
  getCardDetail,
  getPhoneNum
}