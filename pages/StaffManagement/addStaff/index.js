import HttpRequeat from '../../../utils/Http'

let timeNum = 60 //60秒倒计时
let countDownTime = timeNum
let timer

Page({
	data: {
		codeImg: null,
		timeo: 60,
		TextCode: null,
		isClick: true,
		dept_data: null,
		dept1_data: null,
		dept_id: 0,
		dept1_id: 0,
		isShow: false,
		jobList: null,
		profession: null
	},

	onShow() {
		this.addPeople({}, 'GET')
		setTimeout(() => {
			this.getGroup()
		}, 1000)
	},

	getCode() {
		if (this.data.isClick) {
			this.sendCode()
		} else {
			wx.showToast({
				title: '稍后重试',
				icon: 'none'
			})
		}
	},
	mobeil(e) {
		this.setData({
			mobeilPhone: e.detail.value
		})
	},
	sendCode() {
		const obj = {
			url: 'employee/sendCode',
			mothod: 'GET',
			data: {
				mobile: this.data.mobeilPhone
			}
		}
		HttpRequeat(obj).then(res => {
			if (res.code == 0) {
				this.conutDown()
			}
		})
	},
	conutDown() {
		const that = this
		timer = setInterval(() => { // 设置定时器
			countDownTime--
			if (countDownTime < 2) {
				clearInterval(timer)
				that.setData({
					TextCode: null,
					isClick: true
				})
				countDownTime = timeNum
			} else {
				that.setData({
					isClick: false,
					TextCode: countDownTime + "s" + '后获取'
				})
			}
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

	jobValue(e) {
		console.log(e)
		let arr = []
		for (let key in e.detail) {
			arr.push(e.detail[key])
		}
		this.setData({
			profession: e.detail
		})
		console.log(this.data.profession)
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

	addPeople(from, method) {
		let obj = {
			url: 'employee/add',
			method: method,
			data: from
		}
		HttpRequeat(obj).then(res => {
			if (res.data.deptList) {
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
				this.setData({
					dept_data: this.changeDataToSelect(res.data.deptList)
				})
			} else if (res.data.sendCode == 1) {
				this.setData({
					isShow: true
				})
				wx.showToast({
					title: '请获取验证码',
					icon: 'none'
				})
			} else if (res.code == 0) {
				wx.navigateBack({
					delta: 1,
				})
			}
		})
	},

	formSubmit(e) {
		const from = e.detail.value
		if (this.data.dept_id == 0) {
			from.dept_id = this.data.dept_data[this.data.dept_id].key
		} else {
			from.dept_id = this.data.dept_id
		}
		if (this.data.dept1_id == 0) {
			from.dept1_id = this.data.dept1_data[this.data.dept1_id].key ? this.data.dept1_data[this.data.dept1_id].key : ''
		} else {
			from.dept1_id = this.data.dept1_id
		}

		from.profession = this.data.profession ? this.data.profession : ''
		this.addPeople(from, 'POST')
	}
})