// 这里是axios，一个帮助调用接口的工具

import axios from 'axios';
// 本项目的启动端口
const baseURL = 'http://localhost:8088';

// 创建一个axios实例
const instance = axios.create({
	baseURL,
	timeout: 7000,
	headers: {}
});


// 授权相关
const TOKEN_NO = 1001; // token无效
const TOKEN_ERROR_VERIFY = 1002; // token解析错误


// 封装请求拦截器(在请求发出之前执行)
instance.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		// 加 token 鉴权
		let utoken = localStorage.getItem('utoken');
		if (!utoken) { // 传到服务端就变成'null'了
			utoken = '';
		}
		// console.log(utoken);
		config.headers.Authorization = utoken;
		return config;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// 封装响应拦截器
instance.interceptors.response.use(
	function(response) {
		// Do something with response data
		let res = null;
		if (response.status === 200) {
			if (response.data) {
				// response.data是服务端那边res.json里面的数据
				res = response.data;
				if (res.code === TOKEN_NO || res.code === TOKEN_ERROR_VERIFY) {
					// 如果身份验证不通过，跳到登录页面
					window.location.replace('/');
				}
			}
		}
		return res;
	},
	function(error) {
		// Do somthing with response error
		return Promise.reject(error);
	}
);

export default instance;
