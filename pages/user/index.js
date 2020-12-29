import HttpRequeat from '../../utils/Http'

Page({
	data: {
		pageData: null,
		show_salary: null
	},

	onLoad() {
		const config = wx.getStorageSync('config')
		this.setData({
			show_salary: config.show_salary
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

	lookingMoney() {
		wx.navigateTo({
			url: `/pages/statisticsMoney/index`,
		})
	},
	lookingMoney1() {
		wx.navigateTo({
			url: `/pages/moneySort/index`,
		})
	},
	lookingMoney2() {
		wx.navigateTo({
			url: `/pages/todayYield/index`,
		})
	},
	lookingMoney3() {
		wx.navigateTo({
			url: `/pages/monthyield/index`,
		})
	},

	changeDetail() {
		wx.navigateTo({
			url: `/pages/user/changeDetail/index?user_id=${this.data.pageData.user_id}`,
		})
	}
})