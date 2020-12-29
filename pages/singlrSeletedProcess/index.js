import HttpRequeat from '../../utils/Http'

Page({
  data: {
    itemList: null,
    chooseProcess: null,
    resCode: null,
  },

  checkboxChange(e) {
    const indexItem = e.detail.value
    const findItem = this.data.itemList.process
    let arr = []
    indexItem.forEach(item => {
      findItem.forEach(subItem => {
        if (subItem.process_id == item) {
          arr.push(subItem)
        }
      })
    })
    let newarr = []
    arr.forEach(item => {
      if(!item.num) {
        item.num = this.data.itemList.ticket.num 
      }
      newarr.push(item)
    })
    this.setData({
      chooseProcess: newarr
    })
  },

  pushMsg() {
    if(!this.data.chooseProcess) {
      wx.showToast({
        title: '请选择工序',
        icon: 'none'
      })
      return
    }
    const obj = {
      url: 'ticket/wxIndex',
      method: 'POST',
      data: {
        processList: JSON.stringify(this.data.chooseProcess),
        ticket_no: this.data.ticket_no,
        type: 'single'
      }
    }
    HttpRequeat(obj).then(res => {
      console.log(res)
      if (res.code == 0) {
        wx.showToast({
          title: '提交完成'
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
      url: 'ticket/wxIndex',
      method: 'GET',
      data: {
        ticket_no: this.data.ticket_no,
        type: 'single'
      }
    }
    console.log(obj)
    HttpRequeat(obj).then(res => {
      if (res.code == 1) {
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
        return
      }
      this.setData({

        itemList: res.data
      })
    })
  },

  onChangequalified_num(e) {
    const process_id = e.currentTarget.dataset.touchid.process_id
    const processValue = e.detail
    const allArr = this.data.itemList.process
    allArr.forEach(item => {
      if(item.process_id == process_id) {
        item.num = processValue
      }
    })
  },

  onLoad (options) {
    this.setData({
      ticket_no: options.ticket ? options.ticket : 'CJ00072-00004'
    })
    this.getTicket()
  }
})