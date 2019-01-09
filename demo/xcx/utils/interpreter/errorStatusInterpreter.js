/**
 * 检查请求接口返回的状态码
 * @param {*} status 
 */
function errorStatusInterpreter(response) {
  switch(response.statusCode){
    case undefined:
      response.data = {
        code: 0,
        msg: '未能连接到服务器'
      }
      break

    case 200: 
      let path = null
      let msg = null
      // @todo 待后台约定
      // switch (response.data.code) {
      //   case 3:
      //     path = '/subs/error/pages/stop/stop'
      //     msg = '公司服务停止'
      //     break

      //   case 4:
      //     path = '/subs/error/pages/fail/fail'
      //     msg = '公司服务错误'
      //     break

      //   case 5:
      //     wx.removeStorageSync(Indentify_Save_Data_key)
      //     path = '/subs/error/pages/delete/delete'
      //     msg = '公司服务删除'
      //     break
      // }

      if(path){
        response.data.msg = msg
        wx.reLaunch({ path })
      }
      break

    case 404: 
      response.data = {
        code: 404,
        msg: '请求的地址不存在'
      }
      break

    case 500: 
      response.data = {
        code: 500,
        msg: '服务器异常'
      }
      break

    default: 
      response.data = {
        code: response.statusCode,
        msg: `${(response.data && response.data.msg) || response.errMsg}${response.statusCode ? '(' + response.statusCode + ')' : ''}`
      }
  }
}

export { errorStatusInterpreter }