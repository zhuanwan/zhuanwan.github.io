// 此模块用于同步加载小程序所有的依赖项目 登录状态，当前用户信息，当前名片信息，当前企业信息
// 可以在Page直接使用如下字段 且保证页面初始化时以下字段一定存在
// onLoad(){
//   const {__isLogin, __userInfo, __cardId, __cardDetail, __companyInfo} = this.data
// }
// 目前为了不与已有的业务代码中的字段与方法冲突，所有参数都需要加上双下划线前缀来标识
// 这里的流程仅仅为了保证业务代码中能够正常使用所有的依赖项
// 另外可以通过保留的 config 参数对此模块进行扩展，例如添加统一的方法，扩展白名单等
// 还可以代理分享生命周期钩子 统一添加分享人id 昵称 分享的名片信息等
// @todo 待优化 将所有依赖项扩展为中间件的方式进行注入 避免在这里写过多业务逻辑
// 已知可能存在的问题:
// 极端情况下 业务代码中其他生命周期钩子依赖当前正在加载的依赖项 将会无法正确的获取到依赖数据
// 例如:用户在未加载完成时分享页面
// 这需要对分享进行屏蔽待加载完成后启用处理 其他生命周期钩子同理

import { get, post } from './request'
import { systemInfo } from './systemInfo'
import { showToast } from './public'
import { envConfig } from './config/index'
import { formatEntranceOptions } from './formatEntranceOptions'
import { getAuthorizePhone } from './getPhoneNumber'
import { getLocalToken } from './usercenter'
import apiUrl from './urls'
import Stat from '../sdk/stat/stat-mp'
import exceptionReport from './exceptionReport'

// 首页 异常情况跳转
const HOME_URL = '/pages/load/load'

// 不依赖cardId页面路径白名单 前面不要加根目录`/`
const NOT_DEPEND_CARDID_WHITELIST = [
  'pages/load/load',
  'pages/tabbar/home/home',
  'subs/card/pages/poster/poster',
  'subs/website/pages/support/support',
  'subs/plugin/pages/zhongzhui/index',
  'subs/usercenter/order/pages/aftersalesdetail/aftersalesdetail',
  'subs/usercenter/settings/pages/userinfo/userinfo'
]

// 可异步加载(没有在js代码中同步使用__companyInfo属性(xml无需关心))企业配置信息的页面
// 加速页面初始化 避免页面初始化阻塞
const ASYNC_LOAD_COMPANY_PATH = [
  'pages/load/load'
]

// TABBAR路径列表
const TABBAR_PATHS =[
  'pages/tabbar/store/store',
  'pages/tabbar/excellent-goods/excellent-goods',
  'pages/tabbar/usercenter/usercenter'
]

let companyInfo = null // 企业信息
const cards = [] // 名片详情进行缓存 => [{id: cardId, cardDetail}]

