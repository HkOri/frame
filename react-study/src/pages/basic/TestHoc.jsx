import React, { Component } from "react";

/* 
    高阶组件，实际上是一个函数，一个纯函数，所以也叫高阶函数
    作用：是一种组件业务逻辑复用的高级技巧(开发经验)
    原理：基于react组合特性
    高阶组件也被称为容器组件，被高阶组件修饰的称为UI组件
    注意：当一个UI组件同时被多个容器组件(高阶函数)修饰时，发现
        props有丢失的情况，可通过在组件上添加{...this.props}，注意这里的
        this.props指的是外层给予的props，像是父组件给的
*/

import test from "@/hoc/test";
import user from "@/hoc/user";
import theme from "@/hoc/theme";

@test
@user
@theme
export default class TestHoc extends Component {
    render() {
        console.log('this.props', this.props);
        return (
            <section style = {{ color: this.props.theme.color, background: this.props.theme.background }}>
                <h1>高阶组件</h1>
            </section>
        );
    }
}

// export default theme(test(user(TestHoc)));