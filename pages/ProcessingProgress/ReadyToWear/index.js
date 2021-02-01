Page({
  data: {
    productionDetail: null
  },
  
  onLoad() {
    const data = wx.getStorageSync('productionDetail')
    console.log(data)
    this.setData({
      productionDetail: data,
    })
  }
})