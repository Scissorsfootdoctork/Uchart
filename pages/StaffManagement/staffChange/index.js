import HttpRequeat from '../../../utils/Http'

Page({
	data: {
		userInfo: null,
		name: null,
		url: null,
		userid: null,
		dept_data: null,
		dept1_data: null,
		dept_id: 0,
		dept1_id: 0,
		jobList: null,
		profession: null,
		deptIndex: 0,
		files: []
	},

	chooseImage(e) {
		var that = this;
		wx.chooseImage({
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				that.setData({
					files: that.data.files.concat(res.tempFilePaths)
				});
			}
		})
	},
	previewImage(e) {
		wx.previewImage({
			current: e.currentTarget.id, // 当前显示图片的http链接
			urls: this.data.files // 需要预览的图片http链接列表
		})
	},
	selectFile(files) {},
	uplaodFile(files) {
		return new Promise((resolve, reject) => {
			wx.uploadFile({
				url: 'https://mesapi.uchat.com.cn/upload/upload',
				filePath: files.tempFilePaths[0],
				name: 'image',
				formData: {
					token: wx.getStorageSync('token')
				},
				success(res) {
					const urlData = JSON.parse(res.data)
					let url = urlData.data.data.url
					let urls = []
					urls.push({
						url
					})
					resolve({
						urls
					})
				},
				fail() {
					reject('some error')
				}
			})
		})
	},
	uploadError(e) {
		wx.showToast({
			title: '上传失败',
			icon: 'none'
		})
	},
	uploadSuccess(e) {
		wx.showToast({
			title: '上传成功',
		})
		this.setData({
			files: e.detail.urls
		})
	},

	onLoad(option) {
		this.setData({
			userid: option.user_id,
			selectFile: this.selectFile.bind(this),
			uplaodFile: this.uplaodFile.bind(this)
		})
		this.getData(this.data.userid)
		setTimeout(() => {
			this.getGroup()
		}, 1000)
	},

	deptValue(e) {
		if (e.detail) {
			this.setData({
				dept_id: e.detail
			})
			this.getGroup()
		}
	},

	dept1Value(e) {
		this.setData({
			dept1_id: e.detail
		})
		console.log(e.detail)
	},

	jobValue(e) {
		this.setData({
			profession: e.detail
		})
	},

	changeDataToSelect(data) {
		let arr = []
		data.forEach((item) => {
			arr.push({
				name: item.dept_name,
				key: item.dept_id
			})
		})
		return arr
	},

	getGroup() {
		let obj = {
			url: 'employee/getChildDept',
			method: 'GET',
			data: {
				dept_id: this.data.dept_id == 0 ? this.data.dept_data[0].key : this.data.dept_id
			}
		}
		HttpRequeat(obj).then(res => {
			if (res.data.length == 0) {
				const arr = [{
					name: '暂无数据',
					key: 0
				}]
				this.setData({
					dept1_data: arr
				})
				wx.showToast({
					title: '部门无组别',
					icon: 'none'
				})
			} else {
				let arr = []
				for (let key in res.data) {
					arr.push({
						name: res.data[key],
						key
					})
				}
				this.setData({
					dept1_data: arr
				})
			}
		})
	},

	getData(user_id, methods, obj) {
		const objs = {
			url: "employee/edit",
			method: methods ? methods : 'GET',
			data: obj ? obj : {
				user_id: user_id ? user_id : this.data.userid,
			}
		}
		HttpRequeat(objs).then(res => {
			const arr = [{
				name: '暂无数据',
				key: 0
			}]
			if(res.data.userInfo && res.data.userInfo.avatar) {
				let arr = []
				arr.push({
					url: res.data.userInfo.avatar
				})
				this.setData({
					files: arr 
				})
			}
			if (res.data.deptList && res.data.deptList.length > 0) {
				this.setData({
					dept_data: this.changeDataToSelect(res.data.deptList),
					userInfo: res.data.userInfo,
					name: res.data.userInfo.name,
				})
				res.data.deptList.forEach((item, index) => {
					if (item.dept_id === res.data.userInfo.dept_id) {
						this.setData({
							deptIndex: index,
							dept_id: item.dept_id
						})
					}
				})
			} else {
				this.setData({
					dept_data: arr
				})
			}
			if (res.data.profession) {
				let arr = []
				for (let key in res.data.profession) {
					arr.push({
						name: res.data.profession[key]
					})
				}
				this.setData({
					jobList: arr
				})
			}

			if (res.data.profession) {
				const p = res.data.userInfo.profession
				let arr = []
				let newArr = []
				for (let i in p) {
					if (!isNaN(p[i])) {
						arr.push(p[i])
					}
				}
				this.data.jobList.forEach((item, index) => {
					arr.forEach(subItem => {
						if (subItem == index) {
							item.checked = true
						}
					})
					newArr.push(item)
				})
				this.setData({
					jobList: newArr
				})
			}

			if (res.data.deptList && res.data.deptList.length > 0) {
				return
			} else {
				wx.navigateBack({
					delta: 1
				})
			}

		})
	},

	bindPickerChange(e) {
		const id = e.detail.value
		this.data.deptList.forEach((item, index) => {
			if (id == index) {
				this.setData({
					dept_id: item.dept_id,
					index: e.detail.value
				})
			}
		})
	},

	selectProfession() {
		const list = this.data.jobList
		let arr = []
		list.forEach((item, index) => {
			if (item.checked) {
				arr.push(index)
			}
		})
		return arr
	},

	formSubmit(e) {
		let obj = e.detail.value
		obj.user_id = this.data.userid
		obj.dept_id = this.data.dept_id
		obj.avatar = this.data.files[0].url ? this.data.files[0].url : this.data.userInfo.avatar
		if (!obj.name) {
			obj.name = this.data.name
		}
		if (this.data.dept1_id == 0) {
			obj.dept2_id = this.data.dept1_data[this.data.dept1_id].key ? this.data.dept1_data[this.data.dept1_id].key : ''
		} else {
			obj.dept1_id = this.data.dept1_id
		}
		obj.profession = this.data.profession ? this.data.profession : this.selectProfession()
		this.getData(null, "post", obj)
	},
})