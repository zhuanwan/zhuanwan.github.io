import { envConfig } from './config/index'

function imageUrlAdjust(url, width = 410) {
  if(!url) return ''
  
  if(url.indexOf('img.jikni.com') > -1){
    const split = url.indexOf('?') != -1 ? '&' : '?'
    return `${url}${split}x-oss-process=image/resize,w_${width}`
  }

  if(url.indexOf('resource.aijiatui.com') > -1 && url.indexOf('?') === -1){
    const system = wx.getSystemInfoSync().system
    return `${url}?imageMogr2/auto-orient/thumbnail/!80p/quality/40${system.indexOf('Android') > -1 ? '' : '/format/webp'}`
  }

  return url
}

function imageAlbumUrlAdjust (image_url) {
  return `${ image_url }?imageMogr2/auto-orient`
}

function imageShareUrlAdjust (image_url) {
  return `${ image_url }?imageView2/1/w/500/h/400/q/85!`
}

function cardImageShareUrlAdjust(card_id, posterStyleId) {
  return `${envConfig.shareImage}poster/${envConfig.companyId}/${card_id}/poster_${envConfig.companyId}_${card_id}_1002${(posterStyleId*1+'' || '').padStart(5,'0')}.jpg?t=${Date.now()}`
}

export { imageUrlAdjust, imageAlbumUrlAdjust, imageShareUrlAdjust, cardImageShareUrlAdjust }