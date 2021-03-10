const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

export const getTokenAgain = () => {
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
                submitOn: '请登录后台选择小程序版本',
                buttonType: true
              })
              wx.showToast({
                title: '无使用权限',
                icon: 'none'
              })
              return
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
              title: '访问错误请重试',
              icon: 'none'
            })
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
  console.log('login Again')
}