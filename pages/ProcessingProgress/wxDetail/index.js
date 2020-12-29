import HttpRequeat from '../../../utils/Http'

Page({
  data: {
  },
  
  getdata() {
    let obj = {
      url: '/production/getDelegated',
      method: 'GET',
      data: {
        production_id: this.data.production_id
      }
    }
    HttpRequeat(obj).then(res => {
      this.setData({
        itemLIst: res.data
      })
    })
  },

  onLoad(options) {
      this.setData({
        production_id: options.pro_id ? options.pro_id : '573'
      })
      this.getdata()
    
  }
})