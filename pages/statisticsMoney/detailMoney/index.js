import HttpRequeat from '../../../utils/Http'

Page({
	data: {
		ItemLIst: null,
		date: null,
		user_id: null,
		allNum: null,
		ticketListLength: null
	},

	onLoad(options) {
		const show_salary = wx.getStorageSync('show_salary')
		if (options.date) {
			const data = JSON.parse(options.date)
			this.setData({
				date: data.date,
				user_id: data.user_id,
				show_salary
			})
		} else {
			let time = new Date()
			let y = time.getFullYear()
			let m = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`
			let d = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`
			const fullTime = `${y}-${m}-${d}`
			this.setData({
				date: fullTime,
				show_salary
			})
		}
		this.getData()
	},

	onOpen(event) {
		this.setData({
			production_id: event.currentTarget.dataset.touchid.production_id,
			style_id: event.currentTarget.dataset.touchid.style_id
		})
	},

	onClose(event) {},

	onChange(event) {
		this.setData({
			activeNames: event.detail,
		});
	},

	onChangeS(e) {
		this.setData({
			value: e.detail,
		});
	},

	onClick() {
		const obj = {
			url: 'production/getWxTodayInfoByTicket',
			method: 'GET',
			data: {
				page: 1,
				date: this.data.date,
				keyword: this.data.value
			}
		}
		HttpRequeat(obj).then(res => {
			this.setData({
				ItemLIst: res.data
			})
		})
	},

	searchClear() {
		this.getData()
	},

	bindDateChange(e) {
		this.setData({
			date: e.detail.value
		})
		this.getData(this.data.date)
	},

	getData() {
		const obj = {
			url: 'production/getWxTodayInfoByTicket',
			method: 'GET',
			data: {
				page: 1,
				date: this.data.date ? this.data.date : '',
				user_id: this.data.user_id ? this.data.user_id : ''
			}
		}
		HttpRequeat(obj).then(res => {
			this.setData({
				ItemLIst: res.data,
				allNum: res.data.num,
				ticketListLength: res.data.totalNum
			})
		})
	},

	lookDetail(e) {
		wx.navigateTo({
			url: `/pages/todayYield/YieldDetail/yieldDetail?ticket_id=${e.currentTarget.dataset.touchid}`,
		})
	}
})