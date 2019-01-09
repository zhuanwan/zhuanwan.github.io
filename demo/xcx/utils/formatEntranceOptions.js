// 对落地页参数解析
// 处理了五种场景
// 1、入口参数带了cardId
// 2、入口参数没有scene
// 3、入口参数有scene
//  ·scene以wx_开始
//  ·scene以dist_开始
//  ·否则scene就是cardId
// 其中wx_与dist_开始的scene需要发送到后台解析进行

// sourceType 来源类型
// 0 || null 其它
// 1 转发
// 2 扫码      scene=cardId
// 3 名片分发  scene=dist_|issue_后台配置
// 4 名片海报  scene=wx_ 前端生成海报
// 5 路径分发  待约定
// 6 搜索（推荐好友）
// 7 官网点击名片跳转
// 8 工作交接
// 9 优惠券
// 10 从转发详情页(如商品/动态/资讯/招聘等)跳转到名片首页

import apiUrl from './urls'
import { get, post } from './request'
import { envConfig } from './config/index'

// 名片分发
function getCardByDist(activityId, route){
  return new Promise((resolve, reject) => {
    post(apiUrl.distributeParseUrl, { activityId }).then(res => {
      const { landPageType, landPageParam, cardId } = res.data.data
      let landPageUrl = res.data.data.landPageUrl
      const queryParams = {
        cardId: cardId,
        sourceType: 3,
        isShare: 1,
        qrCodeType: -1 // -1 名片分发
      }

      const distPathMap = [
        'pages/tabbar/card/card',
        'subs/mall/pages/productdetail/productdetail',
        'subs/mall/pages/goodsdetail/goodsdetail',
        'subs/website/pages/web-view/web-view',
        'pages/tabbar/website/website',
        'pages/tabbar/mall/mall',
        'pages/tabbar/mall/mall',
        'pages/tabbar/dynamic/dynamic',
      ]
      
      const isOldQrCode = distPathMap.indexOf(landPageUrl) === -1

      if([1, 2, 3].indexOf(landPageType) > -1 && landPageParam) {
        landPageParam.split('&').forEach(item => {
          const kv = item.split('=')
          queryParams[kv[0]] = kv[1]
        })
      }

      
      if(isOldQrCode) landPageUrl = distPathMap[ landPageType ]

      // 落地页非当前页面 跳转到真实落地页
      if(landPageUrl !== route){
        const queryString = Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&')
        wx.reLaunch({
          url: `/${landPageUrl}?${queryString}`
        })
        // reject({msg: '当前非落地页'})
        return
      }

      resolve(queryParams)
    }, error => reject(error))
  })
}

// 名片二维码参数解析
function getCardByWX(sceneId, query, route){
  return new Promise((resolve, reject) => {
    const formData = { sceneId: sceneId.replace('wx_', ''), companyId: envConfig.companyId }
    get(apiUrl.cardQrcodeParseWhtioutAuthUrl, formData, {withToken: false}).then(res => {
      const { data } = res.data
      const { extAttribute, cardId } = data
      
      if(extAttribute){
        resolve({
          cardId,
          ...extAttribute,
          ...data
        })
        return
      }

      // 普通扫码
      resolve({
        sourceType: 2,
        cardId,
        ...data
      })
    }, error => reject(error))
  })
}

function formatEntranceOptions(query, route){
  const {cardId, scene, forwardUserId} = query

  return new Promise((resolve, reject) => {
    // 打开页面来源转发或者公众号 或 非入口（没有scene字段表示非入口，也有可能入口参数为cardId）
    if(!scene) {
      // 无需换取新id 原始参数直接使用 如果是外部入口 参数必须带上 sourceType 字段，例如分享页面 
      resolve({...query})
      return
    }
    
    // 名片海报
    if(/^wx_/.test(scene)) {
      getCardByWX(scene, query, route).then(res => resolve(res), error => reject(error))
      return
    }

    // 活动分发
    if(/^issue_/.test(scene)){
      getCardByDist(scene, route).then(res => resolve(res), error => reject(error))
      return
    }

    resolve({...query, cardId: scene})
  })
}

export { formatEntranceOptions }