/**
 * @author candy&M
 * @email candyma@aijiatui.com
 * @create date 2018-11-02 15:29:28
 * @modify date 2018-11-02 15:29:28
 * @desc [小程序URL地址]
 */

import { envConfig } from './config/index'

const BASEURL = envConfig.host //基础路径
const configHost = `${BASEURL}service/${envConfig.companyId}/` //获取配置基础路径
const mallHost = `${BASEURL}product-provider/` //商城基础接口
const orderHost = `${BASEURL}order-provider/` //订单的基础接口
const distributionHost = `${BASEURL}distribution-provider/` //分销的基础接口
const activityHost = `${BASEURL}activity-provider/` //活动的基础接口
const imHost = `${BASEURL}arch-im/` //im相关接口
const jiashopHost = `${BASEURL}bff/joint/applet/`   //加店相关接口
const activityManage = `${BASEURL}activity-manage/` //加店用

module.exports = {
  /**
   * 登录相关
   */

  //登录请求
  loginUrl: `${BASEURL}arch-login-center/card/business/applet/login`,

  //刷新token
  refreshTokenUrl: `${BASEURL}arch-login-center/card/business/applet/refresh`,

  // 全局配置信息
  companyConfigUrl: `${jiashopHost}company/configuration`,

  // 名片二维码生成
  cardQrcodeProduceUrl: `${jiashopHost}qrcode/produce`,

  // 名片二维码参数解析
  cardQrcodeParseUrl: `${jiashopHost}qrcode/scene/get`,
  
  // 名片二维码参数解析 非鉴权接口
  cardQrcodeParseWhtioutAuthUrl: `${jiashopHost}qrcode/scene/without/author/get`,
  
  // 名片分发参数解析
  distributeParseUrl: `${jiashopHost}distribute/do`,

  // 换取新cardId
  exchangeCardIdUrl: `${BASEURL}bff/idreplace/idmap/replace/oldIdChangeNewId`,

  // 获取名片海报地址
  getSahreCardPosterUrl: `${jiashopHost}poster/not/produce/url/get`,

  // 活动配置
  getJTActivityConfigUrl: `${jiashopHost}activity/config`,

  // 日志上报
  exceptionReportUrl: `${jiashopHost}log/record`,


  /**
   * IM相关
   */
  // 发送心跳包
  heartbeat: `${imHost}im/heartbeat`,

  //更新最后聊天时间
  refreshChatTime: `${jiashopHost}customer/chat/date/update`,

  // 创建IM账号
  createIMuserUrl:`${BASEURL}arch-im/im/token`,

  // 刷新token
  updateIMToken:`${BASEURL}arch-im/im/token/refresh`,

  // 更新用户IM用户信息
  updateIMUserLogo:`${BASEURL}arch-im/im/user/update`,

  // 常用语
  commonWords: `${jiashopHost}bussniess/config/query/im/config`, 

   /**
    * feeds流发送
    */
   feedsReportUrl:`${jiashopHost}feeds/sendFeeds`,
  /**
   * 配置相关
   * 
   */
  // 活动领券绑定手机号
  bindActivityPhoneUrl: `${activityHost}activity-provider/shop/activity/api/bindThumpUpMobileForSmall`,

  //获取是否设置咨询按钮为授权手机号0:授权开 1授权关
  switchQueryUrl: `${BASEURL}applet/authorize/switch/query`,

  //获取是否已经授权手机号0:未授权 1:已授权
  authorizeStatusUrl: `${jiashopHost}authorize/customer/mobile/status/query`,

  //查询公众号组件的位置信息
  officialAccountPositionUrl: `${BASEURL}applet/public/account/layout/query`,

  //授权手机号
  authPhoneUrl: `${jiashopHost}authorize/customer/mobile/register`,

  // 获取小程序码
  getQRcodeUrl: `${configHost}getbcode.rq`,

  // 识别小程序码进来获取参数
  getQRcodeSceneUrl: `${configHost}getbcodeparams.rq`,

  // 上传获取签名
  getAuthorizationUrl: `https://download.aijiatui.com/api/Auth/signature`,
  /**
   * 名片相关
   */

  //名片列表
  cardListUrl: `${jiashopHost}cardHolder/list`,

  activeReportUrl: `${jiashopHost}customer/view/date/update`,

  //名片列表标星
  cardStarMark:`${jiashopHost}cardHolder/mark`,

  //名片列表取消标星
  cardStarUnMark:`${jiashopHost}cardHolder/unmark`,

  //名片点赞
  cardThumbUp :`${jiashopHost}card/thumbUp`,

  //名片取消点赞
  cardCancelThumbUp :`${jiashopHost}card/cancel/thumbUp`,

  //名片标签点赞
  cardLabelThumbUp :`${jiashopHost}card/label/thumbUp`,

  //名片标签取消点赞
  cardCancelLabelThumbUp :`${jiashopHost}card/cancel/label/thumbUp`,

  //名片列表屏蔽名片
  shieldCard:`${jiashopHost}cardHolder/shieldCard`,

  //取消名片屏蔽
  unShieldCard:`${jiashopHost}cardHolder/unShieldCard`,

  //获取手机授权状态和授权
  getAuthorizePhoneUrlStatus:`${jiashopHost}authorize/customer/mobile/status/query`,

  // 获取名片信息
  cardDetailbase: `${jiashopHost}card/base`,

  // 获取名片信息
  cardDetailUrl: `${jiashopHost}card/detail`,

  // 添加好友
  addRelationshipUrl: `${jiashopHost}customer/relationship/add`,

  // 通过ID查询名片信息
  depIDUrl: `${BASEURL}get_card_info_by_id.rq`,

  /**
   * 门店相关
   */

  // 获取门店列表
  getStoreListUrl: `${BASEURL}applet/dispatch/store/auto/listStores`,

  // 获取分发默认名片（默认名片分发 & LBS分发）
  getPromotionCardIdUrl: `${BASEURL}applet/promotion/api/getCardId`,

  // 解析分发小程序码参数（默认名片分发 & LBS分发）
  getPromotionCodeParamsUrl: `${BASEURL}applet/promotion/api/getParamContent`,

  //发送formId
  sendFormIdUrl:`${BASEURL}bff/wxpush/wxpush/applet/enterprise/save`,
  /**
   * 产品相关
   */

   //推荐产品列表
  getProductRecommendList:`${jiashopHost}/product/recommend`,
  
  // 产品列表
  getPruductList: `${jiashopHost}/product/list`,

  // 产品详情
  getPruductDetail: `${jiashopHost}/product/info`,
  
  /**
   * 商城相关
   */
  //商品推荐列表
	getRecommendProList:`${mallHost}recommend/api/list`,

  //商品列表
  getProductAllListUrl: `${mallHost}product/api/list`,

  // 商品详情
  getProductDetailUrl: `${mallHost}product/api/detail`,

  //更改购物车购买数
  upDateBuyStockUrl: `${mallHost}cart/api/updateBuyStock`,

  //查询购物车列表
  searchShoppingCartUrl: `${mallHost}cart/api/searchShoppingCart`,

  //商品分类地址
  getProductListUrl: `${mallHost}classify/api/list`,

  // 获取商品库存
  getProductStockUrl: `${mallHost}product/api/getProductStock`,

  // 加入购物车
  addToShoppingCartUrl: `${mallHost}cart/api/addCart`,

  //删除购物车的商品
  delCartUrl: `${mallHost}cart/api/delCart`,

  //分销商品列表  
  getDistributionListUrl: `${mallHost}distributionProduct/api/list`,

  // 获取红包开关
  getRedPacketSettingsUrl: `${mallHost}settingProvider/packet/switch/get`,

  // 购物车-可用优惠券（最优）
  getOptimalCouponUrl: `${mallHost}cart/api/getOptimalCoupon`,

  //新增订单
  orderSubmitUrl: `${orderHost}order/api/submit`,

  //获取订单提交token
  getTokenUrl: `${orderHost}order/api/getToken`,

  //获取默认地址
  getDefaultAddressUrl: `${orderHost}order/address/get/default`,

  //获取订单数量
  getOrderCountUrl: `${orderHost}order/api/count`,

  // 获取订单详情
  getOrderDetailUrl: `${orderHost}order/api/detail`,

  // 获取订单列表
  getOrderListUrl: `${orderHost}order/api/list`,

  // 取消订单
  closeOrderUrl: `${orderHost}order/api/cancel`,

  // 订单确认收货
  confirmReceiptUrl: `${orderHost}order/api/confirmReceipt`,

  // 更细地址
  updateAddressUrl: `${orderHost}order/address/update`,

  // 添加地址
  addAddressUrl: `${orderHost}order/address/create`,

  // 获取地址列表
  getAddressListUrl: `${orderHost}order/address/list`,

  // 设置默认地址
  setTheDefaultAddressUrl: `${orderHost}order/address/change/default`,

  // 删除地址
  deleteAddressUrl: `${orderHost}order/address/delete`,

  // 订单继续支付
  continueToPayUrl: `${orderHost}order/pay/repay`,

  // 提交售后
  submitAfterSalesUrl: `${orderHost}returnflow/submit`,

  // 售后单列表
  getAfterSalesListUrl: `${orderHost}returnflow/list`,

  // 售后单详情
  getAfterSalesDetailUrl: `${orderHost}returnflow/detail`,

  // 售后提交物流信息
  postExpressInfoUrl: `${orderHost}returnflow/express/set`,

  //分销商品列表(分享过)
  getDistributionShareListUrl: `${distributionHost}distributionProduct/api/list`,

  //用户佣金汇总
  getBrokerageSumUrl: `${distributionHost}sharer/brokerage`,

  //申请提现接口
  withdrawApplyUrl: `${distributionHost}withdraw/apply`,

  //佣金流水对外接口
  getBrokerageFlowUrl: `${distributionHost}brokerage/queryDetails`,

  //提现历史查询
  withdrawCashHistoryUrl: `${distributionHost}withdraw/listWithdrawHistory`,

  // 获取个人设置
  getPersonalInfoUrl: `${distributionHost}personal/info/get`,

  // 保存个人设置
  savePersonalInfoUrl: `${distributionHost}personal/info/save`,

  // 获取分销设置
  getDistributionSettingsUrl: `${distributionHost}distribution/setting/get`,

  // 获取物流信息
  getLogisticsInfoUrl: `${BASEURL}logistics-provider/logistics/select`,

  // 查询物流公司
  getLogisticsCompanyUrl: `${BASEURL}logistics-provider/express/info/query`,

  //统一下单支付接口
  prePayUrl: `${BASEURL}jtpay/api/paytransaction/prepay`,


  /**
   * 动态相关
   */

  // 动态列表
  dynamicListUrl: `${BASEURL}dynamic/list`,

  // 动态详情
  dynamicInfoUrl: `${BASEURL}dynamic/get`,

  // 删除评论
  deleteCommentUrl: `${BASEURL}dynamic/comment/delete`,

  // 提交评论
  dynamicCommentUrl: `${BASEURL}dynamic/comment/add`,

  // 动态点赞与取消
  dynamicLikeUrl: `${BASEURL}dynamic/thumbsup/add`,
  dynamicUnlikeUrl: `${BASEURL}dynamic/thumbsup/delete`,

  // 动态详情 - webview
  dynamicArticleUrl: `${BASEURL}dynamic/view/article`,

  /**
   * 官网相关
   */
  websiteListUrl: `${jiashopHost}website/content`,

  // 查询表单是否启用且有入口
  websiteCheckFormEntranceUrl: `${jiashopHost}website/check/form/entrance`,

  // 资讯详情
  newsDetailUrl: `${jiashopHost}website/consult/show`,

  // 招聘详情
  recruitmentDetailUrl: `${jiashopHost}website/recruitment/show`,

  // 表单列表
  formListUrl: `${jiashopHost}form/id/query`,

  // 检车表单是否被用户填写过
  formSubmitedCheckUrl: `${jiashopHost}form/submit/check`,

  // 提交表单
  formSubmitUrl: `${jiashopHost}form/data/save`,

  // 提交的表单详情
  formDataInfoUrl: `${jiashopHost}form/data/id/query`,
  




  /**
   * 活动相关
   */
  //推荐活动

  // 获取拼团列表
  getGroupListUrl: `${activityHost}groupPurchasing/queryGroupList`,

  // 获取拼团详情
  queryGroupDetailUrl: `${activityHost}groupPurchasing/queryGroupDetail`,

  // 查询团状态
  queryInvalidInfoUrl: `${activityHost}groupPurchasing/queryInvalidInfo`,

  // 获取卡券列表：用户中心-我的卡券
  getCouponListUrl: `${activityHost}shop/activity/api/listMyCouponListForSmall`,

  // 参与门店活动生成对应id
  joinActivityUrl: `${activityHost}shop/activity/api/addThumpUpActivityForSmall`,

  // 获取卡券详情
  getActivityInfoUrl: `${activityHost}shop/activity/api/findActivityDetailForSmall`,

  // 获取活动参与页详情
  getShareActivityInfoUrl: `${activityHost}shop/activity/api/findShareActivityDetailForSmall`,

  // 给好友点赞
  likedForFriendUrl: `${activityHost}shop/activity/api/addFriendThumbsUpForSmall`,

  // 通过微信授权绑定手机领券
  bindPhoneThroughAuthUrl: `${activityHost}shop/activity/api/addNewUserForSmall`,

  // 根据卡券id获取卡券信息
  getCouponInfoByIdUrl: `${activityHost}shop/activity/api/selectByCouponId`,

  //获取优惠券列表
  couponListUrl: `${activityHost}discount/activity/api/listSpecialDiscountCouponsForSmallIndex`,

  //领取优惠券
  receiveCouponUrl: `${activityHost}discount/activity/api/userReceiveCouponForSmall`,

  // 活动领券绑定手机号
  bindActivityPhoneUrl: `${activityHost}shop/activity/api/bindThumpUpMobileForSmall`, 

  // 解密授权手机号
  decryptePhoneUrl: `${BASEURL}applet/authorize/customer/mobile/register`, 

  // 获取活动列表
  activityListUrl: `${activityHost}shop/activity/api/listActivitysForSmall`, 

  //根据订单号查询数据
  getActivityOrderUrl: `${BASEURL}applet/activity/order`,

  /**
   * 官网底部落款落地
   * 
   */

  // 获取代理商信息
  techSupGetAgentInfoUrl: `${jiashopHost}company/agent`,
  // 申请使用
  techSupApplyUseUrl: `${jiashopHost}company/apply`,
  // 省市获取接口
  techSupGetLocateUrl: `${jiashopHost}company/register/all`,
  // 获取规模接口
  getDimensionListUrl: `${configHost}agent_scale.rq`,
  // 获取底部落款状态
  getSurpportStatusUrl: `${configHost}agent_status_get.rq`,
  // 获取企业类型
  getCompanyTypeUrl: `${configHost}get_company_type.rq`,

  /**
   * 个人中心
   */

  // 未查看的优惠券数量
  getCouponCountNotCheckedUrl: `${BASEURL}activity-provider/discount/activity/api/userCouponsShowCountPointForSmall`,

  /**
   * 优惠券相关 
   */

  // 加载优惠券
  loadCouponList: `${activityHost}discount/activity/api/listSpecialDiscountCouponsForSmallIndex`,
  // 领取优惠券
  gotCoupon: `${activityHost}discount/activity/api/userReceiveCouponForSmall`,
  // 获取特权折扣券详情
  discountCouponInfo: `${activityHost}discount/activity/api/findSharePageDiscountCouponForSmall`,
  // 解密小程序二维码参数, 解决二维码参数不能超过32位字符
  decrypteParams: `${activityHost}discount/activity/api/getParamByShortName`,
  // 根据分类获取商品id
  getIdsByCategory: `${mallHost}classify/api/getProductIdsByClassify`,
  // 根据ids获取商品列表
  getGoodsListByProdIds: `${mallHost}product/api/list`,
  // 线下门店券详情
  storeCouponDetail: `${activityHost}discount/activity/api/findUserCenterCouponDetailForSmall`,
  // 获取优惠券列表
  couponList: `${activityHost}discount/activity/api/findUserCenterMyCouponForSmall`,

  // 默认头像
  defaultAvatarUrl: `https://resource.aijiatui.com/ai-img/img/defaultlogo.png`,
  // 公司头像默认地址
  defaultLogoUrl: 'https://resource.aijiatui.com/background/LOGO50_5020180327.png',

  /**
   * 插件相关
   */
  //中追插件

  //根据企业ID查询AppId和默认名片的cardID
  getCodeByCompanyIdUrl: `${jiashopHost}card/getCardInfo`,

  // 加店
  // 好货banner
  bannerForGoodsUrl: `${jiashopHost}store/banner/goods/list/query`,
  // 门店banner
  bannerForStoreUrl: `${jiashopHost}store/banner/homepage/list/query`,
  // 拼团商品列表
  groupBookingUrl: `${activityManage}group/list`
}