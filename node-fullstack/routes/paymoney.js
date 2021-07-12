var express = require('express');
var router = express.Router();
const fs = require('fs');
const AlipaySdk = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default;
const path = require('path');
const axios = require('axios');
const instance = axios.create({
    timeout: 7000
});

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/pay', function(req, res, next) {
    let outTradeNo = req.body.outTradeNo;
    const alipaySdk = new AlipaySdk({
        appId: '填写你的沙箱appId',
        privateKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/app_private_key.pem'), 'ascii'),
        alipayPublicKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/alipay_public_key.pem'), 'ascii'),
        signType: 'RSA2',
        gateway: 'https://openapi.alipaydev.com/gateway.do',
        timeout: 5000,
        camelcase: true
    });
    const formData = new AlipayFormData();
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get');
    // 支付宝服务器主动通知商户服务器里指定的页面http/https路径
    // formData.addField('notifyUrl', 'http://www.com/notify');
    formData.addField('appId', '填写你的沙箱appId');
    formData.addField('charset', 'utf-8');
    formData.addField('signType', 'RSA2');
    formData.addField('returnUrl', 'http://localhost:8083/room');
    // formData.addField('notifyUrl', 'http://localhost:8083/room');
    formData.addField('bizContent', {
        outTradeNo, // 订单号13位(20210529 + hhmmss多了一位)
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: '10', // 订单总金额
        subject: '订房', // 订单标题
        body: '商品详情', // 订单描述
    });
    alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData },
    ).then(result => {
        // console.log(result);
        return res.json({
            url: result
        });
    });
});

router.post('/api/member/queryOrderAlipay', (req, res) => {
    let outTradeNo = req.body.outTradeNo;
    const alipaySdk = new AlipaySdk({
        appId: '填写你的沙箱appId',
        privateKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/app_private_key.pem'), 'ascii'),
        alipayPublicKey: fs.readFileSync(path.join(__dirname, '../config/alipay_key/alipay_public_key.pem'), 'ascii'),
        signType: 'RSA2',
        gateway: 'https://openapi.alipaydev.com/gateway.do',
        timeout: 5000,
        camelcase: true
  });
    const formData = new AlipayFormData();
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get');
    // 支付宝服务器主动通知商户服务器里指定的页面http/https路径
    // formData.addField('notifyUrl', 'http://www.com/notify');
    formData.addField('appId', '填写你的沙箱appId');
    formData.addField('charset', 'utf-8');
    formData.addField('signType', 'RSA2');
    /* formData.addField('returnUrl', 'http://localhost:8083');
    formData.addField('notifyUrl', 'http://localhost:8083'); */
    formData.addField('bizContent', {
        outTradeNo, // 订单号
    });
    // 通过该接口主动查询订单状态
    alipaySdk.exec(
        'alipay.trade.query',
        {},
        { formData: formData },
        ).then(result => {
            instance({
                url: result,
                method: 'get'
            }).then(data => {
                let r = data.data.alipay_trade_query_response;
                if(r.code === '10000') { // 接口调用成功
                    switch(r.trade_status) {
                        case 'WAIT_BUYER_PAY':
                            res.send(
                                    {
                                    "success": true,
                                    "message": "success",
                                    "code": 200,
                                    "timestamp": (new Date()).getTime(),
                                    "result": {
                                        "status":0,
                                        "massage":'交易创建，等待买家付款'
                                    }
                                }
                            )
                            break;
                        case 'TRADE_CLOSED':
                            res.send(
                                    {
                                    "success": true,
                                    "message": "success",
                                    "code": 200,
                                    "timestamp": (new Date()).getTime(),
                                    "result": {
                                        "status":1,
                                        "massage":'未付款交易超时关闭，或支付完成后全额退款'
                                    }
                                }
                            )
                            break;
                        case 'TRADE_SUCCESS':
                            res.send(
                                {
                                    "success": true,
                                    "message": "success",
                                    "code": 200,
                                    "timestamp": (new Date()).getTime(),
                                    "result": {
                                        "status":2,
                                        "massage":'交易支付成功'
                                    }
                                }
                            )
                            break;
                        case 'TRADE_FINISHED':
                            res.send(
                                {
                                    "success": true,
                                    "message": "success",
                                    "code": 200,
                                    "timestamp": (new Date()).getTime(),
                                    "result": {
                                        "status":3,
                                        "massage":'交易结束，不可退款'
                                    }
                                }
                            )
                            break;
               }
                } else if(r.code === '40004') {
                    res.send('交易不存在');
                }
            })
            .catch(err => {
                res.json({
                    msg: '查询失败',
                    err
                });
           });
      })
})

module.exports = router;