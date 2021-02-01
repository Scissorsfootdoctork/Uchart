Component({
  properties: {
    itemList: {
      type: Array,
      value: []
    },
    moneyData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    mainTab(e) {
      this.triggerEvent("sendEvent", e.currentTarget.dataset.touchid);
    }
  }
})
