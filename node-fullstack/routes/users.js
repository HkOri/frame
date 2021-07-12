var express = require('express');
var router = express.Router();
var dayjs = require('dayjs');
/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

// 导入处理时间的简单函数
var trans = require('../utils/time');

// 导入usermodel
const userModel = require('../model/userModel');
// 导入md5库文件
const md5 = require('md5');

const nodemailer = require('nodemailer');

// 引入token操作
const jwt = require('../utils/jwt');
// 引入业务状态码
const code = require('../utils/code');
let {
	USER_SUCCESS, // 用户操作成功
	USER_LOGIN_ERROR, // 用户信息错误(账号密码不匹配)
	USER_LOGIN_NO, // 用户不存在
	USER_REGISTER_UNAME_NULL, // 注册用户名为空
	USER_REGISTER_ID_ERROR, // 注册用户名被占用
	USER_REGISTER_PWD_ERROR, // 用户注册两次密码不一致
	UNKNOW_ERROR
} = code;

function randomNum() {
    let num = [];
    for (let i = 0; i < 6; i++) {
        num.push(Math.ceil(Math.random() * 9));
    }
    return num.join('');
}


// 用户注册
// http://localhost:3000/api/v0/users/update
router.post('/update', function (req, res, next) {
	jwt.verifyToken(req, res).then(() => {
		userUpdate(req.body, res, userModel);
	}, (err) => {
        console.log(err);
    });
});

// 用户登录
// http://localhost:3000/api/v0/users/login
router.post('/login', function (req, res, next) {
	// 和前台一样处理一下
	let utoken = req.headers.authorization;
	// console.log('utoken的值是:', utoken, 'utoken的类型是:', typeof(utoken), '!req.body.eid是', !req.body.eid); // 这是个字符串...
	// 如果有
	if (utoken && !req.body.eid) {
		jwt.verifyToken(req, res).then((dt) => {
			userLogin(dt, res, userModel, 'again');
		}, (err) => {
			console.log(err);
		});
	}
	else {
		userLogin(req.body, res, userModel);
	}
});

// 删除用户信息
// http://localhost:3000/api/v0/users/del
router.post('/del', function (req, res, next) {
	jwt.verifyToken(req, res).then(() => {
		userDel(req.body, res, userModel);
	}, (err) => {
        console.log(err);
    });
});
// 查询用户信息
// http://localhost:3000/api/v0/users/info
router.post('/info', function (req, res, next) {
	jwt.verifyToken(req, res).then(() => {
		userInfo(req.body, res, userModel);
	}, (err) => {
        console.log(err);
    });
});

// 邮件发送
router.post('/mail', function(req, res, next) {
	let { eid } = req.body;
	userModel.findOne({ eid, status: 1 }, function (err, adventure) {
        if (!err) {
            if (adventure) {
				/* let { _id, email } = adventure;
				console.log(_id, email); */
                (async function() {
                    let transporter = nodemailer.createTransport({
                        service: 'QQ',
                        auth: {
                            user: '发件人的邮箱',
                            pass: '邮箱开通SMTP服务之后拿到的码'
                        }   
                    });
                    let proof = randomNum();
					// console.log(adventure.email);
                    await transporter.sendMail({
                        from: '发件人邮箱', // sender address
                        to: adventure.email, // list of receivers
                        subject: "修改密码", // Subject line
                        text: `你正在修改密码，你的凭证码是${proof}` // plain text body
                    });
                    return res.json({
                        code: USER_SUCCESS,
                        msg: '邮件已发送',
                        data: proof
                    });
                })().catch(err => {
                    console.log(err);
                })
            }
            else {
                return res.json({
                    code: USER_LOGIN_NO,
                    msg: '没有此用户的相关信息'
                });
            }
        }
        else {
            return res.json({
                code: UNKNOW_ERROR,
                msg: '系统繁忙，请稍后再试'
            });
        }
    })
});

router.post('/setpwd', function (req, res, next) {
	userFindPwd(req.body, res, userModel);
});

function userFindPwd(obj, resp, model) {
    let { eid, password } = obj;
    let user = {  
        password: md5(password),
        status: 1 
    }; 
    model.updateOne({ eid }, { $set: user }).then(() => {
        resp.json({ 
            code: USER_SUCCESS,
            msg: '密码修改成功'
        });
    });
}


