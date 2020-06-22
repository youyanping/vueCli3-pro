import axios from 'axios'
import qs from 'qs';
import {baseUrl} from "../common/common.js";
import {Toast} from 'vant';
import {Storage} from './storage'
import API from './api'

let Http = {};
// 创建实例（当一个项目后端接口有多个或者超时时间需要调整成不一样的时候，就可以分别控制）
let service = axios.create({
    baseURL: baseUrl, // 请求前缀
    timeout: 5000, // 请求超时时间
});

//defaults全局配置
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 拦截器：在请求或者响应被处理前拦截它们
//http request 请求拦截器
service.interceptors.request.use(
    config => {
        urlInit(config.url);
        Toast.loading({
            mask:false,
            duration:0,
            forbidClick:true,
            message:"加载中..."
        });
        return config;
    },
    error => {
        // 对请求错误做些什么
        //常见的http错误状态码401超时，404找不到
        Toast.clear();
        Toast("请求错误，请稍候重试");
        return Promise.reject(error);
    }
);

//http response 响应拦截器
service.interceptors.response.use(
    res => {
        // 请求成功后对响应数据做点什么
        Toast.clear(); //请求成功，清除请求拦截器的toast
        codeInit(res.data);
        return res.data;  //此处的res.data会到axios.get().then(res=>{})这里的res
    },
    error => {
        // 对响应错误做点什么
        //一般http状态码500系统错误，502系统重启
        Toast.clear();
        Toast("请求错误，请稍候重试");
        return Promise.reject(error)
    }
)

//服务端返回状态码判断
function codeInit(res) {
    switch (res.code) {
        case '10003':
        case '10005':
        case '10006':
            setTimeout(() => {
                // 跳到登录页
                //window.location.href = '/shopList.html';
            }, 3000)
            break;
    }
}

//url加时间戳
function urlInit(url) {
    let arr = url.split("?");
    if (arr.length > 1) {
        url += `&t=${new Date().getTime()}`
    } else {
        url += `?t=${new Date().getTime()}`
    }
    url = baseUrl + url;
    return url;
}

// 遍历api的key
for (let key in API) {
    let api = API[key];
    // async的作用：避免进入回调地狱
    Http[key] = async function (
        params, // 请求参数 get请求放url上，post请求放data里
        isFormdata = false, // 是否是form-data格式请求（postForm）
        config = {} //配置参数 如header加上token
    ) {
        let response = {}; //请求的返回值
        if(api.method==='get'){
            params.params['Authorization'] = api.url=='login/normal'?undefined:(Storage.get("Authorization")||'')
        }
        try {
            params = params && isFormdata ? qs.stringify(params): params; // content-type是form-data参数需要转换
            config.headers = {'Authorization':api.url=='login/normal'?undefined:(Storage.get("Authorization")||'')};
            response = await service[api.method](api.url, params, config);  //接口地址，参数，请求配置
        } catch (err) {
            response = err;
        }
        return response;   // 返回响应值
    }
}

export default Http