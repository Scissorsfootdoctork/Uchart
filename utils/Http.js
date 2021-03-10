const apiBaseUrl = 'https://mesapi.uchat.com.cn'

const HttpRequeat = (options) => {
	options.data.token = wx.getStorageSync('token')
	options.data.center_id = wx.getStorageSync('center_id')
	options.data.device = 'WXAPP'
	options.data.version = 'V1.2.9'
	options.data.timestamp = Date.parse(new Date())
	return new Promise((resolve, reject) => {
		wx.request({
			method: options.method,
			header: {
				'content-type': "application/x-www-form-urlencoded"
			},
			url: `${ apiBaseUrl }/${ options.url }`,
			data: options.data,
			timeout: 10000,
			success: (res) => {
				console.log(res)
				if (res.data.code == 0) {
					resolve(res.data)
				} else if (res.data.code == 2) {
					wx.login({
						success(res) {
							if (res.code) {
								wx.request({
									url: 'https://mesapi.uchat.com.cn/user/login',
									data: {
										code: res.code
									},
									success(res) {
										if (res.data.data.errCode == 0) {
											wx.setStorageSync('token', res.data.data.token)
											wx.switchTab({
												url: '/pages/index/index',
											})
											wx.showToast({
												title: '请求失败请重试',
												icon: 'none'
											})
										}
									},
									fail() {
										wx.showToast({
											title: '访问错误请重试',
											icon: 'none'
										})
									}
								})
							}
						}
					})
				} else if (res.data.code == 1) {
					wx.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				} else if (res.data.code == -1) {
					wx.redirectTo({
						url: '/pages/login/login',
					})
					wx.showToast({
						title: '登录失效',
						icon: 'none'
					})
				}
			},
			fail: (err) => {
				wx.showToast({
					title: '访问错误请重试',
					icon: 'none'
				})
			},
			complete: (res) => {
				if (res.data.code == '-1') {
					wx.redirectTo({
						url: '/pages/login/login.vue'
					})
				}
			}
		})
	})
}
export default HttpRequeat