/* -----------客房类型-------------- */
// 验证客房类型标志
// 验证标志，6位数字
export function validateTid(rule, value, callback) {
    let num = /^\d{6}$/;
    if (!(num.test(value))) {
        callback(new Error('请输入6位数字表示类型标志'));
    }
    else {
        callback();
    }
}
// 验证折扣信息，0~2位小数
export function validateDecimal(rule, value, callback) {
    let num = /^[0-9]+(\.[0-9]{0,2})?$/;
    if (!(num.test(value))) {
        callback(new Error('请输入折扣信息(0.00~1.00)'));
    }
    else {
        callback();
    }
}
// 验证客房类型(长度为3-6的任意字符)
export function validateType(rule, value, callback)  {
    let t = /^.{3,6}$/;
    if (!(t.test(value))) {
        callback(new Error('请输入3到6个字符'));
    }
    else {
        callback();
    }
}
// 验证客房描述信息
export function validateDesc(rule, value, callback) {
    let t = /^.{3,12}$/;
    if (!(t.test(value))) {
        callback(new Error('请输入3到12个字符描述信息'));
    }
    else {
        callback();
    }
}

/* ---------员工----------- */
export function validateName(rule, value, callback) {
    let name = /^[\u4e00-\u9fa5]{2,15}$/;
    if (!(name.test(value))) {
        callback(new Error('请输入名字(2~15个中文字符)'));
    }
    else {
        callback();
    }
}




// 验证字符类
export function validateZh(rule, value, callback)  {
    if (value === '') {
        callback(new Error('不能为空'));
    }
    else {
        callback();
    }
}
// 验证日期
export function validateDate(rule, value, callback) {
    if (value === '') {
        callback(new Error('日期不能为空'));
    }
    else {
        callback();
    }
}
// 验证身份证号
export function validateIdCard(rule, value, callback) {
    let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    let _IDre15 =  /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
    if ((_IDRe18.test(value) || _IDre15.test(value))) {
        callback();
    }
    else {
        callback(new Error('身份证号码格式错误'))
    }
}
// 验证数字类
export function validateNumber(rule, value, callback) {
    if (value === '') {
        callback(new Error('请填写'));
    }
    else {
        let num = /^[0-9]*$/;
        if (!(num.test(value))) {
            callback(new Error('请填写正确的整数'));
        }
        else {
            callback();
        }
    }
}

// 验证权限
export function validateLevel(rule, value, callback) {
    if (value === '') {
        callback(new Error('权限不能为空'));
    }
    else {
        callback();
    }
}
// 验证手机号码
export function validatePhone(rule, value, callback) {
    if (value === '') {
        callback(new Error('手机号码不能为空'));
    } else {
        let telStr = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!(telStr.test(value))) {
            callback(new Error('手机号码格式错误'))
        }
        else {
            callback();
        }
    }
}

// 验证邮箱
export function validateMail(rule, value, callback) {
    let pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (pattern.test(value)) {
        callback();
    }
    else {
        callback(new Error('请正确输入邮箱'));
    }
}