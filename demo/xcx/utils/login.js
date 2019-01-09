import { post, notifyRequestQueue } from './request'
import { envConfig } from './config/index'
import { setLocalToken, setLocalUserInfo } from './usercenter'
import apiUrl from './urls'

function refreshToken(code, dbid, token){
  return new Promise((resolve, reject) => {
    const header = { "content-type": "application/x-www-form-urlencoded" }

    post(apiUrl.refreshTokenUrl, { code, companyId:dbid, token }, {
      header,
      withToken: false
    }).then(res => {
      const data = res.data;
      if (data.data && data.data.token) {
        resolve(data.data.token)
        return
      }
      reject(res)
    }, error => reject(error))
  })
}

function login(code, encryptedData, iv, userInfo){
  return new Promise((resolve, reject) => {
    post(
      apiUrl.loginUrl,
      { code, encryptedData, iv, companyId: envConfig.companyId },
      {
        withToken: false,
        showLoading: true,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        }
      }
    ).then(res => {
      const app = getApp()
      const { token, userId, unionId, openId } = res.data.data

      userInfo.userId = userId
      userInfo.unionId = unionId
      userInfo.openId = openId
      userInfo.token = token
      
      app.globalData.userInfo = userInfo
      setLocalToken(token)
      setLocalUserInfo(userInfo)
      notifyRequestQueue()

      resolve(res)
    }, error => reject(error))
  })
}

export default login

export {
  refreshToken
}