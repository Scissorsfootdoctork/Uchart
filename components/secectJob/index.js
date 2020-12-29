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
    checkboxChange(e) {
      this.triggerEvent("sendEvent", e.detail.value);
    }
  }
})