import HttpRequeat from '../../utils/Http'

Page({
	data: {
		result: null,
		scopeButton: false
	},

	onLoad() {
		wx.clearStorage()
		const that = this
		this.wxLogin()
		wx.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo'] == false) {
					that.setData({
						scopeButton: true
					})
				} else if (res.authSetting['scope.userInfo'] == undefined) {
					that.setData({
						scopeButton: true
					})
				} else {
					const th = that
					wx.getUserInfo({
						success(res) {
							th.setData({
								scopeButton: false,
								result: res,
							})
						}
					})
				}
			}
		})
	},

	bindGetUserInfo(e) {
		if (e.detail.userInfo) {
			this.setData({
				scopeButton: false,
				result: e.detail,
			})
		}
	},

	wxLogin() {
		let that = this
		wx.login({
			success(res) {
				if (res.code) {
					//发起网络请求
					wx.request({
						url: 'https://mesapi.uchat.com.cn/user/login',
						data: {
							code: res.code
						},
						success(res) {
							if (res.data.data.errCode == 0) {
								wx.setStorageSync('token', res.data.data.token)
								wx.setStorageSync('center_id', res.data.data.userInfo.center_id)
								wx.setStorageSync('is_admin', res.data.data.userInfo.is_admin)
								wx.setStorageSync('user_id', res.data.data.userInfo.user_id)
								wx.setStorageSync('config', res.data.data.userInfo.config)
								that.getSettingForItem(res.data.data.wxappPurview)
								wx.switchTab({
									url: '/pages/index/index',
								})
							} else if (res.data.data.errCode == 200) {
								wx.setStorageSync('token', res.data.data.token)
							}
						},
					})
				} else {
					console.log('登录失败！' + res.errMsg)
				}
			}
		})
	},

	getSettingForItem(data) {
		wx.showLoading({
			title: '正在加载...',
		})
		let main = {}
		let toparr = []
		let mainarr = []
		let marginner = data.管理
		let user = data.我的
		for (let key in data) {
			if (key === '首页') {
				const shouye = data[key]
				shouye.forEach((item) => {
					if (item.menu === "topItem") {
						toparr.push(item)
					} else {
						mainarr.push(item)
					}
				})
			}
		}
		main.topitem = toparr
		main.mainitem = mainarr
		wx.setStorageSync('main', main)
		wx.setStorageSync('marginner', marginner)
		wx.setStorageSync('user', user)
		wx.hideLoading({
			success: (res) => {},
		})
	},

	formSubmit(e) {
		if (!this.data.result) {
			this.setData({
				scopeButton: true,
			})
			wx.showToast({
				title: '请授权',
				icon: 'none'
			})
			return
		}
		const token = wx.getStorageSync('token')
		if (!token) {
			this.wxLogin()
			return
		} else {
			wx.showLoading({
				title: '正在登录',
			})
			let obj = {
				url: 'user/binding',
				method: 'POST',
				data: {
					result: JSON.stringify(this.data.result),
					user: JSON.stringify(e.detail.value)
				}
			}
			HttpRequeat(obj).then(res => {
				if (res.data.code && res.data.code == 1) {
					wx.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				} else {
					if (res.data.errCode == 0) {
						this.wxLogin()
					}
				}
				wx.hideLoading({
					success: (res) => {},
				})
			})
		}
	}
})