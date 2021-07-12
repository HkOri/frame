import React, { Component } from "react";
/* 
    数据类型检查
    像是vue里面传值时候接收组件中写的props: { count: { type: Number, required: false, default: 1 } }
*/

import PropTypes from 'prop-types';

class Child extends Component {
    render() {
        let { count } = this.props;
        return (
            <>
                child
                <p>{ count }</p>
            </>
        );
    }
}
// 对自定义属性(事件)执行类型检查
Child.propTypes = {
    count: PropTypes.number.isRequired, // 数字且必填
    msg: PropTypes.oneOf(['车轮', '历史']) // 只能是两个值中的某一个
}

export default class TestTypes extends Component {
    render() {
        return (
            <section>
                <h1>数据类型检查</h1>
                <Child count = {1} />
            </section>
        );
    }
}