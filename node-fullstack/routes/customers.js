var express = require('express');
var router = express.Router();
var md5 = require('md5');

// 导入customerModel
const customerModel = require('../model/customerModel');
// 导入operRecordModel
const operRecordModel = require('../model/operRecordModel');

const nodemailer = require('nodemailer');

// 引入token操作
const jwt = require('../utils/jwt');
// 引入业务状态码
const code = require('../utils/code');
let {
	CUSTOMER_SUCCESS,
	CUSTOMER_INSERT_ERROR, // 添加客户信息失败
	CUSTOMER_DELETE_ERROR, // 删除客户信息失败
	CUSTOMER_EDIT_ERROR, // 修改客户信息失败
	CUSTOMER_SELECT_ERROR, // 查询客户信息失败
    UNKNOW_ERROR
} = code;


// http://localhost:3000/api/v0/customers/update
router.post('/update', function (req, res, next) {
    let { _id } = req.body;
    if (_id) {
        // 这很离谱啊，之前这怎么会没有处理呢？？？而且之前还能注册成功？？？
        jwt.verifyToken(req, res).then(() => {
            customerUpdate(req.body, res, customerModel);
        }, (err) => {
            console.log(err);
        });
    }
    else {
        customerUpdate(req.body, res, customerModel);
    }
});

// http://localhost:3000/api/v0/customers/findpwd
router.post('/findpwd', function (req, res, next) {
    customerFindPwd(req.body, res, customerModel);
});

// http://localhost:3000/api/v0/customers/login
router.post('/login', function (req, res, next) {
    // 这里应该判断一下，防止页面手动刷新退出登录
    let token = req.headers.authorization;
    // 如果有token，解析一下再去登录
    if (token && !req.body.nickname) {
        jwt.verifyToken(req, res).then((dt) => {
            customerLogin(dt, res, customerModel, 'again');
        }, (err) => {
            console.log(err);
        });
    }
    // 首次登录
    else {
        customerLogin(req.body, res, customerModel);
    }
});

// http://localhost:3000/api/v0/customers/del
router.post('/del', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        customerDel(req.body, res, customerModel);
	}, (err) => {
        console.log(err);
    });
});

// http://localhost:3000/api/v0/customers/info
router.get('/info', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        customerInfo(req.query, res, customerModel);
	}, (err) => {
        console.log(err);
    });
});

