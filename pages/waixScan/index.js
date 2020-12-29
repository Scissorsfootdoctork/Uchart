import HttpRequeat from '../../utils/Http'

Page({
  data: {
    productionDetail: null,
    tableData: null,
    num: 0,
    qualified_num: null,
    qualifiedMaxNum: null,
    switch1Checked: false,
    has_size: 0
  },

  formatTime(number) {
    var date = new Date(Number(number) * 1000);
    let Y = date.getFullYear()
    let M = this.formatNumber(date.getMonth() + 1)
    let D = this.formatNumber(date.getDate())
    let h = this.formatNumber(date.getHours())
    let m = this.formatNumber(date.getMinutes())
    let s = this.formatNumber(date.getSeconds())
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
  },

  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  },

  inpConfirm(e) {
    const inputNum = e.detail.value
    const rowData = e.currentTarget.dataset.touchid[0]
    const subRowData = e.currentTarget.dataset.touchid[1]
    const oldData = this.data.tableData
    const newRow = []
    rowData.detail.forEach(item => {
      if (item.size == subRowData.size) {
        item.clothes_num = inputNum
      }
      newRow.push(item)
    })
    rowData.detail = newRow
    const newAdta = []
    oldData.forEach(item => {
      if (item.color == rowData.color) {
        item.detail = rowData.detail
      }
      newAdta.push(item)
    })
    this.setData({
      tableData: oldData,
      // stableData: JSON.stringify(oldData)
    })
  },

  onChangequalified_num(e) {
    let num = Number(e.detail)
    this.setData({
      qualified_num: num,
    })
  },

  switch1Change(e) {
    this.setData({
      switch1Checked: e.detail.value
    })
  },

  back() {
    setTimeout(() => {
      wx.navigateBack({
        delta: -1,
      })
    }, 500);
  },

  getdata(d) {
    let obj = {
      url: 'production/checkDelegated',
      method: 'GET',
      data: {
        delegated_id: this.data.delegated_id
      }
    }
    HttpRequeat(obj).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: res,
          icon: 'none'
        })
        this.back()
      }
      const tableData = res.data.delegated.detail
      let arr = []
      for (let key in tableData) {
        arr.push({
          color: key,
          detail: []
        })
      }

      for (let key in tableData) {
        arr.forEach((item, index) => {
          if (item.color == key) {
            for (let yu in tableData[key]) {
              arr[index].detail.push({
                size: yu,
                num: tableData[key][yu],
                clothes_num: 0
              })
            }
          }
        })
      }
      this.setData({
        qualified_num: res.data.delegated.num,
        num: res.data.delegated.num,
        qualifiedMaxNum: res.data.delegated.num,
        tableData: arr,
        productionDetail: res.data,
        bgtime: this.formatTime(res.data.production.bg_time),
        endtime: this.formatTime(res.data.production.end_time),
        has_size: res.data.delegated.has_size
      })
    })
  },

  getTableFormat() {
    const data = this.data.tableData
    let arr = []
    data.forEach((item, index) => {
      item.detail.forEach((subItem, sunkey) => {
        if (subItem.clothes_num != 0) {
          let key = `${index}_${sunkey}`
          arr.push({
            [key]: subItem.clothes_num
          })
        }
      })
    })
    let obj = {}
    arr.forEach(item => {
      for (let i in item) {
        obj[i] = item[i]
      }
    })
    return JSON.stringify(obj)
  },

  selectedValue() {
    setTimeout(() => {
      let obj = {
        url: 'production/checkDelegated',
        method: 'POST',
        data: {
          is_done: this.data.switch1Checked ? 1 : 0,
          user_id: wx.getStorageSync('user_id'),
          cs_num: this.getTableFormat(),
          num: this.data.qualified_num,
          delegated_id: this.data.delegated_id,
          has_size: this.data.has_size
        }
      }
      HttpRequeat(obj).then(res => {
        if (res.code != 0) return
        wx.showToast({
          title: res.msg,
          icon: 'success'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: -1,
          })
        }, 500);
      })
    }, 500)

  },

  onLoad(options) {
    this.setData({
      delegated_id: options.ticket ? options.ticket : '1'
    })
    this.getdata()
  }
})