import { envConfig } from './config/index'
import { get, post } from './request'
import { showToast } from './public'
import apiUrl from './urls'


// 将id映射至换新需要的字段名
function filterQueryParams(query) {
  [
    'from_name', 'send_name1', 'share_name', 'identify',
    'card_id', 'dyId', 'shareDisplay', 'jobname', 'from_id',
    'product_id', 'send_name', 'head_img', 'entrance_type',
    'entrance_value', 'form_id', 'upId', 'shareDynamicId'
  ].forEach(key => {
    if(!(key in query)) return;
    const val = query[key]

    delete query[key]

    switch(key){
      case 'shareDisplay':
        query.isShare = val === 'block' ? 1 : 0
        break
        
      case 'jobname':
        query.title = val
        break
        
      case 'send_name':
        query.sendName = val
        break

      case 'head_img':
        query.headImg = val
        break

      // 以下字段需要以旧换新
      case 'card_id':
        query.cardId = val
        break

      case 'dyId':
      case 'shareDynamicId':
        // 1 => 招聘详情
        // 2 => 公司动态详情
        // 3 => 资讯详情
        const type = +query.type || 2
        switch(type){
          case 1:
            query.recruitmentId = val
            break
            
          case 2:
            query.dyId = val
            break

          case 3:
            query.newsId = val
            break
        }
        break

      case 'from_id':
        query.fromId = val
        break

      case 'form_id':
        query.formId = val
        break

      case 'upId':
        query.upId = val
        break

      // 产品id需要以旧换新 商品不需要换新
      case 'product_id':
        query.productId = val
        break

      // 以下字段未确定
      case 'entrance_type':
        query.entranceType = val
        break

      case 'entrance_value':
        query.entranceValue = val
        break

      default: 
        break
    }
  })

  return query
}

//新老参数转换
const keyMap = {
  "cardId"          : "cardId",
  "recruitmentId"   : "id", // 招聘
  "dyId"            : "id", // 动态
  "newsId"          : "id", // 资讯
  "formId"          : "formId", // 表单
  "fromId"          : "forwardUserId", // 转发人
  "upId"            : "upId", // 
  "productId"       : "productId" // 产品
}

// 将id映射为页面需要的字段名
function matchQueryParams(query){
  Object.keys(query).forEach(key => {
    if(key in keyMap){
      const value = query[key]
      delete query[key]
      query[ keyMap[key] ] = value
    }
  })
  return query
}

// 更换新的key值
function getSwitchQueryParams(query){
  const formData = {}
  Object.keys(query).forEach(key => {
    if(key in keyMap){
      formData[key] = query[key]
      delete query[key]
    }
  })
  return formData
}

// 解析参数
function formatQrCodeParams(qs){
  const queryString = qs.split('&')
  const queryParams = {}
  queryString.map(item => {
    const kv = item.split('**')
    queryParams[ kv[0] ] = kv[1]
  })
  return queryParams
}

const urlMaps = {
  'pages/tab/tab': [
    '/pages/tabbar/card/card',
    '/pages/tabbar/mall/mall',
    '/pages/tabbar/dynamic/dynamic',
    '/pages/tabbar/website/website'
  ],
  'pages/product_detail/product_detail'                                           : '/subs/mall/pages/productdetail/productdetail',
  'pages/product_detail2/product_detail2'                                         : '/subs/mall/pages/goodsdetail/goodsdetail',
  'pages/dynamic_detail/dynamic_detail'                                           : '/subs/dynamic/pages/dynamic-detail/dynamic-detail',
  'pages/web_view/web_view'                                                       : '/subs/website/pages/web-view/web-view',
  'pages/form_detail/form_detail'                                                 : '/subs/form/pages/form-detail/form-detail',
  'pages/chat_detail/chat_detail'                                                 : '/subs/chat/pages/detail/detail',
  'pages/order_detail/order_detail'                                               : '/subs/usercenter/order/pages/orderdetail/orderdetail',
  'subs/order/pages/order_detail/order_detail'                                    : '/subs/usercenter/order/pages/orderdetail/orderdetail',
  'subs/coupon/coupon-landing-page/coupon-landing-page'                           : '/subs/coupon/pages/landpage/landpage',
  'subs/my-coupon/coupon-info/coupon-info'                                        : '/subs/coupon/pages/mycoupon/couponinfo/couponinfo',
  'subs/my-coupon/coupon-goods/coupon-goods'                                      : '/subs/coupon/pages/mycoupon/coupongoods/coupongoods',
  'pagesActivity/department-activity/activity-participate/activity-participate'   : '/subs/activity/pages/activity-participate/activity-participate',
  'subs/order/pages/after-sales-detail/after-sales-detail'                        : '/subs/usercenter/order/pages/aftersalesdetail/aftersalesdetail'
}

