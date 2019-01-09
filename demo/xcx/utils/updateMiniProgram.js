/**
 * 小程序更新检测
 */

import { LOGIN_TOKEN_KEY } from './storage.key'
import { Storage, showToast, showModal } from './public'

function updateMiniProgram() {
  const updateManager = wx.getUpdateManager()

  updateManager.onCheckForUpdate(res => {
    
  })

  updateManager.onUpdateReady(() => {
    showModal('更新提示', '新版本已经准备好，立即更新使用', {
      showCancel: false,
      confirmText: '好'
    }).then(res => {
      if(!res.confirm) return
      updateManager.applyUpdate()
      Storage.removeSync(LOGIN_TOKEN_KEY)
    }, () => {})
  })

  updateManager.onUpdateFailed(() => {
    showToast('新版本下载失败')
  })
}

export { updateMiniProgram }