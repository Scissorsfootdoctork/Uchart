import HttpRequeat from '../../utils/Http'

Page({
    data: {
        moneyData: null,
        show_salary: null,
        topItems: null,
        mainItems: null
    },
    getMoney() {
        let obj = {
            url: 'index/home',
            method: 'GET',
            data: {}
        }
        HttpRequeat(obj).then(res => {
            this.setData({
                moneyData: res.data,
            })
        })
    },
    mainItemSeleted(e) {
        this.topTab(e.detail)
    },
    topItemSeleted(e) {
        this.topTab(e.detail)
    },
    topTab(data) {
        if (data.purview_id == 12 || data.purview_id == 7) {
            this.scanCode()
            return
        } else if (data.purview_id == 13) {
            this.quality()
            return
        } else if (data.purview_id == 31) {
            this.waixScan()
            return
        } else if (data.purview_id == 32) {
            this.getSinglePrice()
            return
        } else {
            wx.navigateTo({
                url: data.url
            })
        }
    },
    quality() {
        wx.scanCode({
            onlyFromCamera: true,
            success(res) {
                if (res.result) {
                    wx.navigateTo({
                        url: `/pages/qualityInspection/index?ticket_id=${res.result}`,
                    })
                }
            }
        })
    },
    scanCode() {
        wx.scanCode({
            onlyFromCamera: true,
            success(res) {
                if (res.result) {
                    wx.navigateTo({
                        url: `/pages/seletedProcess/index?ticket=${res.result}`,
                    })
                }
            }
        })
    },
    waixScan() {
        wx.scanCode({
            onlyFromCamera: true,
            success(res) {
                if (res.result) {
                    wx.navigateTo({
                        url: `/pages/waixScan/index?ticket=${res.result}`,
                    })
                }
            }
        })
    },
    getSinglePrice() {
        wx.scanCode({
            onlyFromCamera: true,
            success(res) {
                if (res.result) {
                    wx.navigateTo({
                        url: `/pages/singlrSeletedProcess/index?ticket=${res.result}`,
                    })
                }
            }
        })
    },
    onShow() {
        this.getMoney()
    },
    onLoad() {
        const main = wx.getStorageSync('main')
        this.setData({
            topItems: main.topitem,
            mainItems: main.mainitem
        })
    }
});