import React, { Component } from 'react';

/* 
    上下文
    作用：用于在react组件树中进行数据传输，避免使用链式的props
    创建上下文：React.createContext()创建，使用<Provider value = {}>向react组件中注入上下文数据
        在具体的组件中使用<Consumer>消费使用上下文数据。
    上下文数据只能单向传输，就像props一样，像是瀑布一样
*/
import ThemeCtx from '@/utils/theme';

/* 
// 第一种写法
class TestContext extends Component {
    render() {
        console.log(this.context);
        return (
            <section>
                <h1>上下文</h1>
            </section>
        );
    }
}
// 作用：把上下文添加到this.context中去
TestContext.contextType = ThemeCtx;
export default TestContext; 
*/

class TestContext extends Component {
    render() {
        console.log('子组件访问上下文', this.context);
        return (
            <ThemeCtx.Consumer>
            {
                (value) => (
                    <section style = {{ color: value.color, background: value.background }}>
                        <h1>测试上下文</h1>
                    </section>
                )
            }
            </ThemeCtx.Consumer>
        );
    }
}
export default TestContext;