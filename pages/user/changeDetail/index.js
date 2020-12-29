// pages/user/changeDetail/index.js

import HttpRequeat from '../../../utils/Http'

Page({
	data: {
		name: null,
		url: '../../.../assasa',
		userid: null,
		array: null,
		index: null,
		dept_id: null
	},

	onLoad(option) {
		this.setData({
			userid: option.user_id
		})
		this.getData(this.data.userid)
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
			if (res.data.userInfo) {
				const arr = res.data.deptList
				const id = res.data.userInfo.dept_id
				arr.forEach((item, index) => {
					if (id == item["dept_id"]) {
						this.setData({
							index,
							deptList: arr,
							dept_id: item["dept_id"],
						})
					}
				});

				this.setData({
					array: res.data.deptList,
					name: res.data.userInfo.name
				})
			} else {
				if (res.code == 0) {
					wx.navigateBack({
						delta: 1
					})
				}
			}
		})
	},

	bindPickerChange: function (e) {
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


	formSubmit(e) {
		let obj = e.detail.value
		obj.user_id = this.data.userid
		obj.dept_id = this.data.dept_id
		if (!obj.name) {
			obj.name = this.data.name
		}
			this.getData(null, "post", obj)
	},
})