// 这里是真正调用接口的地方
// 引入封装好的axios，即引入调用接口的工具
import axios from './axios';
let apiVersion = '/api/v1';
// 首页获取商品信息
export function getGoodInfo(params) {
	return axios({
		url: apiVersion + '/jd/good/list',
		method: 'get',
		params
	});
}
// 点击商品获取详细信息
export function getFocusGoodInfo(params) {
	return axios({
		url: apiVersion + '/jd/good/detail',
		method: 'get',
		params
	});
}
// 用户注册
export function registerUser(data) {
	return axios({
		url: apiVersion + '/user/regist',
		method: 'post',
		data
	});
}
// 用户登录
export function loginUser(data) {
	return axios({
		url: apiVersion + '/user/login',
		method: 'post',
		data
	});
}
// 添加到购物车
export function addCart(data) {
	return axios({
		url: apiVersion + '/jd/cart/add',
		method: 'post',
		data
	});
}
// 获取购物车商品列表
export function getCartInfo() {
	return axios({
		url: apiVersion + '/jd/cart/list',
		method: 'get'
	});
}
// 改变商品数量
export function changeCartGoodNum(data) {
	return axios({
		url: apiVersion + '/jd/cart/update',
		method: 'post',
		data
	});
}
// 删除购物车中商品
export function delCartGood(params) {
	return axios({
		url: apiVersion + '/jd/cart/del',
		method: 'get',
		params
	});
}
// 提交购物车
export function goToPay(data) {
	return axios({
		url: apiVersion + '/jd/cart/submit',
		method: 'post',
		data
	});
}
// 获取品类列表
export const getCategory = params =>
	axios({
		url: apiVersion + '/jd/cates',
		params
	});

export function getJdGoodInfo(params) {
	return axios({
		url: '/mcoss/reclike/getrecinfo',
		method: 'get',
		params
	});
}
