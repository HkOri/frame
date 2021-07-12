// 这里是真正调用接口的地方
// 引入封装好的axios，即引入调用接口的工具
import axios from './axios';
let apiVersion = '/api/v0';

// 客户注册
export function registerCustomer(data) {
	return axios({
		url: apiVersion + '/customers/update',
		method: 'post',
		data
	});
}
// 客户登录
export function loginCustomer(data) {
	return axios({
		url: apiVersion + '/customers/login',
		method: 'post',
		data
	});
}
// 客户修改自己信息
export function updateCustomer(data) {
	return axios({
		url: apiVersion + '/customers/update',
		method: 'post',
		data
	});
}

// 客户获取邮件验证码
export function getMailCode(data) {
	return axios({
		url: apiVersion + '/customers/mail',
		method: 'post',
		data
	});
}

// 客户找回密码
export function findSelfPwd(data) {
	return axios({
		url: apiVersion + '/customers/findpwd',
		method: 'post',
		data
	});
}


// 获取客房信息
export function getRoomTypeInfo(params) {
	return axios({
		url: apiVersion + '/roomtype/info',
		method: 'get',
		params
	});
}
// 更新客房信息，预定之后相应数量要减一，退订又加一
// 预定之后订单表会有一条数据，退订之后删除这条数据
export function subscribeRoomType(data) {
	return axios({
		url: apiVersion + '/roomtype/subscribe',
		method: 'post',
		data
	});
}
export function unsubscribeRoomType(data) {
	return axios({
		url: apiVersion + '/roomtype/unsubscribe',
		method: 'post',
		data
	});
}

// 获取自己的住房记录信息
export function getLiveRecord(data) {
	return axios({
		url: apiVersion + '/roomorder/cusinfo',
		method: 'post',
		data
	});
}

// 支付
export function goPay(data) {
	return axios({
		url: apiVersion + '/paymoney/pay',
		method: 'post',
		data
	});
}

// 查询支付状态
export function getPayStatus(data) {
	return axios({
		url: apiVersion + '/paymoney/api/member/queryOrderAlipay',
		method: 'post',
		data
	})
}