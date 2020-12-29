import HttpRequeat from '../../utils/Http'

Page({
  data: {
    itemList: null,
    chooseProcess: null,
    num: 0,
    qualified_num: null,
    failed_num: null,
    faileMaxNum: null,
    qualifiedMaxNum: null,
    switch1Checked: false,
  },

  switch1Change(e) {
    this.setData({
      switch1Checked: e.detail.value
    })
  },

  pushMsg(data) {
    const obj = {
      url: 'ticket/wxClothes',
      method: 'POST',
      data
    }
    HttpRequeat(obj).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: '质检完成'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 500)
      }
    })
  },

  getTicket() {
    const obj = {
      url: 'ticket/wxClothes',
      method: 'GET',
      data: {
        ticket_no: this.data.ticket_no
      }
    }
    HttpRequeat(obj).then(res => {
      if (res.code == 1) {
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
        return
      } else {
        let arrs = []
        res.data.process.forEach(item => {
          item.failed_num = 0
          arrs.push(item)
        })
        res.data.process = arrs
        const faileMaxNum = Number(res.data.ticket.num) - Number(res.data.ticket.failed_num)
        const qualifiedMaxNum = Number(res.data.ticket.num) - Number(res.data.ticket.qualified_num)
        this.setData({
          failed_num: res.data.ticket.failed_num,
          qualified_num: res.data.ticket.num,
          num: res.data.ticket.num,
          itemList: res.data,
          faileMaxNum,
          qualifiedMaxNum
        })
      }
    })
  },

  onChangequalified_num(e) {
    let num = Number(e.detail)
    let faileMaxNum = Number(this.data.itemList.ticket.num) - num
    let failed_num = Number(this.data.itemList.ticket.num) - num
    this.setData({
      faileMaxNum,
      qualified_num: num,
      failed_num
    })
  },

  onChangefailed_num(e) {
    let num = Number(e.detail)
    let qualifiedMaxNum = Number(this.data.itemList.ticket.num) - num
    let qualified_num = Number(this.data.itemList.ticket.num) - num
    this.setData({
      qualifiedMaxNum,
      failed_num: num,
      qualified_num
    })
  },

  qualifiedBlur(e) {
    const num = e.detail.value
    const index = e.currentTarget.dataset.touchid.pro_id
    const Allvalue = this.data.itemList
    if (Number(num) > Number(Allvalue.ticket.num)) {
      console.log(num)
      console.log(Allvalue.ticket.num)
      wx.showToast({
        title: '数据错误',
        icon: 'none'
      })
      this.setData({
        itemList: Allvalue
      })
      return
    }
    let arr = []
    Allvalue.process.forEach(item => {
      if (item.pro_id == index) {
        item.num = num
        item.failed_num = Number(Allvalue.ticket.num) - Number(num)
      }

      arr.push(item)
    })
    Allvalue.process = arr
    this.setData({
      itemList: Allvalue
    })
    this.getOkNum()
  },

  getOkNum() {
    let numList = []
    let failed_numList = []
    this.data.itemList.process.forEach(item => {
      numList.push(Number(item.num))
      failed_numList.push(Number(item.failed_num))
    })
    console.log(this.getBigNum(failed_numList))
    console.log(this.getBigNum(numList))
    this.setData({
      failed_num: this.getBigNum(failed_numList)[numList.length - 1],
      qualified_num: this.getBigNum(numList)[0]
    })
  },

  getBigNum(data) {
    return data.sort((a, b) => {
      return a - b
    })
  },

  failedBlur(e) {
    const num = e.detail.value
    const index = e.currentTarget.dataset.touchid.pro_id
    const Allvalue = this.data.itemList
    if (Number(num) > Number(Allvalue.ticket.num)) {
      wx.showToast({
        title: '数据错误',
        icon: 'none'
      })
      this.setData({
        itemList: Allvalue
      })
      return
    }
    let arr = []
    Allvalue.process.forEach(item => {
      if (item.pro_id == index) {
        item.failed_num = num
        item.num = Number(Allvalue.ticket.num) - Number(item.failed_num)
      }
      arr.push(item)
    })
    Allvalue.process = arr
    this.setData({
      itemList: Allvalue
    })
    this.getOkNum()
  },

  selectedValue() {
    const obj = {
      qualified_num: this.data.qualified_num ? this.data.qualified_num : this.data.itemList.ticket.num,
      failed_num: this.data.failed_num ? this.data.failed_num : '0',
      ticket_no: this.data.ticket_no,
      process: this.data.qualified_num ? JSON.stringify(this.data.itemList.process) : null
    }
    this.pushMsg(obj)
  },

  onLoad(options) {
    options.ticket_id ? options.ticket_id : options.ticket_id = 'CJ00012-00005'
    this.setData({
      ticket_no: options.ticket_id
    })
    this.getTicket()
  }
})