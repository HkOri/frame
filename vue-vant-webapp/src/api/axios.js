// 这里是axios，一个帮助调用接口的工具

import axios from 'axios';
import { Toast } from 'vant';
import { getCookie } from '@/utils/cookie.js';

const baseURL = 'http://localhost:8081';

// 创建一个axios实例
const instance = axios.create({
	baseURL,
	timeout: 7000,
	headers: {}
});

// 封装请求拦截器(在请求发出之前执行)
instance.interceptors.request.use(
	function(config) {
		// Do something before request is sent
		// 加 token 鉴权
		config.headers.Authorization = getCookie('token');
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
				switch (response.data.err) {
					case 0:
						// 首页获取数据也是0
						// console.log(response);
						res = response.data.data;
						// console.log(res);
						if (response.data.msg === '注册成功') {
							Toast(response.data.msg);
							// 注册成功
							res = 1;
						}
						break;
					case -1:
						// token失效，后端返回err=-1的业务状态码
						// window.location.href = '/login';
						Toast(response.data.msg);
						break;
					case 1:
						// 登录，用户名和密码不匹配
						res = response.data.data;
						if (response.data.msg === '用户名和密码不匹配') {
							res = 0;
						}
						break;
					default:
						Toast(response.data.msg);
						break;
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
