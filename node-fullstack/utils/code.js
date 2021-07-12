// Code业务状态码

// 授权相关
const TOKEN_NO = 1001; // token无效
const TOKEN_ERROR_VERIFY = 1002; // token解析错误

// 用户相关
const USER_SUCCESS = 2000; // 用户操作成功
const user_no_login = 2001; // 未登录
const USER_LOGIN_ERROR = 2002; // 用户信息错误(账号密码不匹配)
const USER_LOGIN_NO = 2003; // 用户不存在
const USER_REGISTER_UNAME_NULL = 2004; // 注册用户名为空
const USER_REGISTER_ID_ERROR = 2005; // 注册用户的身份证号被占用
const USER_REGISTER_PWD_ERROR = 2006; // 用户注册两次密码不一致

// 业务
// 3001...
const GOOD_SUCCESS = 3000; // 商品信息操作成功
const GOOD_INSERT_ERROR = 3001; // 添加商品失败
const GOOD_DELETE_ERROR = 3002; // 删除商品失败
const GOOD_EDIT_ERROR = 3003; // 修改商品失败
const GOOD_SELECT_ERROR = 3004; // 查询商品失败

// 客房
const ROOM_SUCCESS = 4000;
const ROOM_INSERT_ERROR = 4001; // 添加客房失败
const ROOM_DELETE_ERROR = 4002; // 删加客房失败
const ROOM_EDIT_ERROR = 4003; // 修加客房失败
const ROOM_SELECT_ERROR = 4004; // 查加客房失败

// 客房类型表
const ROOMTYPE_SUCCESS = 5000;
const ROOMTYPE_INSERT_ERROR = 5001; // 添加客房失败
const ROOMTYPE_DELETE_ERROR = 5002; // 删加客房失败
const ROOMTYPE_EDIT_ERROR = 5003; // 修加客房失败
const ROOMTYPE_SELECT_ERROR = 5004; // 查加客房失败

// 食物表
const FOOD_SUCCESS = 6000;
const FOOD_INSERT_ERROR = 6001; // 添加食物信息失败
const FOOD_DELETE_ERROR = 6002; // 删除食物信息失败
const FOOD_EDIT_ERROR = 6003; // 修改食物信息失败
const FOOD_SELECT_ERROR = 6004; // 查询食物信息失败

// 酒店地区代码对应信息表
const HOTEL_SUCCESS = 7000;
const HOTEL_INSERT_ERROR = 7001; // 添加地区代码信息失败
const HOTEL_DELETE_ERROR = 7002; // 删除地区代码信息失败
const HOTEL_EDIT_ERROR = 7003; // 修改地区代码信息失败
const HOTEL_SELECT_ERROR = 7004; // 查询地区代码信息失败

// 客户表
const CUSTOMER_SUCCESS = 8000;
const CUSTOMER_INSERT_ERROR = 8001; // 添加客户信息失败
const CUSTOMER_DELETE_ERROR = 8002; // 删除客户信息失败
const CUSTOMER_EDIT_ERROR = 8003; // 修改客户信息失败
const CUSTOMER_SELECT_ERROR = 8004; // 查询客户信息失败

// 住房记录表
const FOODRECORD_SUCCESS = 9000;
const FOODRECORD_INSERT_ERROR = 9001; // 添加消费信息失败
const FOODRECORD_DELETE_ERROR = 9002; // 删除消费信息失败
const FOODRECORD_EDIT_ERROR = 9003; // 修改消费信息失败
const FOODRECORD_SELECT_ERROR = 9004; // 查询消费信息失败

// 订单信息表(真住房记录表)
const ORDER_SUCCESS = 10000;
const ORDER_INSERT_ERROR = 10001; // 添加订单信息失败
const ORDER_DELETE_ERROR = 10002; // 删除订单信息失败
const ORDER_EDIT_ERROR = 10003; // 修改订单信息失败
const ORDER_SELECT_ERROR = 10004; // 查询订单信息失败

// 操作记录信息表
const OPERRECORD_SUCCESS = 20000;

const UNKNOW_ERROR = 99999; // 发生未知错误

// 不能直接export，要改成CommonJs
module.exports = {
	TOKEN_NO,
	TOKEN_ERROR_VERIFY,
	USER_SUCCESS,
	user_no_login,
	USER_LOGIN_ERROR, // 用户信息错误(账号密码不匹配)
	USER_LOGIN_NO, // 用户不存在
	USER_REGISTER_UNAME_NULL, // 注册用户名为空
	USER_REGISTER_ID_ERROR, // 注册用户身份证号被占用
	USER_REGISTER_PWD_ERROR, // 用户注册两次密码不一致

	UNKNOW_ERROR,

	// 业务
	// 3001...
	GOOD_SUCCESS, // 商品信息操作成功
	GOOD_INSERT_ERROR, // 添加商品失败
	GOOD_DELETE_ERROR, // 删除商品失败
	GOOD_EDIT_ERROR, // 修改商品失败
	GOOD_SELECT_ERROR, // 查询商品失败


	ROOM_SUCCESS, // 客房信息操作成功
	ROOM_INSERT_ERROR, // 添加客房失败
	ROOM_DELETE_ERROR, // 删除客房失败
	ROOM_EDIT_ERROR, // 修改客房失败
	ROOM_SELECT_ERROR, // 查询客房失败
	
	ROOMTYPE_SUCCESS, // 客房类型信息操作成功
	ROOMTYPE_INSERT_ERROR, // 添加客房类型失败
	ROOMTYPE_DELETE_ERROR, // 删除客房类型失败
	ROOMTYPE_EDIT_ERROR, // 修改客房类型失败
	ROOMTYPE_SELECT_ERROR, // 查询客房类型失败

	FOOD_SUCCESS,
	FOOD_INSERT_ERROR, // 添加食物信息失败
	FOOD_DELETE_ERROR, // 删除食物信息失败
	FOOD_EDIT_ERROR, // 修改食物信息失败
	FOOD_SELECT_ERROR, // 查询食物信息失败

	HOTEL_SUCCESS,
	HOTEL_INSERT_ERROR, // 添加地区代码信息失败
	HOTEL_DELETE_ERROR, // 删除地区代码信息失败
	HOTEL_EDIT_ERROR, // 修改地区代码信息失败
	HOTEL_SELECT_ERROR, // 查询地区代码信息失败

	CUSTOMER_SUCCESS,
	CUSTOMER_INSERT_ERROR, // 添加客户信息失败
	CUSTOMER_DELETE_ERROR, // 删除客户信息失败
	CUSTOMER_EDIT_ERROR, // 修改客户信息失败
	CUSTOMER_SELECT_ERROR, // 查询客户信息失败

	FOODRECORD_SUCCESS,
	FOODRECORD_INSERT_ERROR, // 添加消费记录信息失败
	FOODRECORD_DELETE_ERROR, // 删除消费记录信息失败
	FOODRECORD_EDIT_ERROR, // 修改消费记录信息失败
	FOODRECORD_SELECT_ERROR, // 查询消费记录信息失败

	ORDER_SUCCESS,
	ORDER_INSERT_ERROR, // 添加订单信息失败
	ORDER_DELETE_ERROR, // 删除订单信息失败
	ORDER_EDIT_ERROR, // 修改订单信息失败
	ORDER_SELECT_ERROR, // 查询订单信息失败

	OPERRECORD_SUCCESS

}