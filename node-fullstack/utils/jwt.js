// 引入Json Web Token
const jwt = require('jsonwebtoken');

const code = require('./code');

let {
	TOKEN_NO, // 没有token
	TOKEN_ERROR_VERIFY // token解析错误
} = code;

/*
 * @param
 * @return 		Token
 * @description 生成token
 */
function createToken(data) {
	return jwt.sign(
		{
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3, // 单位是秒，这里是设置token有效时间为3天小时
			data // 加密的数据
		},
		'hk' // 加密用的密钥
	);
}

/*
 * @param
 * @return
 * @description 解析token
 */
function verifyToken(req, resp) {
	return new Promise((resolve, reject) => {
		const token = req.headers.authorization;
		// const token = req.body.token; // token不应该存在cookie中
		if (!token) {
			resp.json({
				code: TOKEN_NO,
				msg: '身份认证信息(Token不存在)'
			});
			resolve({
				code: TOKEN_NO,
				msg: 'token not exit'
			});
		} else {
			try {
				const decoded = jwt.verify(token, 'hk');
				// console.log(decoded);
				resolve(decoded.data);
			} catch (error) {
				// 返回给后台管理，配合做权限管理
				resp.json({
					code: TOKEN_ERROR_VERIFY,
					msg: 'Token解析错误，或许是因为token有效时间已过'
				});
				reject({
					code: TOKEN_ERROR_VERIFY,
					msg: 'Token解析错误，或许是因为token有效时间已过'
				});
			}
		}
	});
}

module.exports = {
	createToken,
	verifyToken
};
