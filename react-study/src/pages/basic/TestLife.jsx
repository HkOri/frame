import React, { Component } from "react";

/* 
    生命周期: 三个阶段(装载阶段，更新阶段，卸载阶段)
*/

export default class TestLife extends Component {
    // 构造器是组件类实例化时第一个执行的函数
    // 再次ps：不要让props和state互相赋值
    // 同样这里也不能setState，因此此时dom都还没准备
    constructor(props) {
        super(props);
        this.state = {
            a: 1
        }
        console.log('-----------constructor');
    }
    /* 
        调接口，开启定时器、长连接、DOM操作等等
        只执行一次
    */
    componentDidMount() {
        console.log('-------------相当于vue中的mounted，视图初始化完成');
    }

    // 更新阶段，相当于vue的updated()，表示视图更新已完成，所以初次渲染不执行
    componentDidUpdate() {
        console.log('-------------componentDidUpdate');
    }
    // 这个声明周期函数表示一个“开关”，用于控制组件的更新
    // 必须返回一个布尔值，如果为false，页面不更新但是声明式变量还是会变化的
    // 在类组件中，只有一个作用：性能优化。抽离出不参与视图渲染的变量
    shouldComponentUpdate(nextProps, nextState) {
        console.log('-----------------shouldComponentUpdate');
        return true;
    }


    /* 
        销毁阶段，相当于vue的beforeDestroy()
        一般清除定时器、清除长连接、清除缓存(localStorage等等)
    */
    componentWillUnmount() {

    }

    add() {
        this.setState(state => ({ a: state.a + 1 }));
    }
    // render()也可以说是一个生命周期，且是必须的，一定要有返回值(JSX元素)
    render() {
        console.log('------------render');
        return (
            <section>
                <h2>生命周期</h2>
                <h3>{ this.state.a }</h3>
                <button onClick = {() => this.add()}>增加</button>
            </section>
        );
    }
}