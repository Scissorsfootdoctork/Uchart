import HttpRequeat from '../../utils/Http'

Page({
	data: {
		processList: null,
		InputValue: null,
		ticket_id: null,
		chooseItemPro_id: null,
		InputAllValue: null,
		num: null,
		slideButtons: [{
				type: 'warn',
				text: '删除',
				extClass: 'test',
				src: '/page/weui/cell/icon_del.svg', // icon的路径
			},
			{
				text: '取消',
				extClass: 'test',
				src: '/page/weui/cell/icon_star.svg', // icon的路径
			},
		],
		changeShow: false,
		delShow: false,
		isSingle: null
	},

	getTicket(method, type, num, ) {
		let obj = {
			url: 'ticket/delProcessByTic',
			method,
			data: {
				type,
				num,
				ticket_no: this.data.ticket_id,
				pro_id: type ? this.data.chooseItemPro_id ? this.data.chooseItemPro_id : null : null
			}
		}
		HttpRequeat(obj).then(res => {
			this.setData({
				processList: res.data
			})
		})
	},

	onLoad(options) {
		this.setData({
			ticket_id: options.ticket_id ? options.ticket_id : 'CJ00073-00003',
			isSingle: wx.getStorageSync('config').has_single_piece
		});
		this.getTicket('GET')
	},
	// 修改工序数量
	numChange(e) {
		console.log(e)
		if (e.detail.index == 0) {
			this.setData({
				changeShow: !this.data.changeShow
			})
		} else {
			console.log(e.detail.num)
			this.changeProcessNum(e.detail.num)
		}
	},

	changeProcessNum(num) {
		console.log(num)
		let obj = {
			url: 'ticket/delProcessByTic',
			method: 'POST',
			data: {
				type: 'edit',
				num: num,
				ticket_no: this.data.ticket_id,
				pro_id: this.data.chooseItemPro_id
			}
		}
		console.log(JSON.stringify(obj.data))
		HttpRequeat(obj).then(res => {
			if (res.code == 0) {
				wx.showToast({
					title: '修改成功',
					icon: 'success'
				})
				this.setData({
					changeShow: !this.data.changeShow,
				})
				this.getTicket('GET')
			}
		})
	},

	change(e) {
		if (this.data.isSingle == 1) {
			this.setData({
				changeShow: !this.data.changeShow,
				chooseItemPro_id: e.currentTarget.dataset.touchid.pro_id,
				num: e.currentTarget.dataset.touchid.num,
			})
		} else {
			wx.showToast({
				title: '包流不可改数量',
				icon: 'none'
			})
		}
	},
	// 修改工序完毕

	// 删除工序
	chooseEdit(e) {
		if (e.detail.index == 1) return
		this.setData({
			delShow: !this.data.delShow,
			chooseItemPro_id: e.currentTarget.dataset.touchid.pro_id,
		})
	},

	delChange(e) {
		if (e.detail == 0) {
			this.setData({
				delShow: !this.data.delShow
			})
		} else {
			this.delProcess()
		}
	},

	delProcess() {
		let obj = {
			url: 'ticket/delProcessByTic',
			method: 'POST',
			data: {
				ticket_no: this.data.ticket_id,
				pro_id: this.data.chooseItemPro_id
			}
		}
		HttpRequeat(obj).then(res => {
			if (res.code == 0) {
				wx.showToast({
					title: '删除成功',
					icon: 'success'
				})
				this.setData({
					delShow: !this.data.delShow,
				})
				this.getTicket('GET')
			}
		})
	},
	// 删除工序完毕
})