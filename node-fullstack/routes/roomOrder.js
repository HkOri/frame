var express = require('express');
var router = express.Router();

// 导入roomOrderModel
const roomOrderModel = require('../model/roomOrderModel');
// 导入operRecordModel
const operRecordModel = require('../model/operRecordModel');
// 导入roomModel
const roomTypeModel = require('../model/roomTypeModel');

// 引入token操作
const jwt = require('../utils/jwt');
// 引入业务状态码
const code = require('../utils/code');
let {
	ORDER_SUCCESS,
	ORDER_INSERT_ERROR, // 添加订单信息失败
	ORDER_DELETE_ERROR, // 删除订单信息失败
	ORDER_EDIT_ERROR, // 修改订单信息失败
	ORDER_SELECT_ERROR, // 查询订单信息失败
    UNKNOW_ERROR
} = code;


// http://localhost:3000/api/v0/roomorder/update
router.post('/update', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        roomOrderUpdate(req.body, res, roomOrderModel);
	}, (err) => {
        console.log(err);
    });
});

// http://localhost:3000/api/v0/roomorder/del
router.post('/del', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        roomOrderDel(req.body, res, roomOrderModel);
	}, (err) => {
        console.log(err);
    });
});

// http://localhost:3000/api/v0/roomorder/info
// 注意这里改为了post请求
router.post('/info', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        roomInfo(req.body, res, roomOrderModel);
	}, (err) => {
        console.log(err);
    });
});

// 给前台客户查看自己的住房记录信息
// http://localhost:3000/api/v0/roomorder/cusinfo
router.post('/cusinfo', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        roomOrderInfo(req.body, res, roomOrderModel);
	}, (err) => {
        console.log(err);
    });
});

// 统计住房记录的接口
// http://localhost:3000/api/v0/roomorder/livecount
router.get('/livecount', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        getLiveCount(req.query, res, roomOrderModel);
	}, (err) => {
        console.log(err);
    });
});



/*
 * @param       req.body
 * @param       response
 * @param       model
 * @return
 * @description 
 */
