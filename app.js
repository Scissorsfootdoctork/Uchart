//app.js
App({
  onLaunch() {
  },
})

! function () {
 var PageTmp = Page
  Page = function (pageConfig) {
   let routerUrl = ""
   wx.onAppRoute(function (res) {
      let pages = getCurrentPages(),        
        view = pages[pages.length - 1];
     routerUrl = view.route
   })
   pageConfig = Object.assign({
     onShareAppMessage: function () {
        let shareInfo={}
       let noGlobalSharePages=["index/index"]
        if (!routerUrl.includes(noGlobalSharePages)){
          shareInfo = {
            title: "优产工票",
           imageUrl: wx.getStorageSync("shareUrl")
         }
        }
        return shareInfo
      }
  }, pageConfig);
    PageTmp(pageConfig);
   }
}();