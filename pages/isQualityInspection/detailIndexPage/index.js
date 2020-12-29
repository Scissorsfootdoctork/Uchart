import HttpRequeat from '../../../utils/Http'

Page({
  data: {
    itemList: null,
    chooseProcess: null,
    faileMaxNum: 0,
    qualifiedMaxNum: 0,
    failed_num: 0,
    qualified_num: 0
  },

  changeMsg(data) {
    const obj = {
      url: 'ticket/editCheckedTicket',
      method: 'POST',
      data
    }
    HttpRequeat(obj).then(res => {
      if (res.code == 0) {
        wx.removeStorageSync('changeCheckTicket')
        wx.showToast({
          title: '修改完成'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })

        }, 500)
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

  formSubmit(e) {
    let obj = e.detail.value
    obj.failed_num = this.data.failed_num
    obj.qualified_num = this.data.qualified_num
    obj.ticket_no = this.data.ticket_no ? this.data.ticket_no : this.data.itemList.ticket.ticket_no
    const numa = Number(obj.qualified_num) + Number(obj.failed_num)
    obj.ticket_id = this.data.itemList.ticket.ticket_id
    if (numa != this.data.itemList.ticket.num) {
      wx.showToast({
        title: '数据异常',
        icon: 'none'
      })
      return
    }
    this.changeMsg(obj)
  },
  onLoad() {
    const ticketData = wx.getStorageSync('changeCheckTicket')
    const qualified_num = ticketData.qualified_num
    const qualifiedMaxNum = ticketData.num
    const failed_num = ticketData.failed_num
    const faileMaxNum = ticketData.num - ticketData.qualified_num
      const obj = {
        ticket: ticketData
      }
      this.setData({
        itemList: obj,
        qualified_num,
        qualifiedMaxNum,
        faileMaxNum,
        failed_num
      })
    }
})