Component({
  properties: {
    num: {
      type: String,
      value: ''
    },
    showDialog: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    buttons: {
      type: Array,
      value: [{
        text: '取消'
      }, {
        text: '确定'
      }]
    }
  },
  data: {},
  methods: {
    confirmNum(e) {
      this.setData({
        num: e.detail.value
      })
    },
    tapDialogButton(e) {
        if (e.detail.index != 1 || this.data.num) {
          this.triggerEvent("sendEvent", {
            index: e.detail.index,
            num: this.data.num
          });
        } else {
          wx.showToast({
            title: '请输入数量',
            icon: 'none'
          })
        }
    }
  }
})