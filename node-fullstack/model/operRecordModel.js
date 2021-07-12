// 接口尝试
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose的一切起始于Schema(模式、计划、图解、概要)，每个schema都会映射到一个MongoDB collection
// 并定义这个collection里的文档的构成(模板)
// 这是操作记录集合
const operSchema = new Schema(
        {
                eid: String,    // 操作员工工号
                cname: String,  // 被操作的集合名
                recordId: String, // 被操作记录的id
                date: Date, // 操作时间
                oper: String, // 操作方式
	},
        {
		collection: 'operRecord'
	},
	{ versionKey: '_version' }
);

// 将schema转换成一个Model，因为Model里面有各种用于操作Mongo集合的方法
// 第一个参数为集合名
const OPERRECORD = mongoose.model('operRecord', operSchema);

module.exports = OPERRECORD;
