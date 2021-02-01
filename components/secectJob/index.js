// components/secectJob/index.js
Component({
  properties: {
    List: {
      type: Array,
      value: []
    }
  },
  data: {
    chooseProcess: null
  },
  methods: {
    chooseItem() {
      console.log(this.properties.List)
    },
    checkboxChange(e) {
      console.log(e.detail.value)
      this.triggerEvent("sendEvent", e.detail.value);
    }
  }
})