function extend(options, config = {}){
  const app = getApp()

  options.data = {
    ...options.data,

    // 私有属性
    __options__: null,
    __isExtended__: true,
    __hasRunOnShow__: false,
    __isAllInitReady__: false,
     // companyInfo 没有任何异步依赖项 可以优先加载
    __isCompanyInfoReady__: false,
     // 因为 cardDetail 依赖入口参数的同步或异步解析 拿到cardId参数才能开始加载
     // 所以对cardDetail 及 companyInfo这二者的加载状态需要分开判断
    __isCardDetailReady__: false,
    __isTabBarUpdated__: false, // TAB是否已更新

    // 公共属性
    __options: null, // 页面原始参数 给登录组件使用
    __isLogin: false, // 是否登录
    __showLoginModal: false, // 落地页是否要展示登录或名片模态窗组件
    __userInfo: null, // 登录用户信息
    __cardId: null, // 当前访问名片Id
    __cardDetail: null, // 当前访问名片详情
    __companyInfo: null, // 当前企业信息
    __authorizePhoneStatus: null,
    __headerTitle: '' // tab页标题
  }

  // 缓存且代理生命周期钩子 onLoad 与 onShow
  // @todo 根据页面情况 可能还需要其他生命周期钩子，如onReady等
  const __onLoad = options.onLoad
  const __onShow = options.onShow
  const __onError = options.onError

  return Stat.page({
    ...options,
    __onLoad,
    __onShow,
    __onError,
    onLoad(options){
      exceptionReport({content: {...options, isOriginal: true}, type: 2})
      console.info('原始入参：', {options})
      // 初始化数据
      this.setData({
        __options: {...options, isOriginal: true},
        __options__: {...options},
        __isLogin: !!getLocalToken(),
        __isReady__: false
      })

      // 加载企业信息
      this.__getCompanyInfo()
      this.__getAuthorizePhone()

      // 进入名片列表清除名片缓存
      if(HOME_URL.indexOf(this.route) > -1){
        cards.splice(0)
      }

      this.setData({
        __showLoginModal: true
      })
      
      formatEntranceOptions(options, this.route).then(options => {
        exceptionReport({content: {...options}, type: 2})
        this.setData({
          __options: options,
          __isReady__: true
        })
        
        console.info('解析后入参：', {options}, options.cardId, app.globalData.cardId)

        // 是否是入口
        const isEntrance = 'sourceType' in options
        const cardId = options.cardId || app.globalData.cardId // 当前名片id
        const sourceType = options.sourceType // 当前入口名片id
        
        // 存储当前页入口参数
        this.setData({
          __options__: options, // options初始化后传入Page
          __userInfo: app.globalData.userInfo
        })

        // 没有检测到cardId
        if(!cardId){
          // 当前页依赖cardId
          if(this.__checkIsDependCardId()){
            wx.reLaunch({ url: HOME_URL })
            throw new Error(`
              当前页面非入口页面不能直接进入或从名片页跳转
              或当前作为入口页缺少 cardId 参数
              如果作为入口页不依赖 cardId 参数
              请将当前路径 ${this.route} 添加到 /utils/extend.js 文件的 NOT_DEPEND_CARDID_WHITELIST 白名单中
              即将跳转到名片列表`)
            return
          }

          // 当前页不依赖cardId 直接初始化
          this.__checkReadyStatus()
          return
        }

        app.globalData.cardId = cardId
        this.setData({
          __cardId: cardId
        })

        // 检测到入口参数加好友
        if(isEntrance){
          this.__addFriend(sourceType)
        }

        // 初始化
        if(this.__checkIsDependCardId()){
          this.__getCardDetail(app.globalData.cardId)
        }
      }, () => {
        showToast('初始化失败')
      })
    },
    onShow(options){
      this.setData({
        __hasRunOnShow__: true
      })

      this.__updatePhoneAuthStatus()
      if(this.data.__isAllInitReady__ && this.__onShow){
        this.__onShow(options)
      }
    },
    onError(e){
      exceptionReport({content: e, type: 4})
      if(this.__onError){
        this.__onError(e)
      }
    },
    // 全部依赖准备完毕
    // 可以在这里做一些初始化的动作
    __onReady(){
      const { __hasRunOnShow__, __options__ } = this.data

      if(__onLoad){
        this.__onLoad(__options__)
      }

      if(__hasRunOnShow__ && __onShow){
        this.__onShow()
      }
    },
    // 检查落地页是否依赖cardId，如果依赖且未找到cardId 自动跳转到名片列表
    __checkIsDependCardId(){
      if(config.isDependCard === false){
        return false
      }

      return NOT_DEPEND_CARDID_WHITELIST.indexOf(this.route) === -1
    },
    // 是否需要同步加载企业配置信息 如果不需要引用 __companyInfo 或者仅仅在xml中使用__companyInfo 则可以将其加入白名单 以加速页面加载
    __checkIsNeedSyncCompanyInfo(){
      return ASYNC_LOAD_COMPANY_PATH.indexOf(this.route) === -1
    },
    // 检测所有依赖的加载状态
    __checkReadyStatus(){
      const {__isCardDetailReady__, __isCompanyInfoReady__ } = this.data
      const isDependCard = this.__checkIsDependCardId()
      const isNeedSyncCompanyInfo = this.__checkIsNeedSyncCompanyInfo()

      if(isNeedSyncCompanyInfo && !__isCompanyInfoReady__) return; // 需要同步加载企业配置信息 且 未加载完毕

      if(isDependCard && !__isCardDetailReady__) return; // 依赖名片信息 且名片信息未加载完成

      this.setData({
        __isAllInitReady__: true
      })

      this.__onReady()
    },
    __setShareStatus(cardDetail){
      const { cardForwardStatus } = cardDetail
      if(cardForwardStatus === 1){
        wx.hideShareMenu()
      }
    },
    // 加载当前名片信息
    __getCardDetail(cardId){
      getCardDetail(cardId).then(cardDetail => {
        this.__setShareStatus(cardDetail)
        this.setData({
          __cardDetail: JSON.parse(JSON.stringify(cardDetail)),
          __isCardDetailReady__: true
        })
        this.__checkReadyStatus()
      }, () => {
        // 软着陆 即使未初始化成功 也要开始初始化页面
        this.setData({
          __cardDetail: null,
          __isCardDetailReady__: true
        })
        this.__checkReadyStatus()
      })
    },
    // 加载企业信息
    __getCompanyInfo(){
      getCompanyInfo(app, this.route).then(companyInfo => {

        this.setData({
          __companyInfo: JSON.parse(JSON.stringify(companyInfo)),
          __isCompanyInfoReady__: true,
        })

        // this.__updateTabPage()
        this.__checkReadyStatus()
      }, () => {
        // 软着陆 即使未初始化成功 也要开始初始化页面
        this.setData({
          __companyInfo: {},
          __isCompanyInfoReady__: true,
        })        
        this.__checkReadyStatus()
      })
    },
    __getAuthorizePhone(){
      getAuthorizePhone().then(__authorizePhoneStatus => {
        this.setData({ __authorizePhoneStatus })
      }, () => {})
    },
    __updatePhoneAuthStatus(){
      this.setData({
        __authorizePhoneStatus: app.globalData.authorizePhoneStatus
      })
    },
    __addFriend(sourceType){
      // @todo 待优化成功添加过好友的名片id缓存，避免重复请求添加好友
      const { __cardId, __options__ } = this.data

      const formData = {cardId: __cardId, sourceType: sourceType || 0}

      // 用户转发 和 名片海报 需要提供分享人的ID
      if(+sourceType === 1 || +sourceType === 4) {
        const { forwardUserId } = __options__
        app.globalData.forwardUserId = forwardUserId
        formData.forwardUserId = forwardUserId
      }

      post(apiUrl.addRelationshipUrl, formData).then(res => {}, () => {})
    },
    __updateTabPage(){
      const index = TABBAR_PATHS.indexOf(this.route)

      if(index === -1) return

      const { __companyInfo: {navigateConfigVO}, __isTabBarUpdated__ } = this.data

      if(!navigateConfigVO) return

      const { navFooter } = navigateConfigVO

      // 设置标题
      this.setData({ __headerTitle: navFooter[index].name })

      // if(__isTabBarUpdated__) return

      // 设置TABBAR名称&图标
      Promise.all(navFooter.map(({name, icon, selectIcon}, index) => {
        return new Promise((resolve, reject) => {
          wx.setTabBarItem({
            index,
            text: name,
            iconPath: `/src/images/tabbar/${icon}`,
            selectedIconPath: `/src/images/tabbar/${selectIcon}`,
            success: () => resolve(),
            fail: () => reject()
          })
        })
      })).then(() => {
        this.setData({__isTabBarUpdated: true})
      }, () => {})
    },

    // 以下为暴露给页面视图使用的的公共事件回调 统一前缀__handle
    // 禁止在页面执行代码中调用
    // 给登录组件用的登录完成钩子 以便销毁登录组件
    __handleLogin(e){
      this.setData({
        __isLogin: true,
        __showLoginModal: !this.data.__isReady__,
        __userInfo: JSON.parse(JSON.stringify(app.globalData.userInfo))
      })
    },
    // 发送服务通知
    __handleSendFormId(e){
      const { formId } = e.detail;
      get(apiUrl.sendFormIdUrl, {formid: formId}, {silentFail: true}).then(res => {}, () => {})
    }
  })
}

