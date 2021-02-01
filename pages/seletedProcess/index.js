import HttpRequeat from '../../utils/Http'

Page({
  data: {
    itemList: null,
    chooseProcess: null,
    resCode: null,
  },

  checkboxChange(e) {
    this.setData({
      chooseProcess: e.detail.value
    })
  },

  pushMsg() {
    const obj = {
      url: 'ticket/wxIndex',
      method: 'POST',
      data: {
        processList: this.data.chooseProcess,
        ticket_no: this.data.ticket_no
      }
    }
    HttpRequeat(obj).then(res => {
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

  getTicket(ticket) {
    const obj = {
      url: 'ticket/wxIndex',
      method: 'GET',
      data: {
        ticket_no: ticket
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
      }
      this.setData({

        itemList: res.data
      })
    })
  },

  onLoad: function (options) {
    !!options.ticket ? options.ticket : options.ticket = 'CJ00069-00017'
    this.setData({
      ticket_no: options.ticket
    })
    this.getTicket(this.data.ticket_no)
  }
})