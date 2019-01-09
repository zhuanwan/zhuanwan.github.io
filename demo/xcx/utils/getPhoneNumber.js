import { loginByWechat } from './loginByWechat'
import apiUrl from './urls'
import { post } from './request'

function getPhoneNumber(options){
  return new Promise((resolve, reject) => {
    loginByWechat().then(code => {
      post(apiUrl.authPhoneUrl, {code, ...options}, { silentFail: false, showLoading: true }).then(res => {
        const app = getApp()
        const { mobile } = res.data.data
        app.globalData.authorizePhoneStatus.authorizeStatus = 1
        app.globalData.authorizePhoneStatus.mobile = mobile
        resolve(mobile)
      }).catch(error => reject(error))
    }).catch(error => reject(error))
  })
}

function getAuthorizePhone() {
	return new Promise((resolve, reject) => {
    const app = getApp()
    const authorizePhoneStatus = app.globalData.authorizePhoneStatus
	  const authorizeStatus = authorizePhoneStatus.authorizeStatus

	  if (authorizeStatus === 1) {
	  	resolve({...authorizePhoneStatus})
      return
	  }

    post(apiUrl.getAuthorizePhoneUrlStatus, {}, {silentFail: false, showLoading: false}).then(res => {
      const {authorizeStatus, switchStatus, mobile} = res.data.data
      app.globalData.authorizePhoneStatus = { authorizeStatus, switchStatus, mobile }
      resolve({ authorizeStatus, switchStatus, mobile})
    }, error => reject(error))
	})
}

export { getAuthorizePhone }

export default getPhoneNumber