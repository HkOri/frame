var express = require('express');
var router = express.Router();

// 导入roomModel
const roomTypeModel = require('../model/roomTypeModel');
// 导入roomOrderModel
const roomOrderModel = require('../model/roomOrderModel');

// 引入token操作
const jwt = require('../utils/jwt');
// 引入业务状态码
const code = require('../utils/code');
let {
    ORDER_SUCCESS,
    ORDER_INSERT_ERROR, // 添加订单信息失败
	ROOMTYPE_SUCCESS, // 商品信息操作成功
	ROOMTYPE_INSERT_ERROR, // 添加商品失败
	ROOMTYPE_DELETE_ERROR, // 删除商品失败
	ROOMTYPE_EDIT_ERROR, // 修改商品失败
	ROOMTYPE_SELECT_ERROR, // 查询商品失败
    UNKNOW_ERROR
} = code;


// 客房新增和编辑
// http://localhost:3000/api/v0/roomtype/update
router.post('/update', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        roomTypeUpdate(req.body, res, roomTypeModel);
	}, (err) => {
        console.log(err);
    });
});

// 客房预定
// http://localhost:3000/api/v0/roomtype/subscribe
router.post('/subscribe', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        roomTypeSubscribe(req.body, res, roomTypeModel);
	}, (err) => {
        console.log(err);
    });
});

// 客房退订
// http://localhost:3000/api/v0/roomtype/unsubscribe
router.post('/unsubscribe', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        roomTypeUnsubscribe(req.body, res, roomTypeModel);
	}, (err) => {
        console.log(err);
    });
});

// 删除客房信息
// http://localhost:3000/api/v0/roomtype/del
router.post('/del', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        roomTypeDel(req.body, res, roomTypeModel);
	}, (err) => {
        console.log(err);
    });
});

// 查询客房信息(前台客户这里不需要身份验证)
// http://localhost:3000/api/v0/roomtype/info
router.get('/info', function (req, res, next) {
    /* jwt.verifyToken(req, res).then(() => {
    }, (err) => {
        console.log(err);
    }); */
    roomTypeInfo(req.query, res, roomTypeModel);
});

/*
 * @param       req.body
 * @param       response
 * @param       model
 * @return
 * @description 客房类型编辑和新增的接口
 */
function roomTypeUpdate(obj, resp, model) {
    // 如果是创建
    if (!obj._id) {
        // 查询所在地区是否已经有了(不能根据类型查，都是双人房价格也不一定一样)
        model.findOne({ tid: obj.tid, loc: obj.loc, status: 1 }, function (err, adventure) {
            // 没有出现意外错误时
            if (!err) {
                // 如果集合中已经有这条数据
                if (adventure) {
                    return resp.json({
                        code: ROOMTYPE_INSERT_ERROR,
                        msg: '新增错误，房型标志已存在'
                    });
                } else {
                    // 如果没有这条数据则将当前新的房间信息存入集合并提示
                    let { 
                        tid,
                        repertory,
                        type,
                        loc,
                        price,
                        discount,
                        desc,
                        img
                    } = obj;
                    let roomType = {
                        tid,
                        repertory,
                        type,
                        loc,
                        price,
                        discount,
                        desc,
                        img,
                        status: 1 
                    };
                    model.insertMany(roomType).then(result => {
                        if (result) {
                            return resp.json({
                                code: ROOMTYPE_SUCCESS,
                                msg: '添加客房类型成功'
                            });
                        }
                    });
                }
            } else {
                return resp.json({
                    code: UNKNOW_ERROR,
                    msg: '在新增客房类型查询是否有占位时发生未知错误'
                });
            }
        });
    
    }
    else {
        // 编辑客房类型信息(根据客房类型标志tid更新) // 这个应该直接根据_id来更方便
        let { 
            tid, 
            repertory,
            type,
            loc,
            price,
            discount,
            desc,
            img
        } = obj;
        let roomType = {
            tid,
            repertory,
            type,
            loc,
            price,
            discount,
            desc,
            img,
            status: 1 
        };
        model.updateOne({ tid, loc }, { $set: roomType }).then(() => {
            resp.json({ 
                code: ROOMTYPE_SUCCESS,
                msg: '客房类型信息编辑成功'
            });
        });

    }

}


