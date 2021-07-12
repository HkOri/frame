import React, { Component } from 'react';

/* 
    状态state
    1、怎么定义state？只能在constructor这个生命周期中定义
    2、特点(单向绑定)：当state变化时，视图自动更新。但是反过来不行
    3、如何正确修改state？一定要使用this.setState()，否则不会触发diff运算监听不到数据变化，页面不更行
    4、this.setState()在默认情况下是异步的，但是在定时器中是同步的
    5、this.setState()虽然是异步任务，不过没有定时器那么异步，可能是微任务
    6、在同一个方法体中，如果执行多次this.setState()，react会进行合并操作，只触发一次diff运算
    7、在修改state时，如果新值与旧值无关，可以直接使用this.setState({},[fn])的方式
    8、在修改state时，如果新值由旧值计算而来，应该使用this.setState(fn1,[fn2])的方式
        ps：fn1必须要返回一个对象用于修改state
    9、state和props不要相互赋值
*/

class TestState extends Component {
    constructor(props) {
        super(props);
        // 只能在这里定义state
        this.state = {
            msg: 'hello state',
            foo: 'hello foo',
            count: 1
        }
    }
    changeMsg() {
        this.setState({
            msg: '修改state'
        });
        // 在默认情况下，this.setState()是异步的，所以这里还是旧值
        console.log(this.state.msg); 


        // 但是在定时器的内部，this.setState()却是同步的
        setTimeout(() => {
           this.setState({ msg: '测试定时器内部的setState是否同步' });
           console.log(this.state.msg); 
        }, 0);


        // 不用定时器时如何拿到state的新值
        this.setState({ msg: '不用定时器拿到state的新值' }, () => {
            // 在这个回调函数中，state已经更新完成 
            console.log(this.state.msg);
        });
    }
    changeFoo() {
        // react中多次执行this.setState()时，会被合并执行，所以下面这三行代码只会执行一次diff运算
        this.setState({ foo: 'heloo111' });
        this.setState({ foo: 'heloo222', msg: 'alt' });
        this.setState({ foo: 'heloo333' });
    }
    changeCount(type) {
        if (type === 'add') {
            // 如果state的新值是由旧值计算而来，应该用这种方式，官网也有说明
            // 这个形参state必是上一帧的旧值
            this.setState((state, props) => {
                return ({ count: state.count + 1 });
            });
        }
        else {
            this.setState((state) => ({ count: state.count - 1 }));
        }
    }
    render() {
        let { msg, foo, count } = this.state;
        return (
            <div>
                <h1>测试状态state</h1>
                <h2>{ msg }</h2>
                <button onClick = { () => this.changeMsg() }>修改msg</button>
                <h2>{ foo }</h2>
                <button onClick = { () => this.changeFoo() }>修改foo</button>
                <h3>count: { count }</h3>
                <button onClick = { () => this.changeCount('add') }>加</button>
                <button onClick = { () => this.changeCount('sub') }>减</button>
            </div>
        );
    }
}

export default TestState;