const EXT_JSON = wx.getExtConfigSync()

/*
 * statUrl: 埋点
 */

let config = {
  prod: {
    host: `https://${EXT_JSON.baseUrl}/version2/`,
    companyId: EXT_JSON.md,
    statUrl: 'https://opt-cms.aijiatui.com/',
    shareImage: 'https://resource.aijiatui.com/',
    IMappKey : 'f45474f4488f32afb482708a49c7ffad'
  },
  test: {
    // host: `https://${EXT_JSON.baseUrl}/`,
    // companyId: EXT_JSON.md,
    host: 'https://test.aijiatui.com/',
    companyId: '530697120320065536',
    statUrl: 'https://cmstest.aijiatui.com/api/behavior/storage',
    shareImage: 'https://test-resource-cdn.aijiatui.com/',
    IMappKey : '56425599a3b3a2043e1dd36bbba08360' // IM测试环境
  },
  release: {
    host: 'https://release.aijiatui.com/',
    companyId: '503001703793033216',
    statUrl: 'https://cmstest.aijiatui.com/api/behavior/storage',
    shareImage: 'https://test-resource-cdn.aijiatui.com/',
    IMappKey : '56425599a3b3a2043e1dd36bbba08360' // IM测试环境
  },
  dev: {
    host: 'https://pre.aijiatui.com/',
    companyId: '528630816146718720',
    statUrl: 'https://dev-cms.aijiatui.com/api/behavior/storage',
    shareImage: 'https://test-resource-cdn.aijiatui.com/',
    IMappKey:'6980810f8be5e3e4633e27a8cec1ea34'// IM开发环境
  }
}

module.exports = config

// appId: wxd7e08c8b2403d4e9 companyId: 528630816146718720 加店版
// appId: wx0a3ff21f3cbf4d02 companyId: 530697120320065536 加店测试专用

// app ID wxc9ae6b26e249df7f  开发重构发版

// appId: wx9baba687ecedbca4 companyId: 503001703793033216 预演环境 洛克塔
// appId: wx40cb5f4e7ee48b5f companyId: 503001724621955072 预演环境 广东省加推科技有限公司
// appId: wx4ddb82344b6ace61 companyId: 503001680846008320 预演环境 加推商城正式专用
// appid: wxe7683a80c2deae4c companyId: 525372621244600320 小黄鸭
// appId: wxe52e4a7e8b7bb120 companyId: 523144769413582848 重构门店测试
// appid: wx37131d9820e46ab9 companyId: 487691313471291392 重构企业版测试
// appId: wxcc74d512693ea1d3 companyId: app_1071404f3fc08c16 微服务测试专用
// appId: wx8be56e52d0acaff4 companyId: app_1b7e114315bb5d91 加推商城测试专用
// appId: wxc9901fdce05080ef companyId: app_49490b008b3c1cfe 加推青葱
// appId: wx98657d40c3108934 companyId: app_924c26cce748dcc0 加推科技开发专用 business.aijiatui.com app_02557533b795e7b2

// appId: wx40cb5f4e7ee48b5f companyId: app_85c56c5806767d9e 广东省加推科技有限公司 business.aijiatui.com

// 可信域名列表
// request 合法域名：
//   IM
//   https://lbs.netease.im
//   https://wlnimsc0.netease.im
//   https://wlnimsc1.netease.im
//   https://dr.netease.im
//   https://nos.netease.com
//   https://nim.nosdn.127.net
//   腾讯mta统计
//   https://pingtas.qq.com/

//   文件上传签名获取
//   https://download.aijiatui.com/

//   加推数据统计
//   产品环境
//   https://opt-cms.aijiatui.com/

//   测试环境
//   https://cmstest.aijiatui.com/

//   开发环境
//   https://dev-cms.aijiatui.com/

//   API
//   测试
//   https://test.aijiatui.com/

//   开发
//   https://pre.aijiatui.com/

//   预演
//   https://release.aijiatui.com/

//   产品
//   https://business.aijiatui.com/


// socket 合法域名:
//   IM
//   wss://wlnimsc0.netease.im
//   wss://wlnimsc1.netease.im

// uploadFile 合法域名:
//   IM
//   https://nos.netease.com

//   文件上传
//   https://resource-1255821078.cos.ap-guangzhou.myqcloud.com/

// downloadFile 合法域名
//   IM
//   https://nim.nosdn.127.net

//   图片资源
//   https://resource.aijiatui.com
//   https://test-resource-cdn.aijiatui.com/

//   微信头像
//   https://wx.qlogo.cn/

//   其他
//   img.jikni.com
//   p.qlogo.cn