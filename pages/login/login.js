import HttpRequeat from '../../utils/Http'

Page({
	data: {
		result: null,
		scopeButton: false,
		buttonType: false,
		showAccount: true
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
							if (res.data.code == 1) {
								that.setData({
									buttonType: true
								})
							}
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
						fail() {
							wx.showToast({
								title: '请求失败请重试',
							})
						}
					})
				} else {
					console.log('登录失败！' + res.errMsg)
				}
			}
		})
	},
	getPhoneNumber(e) {
		let obj = {
			url: 'user/binding',
			method: 'POST',
			data: {
				result: JSON.stringify(this.data.result),
				user: '',
				phone: JSON.stringify(e.detail),
		 		token: wx.getStorageSync('token')
			}
		}
		HttpRequeat(obj).then(res => {
			if (res.data.code && res.data.code == 1) {
				wx.showToast({
					title: res.data.msg,
					icon: 'none'
				})
				return
			} else {
				if (res.data.errCode == 0) {
					this.wxLogin()
				}
			}
			wx.hideLoading({
				success: (res) => {},
			})
		})
	},
	bindGetUserInfo(e) {
		console.log(e.detail)
			this.setData({
				scopeButton: false,
				result: e.detail,
			})
	},
	getSettingForItem(data) {
		wx.showLoading({
			title: '正在加载...',
		})
		let main = {}
		main.topitem = data.topItem
		main.mainitem = data.mainItem
		wx.setStorageSync('main', main)
		wx.setStorageSync('management', data.management)
		wx.setStorageSync('user', data.user)
		wx.hideLoading({
			success: (res) => {},
		})
	},
	fSt(e) {
		console.log(e.detail)
		if(!e.detail.mobile && !e.detail.password) {
			wx.showToast({
				title: '请输入账号密码',
				icon: 'none'
			})
			return
		}
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
			let obj = {
				url: 'user/binding',
				method: 'POST',
				data: {
					result: JSON.stringify(this.data.result),
					user: JSON.stringify(e.detail)
				}
			}
			HttpRequeat(obj).then(res => {
					if (res.data.errCode == 0) {
						this.wxLogin()
					}
			})
		}
	},

	changeLogin() {
		this.setData({
			showAccount: !this.data.showAccount
		})
	},
	onShow() {
		this.setData({
			showAccount: !this.data.showAccount
		})
	}
})