// 接口尝试
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose的一切起始于Schema(模式、计划、图解、概要)，每个schema都会映射到一个MongoDB collection
// 并定义这个collection里的文档的构成(模板)
// 这是客房类型表(这个表才应该是辅助预定和退订的，rooms好像没用了)
const roomTypeSchema = new Schema(
	{
		tid: Number, // 标志
        repertory: Number, // 库存
        type: String, // 类型
		loc: Number, // 地区
		price: Number, // 价格
		discount: Number, // 折扣
		desc: String, // 描述
		img: String, // 预览
		status: Number
	},
	{
		collection: 'roomType'
	},
	{ versionKey: '_version' }
);

// 将schema转换成一个Model，因为Model里面有各种用于操作Mongo集合的方法
// 第一个参数为集合名
const ROOMTYPE = mongoose.model('roomType', roomTypeSchema);

// 将这个操作数据库集合的Model导出
module.exports = ROOMTYPE;
