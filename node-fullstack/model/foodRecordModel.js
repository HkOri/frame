// 接口尝试
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose的一切起始于Schema(模式、计划、图解、概要)，每个schema都会映射到一个MongoDB collection
// 并定义这个collection里的文档的构成(模板)
// 这是食物消费表
const foodRecordSchema = new Schema(
	{
        name: String, // 开房人的名字
        date: String, // 时间
        idCard: String, // 身份证号
        loc: Number, // 地区
        rid: Number, // 房间号
        /* --- */
        fname: String, // 美食名字
        count: Number, // 点了几份
        price: Number, // 每份多少钱，现在是总价了
        /* --- */
		    status: Number // 状态
	},
    {
		collection: 'foodrecord'
	},
	{ versionKey: '_version' }
);
// 将schema转换成一个Model，因为Model里面有各种用于操作Mongo集合的方法
// 第一个参数为集合名
const Foodrecord = mongoose.model('foodrecord', foodRecordSchema);

// 将这个操作数据库集合的Model导出
module.exports = Foodrecord;
