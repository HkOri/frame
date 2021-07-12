// 导入md5库文件
const md5 = require('md5');
// 引入token操作
const jwt = require('./jwt');
// 引入业务状态码
const code = require('./code');
let {
	USER_SUCCESS, // 用户操作成功
	user_no_login, // 未登录
	USER_LOGIN_ERROR, // 用户信息错误(账号密码不匹配)
	USER_LOGIN_NO, // 用户不存在
	USER_REGISTER_UNAME_NULL, // 注册用户名为空
	USER_REGISTER_UNAME_ERROR, // 注册用户名被占用
	USER_REGISTER_PWD_ERROR // 用户注册两次密码不一致
} = code;

/*
 * @param       Object
 * @param       response
 * @param       model
 * @return
 * @description 检验用户注册的接口
 */
function userRegister(obj, resp, model) {
	if (!obj.username) {
		return resp.json({
			code: USER_REGISTER_UNAME_NULL,
			msg: '注册用户名不能为空'
		});
	} else if (obj.password !== obj.repassword) {
		return resp.json({
			code: USER_REGISTER_PWD_ERROR,
			msg: '两次密码不一致'
		});
	} else {
		// 用户名通过正则校验，密码也通过正则校验，查询数据库当前用户名是否已经被占用
		model.findOne({ username: obj.username }, function (err, adventure) {
			console.log(err, adventure);
			// 如果集合中已经有这条数据
			if (!err) {
				if (adventure) {
					return resp.json({
						code: USER_REGISTER_UNAME_ERROR,
						msg: '用户名已被占用'
					});
				} else {
					// 将当前注册用户存入集合并提示
					let user = {
						username: obj.username,
						password: md5(obj.password),
						create_at: new Date()
					};
					model.insertMany(user).then(result => {
						if (result) {
							return resp.json({
								code: USER_SUCCESS,
								msg: '注册成功'
							});
						}
					});
				}
			} else {
				console.log(err);
				return resp.json({
					msg: '错误'
				});
			}
		});
	}
}

/*
 * @param       Object
 * @param       response
 * @param       model
 * @return
 * @description 校验用户登录的接口
 */
function userLogin(obj, resp, model) {
	let user = { username: obj.username, password: md5(obj.password) };
	model.findOne({ username: user.username }, function (err, adventure) {
		// console.log(err, adventure); // 没查到内容adventure为null
		if (!err) {
			// 数据库中有该用户，adventure就是该用户在数据库中的数据
			if (adventure) {
				// 判断密码是否正确(库里面存储的密码是经过md5加密的)
				if (adventure.password === user.password) {
					// 数据加密，返回token
					return resp.json({
						code: USER_SUCCESS,
						msg: '登陆成功',
						token: jwt.createToken(user)
					});
				} else {
					return resp.json({
						code: USER_LOGIN_ERROR,
						msg: '用户名和密码不匹配'
					});
				}
			} else {
				return resp.json({
					code: USER_LOGIN_NO,
					msg: '无此用户，登陆失败'
				});
			}
		} else {
			console.log(err);
			return resp.json({
				msg: '错误'
			});
		}
	});
}

module.exports = {
	userRegister,
	userLogin
};
