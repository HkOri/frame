// 关于数据库连接
var mongoose = require('mongoose');
// localhost为数据库所在地址，mon为所要操作的数据库
mongoose.connect('mongodb://127.0.0.1/project');

// connet()返回一个状态待定(pending)的连接，加上连接成功的提醒和连接失败的警告信息
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	// we're connected!
	console.log('数据库连接成功');
});
// mongoose.connection.close();
