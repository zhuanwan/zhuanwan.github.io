const app = getApp()
Component({
  properties: {
    bottom:{
      type: String,
      value: 440
    },
    icon:{
      type:String,
      value:'./img/gotop.png'
    },
    value:{
      type:String,
      value:'置顶'
    }
  },
  data: {
    isShow: false,
  },
  lifetimes: {
    ready(){

    }
  },
  methods: {
    goTop() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    },
    handleSendFormId(e) {
      this.triggerEvent('submit', e)
    }
  }
})