Component({
  properties: {
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
    tapDialogButton(e) {
      this.triggerEvent("sendEvent", e.detail.index);
    }
  }
})