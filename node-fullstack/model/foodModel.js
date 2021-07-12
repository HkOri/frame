// 接口尝试
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose的一切起始于Schema(模式、计划、图解、概要)，每个schema都会映射到一个MongoDB collection
// 并定义这个collection里的文档的构成(模板)
// 这是食物表
const foodSchema = new Schema(
	{
		name: String, // 名字
		loc: Number, // 地区
		img: String, // 图片
        price: Number, // 价格
        discount: Number, // 折扣
        desc: String, // 描述
        count: Number, // 数量
        sale: Number, // 销量
		status: Number // 状态
	},
	{ versionKey: '_version' }
);
// 将schema转换成一个Model，因为Model里面有各种用于操作Mongo集合的方法
// 第一个参数为集合名
const FOOD = mongoose.model('food', foodSchema);

// 将这个操作数据库集合的Model导出
// exports.User = User;
module.exports = FOOD;
