import HttpRequeat from '../../utils/Http'

Page({
	data: {
		ItemLIst: null,
		date: null,
		user_id: null,
		allNum: null,
		ticketListLength: null,
		pagenum: 1
	},

	onLoad(options) {
		if (options.date) {
			const data = JSON.parse(options.date)
			this.setData({
				date: data.date,
				user_id: data.user_id
			})
		} else {
			let time = new Date()
			let y = time.getFullYear()
			let m = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`
			let d = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`
			const fullTime = `${y}-${m}-${d}`
			this.setData({
				date: fullTime
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
		if(this.data.value) {
			this.setData({
				ItemLIst: null
			})
			this.getData('1122')
		} else {
			wx.showToast({
				title: '请输入搜索值',
				icon: 'none'
			})
		}
	},

	searchClear() {
		this.setData({
			ItemLIst: null,
			value: null,
			pagenum: 0
		})
		this.getData()
	},

	bindDateChange(e) {
		this.setData({
			date: e.detail.value,
			ItemLIst: null
		})
		this.getData(this.data.date)
	},

	onReachBottom() { //触底开始下一页
		let pagenum = this.data.pagenum + 1; //获取当前页数并+1
		this.setData({
			pagenum: pagenum, //更新当前页数
		})
		this.getData(); //重新调用请求获取下一页数据
	},

	getData(data11) {
		const obj = {
			url: 'production/getWxTodayInfoByTicket',
			method: 'GET',
			data: {
				keyword: this.data.value ? this.data.value : '',
				page: data11 ? 0 : this.data.pagenum,
				date: this.data.date ? this.data.date : '',
				user_id: this.data.user_id ? this.data.user_id : ''
			}
		}
		HttpRequeat(obj).then(res => {
			if (data11) {
				let search = res.data.ticketList; //从此次请求返回的数据中获取新数组
				this.setData({
					ItemLIst: search,
					allNum: res.data.num,
					ticketListLength: res.data.totalNum
				})
				return
			}
			let arr1 = this.data.ItemLIst && this.data.ItemLIst !== null ? this.data.ItemLIst : {}
			let arr2 = res.data.ticketList; //从此次请求返回的数据中获取新数组
			let newAeer = {}
			Object.assign(newAeer, arr1, arr2);
			this.setData({
				ItemLIst: newAeer,
				allNum: res.data.num,
				ticketListLength: res.data.totalNum,
			})
		})
	},

	lookDetail(e) {
		wx.navigateTo({
			url: `/pages/todayYield/YieldDetail/yieldDetail?ticket_id=${e.currentTarget.dataset.touchid}`,
		})
	}
})