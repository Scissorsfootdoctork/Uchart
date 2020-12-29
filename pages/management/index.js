Page({
	data: {
		list: [{
				title: '扫码修改',
				id: 1,
				icon: 'scan'
			}, {
				title: '工票修改',
				id: 5,
				icon: 'orders-o'
			}, {
				title: '质检修改',
				id: 6,
				icon: 'completed'
			},{
				title: '生产进度',
				id: 3,
				icon: 'tosend'
			},
			{
				title: '员工管理',
				id: 2,
				icon: 'user-circle-o'
			},
			{
				title: '工资排名',
				id: 4,
				icon: 'chart-trending-o'
			}
		]
	},

	chooseItem(e) {
		const is_admin = wx.getStorageSync('is_admin')
		switch (e.currentTarget.dataset.touchid) {
			case 1:
				if (is_admin != 1) {
					wx.showToast({
						title: '无权限',
						icon: 'none'
					})
				} else {
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
				}
				break;
			case 2:
				if (is_admin != 1) {
					wx.showToast({
						title: '无权限',
						icon: 'none'
					})
				} else {
					wx.navigateTo({
						url: '/pages/StaffManagement/index',
					})
				}
				break;
			case 3:
				if (is_admin != 1) {
					wx.showToast({
						title: '无权限',
						icon: 'none'
					})
				} else {
					wx.navigateTo({
						url: '/pages/ProcessingProgress/index',
					})
				}

				break;
			case 4:
				if (is_admin != 1) {
					wx.showToast({
						title: '无权限',
						icon: 'none'
					})
				} else {
					wx.navigateTo({
						url: '/pages/moneySort/index',
					})
				}

				break;
			case 5:
				if (is_admin != 1) {
					wx.showToast({
						title: '无权限',
						icon: 'none'
					})
				} else {
					wx.navigateTo({
						url: '/pages/processList/index',
					})
				}

				break;
			case 6:
				if (is_admin != 1) {
					wx.showToast({
						title: '无权限',
						icon: 'none'
					})
				} else {
					wx.navigateTo({
						url: '/pages/isQualityInspection/index',
					})
				}

				break;
		}
	},

	onLoad: function (options) {

	},

	onReady: function () {

	},

	onShow: function () {

	},

	onHide: function () {

	},

	onUnload: function () {

	},

	onPullDownRefresh: function () {

	},

	onReachBottom: function () {

	},

	onShareAppMessage: function () {

	}
})