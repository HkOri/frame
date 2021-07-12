import React, { Component } from 'react';
/* 
    react事件绑定
    1、在react中，所有事件(包括自定义事件)都以'on'开头，
    小驼峰命名：onClick/onKeyUp/onKeyDown/onKeyPress/onMouseEnter
*/

class TestEvent extends Component {
    // 使用es5的方式绑定事件处理器，事件对象永远都是最后一个参数
    clickHandle1(arg, e) {
        console.log('点击1触发了');
        console.log('this', this);
        console.log('arg', arg);
        console.log('e', e);
        e.stopPropagation();
    }
    // 使用es6的方式绑定事件处理器，事件对象需要显式传参
    clickHandle2(e, arg, ...rest) {
        console.log('点击2触发了');
        console.log('this', this);
        console.log('event', e);
        console.log('arg', arg);
        console.log('rest', rest);
    }
    // 测试冒泡
    click() {
        console.log('div clicked');
    }
    handleHref(e) {
        e.preventDefault();
    }
    // 监听回车事件
    handleKeyUp(e) {
        if (e.keyCode === 13) {
            console.log(e.target.value);
        }
    }
    render() {
        /* 
            箭头函数的this指定其定义时上下文的this，而普通函数的this指向普通函数的调用者
            const xxx = () => {
                this.clickHandle2();
            }
        */
        return (
            <div 
                onClick = { this.click.bind(this) }
                style = { { color: 'brown', backgroundColor: 'lightblue', border: '1px solid #ccc' } }
            >
                <h1>事件绑定</h1>
                <button onClick = { this.clickHandle1.bind(this, 1) }>点击1</button>
                <button onClick = { (e) => this.clickHandle2(e, 2, '张三', [1,2,3]) }>点击2</button>
                <a href = "https://www.baidu.com" onClick = { this.handleHref }>百度</a>
                <input type = "text" onKeyUp = { this.handleKeyUp }></input>
            </div>
        );
    }
}

export default TestEvent;