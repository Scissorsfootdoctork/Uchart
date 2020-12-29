import HttpRequeat from '../../utils/Http'

Page({
	data: {
		ItemLIst: null,
		pagenum: 1
	},

	onChanges(e) {
		this.setData({
			value: e.detail,
		});
	},

	onClick() {
		if(this.data.value) {
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

	chooseItem(e) {
		const ticket_no = e.currentTarget.dataset.index
		wx.setStorageSync('changeCheckTicket', ticket_no)
		if (ticket_no) {
			wx.navigateTo({
				url: `/pages/isQualityInspection/detailIndexPage/index`,
			})
		}
	},

	scanCodeIcon() {
		let that = this
		wx.scanCode({
			onlyFromCamera: true,
			success(res) {
				if (res.result) {
					that.setData({
						ItemLIst: null,
						value: res.result
					})
					that.getData('1122')
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
		this.getData(); //重新调用请求获取下一页数据
	},

	getData(result) {
		
		let obj = {
			url: 'ticket/editCheckedTicket',
			method: 'GET',
			data: {
				page: result ? 0 : this.data.pagenum,
				keyword: this.data.value ? this.data.value :  ''
			}
		}
		HttpRequeat(obj).then(res => {
			if(result) {
				let search = res.data; //从此次请求返回的数据中获取新数组
				this.setData({
					ItemLIst: search
				})
				return
			}
			let arr1 = this.data.ItemLIst && this.data.ItemLIst !== null ? this.data.ItemLIst : []
			let arr2 = res.data; //从此次请求返回的数据中获取新数组
			arr1 = arr1.concat(arr2)
			this.setData({
				ItemLIst: arr1
			})
		})
	},
	onShow() {
		this.setData({
			ItemLIst: null
		})
		this.getData()
	}
})