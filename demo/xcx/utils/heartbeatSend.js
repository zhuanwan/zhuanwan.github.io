import { post } from './request'
import apiUrl from './urls'
const {Storage} = require("./public")
const {IMTOKEN} = require("./storage.key")
const IMtoken = Storage.getSync(IMTOKEN) || '';

function heartbeatSend() {
  if(!IMtoken) return; // 防止未登录状态下积累过多请求
  post(apiUrl.heartbeat, {},{silentFail:true}).then(res => {}, error => {})
}

const heartbeatDelay = 5000
function runHeartbeatSend(){
    heartbeatSend()
    setTimeout(runHeartbeatSend, heartbeatDelay)
}

export { runHeartbeatSend }