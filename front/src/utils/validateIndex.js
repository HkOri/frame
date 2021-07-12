export function validateNickname(rule, value, callback) {
    if (!value) {
        return callback(new Error('昵称不能为空'));
    }
    setTimeout(() => {
        if (value.length > 9) {
            callback(new Error('昵称长度不能超过9，请检查你的输入'));
        } else {
            callback();
        }
    }, 1000);
}
export function validatePwd(rule, value, callback) {
    if (value === '') {
        callback(new Error('密码不能为空'));
    } else {
        let registerPwdStr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
        if (!(registerPwdStr.test(value))) {
            callback(new Error('8~10位包含大小写字母和数字'))
        }
        else {
            callback();
        }
    }
}
export function validateSelfPwd(rule, value, callback) {
    if (value !== '') {
        let registerPwdStr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
        if (!(registerPwdStr.test(value))) {
            callback(new Error('8~10位包含大小写字母和数字'))
        }
        else {
            callback();
        }
    }
    else {
        callback();
    }
}
export function validatePhone(rule, value, callback) {
    if (value === '') {
        callback(new Error('手机号码不能为空'));
    } else {
        let registerTelStr = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!(registerTelStr.test(value))) {
            callback(new Error('手机号码格式错误'))
        }
        else {
            callback();
        }
    }
}
export function validateMail(rule, value, callback) {
    let pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if (pattern.test(value)) {
        callback();
    }
    else {
        callback(new Error('请正确输入邮箱'));
    }
}