// 加载名片信息
function getCardDetail(cardId){
  return new Promise((resolve, reject) => {
    const item = cards.find(item => item.id === cardId)
    if(item){
      resolve(item.cardDetail)
      return
    }

    get(apiUrl.cardDetailbase, { cardId, companyId: envConfig.companyId }, {showLoading: true}).then(res => {
      const cardDetail = res.data.data
      
      if(!cardDetail.cardId){
        cardDetail.cardId = cardId
      }

      cards.push({
        id: cardId,
        cardDetail
      })
      resolve(cardDetail)
    }, error => reject(error))
  })
}


const REALTIME_UPDATE_CONFIG_PATH_WHITELIST = [
  'pages/tabbar/card/card',
  'pages/tabbar/mall/mall',
  'pages/tabbar/dynamic/dynamic',
  'pages/tabbar/website/website'
]
// 加载企业信息
function getCompanyInfo(app, path){
  return new Promise((resolve, reject) => {
    if(companyInfo && REALTIME_UPDATE_CONFIG_PATH_WHITELIST.indexOf(path) === -1){
      resolve(companyInfo)
      return
    }
    
    get(apiUrl.companyConfigUrl, {companyId: envConfig.companyId}, {withToken: false}).then(res => {
      companyInfo = res.data.data
      app.globalData.companyInfo = JSON.parse(JSON.stringify(companyInfo))
      resolve(companyInfo)
    }, error => reject(error))
  })
}

// @todo 临时强制代理所有Page
// function Extend(Page){
//   return options => {
//     if(options.data && options.data.__isExtended__){
//       Page(options)
//     } else {
//       Page(extend(options))
//     }
//   }
// }

// export default Extend
export { extend }