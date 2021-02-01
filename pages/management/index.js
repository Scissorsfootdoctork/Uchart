Page({
	data: {
		list: null
	},

	scanChange() {
		wx.scanCode({
			onlyFromCamera: true,
			success(res) {
				if (res.result) {
					wx.navigateTo({
						url: `/pages/changeProcess/index?ticket_id=${res.result}`,
					})
				}
			}
		})
	},

	chooseItem(e) {
		const is_admin = e.currentTarget.dataset.touchid
		switch (Number(is_admin.purview_id)) {
			case 20:
				this.scanChange()
				break;
			case 21:
				wx.navigateTo({
					url: is_admin.url,
				})
				break;
			case 22:
				wx.navigateTo({
					url: is_admin.url,
				})
				break;
			case 23:
				wx.navigateTo({
					url: is_admin.url,
				})
				break;
			case 24:
				wx.navigateTo({
					url: is_admin.url,
				})
				break;
			case 25:
				wx.navigateTo({
					url: is_admin.url,
				})
				break;
		}
	},

	onLoad() {
		const management = wx.getStorageSync('management')
		this.setData({
			list: management
		})
	}
})