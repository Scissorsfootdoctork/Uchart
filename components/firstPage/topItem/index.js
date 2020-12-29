Component({
  properties: {
    topItems: {
      type: Array,
      value: []
    }
  },
  data: {},
  methods: {
    topTab(e) {
      this.triggerEvent("sendEvent", e.currentTarget.dataset.touchid);
    }
  }
})
