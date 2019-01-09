import COS from '../sdk/cos/cos-wx-sdk-v5'
import apiUrl from './urls'
import { showToast, Loading } from './public'

const BUCKET = 'resource-1255821078'
const REGION = 'ap-guangzhou'

// 初始化实例
const cos = new COS({
  getAuthorization(options, callback) {
    wx.request({
      url: `${apiUrl.getAuthorizationUrl}?method=${(options.Method || 'GET').toLowerCase()}&pathname=${encodeURIComponent(`/${options.Key || ''}`)}`,
      success: res => {
        callback({ Authorization: res.data.signature })
      },
      fail: err => {
        showToast('连接上传服务器失败')
      }
    })
  }
})

/**
 * 上传图片到腾讯云
 * @param {String} folder 文件夹名称
 * @return Promise
 */
function uploadImage(folder, {maxSize = 1024 * 1024 * 2} = {}) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: res => {
        const { size } = res.tempFiles[0]
        if (size > maxSize) {
          showToast('图片大小不能超过2Mb')
          return
        }

        const filePath = res.tempFilePaths[0]
        const fileName = filePath.substr(filePath.lastIndexOf('/') + 1)
        const key = `/${folder}/${fileName}`

        Loading.show('正在上传...')
        cos.postObject({
          Bucket: BUCKET,
          Region: REGION,
          Key: key,
          FilePath: filePath,
          onProgress(info) {}
        }, (error, data) => {
          Loading.hide()

          if (data.statusCode === 200) {
            const url = `https://resource.aijiatui.com${key}`
            resolve({ key, url })
            return
          }

          reject(error)
        })
      }
    })
  })
}


/**
 * 从腾讯云删除指定文件
 * @param {String} key 要删除的文件key
 * @return Promise
 */
function removeImage(key) {
  return new Promise((resolve, reject) => {
    cos.deleteObject({
      Bucket: BUCKET,
      Region: REGION,
      Key: key
    }, (error, data) => {
      if (data.statusCode === 204) {
        resolve({})
        return
      }

      reject(error)
    })
  })
}

export {
  uploadImage,
  removeImage
}