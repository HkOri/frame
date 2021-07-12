import axios from "axios";
const instance = axios.create({
    baseURL: 'http://localhost:8088',// 'https://c.y.qq.com',
    timeout: 5000,
});
instance.defaults.headers.common['Authorization'] = localStorage.getItem('token');

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let res = null;
    if (response.data && response.data.code === 0) {
        res = response.data.data;
    }
    return res;
    }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;