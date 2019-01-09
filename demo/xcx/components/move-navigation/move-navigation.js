const app = getApp()
let startPosition = {}  // 记录最开始的位置
let movePosition = {}   // 移动中位置
let startTime= null

Component({
  properties: {
    bottom:{
      type: Number,
      value: 440
    },
    right:{
      type: Number,
      value: 40
    },
  },
  data: {
    top: 0,
    left: 0,
    asyncSystemInfo: null
  },
  lifetimes: {
    ready() {
      this.data.asyncSystemInfo = null
      this.getAsyncSystemInfo().then(systemInfo => {
        let top = systemInfo.windowHeight - this.transformationSize(this.data.bottom+110)
        let left = systemInfo.windowWidth - this.transformationSize(this.data.right+110)
        this.setData({
          top: top,
          left: left
        })
      })
    }
  },
  methods: {
    // 异步获取system, 同步方法windowHeight不准确，减不了tabbar高度
    getAsyncSystemInfo() {
      let that = this
      if (this.data.asyncSystemInfo) {
        return Promise.resolve(this.data.asyncSystemInfo)
      }
      return new Promise((resolve, reject)=> {
        wx.getSystemInfo({
          success(res) {
            res.isIphoneX = res.model.indexOf('iPhone X') > -1
            that.setData({
              asyncSystemInfo: res
            })
            resolve(res)
          },
          fail(error) {
            reject(error)
          }
        })
      })
    },
    // rpx=> px
    transformationSize(size) {
      let screenWidth = wx.getSystemInfoSync().screenWidth;
      return (size * screenWidth / 750);
    },
    // 开始移动，记录时间和开始位置
    touchstart(e) {
      startTime = +new Date()
      startPosition = {
        clientX: this.data.left,
        clientY: this.data.top
      }
      movePosition = {
        clientX: e.changedTouches[0].clientX,
        clientY: e.changedTouches[0].clientY
      }
    },
    // 移动中把位置移动,不能超过四周边界
    touchmove(e) {
      this.getAsyncSystemInfo().then(systemInfo => {
        this.setData({
          left: Math.min(Math.max(0, this.data.left + (e.changedTouches[0].clientX - movePosition.clientX)), systemInfo.windowWidth - this.transformationSize(110)),
          top: Math.min(Math.max(0, this.data.top + (e.changedTouches[0].clientY - movePosition.clientY)), systemInfo.windowHeight - this.transformationSize(110) - (systemInfo.isIPhoneX ? 69: 0)),
        })
        movePosition = {
          clientX: e.changedTouches[0].clientX,
          clientY: e.changedTouches[0].clientY,
        }
      }) 
    },
    // 如果是点击，把位置还原
    touchend(e) {
      const keepTime = +new Date() - startTime
      if (keepTime < 350) {
        this.setData({
          left: startPosition.clientX,
          top: startPosition.clientY
        })
      }
    }
  }
})