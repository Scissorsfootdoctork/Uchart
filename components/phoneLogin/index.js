Component({
  properties: {
    buttonType: {
      value: false,
      type: Boolean
    }
  },
  data: {},
  methods: {
    formSubmit(e) {
      if (!e.detail.iv && !e.detail.encryptedData) {
        wx.showToast({
          title: '未获取手机号码',
          icon: 'none'
        })
        return
      }
      const viData = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      }
      this.triggerEvent("sendEvent", viData)
    }
  }
})