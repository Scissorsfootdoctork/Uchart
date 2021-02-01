import HttpRequeat from '../../utils/Http'

Page({
	data: {
		user: null
	},

	onLoad() {
		const user = wx.getStorageSync('user')
		this.setData({
			user
		})
	},

	onShow() {
		this.getData()
	},

	getData() {
		const obj = {
			url: "employee/info",
			method: 'GET',
			data: {}
		}
		HttpRequeat(obj).then(res => {
			this.setData({
				pageData: res.data
			})
		})
	},

	chooseItem(e) {
		const config = e.currentTarget.dataset.touchid
		switch (Number(config.purview_id)) {
			case 26:
				wx.navigateTo({
					url: `${config.url}?user_id=${wx.getStorageSync('user_id')}`,
				})
				break;
			case 27:
				wx.navigateTo({
					url: config.url,
				})
				break;
			case 28:
				wx.navigateTo({
					url: config.url,
				})
				break;
			case 29:
				wx.navigateTo({
					url: config.url,
				})
				break;
			case 30:
				wx.navigateTo({
					url: config.url,
				})
				break;
		}
	},
})