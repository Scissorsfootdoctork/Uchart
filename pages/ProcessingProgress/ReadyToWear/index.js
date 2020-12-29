Page({
  data: {
    productionDetail: null
  },

  getdate() {
    const da = new Date(this.data.productionDetail.production.bg_time)
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

  onLoad() {
    const data = wx.getStorageSync('productionDetail')
    let bgtime = this.formatTime(data.production.bg_time)
    let endtime = this.formatTime(data.production.end_time)
    this.setData({
      productionDetail: data,
      bgtime,
      endtime
    })
  }
})