// 将日期转为YYMMDDhhmmss的格式
function trans(num) {
    let len = num.toString().length;
    if (len > 1) {
        return num.toString().slice(len - 2);
    }
    else {
        return '0' + num;
    }
}
module.exports = trans;