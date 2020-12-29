import HttpRequeat from '../../utils/Http'
Page({
  data: {
    date: null,
    priceAll: 0,
    listItem: null,
    pagenum: 1,
    total: 0
  },

  onLoad(options) {
    let time = new Date()
    let y = time.getFullYear()
    let m = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`
    this.setData({
      date: `${y}-${m}`,
      user_id: options.user_id
    })
    this.getData()
  },

  bindDateChange(e) {
    const time = e.detail.value
    this.setData({
      date: time,
      listItem: null
    })
    this.getData(e.detail.value)
  },
  onReachBottom() { //触底开始下一页
    let pagenum = this.data.pagenum + 1
    this.setData({
      pagenum: pagenum, //更新当前页数
    })
    this.getData(); //重新调用请求获取下一页数据
  },

  getData() {
    const obj = {
      url: 'production/getWxSalary',
      method: 'GET',
      data: {
        page: this.data.pagenum,
        type: 'month',
        date: this.data.date,
        user_id: this.data.user_id ? this.data.user_id : ''
      }
    }
    HttpRequeat(obj).then(res => {
      let arr1 = this.data.listItem && this.data.listItem !== null ? this.data.listItem : {}
      let arr2 = res.data.list; //从此次请求返回的数据中获取新数组
      let newAeer = {}
      Object.assign(newAeer, arr1, arr2);
      this.setData({
        user_id: res.data.user_id,
        listItem: newAeer,
        total: res.data.total
      })
    })
  },

  chooseItem(e) {
    const obj = {
      user_id: this.data.user_id,
      date: e.currentTarget.dataset.touchid
    }
    if (e.currentTarget.dataset.touchid) {
      wx.navigateTo({
        url: `/pages/statisticsMoney/detailMoney/index?date=${JSON.stringify(obj)}`,
      })
    } else {
      wx.showToast({
        title: '当日无数据',
        icon: 'none',
        duration: 2000
      })
    }
  }
})