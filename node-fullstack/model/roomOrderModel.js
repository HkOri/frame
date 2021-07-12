// 接口尝试
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose的一切起始于Schema(模式、计划、图解、概要)，每个schema都会映射到一个MongoDB collection
// 并定义这个collection里的文档的构成(模板)
// 这是订单表
const roomOrderSchema = new Schema(
	{
        rid: Number, // 房号(这个得酒店前台在客户到酒店之后，给出钥匙之后，在系统中处理编辑)
        name: String, // 谁订的房
        idCard: String, // 身份证号
		date: String, // 什么时候订的房
        type: String, // 订了什么类型的房(单人房、双人房...)
        roomId: Number, // 订了什么类型的房(房间类型的标志)
        inTime: String, // 入住时间
        outTime: String, // 退房时间
        price: Number, // 钱
        state: String, // 状态(complete, undetermined) 
        /* 
            一条订单记录，前台客户预定之后，除了rid和name之外，上面信息全都自动生成，不过state的值为undetermined(待定)
            当客户来到酒店，前台工作人员把房门钥匙给出去，此时根据idCard和state找到对应记录，然后给rid和name赋值
            当客户退房后，再编辑这条记录的state为complete
        */
		status: Number
	},
	{
		collection: 'roomOrder'
	},
	{ versionKey: '_version' }
);

// 将schema转换成一个Model，因为Model里面有各种用于操作Mongo集合的方法
// 第一个参数为集合名
const ROOMORDER = mongoose.model('roomOrder', roomOrderSchema);

// 将这个操作数据库集合的Model导出
module.exports = ROOMORDER;