function matchPath(path, nav) {
  const realPath = urlMaps[path]

  if(!realPath) return path

  if(Array.isArray(realPath)) return realPath[nav] || path

  return realPath
}

function isCoupon(route){
  return route === 'subs/coupon/coupon-landing-page/coupon-landing-page'
}

function isGoodsDetail(route){
  return route === 'pages/product_detail/product_detail'
}



// 旧id换取新id
function switchToNewId(formData){
  return new Promise((resolve, reject) => {
    post(apiUrl.exchangeCardIdUrl, formData, {
      withToken: false,
      header: {
        'i-companyid': envConfig.companyId
      }
    }).then(res => resolve(res), error => reject(error))
  })
}

// 名片二维码参数解析
function getCardByWX(sceneId){
  return new Promise((resolve, reject) => {
    const formData = { sceneId: sceneId.replace('wx_', ''), companyId: envConfig.companyId }
    get(apiUrl.cardQrcodeParseWhtioutAuthUrl, formData, {withToken: false}).then(res => {
      const { oldQrCodeScene } = res.data.data
      resolve(oldQrCodeScene)
    }, error => reject(error))
  })
}

function matchToRealPage(query, path){
  const scene = query.scene

  console.log('旧版入参:', query)
  // 原始参数
  if(!scene){
    const newPath = matchPath(path, +query.nav_footer_active || 0)

    const queryParams = {
      ...filterQueryParams({...query}),
      companyId: envConfig.companyId,
      // sourceType: 2 // @todo
    }

    // 过虑并获取需要更换的参数
    const formData = getSwitchQueryParams(queryParams)

    // 没有要换取的ID直接进入页面
    if(!Object.keys(formData).length){
      jumpToRealPage(newPath, queryParams)
      return
    }

    // 如果是商品详情不用换取新id
    if(isGoodsDetail(path)){
      queryParams.productId = formData.productId
      delete formData.productId
    }

    switchToNewId(formData).then(res => {
      const { data } = res.data

      Object.keys(formData).forEach(key => queryParams[key] = data[key])
      
      jumpToRealPage(newPath, matchQueryParams(queryParams))
    }, () => {
      // showToast(`换取参数失败${JSON.stringify(formData)}`)
    })
    return
  }

  // 卡券参数解析
  if(isCoupon(path)){
    get(apiUrl.decrypteParams, { shortName: scene, companyId: envConfig.companyId }, {withToken: false}).then(res => {
      const { urlParam } = res.data.data
      const queryParams = {}
      urlParam.split('&').map(item => {
        const kv = item.split('=')
        queryParams[ kv[0] ] = kv[1]
      })
      const newPath = matchPath(path)
      jumpToRealPage(newPath, queryParams)
    }, error => {
      // showToast(`解析券参数${scene}失败`)
    })
    return
  }

  if(/^wx_/.test(scene)){
    getCardByWX(scene).then(oldQueryString => {
      const oldQueryParams = formatQrCodeParams(oldQueryString)
      const newPath = matchPath(path, +oldQueryParams.nav_footer_active || 0)

      const newQueryParams = matchQueryParams(filterQueryParams(oldQueryParams))
      jumpToRealPage(newPath, newQueryParams)
    }, error => {
      // showToast(`解析参数${scene}失败`)
    })
    return
  }

  if(/^dist_/.test(scene)){
    switchToNewId({ activityId: scene }).then(res => {
      const { activityId } = res.data.data
      const newPath = matchPath(path, 0)
      const queryParams = {scene: `issue_${activityId}`}
      jumpToRealPage(newPath, queryParams)
    }, () => {
      // showToast(`解析参数${scene}失败`)
    })
    return
  }

  switchToNewId({ cardId: scene }).then(res => {
    const { cardId } = res.data.data
    const newPath = matchPath(path, +query.nav_footer_active || 0)

    const queryParams = {
      cardId,
      sourceType: 2
    }
    
    jumpToRealPage(newPath, queryParams)
  }, () => {
    // showToast(`解析参数${scene}失败`)
  })
}

function jumpToRealPage(path, queryParams){
  console.log('旧版出参:', path, queryParams)
  const queryString = Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&')
  wx.reLaunch({
    url: `${path}?${queryString}`
  })
}



export { matchToRealPage }