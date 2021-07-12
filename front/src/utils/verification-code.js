//验证码生成

function randomInt(min,max){
    return Math.round(Math.random() * (max - min)) + min;
}

function randomColor(){
    let str = '0123456789abcdef',col = '#';
    for(let i = 0;i < 6; i++){
        let index = randomInt(0,15);
        col += str[index];
    }
    return col;
}

function draw(veriShowNum, veriCanvas){
    /* let canvas_clientWidth = veriCanvas.clientWidth;
    let canvas_clientHeight = veriCanvas.clientHeight; */
    // 创建画笔
    let ctx = veriCanvas.getContext("2d");
    // 清空画布
    ctx.clearRect(0, 0, 132, 42);
    // 验证码字符
    let str = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    let astr = str.split(',');
    let sLength = astr.length;
    // 设置画笔随机颜色
    ctx.fillStyle = randomColor();
    // 6个字符
    for (let i = 0; i <= 5; i++) {
        let j = Math.floor(Math.random() * sLength);//随机索引
        // 0-30随机弧度
        let deg = Math.random() * 30 / 180 * Math.PI;
        // 获取随机字符
        let letter = astr[j];
        // 存放生成的验证码字符
        veriShowNum[i] = letter//验证码字符数组
        let x = 5 + i * 20;//x坐标
        let y = 20 + Math.random() * 8//y坐标
        // 设置字符样式 位移 旋转角度 颜色 文字 样式开始位置
        ctx.font='bolder 30px 微软雅黑';
        // 重新映射画布的(0,0)位置
        ctx.translate(x, y);
        // 围绕(0,0)顺时针旋转一定角度
        ctx.rotate(deg);
        // 在(0,0)处绘制字符
        ctx.fillText(letter,0,0);
        ctx.rotate(-deg);
        ctx.translate(-x,-y);
    }
    // 绘制线条
    /* ctx.strokeStyle='#E5AB63';
    ctx.lineWidth = 2;
    for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        // 设置曲线起点
        ctx.moveTo(Math.random()*2-1,Math.random()*canvas_clientHeight);
        let tmpWidthOne = 0,
            tmpHeightOne = 0,
            tmpWidthTwo = 0,
            tmpHeightTwo = 0,
            pieces = 2,
            onePieceWidth = canvas_clientWidth/pieces,
            onePieceHeight = canvas_clientHeight/pieces;
            // 第一个控制点
            tmpWidthOne = randomInt(0,onePieceWidth);
            tmpHeightOne = randomInt(0,onePieceHeight);
            // 第二个控制点
            tmpWidthTwo = randomInt(onePieceWidth,pieces*onePieceWidth);
            tmpHeightTwo = randomInt(onePieceHeight,pieces*onePieceHeight);
            // 三次贝塞尔曲线
            ctx.bezierCurveTo(tmpWidthOne,tmpHeightOne,tmpWidthTwo,tmpHeightTwo,canvas_clientWidth,Math.random()*canvas_clientHeight);
        // 绘制曲线
        ctx.stroke();               
    } */
}
module.exports = draw;