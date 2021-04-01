// 封装
export const getSetting = () => {
    // 优化
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

export const chooseAddress = () => {
    // 优化
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

// promise形式 showModal
export const showModal = ({ content }) => {
    // 优化
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (result) => {
                resolve(result);
            },
            fail: (error) => {
                reject(error);
            }
        })
    })
}


// promise形式 showToast
export const showToast = ({ title }) => {
    // 优化
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'error',
            success: (result) => {
                resolve(result);
            },
            fail: (error) => {
                reject(error);
            }
        })
    })
}

/**
 * promise形式  login
 */
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}

/**
 * promise形式的 小程序的微信支付
 * @param {object} pay 支付所必要的参数
 */
export const requestPayment = (pay) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}