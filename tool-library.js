/* 
    @param {string}
    @return {number}
    @time 2020-11-10 09:45
    @description 返回传入字符串的长度
*/
function getStrLength(str) {
    let result = str.match(/[\s\S]/gu);
    return result?result.length:0;
}

/* 
    @param regex
    @param str
    @return {string[]}
    @time 2020-11-10 12:40
    @description 提取字符串的token(词元)
*/
function getToken(TOKEN_REGEX,str) {
    let result = [];
    let match;
    while(match = TOKEN_REGEX.exec(str)) {
        result.push(match[1]);
    }
    return result;
}

/* 
    @param {node}
    @param {attribute}
    @param {string}
    @return {string}
    @time 2020-11-17 20:57
    @description 获取参数节点的最终样式
*/
function getStyle(ele,attr,str=null){
    // IE浏览器
    if(ele.currentStyle){
        return ele.currentStyle[attr];
    }
    else{
        return getComputedStyle(ele,str)[attr];
    }
}

/* 
    @param {node}
    @return {node}
    @time 2020-11-17 20:58
    @descrption 获取参数节点的下一个兄弟元素节点
*/
function getNextNode(ele){
    if (ele.nextElementSibling || ele.nextElementSibling == undefined){
        return ele.nextElementSibling;
    } 
    else{
        return ele.nextSibling;
    }
}

/* 
    @param {node}
    @return {node}
    @time 2020-11-17 21:06
    @description 获取参数节点的前一个兄弟元素节点
*/
function getPreNode(ele){
    if (ele.previousElementSibling || ele.previousElementSibling == undefined){
        return ele.previousElementSibling;
    } 
    else{
        return ele.previousSibling;
    }
}

/* 
    @param {node}
    @return {node}
    @time 2020-12-03 20:58
    @description 兼容性获取节点的最后一个元素节点
*/
function getLastNode(ele) {
    if(ele.lastElementChild) {
        return ele.lastElementChild;
    }
    else {
        return ele.lastChild; 
    }
}

/* 
    @param {node}
    @return {node}
    @time 2020-12-03 21:00
    @description 兼容性获取节点的第一个元素节点
*/
function getFirstNode(ele) {
    if(ele.firstElementChild) {
        return ele.firstElementChild;
    }
    else {
        return ele.firstChild; 
    }
}

/* 
    @param {number}
    @param {number}
    @return {number}
    @time 2020-11-17 21:10
    @description 生成区间随机整数
*/
function randomInt(min,max){
    return Math.round(Math.random()*(max-min))+min;
}

/* 
    @return {string}
    @time 2020-11-17 21:15
    @description 生成随机的十六进制颜色值 带#的
*/
function randomColor(){
    let str = '0123456789abcdef',col = '#';
    for(let i=0;i<6;i++){
        let index = randomInt(0,15);
        col += str[index];
    }
    return col;
}

/* 
    @param {number}
    @return {string}
    @time 2020-11-17 21:44
    @description 生辰指定位数的随机验证码(数字、大小写字母)
*/
function randomCode(num){
    let arr = new Array(num).fill(1);
    for(let i in arr){
        do{
            let ascii = randomInt(48,122);
        }while((ascii > 57 && ascii < 65) || (ascii > 90 && ascii < 97));
        arr[i] = String.fromCharCode(ascii);
    }
    return arr.join('');
}

/*  @param {node}
    @param {string}
    @param {function}
    @param {boolean}
    @time 220-11-11 20:33
    @description 添加事件兼容性解决方案
*/
function addEvent(element,eventName,fn,bool=false){
    //判断当前浏览器是否支持addEventListener方法
    if(element.addEventListener){
        element.addEventListener(eventName,fn,bool)
    }
    //兼容ie7、8
    else if(element.attachEvent){
        element.attachEvent('on'+eventName,fn,bool);
    }
    else{
        element['on'+eventName] = fn;
    }
}


/*  @param {node}
    @param {string}
    @param {function}
    @time 220-11-11 20:33
    @description 删除事件兼容性解决方案
*/
function removeEvent(element,eventName,fn){
    //判断当前浏览器是否支持removeEventListener方法
    if(element.removeEventListener){
        element.removeEventListener(eventName,fn)
    }
    //兼容ie7、8
    else if(element.detachEvent){
        element.detachEvent('on'+eventName,fn);
    }
    else{
        element['on'+eventName] = null;
    }
}

/* 
    @param {number}
    @param {number}
    @param {number}
    @return {boolean}
    @time 2020-11-18 08:19
    @description 为浮点数运算提供了一个误差部署函数，默认误差范围为2的-50次方
    即只要两个浮点数之差在这个范围之间，就认为两数相等
*/
function withinErrorMargin(left,right,num=2){
    return Math.abs(left-right) < Number.EPSILON * Math.pow(2,num);
}

/* 
    @param {node}
    @return {number}
    @time 2020-12-18 08:33
    @description 返回传入参数距离页面左边的距离
*/
function getElementLeft(element) {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}

/* 
    @param {node}
    @return {number}
    @time 2020-12-18 08:33
    @description 返回传入参数距离页面顶部的距离
*/
function getElementTop(element) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}

/* 
    @param {number}
    @time 2020-12-26 14:47
    @description 判断传入参数是否为NaN，利用NaN不等于自己的特性
*/
function isNotNumber(value) {
    return value !== value;
}

/* 
    @parma {Array}
    @time 2020-12-26 15:02
    @description 数组去重
*/
function arrUnique(arr) {
    let count = 0;
    // 长度只有1，直接返回当前的拷贝
    if (arr.length <= 1) {
        return arr.slice(0);
    }
    let aResult = [];
    for (let i = 0, l = arr.length; i < l; i++) {
        if (!_fExit(aResult, arr[i])) {
            aResult.push(arr[i]);
        }
    }
    return aResult;
    // 判断是否重复
    function _fExit(aTamp, o) {
        if (aTamp.length === 0) {
            return false;
        }
        for (let i = 0, l = aTamp.length; i < l; i++) {
            if (aTamp[i] === o) {
                return true;
            }
            // 针对NaN
            if (aTamp[i] !== o && isNotNumber(o) && count === 0) {
                count += 1;
                return false;
            }
            if (aTamp[i] !== o && isNotNumber(o) && count !== 0) {
                return true;
            }
        }
        return false;
    }
}

/* 
    @param {object}
    @time 2020-12-26 15:25
    @description Js对象的深拷贝
*/
function deepClone(obj) {
    let buf;
    if (obj instanceof Array) {
        buf = [];
        let i = obj.length;
        while(i--) {
            buf[i] = deepClone(obj[i])
        }
        return buf;
    }   
    else if (obj instanceof Object) {
        buf = {};
        for (let k in obj) {
            buf[k] = deepClone(obj[k]);
        }
        return buf;
    }
    else {
        return obj;
    }
}