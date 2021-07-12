var express = require('express');
var router = express.Router();


// 导入operRecordModel
const operRecordModel = require('../model/operRecordModel');

// 引入token操作
const jwt = require('../utils/jwt');
// 引入业务状态码
const code = require('../utils/code');
let {
	OPERRECORD_SUCCESS,
    UNKNOW_ERROR
} = code;


// http://localhost:3000/api/v0/operrecord/info
router.get('/info', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        operInfo(req.query, res, operRecordModel);
	}, (err) => {
        console.log(err);
    });
});

// 查询所有
function operInfo(obj, resp, model) {
    model.find({}).then(list => {
        resp.json({
            code: OPERRECORD_SUCCESS,
            msg: '查询成功',
            data: list
        });
    }, (err) => {
        console.log(err);
    });
}

module.exports = router;
