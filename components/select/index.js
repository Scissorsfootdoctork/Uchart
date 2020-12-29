Component({
  properties: {
    title: {
      type: String,
      value: '请传title'
    },
    index: {
      type: Number,
      value: 0
    },
    arrData: {
      type: Array,
      value: [{
        name: '暂无数据',
        key: 0
      }]
    }
  },

  methods: {
    bindPickerChange(e) {
      this.triggerEvent("sendEvent", this.data.arrData[e.detail.value].key);
      this.setData({
        index: e.detail.value
      })
    },
  }
})