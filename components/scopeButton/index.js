Component({
  properties: {
    scopeButton: {
      value: false,
      type: Boolean
    }
  },

  methods: {
    bindGetUserInfo(e) {
      if (e.detail.userInfo) {
        this.triggerEvent("sendEvent", e.detail)
        console.log(e.detail.userInfo)
      } else {
        wx.showToast({
          title: '未获取授权',
          icon:'none'
        })
      }
    },
  }
})
