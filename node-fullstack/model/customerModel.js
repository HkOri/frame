// 接口尝试
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose的一切起始于Schema(模式、计划、图解、概要)，每个schema都会映射到一个MongoDB collection
// 并定义这个collection里的文档的构成(模板)
// 这是客户表
const customerSchema = new Schema(
	{
		nickname: String,
        phone: String,
		email: String, // QQ邮箱
        password: String,
		idCard: String, // 身份证
        member: Number,
		img: String, // 头像
		status: Number // 状态
	},
	{ versionKey: '_version' }
);
// 将schema转换成一个Model，因为Model里面有各种用于操作Mongo集合的方法
// 第一个参数为集合名
const CUSTOMER = mongoose.model('customer', customerSchema);

// 将这个操作数据库集合的Model导出
module.exports = CUSTOMER;
