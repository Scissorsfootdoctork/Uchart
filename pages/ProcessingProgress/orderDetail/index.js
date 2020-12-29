Page({
	data: {
		ItemLIst: null,
		activeNames: ['1']
	},

	onLoad() {
		const data = wx.getStorageSync('orderDetail')
		this.setData({
			ItemLIst: data
		})
	},

	chooseItem(e) {
		if (!!e.currentTarget.dataset.touchid) {
			wx.navigateTo({
				url: `/pages/ProcessingProgress/detailTdetail/index?data=${JSON.stringify(e.currentTarget.dataset.touchid)}`,
			})
		}
	}
})