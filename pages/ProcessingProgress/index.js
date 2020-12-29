import HttpRequeat from '../../utils/Http'

Page({
	data: {
		activeNames: null,
		ItemLIst: null,
		steps: null,
		active: null,
		production_id: null,
		style_id: null,
		pagenum: 1,
		popupshow: false,
		popupData: null
	},

	onLoad() {
		this.geData()
	},
	
	onOpen(event) {
		this.setData({
			production_id: event.currentTarget.dataset.touchid.production_id,
			style_id: event.currentTarget.dataset.touchid.style_id
		})
		this.getDetailData(event.currentTarget.dataset.touchid.production_id)
	},

	onClose(event) {},

	onChange(event) {
		this.setData({
			activeNames: event.detail,
		});
	},

	stapClick(e) {
		if (e.detail == 2) {
			this.fun2()
		} else if (e.detail == 3) {
			this.fun3()
		}
	},

	fun2() {
		const obj = {
			url: 'production/getWxProcess',
			mothod: 'POST',
			data: {
				production_id: this.data.production_id,
				style_id: this.data.style_id
			}
		}
		HttpRequeat(obj).then(res => {
			wx.setStorageSync('orderDetail', res.data)
			if (res.code == 0) {
				wx.navigateTo({
					url: '/pages/ProcessingProgress/orderDetail/index',
				})
			}
		})
	},

	fun3() {
		const obj = {
			url: 'production/getClothes',
			mothod: 'POST',
			data: {
				production_id: this.data.production_id,
			}
		}
		HttpRequeat(obj).then(res => {
			const adata = res.data.info
			let arr = []
			for (let key in adata) {
				arr.push(adata[key])
			}
			res.data.info = arr
			wx.setStorageSync('productionDetail', res.data)
			if (res.code == 0) {
				wx.navigateTo({
					url: '/pages/ProcessingProgress/ReadyToWear/index',
				})
			}
		})

	},

	getDetailData(id) {
		const obj = {
			url: 'production/getProductionDetail',
			mothod: 'GET',
			data: {
				production_id: id
			}
		}
		HttpRequeat(obj).then(res => {
			let o = {}
			res.data.forEach((item) => {
				o.production_state = item.production_state
				o.cut_state = item.cut_state
				o.ticket_state = item.sew_state
				o.clothes_state = item.clothes_state
			})
			let arr = [{
					text: '生产单',
					desc: res.data[0].num
				},
				{
					text: '裁剪',
					desc: res.data[0].cut_num
				},
				{
					text: '车缝',
					desc: res.data[0].sew_num
				},
				{
					text: '成衣',
					desc: res.data[0].clothes0_num
				}
			]
			let a = []
			for (let key in o) {
				if (o[key] == 1) {
					a.push(o[key])
				}
			}

			this.setData({
				popupData: res.data[0].delegated,
				steps: arr,
				active: a.length - 1
			})
		})
	},

	onChanges(e) {
		this.setData({
			value: e.detail,
		});
	},

	onClick() {
		if(this.data.value) {
			this.geData('1122')
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
		this.geData()
	},

	onReachBottom() { //触底开始下一页
		let pagenum = this.data.pagenum + 1
		this.setData({
			pagenum: pagenum, //更新当前页数
		})
		this.geData(); //重新调用请求获取下一页数据
	},

	anotherWork(e) {
		console.log(e)
		let result = e.currentTarget.dataset.touchid
		wx.navigateTo({
			url: `/pages/ProcessingProgress/wxDetail/index?pro_id=${result.production_id}`,
		})
	},

	popupTodetail(e) {
		console.log(e)
		wx.navigateTo({
			url: '/pages/ProcessingProgress/ReadyToWear/index',
		})
	},

	geData(keywod) {
		const obj = {
			url: 'production/getProductionList',
			mothod: 'GET',
			data: {
				page: keywod ? 0 : this.data.pagenum,
				keyword: this.data.value ? this.data.value : ''
			}
		}

		HttpRequeat(obj).then(res => {
			if(keywod) {
				let search = res.data.list; //从此次请求返回的数据中获取新数组
				this.setData({
					ItemLIst: search
				})
				return
			}
			let arr1 = this.data.ItemLIst && this.data.ItemLIst !== null ? this.data.ItemLIst : []
			let arr2 = res.data.list; //从此次请求返回的数据中获取新数组
			arr1 = arr1.concat(arr2);
			this.setData({
				ItemLIst: arr1
			})
		})
	}
})