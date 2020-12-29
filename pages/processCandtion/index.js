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
	},

	onLoad() {
		this.geData()
	},

	chooseItem(e) {
		this.setData({
			production_id: e.currentTarget.dataset.touchid.production_id,
			style_id: e.currentTarget.dataset.touchid.style_id
		})
		this.stapClick()
	},

	stapClick() {
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

	onChanges(e) {
		this.setData({
			value: e.detail,
		});
	},

	onClick() {
		if(this.data.value) {
			this.setData({
				ItemLIst: null
			})
			this.geData('11122')
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

	scanCodeIcon() {
		const that = this
		wx.scanCode({
			onlyFromCamera: true,
			success(res) {
				if (res.result) {
					console.log(res.result)
					that.setData({
						ticket_no: res.result
					});
					that.geData('1')
					return
				}
			}
		})
	},

	onReachBottom() { //触底开始下一页
		let pagenum = this.data.pagenum + 1
		this.setData({
			pagenum: pagenum, //更新当前页数
		})
		this.geData(); //重新调用请求获取下一页数据
	},

	geData(data11) {
		const user_id = wx.getStorageSync('user_id')
		const obj = {
			url: 'production/getProductionList',
			mothod: 'GET',
			data: {
				page: data11 ? 0 : this.data.pagenum,
				ticket_no: this.data.ticket_no ? this.data.ticket_no : '',
				user_id,
				keyword: this.data.value ? this.data.value : ''
			}
		}
		HttpRequeat(obj).then(res => {
			if(data11) {
				let search = res.data.list; //从此次请求返回的数据中获取新数组
				this.setData({
					ItemLIst: search
				})
				return
			}
			let arr1 = this.data.ItemLIst && this.data.ItemLIst !== null ? this.data.ItemLIst : []
			let arr2 = res.data.list; //从此次请求返回的数据中获取新数组
			arr1 = arr1.concat(arr2)
			this.setData({
				ItemLIst: arr1
			})
		})
	}
})