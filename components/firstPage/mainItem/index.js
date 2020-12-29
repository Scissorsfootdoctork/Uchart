Component({
  properties: {
    itemList: {
      type: Array,
      value: []
    },
    config: {
      type: Object,
      value: {}
    },
    moneyData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    mainTab(e) {
      console.log(this.properties.config)
      this.triggerEvent("sendEvent", e.currentTarget.dataset.touchid);
    }
  }
})
