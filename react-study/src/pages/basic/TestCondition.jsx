/* 
    条件渲染、动态样式
    注意：每当执行this.setState()时，都会触发diff运算，diff运算会找出虚拟dom中的脏节点，
    然后自动执行render()来更新视图。值的特别注意的是，render()只是更新脏节点对应的DOM节点。
*/
import React, { Component } from 'react';

export default class TestCondition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bool: false,
            bol: false,
            index: 1,
            color: '', 
            rdColor: '#ff0267'
        }
    }
    // 单一元素的显示和隐藏
    changeBool() {
        this.setState(state => ({ bool: !state.bool }));
    }
    // 两个元素的显示和隐藏
    changeBol() {
        this.setState(state => ({ bol: !state.bol }));
    }
    // 多个元素的显示和隐藏
    changeRandom() {
        this.setState({ index:  Math.floor(Math.random() * 3) + 1 });
    }
    // 这种用途的方法称之为自定义的视图渲染方法
    codeRowRender() {
        let { index } = this.state;
        let res = null;
        switch(index) {
            case 1:
                res = <p>我是第一行代码</p>;
                break;
            case 2: 
                res = <p>我是第二行代码</p>;
                break;
            case 3:
                res = <p>我是第三行代码</p>;
                break;
            default: 
                break;
        }
        return res;
    }
    changeColor() {
        let colors = ['red', 'lightgreen', 'lightblue'];
        this.setState({ color: colors[Math.floor(Math.random() * 3)] });
    }
    changeRdColor(e) {
        // console.log(e.target.value);
        this.setState({ rdColor: e.target.value });
    }
    render() {
        let { bool, bol, color, rdColor } = this.state;
        return (
            <section>
                <h1>条件渲染 & 动态样式</h1>
                { bool && <p>可有可无的标签</p> }
                <button onClick = { () => this.changeBool() }>切换显示隐藏</button>
                {
                    bol ? <p>白中有黑</p> : <p><span>黑中有白</span></p>
                }
                <button onClick = { () => this.changeBol() }>切换黑天白夜</button>
                { this.codeRowRender() }
                <button onClick = { () => this.changeRandom() }>随机切换</button>
                {/* 上面三中显示隐藏类似于vue的v-if，是真的在DOM结构中移除或增加节点 */}


                {/* vue中的v-show是通过css来实现显示和隐藏的。react中可以通过给css属性display设置一个变量来实现v-show */}
                <article className = 'lang'>
                    <h3 className = { `rect ${ color }` }>小毛驴</h3>
                    <button onClick = { () => this.changeColor() }>开始变色</button>
                    <h2 style = { { color: rdColor, fontSize: '20px' } }>我是一只呆呆的变色龙</h2>
                    <input type = 'color' onChange = { (e) => this.changeRdColor(e) }></input>
                </article>
            </section>
        );
    }
}