function roomOrderUpdate(obj, resp, model) {
    // 如果是创建
    if (!obj._id) {
        // 直接创建就完事了，住房信息不需要查询判断(也得先查询的!!)
        // 后台新增住房记录的时候应该限制一下，不能直接新增完成态的
        let { 
            rid,
            name,
            idCard,
            date,
            type,
            roomId,
            inTime,
            outTime,
            price,
            eid, // 加一个
        } = obj;
        let record = {
            rid,
            name,
            idCard,
            date,
            type,
            roomId,
            inTime,
            outTime,
            price,
            state: 'undetermined',
            status: 1 
        };
        // 需要先查询是否还有空房
        roomTypeModel.findOne({ tid: roomId }, function (err, adventure) {
            if (!err) {
                if (adventure.repertory > 0) {
                    adventure.repertory -= 1;
                    roomTypeModel.updateOne({ tid: roomId }, { $set: adventure }).then(() => {
                        model.insertMany(record).then(result => {
                            if (result) {
                                let { _id } = result[0];
                                if (eid) {
                                    let newObj = { 
                                        eid: eid || '工号传递错误',
                                        cname: 'roomOrder',
                                        recordId: _id,
                                        date: new Date(),
                                        oper: '创建'
                                    };
                                    operRecordModel.insertMany(newObj);
                                }
                                return resp.json({
                                    code: ORDER_SUCCESS,
                                    msg: '住房信息添加成功'
                                });
                            }
                        });
                    }).catch(error => {
                        console.log(error);
                    });
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
                    msg: '手动增加住房信息查询是否有空余时发生错误'
                });
            }
        })
    }
    else {
        // 编辑(根据_id和loc(loc感觉都不用))，也需要做对应处理
        let { 
            _id,
            rid,
            name,
            idCard,
            date,
            type,
            roomId,
            inTime,
            outTime,
            price,
            state,
            nowState,
            eid
        } = obj;
        let record = {
            rid,
            name,
            idCard,
            date,
            type,
            roomId,
            inTime,
            outTime,
            price,
            state,
            status: 1 
        };
        // 更新一个东西肯定要能先看到，所以可以不加status，查才需要
        model.updateOne({ _id, status: 1 }, { $set: record }).then(() => {
            // 当这条住房记录信息的状态由undetermined转为complete的时候，客房数量要加1
            // 是完成态，并且不是由待定转完成态
            if (state === 'complete' && nowState !== 'yep') {
                roomTypeModel.findOne({ tid: roomId }, function (err, adventure) {
                    if (!err) {
                        adventure.repertory += 1;
                        roomTypeModel.updateOne({ tid: roomId }, { $set: adventure }).then(() => {
                            if (eid) {
                                let newObj = { 
                                    eid: eid || '工号传递错误',
                                    cname: 'roomOrder',
                                    recordId: _id,
                                    date: new Date(),
                                    oper: '修改'
                                };
                                operRecordModel.insertMany(newObj);
                            }
                            resp.json({ 
                                code: ORDER_SUCCESS,
                                msg: '住房信息编辑成功'
                            });
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                    else {
                        return resp.json({
                            code: UNKNOW_ERROR,
                            msg: '手动编辑住房信息查询是否有空余时发生错误'
                        });
                    }
                })
            }
            else {
                // console.log(12, eid);
                if (eid) {
                    let newObj = { 
                        eid: eid || '工号传递错误',
                        cname: 'roomOrder',
                        recordId: _id,
                        date: new Date(),
                        oper: '修改'
                    };
                    operRecordModel.insertMany(newObj);
                }
                return resp.json({ 
                    code: ORDER_SUCCESS,
                    msg: '住房信息编辑成功'
                });
            }
        });
    }

}


// 删除
function roomOrderDel(obj, resp, model) {
    // 接受入参
    let { _id, eid } = obj; 
    model.updateOne({ _id }, { $set: { status: 0 } }).then(() => {
        if (eid) {
            let newObj = { 
                eid: eid || '工号传递错误',
                cname: 'roomOrder',
                recordId: _id,
                date: new Date(),
                oper: '删除'
            };
            operRecordModel.insertMany(newObj);
        }
        resp.json({
            code: ORDER_SUCCESS,
            msg: '指定信息已成功删除'
        })
    });
}

// 查询
function roomInfo(obj, resp, model) {
    // 可以根据状态、身份证号(可有可无)、名字(可有可无)查询住宿信息
    let { size, page, state, idCard, name } = obj;
    let pageSize = Number(size);
    state = state || 'undetermined'; // 默认情况下查询会显示还没有完成的住房记录
    let con = { state, status: 1 };
    // 如果查询时候填了身份证号
    if (idCard) {
        con['idCard'] = idCard; // 查询条件就加一条
    }
    if (name) {
        con['name'] = name; // 查询条件就加一条
    }
    console.log('--------------', con);
    model.find(con).count().then(total => {
        model.find(con).limit(pageSize).skip((page - 1) * size).then(list => {
            resp.json({
                code: ORDER_SUCCESS,
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


// 给客户的查询方法
function roomOrderInfo(obj, resp, model) {
    // 根据身份证号查询所有状态
    let { idCard } = obj;
    let con = { idCard, status: 1 };
    model.find(con).then(list => {
        resp.json({
            code: ORDER_SUCCESS,
            msg: '查询成功',
            data: list // 是个数组
        });
    }, (err) => {
        console.log(err);
    });
}


function getLiveCount(obj, resp, model) {
    model.aggregate([
        { $match : { status: 1 } },
        {   $group : {_id : "$roomId", num : {$sum : 1} }   }
    ]).then(res => {
        resp.json({
            code: ORDER_SUCCESS,
            msg: '查询统计记录成功',
            data: res // 是个数组
        });
    }, (err) => {
        console.log(err);
    });
}

module.exports = router;
