import HttpRequeat from '../../../utils/Http'

Page({

	data: {
		ItemLIst: null
	},

	getData(data) {
		let obj = {
			url: 'production/getUserByProcess',
			method: 'GET',
			data: {
				process_id: data.process_id,
				production_id: wx.getStorageSync('orderDetail').production.production_id
			}
		}
		
		HttpRequeat(obj).then(res => {
			this.setData({
				ItemLIst: res.data
			})
		})
	},

	onLoad(options) {
		const data = JSON.parse(options.data)
		this.getData(data)
	}
})