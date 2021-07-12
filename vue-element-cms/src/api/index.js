// 这里是真正调用接口的地方
// 引入封装好的axios，即引入调用接口的工具
import axios from './axios';
let apiVersion = '/api/v0';

// 用户注册
export function userRegister(data) {
	return axios({
		url: apiVersion + '/users/update',
		method: 'post',
		data
	});
}
// 用户登录
export function userLogin(data) {
	return axios({
		url: apiVersion + '/users/login',
		method: 'post',
		data
	});
}
// 获取用户信息
export function getUserInfo(params) {
	return axios({
		url: apiVersion + '/users/info',
		method: 'get',
		params
	});
}
// 获取权限内可知的所有用户信息
export function getMoreUserInfo(data) {
	return axios({
		url: apiVersion + '/users/info',
		method: 'post', // 这里要不换成post吧，不然条件查询的时候很麻烦，中文会被转码
		data
	});
}
// 更新用户信息
export function updateUser(data) {
	return axios({
		url: apiVersion + '/users/update',
		method: 'post',
		data
	});
}
// 删除用户信息
export function delUser(data) {
	return axios({
		url: apiVersion + '/users/del',
		method: 'post',
		data
	});
}


// 发送邮件
export function sendMail(data) {
	return axios({
		url: apiVersion + '/users/mail',
		method: 'post',
		data
	})
}
// 重置密码
export function changePwd(data) {
	return axios({
		url: apiVersion + '/users/setpwd',
		method: 'post',
		data
	});
}


// 获取美食信息
export function getFoodInfo(params) {
	return axios({
		url: apiVersion + '/foods/info',
		method: 'get',
		params
	});
}
// 删除美食信息
export function delFoodInfo(data) {
	return axios({
		url: apiVersion + '/foods/del',
		method: 'post',
		data
	});
}
// 新增(更新)美食信息
export function updateFoodInfo(data) {
	return axios({
		url: apiVersion + '/foods/update',
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
// 删除客房信息
export function delRoomTypeInfo(data) {
	return axios({
		url: apiVersion + '/roomtype/del',
		method: 'post',
		data
	});
}
// 新增(更新)客房信息
export function updateRoomTypeInfo(data) {
	return axios({
		url: apiVersion + '/roomtype/update',
		method: 'post',
		data
	});
}

/* ----------------------------------------------------------- */

// 获取消费记录信息
export function getFoodRecordInfo(params) {
	return axios({
		url: apiVersion + '/foodrecord/info',
		method: 'get',
		params
	});
}
// 删除消费记录信息
export function delFoodRecordInfo(data) {
	return axios({
		url: apiVersion + '/foodrecord/del',
		method: 'post',
		data
	});
}
// 新增(更新)消费记录信息
export function updateFoodRecordInfo(data) {
	return axios({
		url: apiVersion + '/foodrecord/update',
		method: 'post',
		data
	});
}

/* -------------------上面三个应该改成消费(美食)记录表------------ */
// 获取住房记录信息
export function getRoomOrderInfo(data) {
	return axios({
		url: apiVersion + '/roomorder/info',
		method: 'post',
		data
	});
}
// 删除住房记录信息
export function delRoomOrderInfo(data) {
	return axios({
		url: apiVersion + '/roomorder/del',
		method: 'post',
		data
	});
}
// 新增(更新)住房记录信息
export function updateRoomOrderInfo(data) {
	return axios({
		url: apiVersion + '/roomorder/update',
		method: 'post',
		data
	});
}

// 获取客户信息
export function getAllCustomer(params) {
	return axios({
		url: apiVersion + '/customers/info',
		method: 'get',
		params
	});
}
// 删除客户信息
export function delCustomer(data) {
	return axios({
		url: apiVersion + '/customers/del',
		method: 'post',
		data
	});
}
// 编辑客户信息
export function editCustomer(data) {
	return axios({
		url: apiVersion + '/customers/update',
		method: 'post',
		data
	});
}

/* 住房记录统计 */
export function getLiveCount(params) {
	return axios({
		url: apiVersion + '/roomorder/livecount',
		method: 'get',
		params
	})
}

/* 消费记录统计 */
export function getConsumeCount(params) {
	return axios({
		url: apiVersion + '/foodrecord/consumecount',
		method: 'get',
		params
	})
}

/* 获取操作记录表信息 */
export function getOperInfo(params) {
	return axios({
		url: apiVersion + '/operrecord/info',
		method: 'get',
		params
	});
}