/*
 * @param       req.body
 * @param       response
 * @param       model
 * @return
 * @description 检验用户注册的接口，也是编辑用户信息的接口
 */
function userUpdate(obj, resp, model) {
	// 如果是注册
	// if (obj.oper === 'register') {
	if (!obj.eid) {
		if (!obj.username) {
			return resp.json({
				code: USER_REGISTER_UNAME_NULL,
				msg: '注册用户名不能为空'
			});
		} /* else if (obj.password !== obj.repassword) {
			return resp.json({
				code: USER_REGISTER_PWD_ERROR,
				msg: '两次密码不一致'
			});
		}  */else {
			// 判断身份证号是否已经存在
			model.findOne({ idCard: obj.idCard, status: 1 }, function (err, adventure) {
				// 没有出现意外错误时
				if (!err) {
					// console.log(adventure);
					// 如果集合中已经有这条数据
					if (adventure) {
						return resp.json({
							code: USER_REGISTER_ID_ERROR,
							msg: '用户身份证号已被使用'
						});
					} else {
						// 如果没有这条数据则将当前注册用户存入集合并提示
						// 获得当前的年月日时分秒
						let { $y, $M, $D, $H, $m, $s } = dayjs(new Date());
						let eid = obj.loc + trans($y) + trans($M) + trans($D) + trans($H) + trans($m) + trans($s);
						let { 
							username, 
							password, 
							hireDate, 
							email,
							idCard, 
							salary, 
							level, 
							phone, 
							loc, 
							contacts, 
							telephone, 
							img 
						} = obj;
						let user = { 
							username, 
							password: md5(password), // 密码要加密
							hireDate, 
							email,
							idCard, 
							salary, 
							level, 
							phone, 
							loc, 
							contacts, 
							telephone, 
							img, 
							eid, 
							status: 1 
						};
						/* let user = {
							username: obj.username, // 名字
							password: obj.password, // 密码
							hireDate: obj.hireDate,// new Date(), // 雇佣时间
							idCard: obj.idCard, // 身份证号也应该加密一下
							salary: obj.salary, // 薪水
							level: obj.level, // 权限等级
							phone: obj.phone, // 电话
							loc: obj.loc, // 所在地区编号
							contacts: obj.contacts, // 紧急联系人
							telephone: obj.telephone, // 紧急联系人电话
							img: obj.img, // 照片
							eid, // 员工号是地区号+注册时间的年(后两位)月日时分秒，即总共3+12=15位
							status: 1 // 数据状态为1表示可操作，为0表示已删除
						}; */
						model.insertMany(user).then(result => {
							if (result) {
								return resp.json({
									code: USER_SUCCESS,
									msg: '注册成功',
									eid // 注册成功也要把员工号返回去 
								});
							}
						});
					}
				} else {
					console.log(err);
					return resp.json({
						code: UNKNOW_ERROR,
						msg: '在注册查询是否有占位用户时发生未知错误'
					});
				}
			});
		}
	}
	else {
		// 编辑用户信息(根据员工号更新)
		let { 
			username, 
			password, 
			hireDate, 
			email,
			idCard, 
			salary, 
			level, 
			phone, 
			loc, 
			contacts, 
			telephone, 
			img, 
			eid 
		} = obj;
		let user = { 
			username, 
			// password: md5(password), 
			hireDate, 
			email,
			idCard, 
			salary, 
			level, 
			phone, 
			loc, 
			contacts, 
			telephone, 
			img, 
			status: 1 
		};
		if (password) {
			user['password'] = md5(password);
		}
		model.updateOne({ eid }, { $set: user }).then(() => {
			// 如果没有修改密码，那么就需要先找到之前的密码然后再和这里传入的参数user生成新的令牌
			if (!password) {
				model.findOne({ eid, status: 1 }, function(err, adventure) {
					if (!err) {
						resp.json({ 
							code: USER_SUCCESS,
							msg: '修改成功',
							token: jwt.createToken({ eid, password: adventure.password })
						});
					}
					else {
						return resp.json({
							code: UNKNOW_ERROR,
							msg: '在登录查询中发生未知错误'
						});
					}
				})
			}
			else {
				// 如果修改了密码，那直接用eid和新密码生成新令牌
				resp.json({ 
					code: USER_SUCCESS,
					msg: '修改成功',
					token: jwt.createToken({ eid, password: md5(password) })
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
function userLogin(obj, resp, model, way) {
	// 登录时，判断员工号和密码
	let user = { eid: obj.eid, password: obj.password };
	// 如果是首次登录
	if (!way) {
		model.findOne({ eid: user.eid, status: 1 }, function (err, adventure) {
			// console.log(err, adventure); // 没查到内容adventure为null
			if (!err) {
				// 数据库中有该用户，adventure就是该用户在数据库中的数据
				if (adventure) {
					// 判断密码是否正确(库里面存储的密码是经过md5加密的)
					if (adventure.password === md5(user.password)) {
						// 数据加密，返回token
						return resp.json({
							code: USER_SUCCESS,
							msg: '登陆成功',
							data: adventure,
							// 应该用加密后的数据生成令牌
							token: jwt.createToken({ eid: user.eid, password: adventure.password })
						});
					} else {
						return resp.json({
							code: USER_LOGIN_ERROR,
							msg: '员工号和密码不匹配'
						});
					}
				} else {
					return resp.json({
						code: USER_LOGIN_NO,
						msg: '无此用户，登陆失败'
					});
				}
			} else {
				return resp.json({
					code: UNKNOW_ERROR,
					msg: '在登录查询中发生未知错误'
				});
			}
		});
	}
	// 刷新页面保持登录状态
	else {
		// 前面改成了用加密后的数据生成令牌，那这里就直接user.password就行
		model.findOne({ eid: user.eid, password: user.password, status: 1 }, function (err, adventure) {
			if (!err) {
				if (adventure) {
					return resp.json({
						code: USER_SUCCESS,
						msg: '登陆成功',
						data: adventure,
						token: jwt.createToken(user)
					});
				}
			} else {
				return resp.json({
					code: UNKNOW_ERROR,
					msg: '在登录查询中发生未知错误'
				});
			}
		});
	}

}

// 删除
function userDel(obj, resp, model) {
	// 接受入参
	let { eid } = obj; 
	console.log(eid);
	model.updateOne({ eid }, { $set: { status: 0 } }).then(() => {
		resp.json({
			code: USER_SUCCESS,
			msg: '删除成功'
		})
	});
}

// 查询用户信息(只能查询到同地区并且权限等级更低的信息)
function userInfo(obj, resp, model) {
	// 这里需要判断一下，是管理者查询用户信息还是用户自己看自己的信息
	let { eid, loc, lv, size, currentPage, username, idCard, sortFilter, sortNumber } = obj;
	let condition = null;
	condition = { username, eid, idCard, loc, level: { $lt: lv }, status: 1 };
	// 清空
	for (let attr in condition) {
		if (!condition[attr]) {
			delete condition[attr];
		}
	}
	let pageSize = Number(size);
	console.log(condition);
	// 如果没有要求条件排序
	if (!sortFilter) {
		model.find(condition).count().then(total => {
			model.find(condition).limit(pageSize).skip((currentPage - 1) * size).then(list => {
				resp.json({
					code: USER_SUCCESS,
					msg: '查询用户信息成功',
					data: { list, total } // total是为给分页用的
				});
			}, (err) => {
				console.log(err);
			});
		}, (err) => {
			console.log(err);
		});
	}
	else {
		let sortcon = {};
		sortcon[sortFilter] = sortNumber;
		console.log(sortcon);
		// .collation({"locale": "zh", numericOrdering:true})
		model.find(condition).count().then(total => {
			model.find(condition).collation({"locale": "zh", numericOrdering: true}).sort(sortcon).limit(pageSize).skip((currentPage - 1) * size).then(list => {
				resp.json({
					code: USER_SUCCESS,
					msg: '查询用户信息成功',
					data: { list, total } // total是为给分页用的
				});
			}, (err) => {
				console.log(err);
			});
		}, (err) => {
			console.log(err);
		});
	}
}
module.exports = router;


