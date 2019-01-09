/**
 * 手机系统
 */
const info = wx.getSystemInfoSync()
const systemInfo = {
  //如果微信版本大于6.6.0返回true 兼容>10的版本号
  isWXVersionGt: info.version.split('.').every((v, i, a) => (i === 0 ? +v >= 6 : (i === 1 && +a[0] === 6 && +v < 6 ? false : true ))), 
  isWXSDKVersionGt: info.SDKVersion.split('.')[0] >= 2, // 如果微信版本大于2.0.0返回true
  isIOS: info.system.indexOf('iOS') > -1, // 如果是iPhone返回true
  isIphoneX: (info.model.indexOf('iPhone X') > -1),
  ...info
}

export { systemInfo }