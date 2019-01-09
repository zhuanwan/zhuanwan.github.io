/**
 * 用户中心
 *
 */
const { LOGIN_TOKEN_KEY, USERINFO_KEY } = require("./storage.key")
import { Storage } from './public'

/**
 * token getter && setter
 */
let token = ''

function getToken() {
  return token
}

function setToken(value) {
  token = value
}

function getLocalToken() {
  return Storage.getSync(LOGIN_TOKEN_KEY)
}

function setLocalToken(value) {
  setToken(value)
  Storage.setSync(LOGIN_TOKEN_KEY, value)
}

let userInfo = Storage.getSync(USERINFO_KEY) || {}
function setUserInfo(value){
  userInfo = value
}

function getUserInfo(){
  return userInfo
}

function getLocalUserInfo(){
  return Storage.getSync(USERINFO_KEY)
}

function setLocalUserInfo(value){
  setUserInfo(value)
  Storage.setSync(USERINFO_KEY, value)
}


module.exports = {
  getToken,
  setToken,
  getLocalToken,
  setLocalToken,

  setUserInfo,
  getUserInfo,
  setLocalUserInfo,
  getLocalUserInfo
}