function roomTypeSubscribe(obj, resp, model) {
    // 根据数据库自动生成的_id
    let { _id } = obj;
    // 如果是预定，那么先要查找到目标，然后判断数量是否满足要求
    model.findOne({ _id }, function (err, adventure) {
        // 没有出现意外错误
        if (!err) {
            // 数量满足预定要求
            if (adventure.repertory > 0) {
                // 先更新客房的数量
                adventure.repertory -= 1;
                model.updateOne({ _id }, { $set: adventure }).then(() => {
                    // 新增一条住房记录
                    let { 
                        rid,
                        name,
                        idCard,
                        date,
                        type,
                        inTime,
                        outTime,
                        price
                    } = obj;
                    let record = {
                        rid,
                        name,
                        idCard,
                        date,
                        type,
                        roomId: adventure.tid,
                        inTime,
                        outTime,
                        price,
                        state: 'undetermined',
                        status: 1 
                    };
                    // 插入一条新的住房记录
                    roomOrderModel.insertMany(record).then(result => {
                        if (result) {
                            return resp.json({
                                code: ORDER_SUCCESS,
                                msg: '预定成功'
                            });
                        }
                    });
                });
                /* 
                    昵称
                    身份证号
                    下单时间
                    房间类型
                    入住时间
                    退房时间
                    房间价钱
                */

            }
            else {
                return resp.json({
                    code: ORDER_INSERT_ERROR,
                    msg: '客房已满'
                });
            }
        }
        else {
            return resp.json({
                code: UNKNOW_ERROR,
                msg: '在预定客房的查询过程中发生未知错误'
            });
        }
    });
}

function roomTypeUnsubscribe(obj, resp, model) {
     // 客房类型id和住房记录_id
     let { _id, tid } = obj;
    model.findOne({ tid }, function (err, adventure) {
        if (!err) {
            console.log(tid, adventure);
            adventure.repertory += 1;
            model.updateOne({ tid }, { $set: adventure }).then(() => {
                // 将对应的住房记录删除
                // 要先找到对应的住房记录
                // _id
                // 插入一条新的住房记录
                roomOrderModel.updateOne({ _id }, { $set: { status: 0 } }).then(() => {
                    return resp.json({
                        code: ORDER_SUCCESS,
                        msg: '退订成功'
                    });
                });
            }, (err) => {
                console.log(err);
            });
        }
    })
}

// 删除
function roomTypeDel(obj, resp, model) {
    // 接受入参
    let { tid, loc } = obj; 
    model.updateOne({ tid, loc }, { $set: { status: 0 } }).then(() => {
        resp.json({
            code: ROOMTYPE_SUCCESS,
            msg: '指定客房类型删除成功'
        })
    });
}

// 查询客房类型信息(只能查询到同地区的客房类型信息)
function roomTypeInfo(obj, resp, model) {
    // 还是应该做一下分页处理
    let { loc, size, page } = obj;
    if (page) {
        let pageSize = Number(size);
        let con = { loc, status: 1 };
        model.find(con).count().then(total => {
            model.find(con).limit(pageSize).skip((page - 1) * size).then(list => {
                resp.json({
                    code: ROOMTYPE_SUCCESS,
                    msg: '查询成功',
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
        model.find({ loc, status: 1 }).then(list => {
            resp.json({
                code: ROOMTYPE_SUCCESS,
                msg: '查询成功',
                data: { list, total: '这是不分页查询的结果' }
            })
        }, (err) => {
            console.log(err);
        });
    }
}
module.exports = router;
