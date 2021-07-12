// 接口尝试
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose的一切起始于Schema(模式、计划、图解、概要)，每个schema都会映射到一个MongoDB collection
// 并定义这个collection里的文档的构成(模板)
// 这是系统用户表
const userSchema = new Schema(
	{
		username: String,
		password: String,
		// hireDate: Date, 
		hireDate: String,
		email: String,
		idCard: String,
		salary: String,
		// level: String,
		level: Number,
		phone: String,
		contacts: String,
		telephone: String,
		loc: Number,
		img: String,
		eid: String,
		status: Number
	},
	// 解决mongoose自动处理集合名单复数的问题
	/* {
		collection: 'users'
	}, */
	{ versionKey: '_version' }
);

/*
 *		// 解决方案见mongoose/lib/connection.js文件 line: 1138
 *
 *		const schema = new Schema({ name: String }, { collection: 'actor' });
 *
 * 		// or
 *
 * 		schema.set('collection', 'actor');
 *
 * 		// or
 *
 * 		const collectionName = 'actor'
 * 		const M = conn.model('Actor', schema, collectionName)
 *
 */

// 将schema转换成一个Model，因为Model里面有各种用于操作Mongo集合的方法
// 第一个参数为集合名
const USER = mongoose.model('user', userSchema);

// 将这个操作数据库集合的Model导出
module.exports = USER;
