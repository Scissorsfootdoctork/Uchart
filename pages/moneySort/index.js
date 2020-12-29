import HttpRequeat from '../../utils/Http'

Page({
	data: {
		date: null,
		ItemLIst: null,
		is_admin: null,
		pagenum: 1
	},

	onLoad() {
		const is_admin = wx.getStorageSync('is_admin')
		let time = new Date()
		let y = time.getFullYear()
		let m = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`
		let d = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`
		this.setData({
			date: `${y}-${m}`,
			is_admin
		})
		this.getData()
	},

	bindDateChange(e) {
		const time = e.detail.value
		this.setData({
			date: time
		})
		this.getData(e.detail.value)
	},

	onReachBottom() { //触底开始下一页
    let pagenum = this.data.pagenum + 1
    this.setData({
      pagenum: pagenum, //更新当前页数
    })
    this.getData(); //重新调用请求获取下一页数据
  },

	getData(date) {
		const obj = {
			url: 'production/getSalaryRank',
			method: 'GET',
			data: {
				page: this.data.pagenum,
				date: date ? date : ''
			}
		}
		HttpRequeat(obj).then(res => {
      let arr1 = this.data.ItemLIst && this.data.ItemLIst !== null ? this.data.ItemLIst : []
			let arr2 = res.data; //从此次请求返回的数据中获取新数组
			arr1 = arr1.concat(arr2);
      // let newAeer = {}
      // Object.assign(newAeer, arr1, arr2);
			this.setData({
				ItemLIst: arr1
			})
		})
	},

	chooseItem(e) {
		if(this.data.is_admin == 0) {
			wx.showToast({
				title: '无权限查看',
				icon: 'none'
			})
			return
		} else if (!!e.currentTarget.dataset.touchid) {
			wx.navigateTo({
				url: `/pages/monthMoney/index?user_id=${e.currentTarget.dataset.touchid}`,
			})
		}
	}
})