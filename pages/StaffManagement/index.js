import HttpRequeat from '../../utils/Http'

Page({

	data: {
		id: null,
		idAtok: null,
		ItemLIst: null,
		momentItenList: null,
		pagenum: 1,
		value: '',
		dialogShow: false,
		dialogShow1: false,
		buttons: [{
			text: '取消'
		}, {
			text: '确定'
		}],
		buttons1: [{
			text: '取消'
		}, {
			text: '确定'
		}]
	},

	onReachBottom() { //触底开始下一页
		let pagenum = this.data.pagenum + 1
		this.setData({
			pagenum: pagenum, //更新当前页数
		})
		this.getData(); //重新调用请求获取下一页数据
	},

	getData(dataa) {
		const obj = {
			url: "employee/index",
			method: 'GET',
			data: {
				page: dataa ? 0 : this.data.pagenum,
				keyword: this.data.value ? this.data.value : ''
			}
		}
		HttpRequeat(obj).then(res => {
			if (dataa) {
				let search = res.data; //从此次请求返回的数据中获取新数组
				this.setData({
					ItemLIst: search
				})
				return
			}
			let arr1 = this.data.ItemLIst && this.data.ItemLIst !== null ? this.data.ItemLIst : []
			let arr2 = res.data; //从此次请求返回的数据中获取新数组
			arr1 = arr1.concat(arr2);
			this.setData({
				ItemLIst: arr1
			})
		})
	},

	//	解绑
	tapDialogButton1(e) {
		if (e.detail.index == 0) {
			this.setData({
				dialogShow1: false,
			})
			return
		}
		const obj = {
			url: "employee/unbind",
			method: 'GET',
			data: {
				user_id: this.data.idAtok.user_id,
				user_token: this.data.idAtok.token
			}
		}
		HttpRequeat(obj).then(res => {
			if (res.code == 0) {
				wx.showToast({
					title: '解绑成功'
				})
				this.setData({
					pagenum: 1,
					ItemLIst: null,
					dialogShow1: false,
				})
				this.getData()
			} else {
				this.setData({
					dialogShow1: false,
				})
			}
		})

	},

	cancleBind(e) {
		this.setData({
			dialogShow1: true,
			idAtok: e.currentTarget.dataset.touchid
		})
	},

	chooseItem(e) {
		const user_id = e.currentTarget.dataset.touchid.user_id
		if (!!e.currentTarget.dataset.touchid) {
			wx.navigateTo({
				url: `/pages/StaffManagement/staffChange/index?user_id=${user_id}`,
			})
		} else {
			wx.showToast({
				title: '缺少必要数据',
				icon: 'none'
			})
		}
	},

	tapDialogButton(e) {
		if (e.detail.index == 1) {
			const obj = {
				url: 'employee/del',
				method: 'POST',
				data: {
					user_id: this.data.id
				}
			}
			HttpRequeat(obj).then(res => {
				if (res.code == 0) {
					this.setData({
						dialogShow: false,
						showOneButtonDialog: false,
						ItemLIst: null
					})
					wx.showToast({
						title: '删除成功'
					})
					this.getData()
				}
			})
		} else {
			this.setData({
				dialogShow: false,
				showOneButtonDialog: false
			})
		}

	},

	slideButtonTap(e) {
		const index = e.detail.index
		if (index === 0) {
			this.setData({
				dialogShow: true,
				id: e.currentTarget.dataset.touchid
			})
		} else return
	},

	onChange(e) {
		this.setData({
			value: e.detail,
		});
	},

	onClick() {
		if (this.data.value) {
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
			value: null,
			ItemLIst: null,
			pagenum: 0
		})
		this.getData()
	},

	addNewPelple() {
		wx.navigateTo({
			url: '/pages/StaffManagement/addStaff/index',
		})
	},

	onHide() {
		this.setData({
			pagenum: 1,
			ItemLIst: null
		})
	},

	onShow() {
		this.getData()
	},

	onLoad() {
		this.setData({
			slideButtons: [{
					type: 'warn',
					text: '删除员工',
					extClass: 'test',
					src: '/page/weui/cell/icon_del.svg', // icon的路径
				},
				{
					text: '取消',
					extClass: 'test',
					src: '/page/weui/cell/icon_star.svg', // icon的路径
				},
			],
		});
	},
})