router.post('/mail', function(req, res, next) {
    let { nickname } = req.body;
    customerModel.findOne({ nickname, status: 1 }, function (err, adventure) {
        if (!err) {
            if (adventure) {
                (async function() {
                    let transporter = nodemailer.createTransport({
                        service: 'QQ',
                        auth: {
                            user: '发件人的QQ邮箱',
                            pass: 'QQ邮箱开通SMTP服务之后拿到的码'
                        }   
                    });
                    let proof = randomNum();
                    await transporter.sendMail({
                        from: '发件人的邮箱', // sender address
                        to: adventure.email, // list of receivers
                        subject: "修改密码", // Subject line
                        text: `你正在修改密码，你的凭证码是${proof}` // plain text body
                    });
                    return res.json({
                        code: CUSTOMER_SUCCESS,
                        msg: '邮件已发送',
                        data: proof
                    });
                })().catch(err => {
                    console.log(err);
                })
            }
            else {
                return res.json({
                    code: CUSTOMER_SELECT_ERROR,
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

function randomNum() {
    let num = [];
    for (let i = 0; i < 6; i++) {
        num.push(Math.ceil(Math.random() * 9));
    }
    return num.join('');
}

/*
 * @param       req.body
 * @param       response
 * @param       model
 * @return
 * @description 
 */
function customerUpdate(obj, resp, model) {
    // 如果是创建
    if (!obj._id) {
        // 根据名字和身份证号判断用户是否已经注册(客户表中名字和身份证号都不能有重复的，登录用的是名字和密码)
        // db.user.find({$or:[{age:20},{age:25}]})  查询age=20或者age=25的记录
        model.find({ $or: [{ nickname: obj.nickname, status: 1 }, { idCard: obj.idCard, status: 1 }]}).then(list => {
            if (!list.length) {
                let { 
                    nickname,
                    phone,
                    email,
                    password,
                    // img, // 用户注册时不设置头像，默认头像
                    idCard
                } = obj;
                let customer = {
                    nickname, 
                    phone,
                    email,
                    password: md5(password), // 密码这里加密一下
                    img: '/upload/1619687233658-300.png',
                    idCard,
                    member: 0, // 客户注册后默认非会员
                    status: 1 
                };
                model.insertMany(customer).then(result => {
                    if (result) {
                        return resp.json({
                            code: CUSTOMER_SUCCESS,
                            msg: '注册成功'
                        });
                    }
                });
            }
            else {
                return resp.json({
                    code: CUSTOMER_INSERT_ERROR,
                    msg: '注册失败，身份证号或昵称已被使用'
                });
            }
        }, (err) => {
            console.log(err);
        });
    }
    else {
        // 编辑客户信息(根据id)
        let { 
            _id, // 按理所应该是_id
            nickname, 
            phone,
            email,
            password,
            img,
            idCard,
            // member,
            eid // 加一个
        } = obj;
        let customer = {
            nickname, 
            phone,
            email,
            img,
            idCard,
            // member,
            status: 1 
        };
        if (password) {
            customer['password'] = md5(password);
        }
        // 查询是否撞名
        model.find({ nickname: obj.nickname, status: 1 }).then(list => {
            if (list.length > 1) {
                resp.json({
                    code: CUSTOMER_EDIT_ERROR,
                    msg: '昵称已被占用'
                })
            }
            else {
                model.updateOne({ _id }, { $set: customer }).then(() => {
                    // dt : { n: 1, nModified: 1, ok: 1 }
                    if (eid) {
                        let newObj = { 
                            eid: eid || '工号传递错误',
                            cname: 'customers',
                            recordId: _id,
                            date: new Date(),
                            oper: '修改'
                        };
                        operRecordModel.insertMany(newObj);
                    }
                    model.find({ _id, status: 1}).then(list => {
                        let { nickname, password } = list[0]
                        resp.json({ 
                            code: CUSTOMER_SUCCESS,
                            msg: '修改成功',
                            token: jwt.createToken({ nickname, password })
                        });
                    }, (err) => {
                        console.log(err);
                    });
                });
            }
        }, (err) => {
            console.log(err);
        });
    }
}

function customerFindPwd(obj, resp, model) {
    let { nickname, password } = obj;
    let customer = {  
        password: md5(password),
        status: 1 
    }; 
    model.updateOne({ nickname }, { $set: customer }).then(() => {
        resp.json({ 
            code: CUSTOMER_SUCCESS,
            msg: '密码修改成功'
        });
    });
}

function customerLogin(obj, resp, model, way) {
    // 登录时，判断昵称和密码
    let user = null;
    // 如果是首次登录
    if (!way) {
        user = { nickname: obj.nickname, password: md5(obj.password) };
    }
    // 如果不是
    else {
        user = { nickname: obj.nickname, password: obj.password };
    }
	model.findOne({ nickname: user.nickname, password: user.password, status: 1 }, function (err, adventure) {
		// console.log(err, adventure); // 没查到内容adventure为null
		if (!err) {
            // console.log(user);
			// 数据库中有该用户，adventure就是该用户在数据库中的数据
			if (adventure) {
                return resp.json({
                    code: CUSTOMER_SUCCESS,
                    msg: '登录成功',
                    data: adventure, // 把登录客户的数据全部返回去
                    token: jwt.createToken(user)
                });
			} else {
				return resp.json({
					code: CUSTOMER_SELECT_ERROR,
					msg: '账号或密码错误，登陆失败'
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


// 删除
function customerDel(obj, resp, model) {
    // 接受入参
    let { _id, eid } = obj; 
    model.updateOne({ _id }, { $set: { status: 0 } }).then(() => {
        if (eid) {
            let newObj = { 
                eid: eid || '工号传递错误',
                cname: 'customers',
                recordId: _id,
                date: new Date(),
                oper: '删除'
            };
            operRecordModel.insertMany(newObj);
        }
        resp.json({
            code: CUSTOMER_SUCCESS,
            msg: '客户信息已删除'
        })
    });
}

// 查询
function customerInfo(obj, resp, model) {
    let { _id, page, size, idCard, nickname } = obj;
    // 如果不是客户自己看自己信息
    if (page) {
        let con = { idCard, nickname ,status: 1 }
        let pageSize = Number(size);
        for (let attr in con) {
            if (!con[attr]) {
                delete con[attr];
            }
        }
        // console.log(con);
        model.find(con).count().then(total => {
            model.find(con).limit(pageSize).skip((page - 1) * size).then(list => {
                resp.json({
                    code: CUSTOMER_SUCCESS,
                    msg: '客户信息查询成功',
                    data: { list, total }
                })
            }, (err) => {
                console.log(err);
            });
        }, (err) => {
            console.log(err);
        });
    }
    else {
        model.find({ _id }).then(list => {
            resp.json({
                code: CUSTOMER_SUCCESS,
                msg: '查询成功',
                data: list
            })
        });
    }
}
module.exports = router;
