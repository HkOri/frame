var express = require('express');
var router = express.Router();

// 导入foodModel
const foodModel = require('../model/foodModel');

// 引入token操作
const jwt = require('../utils/jwt');
// 引入业务状态码
const code = require('../utils/code');
let {
	FOOD_SUCCESS,
	FOOD_INSERT_ERROR, // 添加食物信息失败
	FOOD_DELETE_ERROR, // 删除食物信息失败
	FOOD_EDIT_ERROR, // 修改食物信息失败
	FOOD_SELECT_ERROR, // 查询食物信息失败
    UNKNOW_ERROR
} = code;


// http://localhost:3000/api/v0/foods/update
router.post('/update', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        foodUpdate(req.body, res, foodModel);
	}, (err) => {
        console.log(err);
    });
});

// http://localhost:3000/api/v0/foods/del
router.post('/del', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        foodDel(req.body, res, foodModel);
	}, (err) => {
        console.log(err);
    });
});

// http://localhost:3000/api/v0/foods/info
router.get('/info', function (req, res, next) {
    jwt.verifyToken(req, res).then(() => {
        foodInfo(req.query, res, foodModel);
	}, (err) => {
        console.log(err);
    });
});

/*
 * @param       req.body
 * @param       response
 * @param       model
 * @return
 * @description 客房编辑和新增的接口
 */
function foodUpdate(obj, resp, model) {
    // 如果是创建
    // if (obj.oper === 'create') {
    if (!obj._id) {
        // 根据地区和食品名字是否已经存在
        model.findOne({ name: obj.name, loc: obj.loc, status: 1 }, function (err, adventure) {
            // 没有出现意外错误时
            if (!err) {
                // console.log(adventure);
                // 如果集合中已经有这条数据
                if (adventure) {
                    return resp.json({
                        code: FOOD_INSERT_ERROR,
                        msg: '该地区已有目标食物信息'
                    });
                } else {
                    // 如果没有这条数据则将当前新的房间信息存入集合并提示
                    let { 
                        name, 
                        loc,
                        img,
                        price,
                        discount,
                        desc,
                        count,
                        sale
                    } = obj;
                    let food = {
                        name, 
                        loc,
                        img,
                        price,
                        discount,
                        desc,
                        count,
                        sale,
                        status: 1 
                    };
                    model.insertMany(food).then(result => {
                        if (result) {
                            return resp.json({
                                code: FOOD_SUCCESS,
                                msg: '食物信息添加成功'
                            });
                        }
                    });
                }
            } else {
                console.log(err);
                return resp.json({
                    code: UNKNOW_ERROR,
                    msg: '在新增食物查询是否有占位时发生未知错误'
                });
            }
        });
    
    }
    else {
        // 编辑食物信息(根据食物名和地区更新)
        let { 
            name, 
            loc,
            img,
            price,
            discount,
            desc,
            count,
            sale
        } = obj;
        let food = {
            name, 
            loc,
            img,
            price,
            discount,
            desc,
            count,
            sale,
            status: 1 
        };
        // 更新一个东西肯定要能先看到，所以可以不加status，查才需要
        model.updateOne({ name, loc }, { $set: food }).then(() => {
            resp.json({ 
                code: FOOD_SUCCESS,
                msg: '食物信息编辑成功'
            });
        });

    }

}


// 删除
function foodDel(obj, resp, model) {
    // 接受入参
    let { name, loc } = obj; 
    model.updateOne({ name, loc }, { $set: { status: 0 } }).then(() => {
        resp.json({
            code: FOOD_SUCCESS,
            msg: '指定食品信息已成功删除'
        })
    });
}

// 查询食物信息(只能查询到同地区的食物信息)
function foodInfo(obj, resp, model) {
    let { loc } = obj;
    model.find({ 'loc': Number(loc), status: 1 }).then(list => {
        resp.json({
            code: FOOD_SUCCESS,
            msg: '查询成功',
            data: list
        })
    });
}
module.exports = router;
