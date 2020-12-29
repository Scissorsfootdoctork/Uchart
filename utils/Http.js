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
					if (res.data.code == 1) {
						wx.showToast({
							icon: 'none',
							title: res.data.msg,
							duration: 1000
						})
					}
					resolve(res.data)
				},
				fail: (err) => {},
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