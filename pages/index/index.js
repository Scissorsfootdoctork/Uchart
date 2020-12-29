import HttpRequeat from '../../utils/Http'

const mainItem = [{
        id: 0,
        name: '车工扫码',
        detail: '车缝提交',
        imgUrl: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/center/1/2020/11/f03a0f8d55b1d90702956047febc7299.png'
    },
    {
        id: 101,
        name: '质检扫码',
        detail: '成衣入库',
        imgUrl: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/center/1/2020/11/f03a0f8d55b1d90702956047febc7299.png'
    },
    {
        id: 102,
        name: '外发扫码',
        detail: '扫码确认',
        imgUrl: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/center/1/2020/11/f03a0f8d55b1d90702956047febc7299.png'
    },
    {
        id: 103,
        name: '单件扫码',
        detail: '扫码提交',
        imgUrl: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/center/1/2020/11/f03a0f8d55b1d90702956047febc7299.png'
    },
    {
        id: 1,
        name: '今日产量',
        detail: '',
        imgUrl: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/center/1/2020/11/758d7225a938b2075c247e448ce59187.png'
    },
    {
        id: 4,
        name: '今日工资',
        detail: '',
        imgUrl: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/center/1/2020/11/238b0a6d5bb66cbde88bdecb16787783.png'
    },
    {
        id: 3,
        name: '本月产量',
        detail: '',
        imgUrl: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/center/1/2020/11/fd114881c28a6c0d2db27e5baec058d6.png'
    },
    {
        id: 7,
        name: '本月工资',
        detail: '',
        imgUrl: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/center/1/2020/11/132f27589f504ff4194ce46acecd7d54.png'
    }, {
        id: 5,
        name: '工资排名',
        detail: '',
        imgUrl: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/center/1/2020/11/614d0e0b9219d630e9152cd455444f71.png'
    },
    {
        id: 6,
        name: '工序进度',
        detail: '详情',
        imgUrl: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/center/1/2020/11/eb082438a1e029503ae21baf7c88aea7.png'
    }
]

const topItem = [{
        url: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/wxapp/images/sm.png',
        title: '车工扫码',
        id: 0
    },
    {
        url: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/wxapp/images/bt.png',
        title: '今日产量',
        id: 1
    },
    {
        url: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/wxapp/images/ksh.png',
        title: '本月产量',
        id: 3
    },
    {
        url: 'https://jack-mes.oss-cn-hangzhou.aliyuncs.com/wxapp/images/zzt.png',
        title: '今日工资',
        id: 4
    }
]

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
        switch (data) {
            case 0:
                this.scanCode()
                break;
            case 1:
                wx.navigateTo({
                    url: '/pages/todayYield/index',
                })
                break;
            case 2:
                wx.navigateTo({
                    url: '/pages/moneyModel/index',
                })
                break;
            case 3:
                wx.navigateTo({
                    url: '/pages/monthyield/index',
                })
                break;
            case 4:
                wx.navigateTo({
                    url: '/pages/statisticsMoney/index',
                })
                break;
            case 5:
                wx.navigateTo({
                    url: '/pages/moneySort/index',
                })
                break;
            case 6:
                wx.navigateTo({
                    url: '/pages/processCandtion/index',
                })
                break;
            case 7:
                wx.navigateTo({
                    url: '/pages/monthMoney/index',
                })
                break;
            case 101:
                this.quality()
                break;
            case 102:
                this.waixScan()
                break;
            case 103:
                this.getSinglePrice()
                break;
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
        const config = wx.getStorageSync('config')
        let mainItems = []
        let topItems = []
        mainItem.forEach(item => {
            if (config.has_single_piece == 0) {
                if(item.id == 103)  item.has_single_piece = true
            }
            if (config.show_salary == 0) {
                if(item.id == 4)  item.show_salary = true
                if(item.id == 7)  item.show_salary = true
            }
            mainItems.push(item)
        })
        topItem.forEach(item => {
            if (config.show_salary == 0 && item.id == 4) {
                if(item.id == 4)  item.show_salary = true

            }
            topItems.push(item)
        })
        this.setData({
            topItems,
            mainItems
        })
    }
});