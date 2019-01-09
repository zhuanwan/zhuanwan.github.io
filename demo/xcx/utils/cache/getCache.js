import { Storage } from '../public'
import { CARD_DETAIL_KEY, UNIONID, USERINFO_KEY } from '../storage.key'

function getCardDetail() {
  return Storage.getSync(CARD_DETAIL_KEY)
}

function getUnionId() {
  return Storage.getSync(UNIONID)
}

function getUserInfo() {
  return Storage.getSync(USERINFO_KEY)
}

export {
  getCardDetail,
  getUnionId,
  getUserInfo
}