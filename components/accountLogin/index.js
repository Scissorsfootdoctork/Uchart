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
      this.triggerEvent("sendEvent", e.detail.value)
    }
  }
})