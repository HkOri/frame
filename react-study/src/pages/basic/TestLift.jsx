import React, { Component } from 'react';

/* 
    状态提升
    当一个组件要用到其兄弟组件的数据时，可以将这个数据上升到二者共同的父组件
*/

export default class TestLift extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }
    addHandle() {
        this.setState(state => ( { count: state.count + 1 }));
    }
    render() {
        return (
            <section>
                <h1>状态提升</h1>
                <p>{ this.state.count }</p>
                <button onClick = { () => this.addHandle() }>自增</button>
                <Child1/>
                <Child2/>
            </section>
        );
    }
}


const Child1 = props => (
    <section>
        <p>Child-1</p>
    </section>
)

class Child2 extends Component {
    render() {
        return (
            <section>
                <p>Child-2</p>
            </section>
        );
    }
}