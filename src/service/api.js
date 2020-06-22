// 接口文件
const API = {
    // 获取用户标签
    getLabels:{
        method:'get',
        url:'customer_label/user_labels'
    },
    // 添加标签 application-json
    addLabels:{
        method:'post',
        url:'customer_label/add'
    },
    // 获取用户 form-data
    getManual:{
        method:'post',
        url:'dig_customer/shop/insert/manual'
    },
}

export default API