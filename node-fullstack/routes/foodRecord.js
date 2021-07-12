var express = require('express');
var router = express.Router();
var dayjs = require('dayjs');
// 导入处理时间的简单函数
var trans = require('../utils/time');
// 导入foodRecordModel
const foodRecordModel = require('../model/foodRecordModel');
// 导入operRecordModel
const operRecordModel = require('../model/operRecordModel');

// 引入token操作
const jwt = require('../utils/jwt');
// 引入业务状态码
const code = require('../utils/code');
let {
	FOODRECORD_SUCCESS,
	FOODRECORD_INSERT_ERROR, // 添加消费记录信息失败
	FOODRECORD_DELETE_ERROR, // 删除消费记录信息失败
	FOODRECORD_EDIT_ERROR, // 修改消费记录信息失败
	FOODRECORD_SELECT_ERROR, // 查询消费记录信息失败
    UNKNOW_ERROR
} = code;


// http://localhost:3000/api/v0/foodrecord/update
router.post('/update', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        foodRecordUpdate(req.body, res, foodRecordModel);
	}, (err) => {
        console.log(err);
    });
});

// http://localhost:3000/api/v0/foodrecord/del
router.post('/del', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        foodRecordDel(req.body, res, foodRecordModel);
	}, (err) => {
        console.log(err);
    });
});

// http://localhost:3000/api/v0/foodrecord/info
router.get('/info', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        foodRecordInfo(req.query, res, foodRecordModel);
	}, (err) => {
        console.log(err);
    });
});

// http://localhost:3000/api/v0/foodrecord/consumecount
router.get('/consumecount', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        getConsumeCount(req.query, res, foodRecordModel);
	}, (err) => {
        console.log(err);
    });
});


function foodRecordUpdate(obj, resp, model) {
    // 如果是创建
    // if (obj.oper === 'create') {
    if (!obj._id) {
        // 直接创建就完事了，住房机房不需要查询判断
        let { 
            name, 
            date,
            idCard,
            loc,
            rid,
            fname,
            count,
            price,
            eid, // 加一个
        } = obj;
        // let { $H, $m, $s } = dayjs(new Date());
		let newDate = date; // + " " + trans($H) + ":" + trans($m) + ":" + trans($s);
        let record = {
            name, 
            date: newDate,
            idCard,
            loc,
            rid,
            fname,
            count,
            price,
            status: 1 
        };
        model.insertMany(record).then(result => {
            if (result) {
                // console.log('result------------', result);
                let { _id } = result[0];
                if (eid) {
                    let obj = { 
                        eid: eid || '工号传递错误',
                        cname: 'foodrecord',
                        recordId: _id,
                        date: new Date(),
                        oper: '创建'
                    };
                    operRecordModel.insertMany(obj);
                }
                return resp.json({
                    code: FOODRECORD_SUCCESS,
                    msg: '消费记录信息添加成功'
                });
            }
        });
    }
    else {
        // 编辑(根据_id和loc(loc感觉都不用))
        let { 
            _id,
            name, 
            date,
            idCard,
            loc,
            rid,
            fname,
            count,
            price,
            eid // 加一个
        } = obj;
        let record = {
            name, 
            date,
            idCard,
            loc,
            rid,
            fname,
            count,
            price,
            status: 1 
        };
        model.updateOne({ _id }, { $set: record }).then(() => {
            if (eid) {
                let newObj = { 
                    eid: eid || '工号传递错误',
                    cname: 'foodrecord',
                    recordId: _id,
                    date: new Date(),
                    oper: '修改'
                };
                operRecordModel.insertMany(newObj);
            }
            resp.json({ 
                code: FOODRECORD_SUCCESS,
                msg: '消费记录信息编辑成功'
            });
        });
    }

}


// 删除
function foodRecordDel(obj, resp, model) {
    // 接受入参
    let { _id, eid } = obj; 
    model.updateOne({ _id }, { $set: { status: 0 } }).then(() => {
        if (eid) {
            let newObj = { 
                eid: eid || '工号传递错误',
                cname: 'foodrecord',
                recordId: _id,
                date: new Date(),
                oper: '删除'
            };
            operRecordModel.insertMany(newObj);
        }
        resp.json({
            code: FOODRECORD_SUCCESS,
            msg: '指定信息已成功删除'
        })
    });
}

// 查询
function foodRecordInfo(obj, resp, model) {
    let { loc, size, page } = obj;
    // console.log(size);
    let pageSize = Number(size);
    let con = { loc, status: 1 };
    model.find(con).count().then(total => {
        model.find(con).limit(pageSize).skip((page - 1) * size).then(list => {
            resp.json({
                code: FOODRECORD_SUCCESS,
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

// 统计分析
function getConsumeCount(obj, resp, model) {
    model.aggregate([
        { $match : { status : 1 } },
        { $group : {_id : "$fname", num : {$sum : 1} } }
    ]).then(res => {
        resp.json({
            code: FOODRECORD_SUCCESS,
            msg: '查询统计记录成功',
            data: res // 是个数组
        });
    }, (err) => {
        console.log(err);
    });
}


module.exports = router;
