const promisic = function (func) {
    return function (params = {}) {
        return new Promise((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    if(res.data.code == -1) {
                        wx.showToast({
                            title: res.data.msg,
                          })
                        wx.navigateTo({
                          url: '/pages/login/login',
                        })
                        return
                    }
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                }
            });
            func(args);
        });
    };
};
export {
    promisic
}