import React, { Component } from 'react';
/* 
    父子组件通信
    1、父组件向子组件传值，使用自定义属性
    2、子组件向父组件传值，使用自定义事件
    3、无论是自定义属性还是自定义事件，都是在props中，这也是之前为什么说props强大的原因
*/

const Child = props => {
    console.log(props);
    function handleClick() {
        props.onChange('张三');
    }
    return (
        <section>
            <h4>我是Child子组件 - { props.count }</h4>
            <button onClick = { handleClick }>改变count</button>
        </section>
    );
}

class TestCommunication1 extends Component {
    constructor(props) {
        super(props); // 这里的props是由app传过来的
        // 声明式变量都定义在这里。ps：从官网来看，只有参与渲染的数据流才应该定义在state中
        // 特点(与vue不同的是react是单向绑定)：当声明式变量发生变化时，视图自动更新；
        this.state = {
            count: '100'
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(str) {
        console.log(str);
        this.setState({ count: this.state.count + 1 });
    }
    render() {
        let { count } = this.state;
        return (
            <div>
                <h3>测试父子组件通信</h3>
                {/* 这下面写Child()倒是也行 */}
                {/* 
                        count是自定义属性，onChange是自定义事件，和vue类似 ，
                    不过不同的是，vue中是自定义事件需要通过this.$emit()触发
                    而react还是通过props
                        另外，react中规定自定义事件必须以"on"开头
                */}
                { <Child count = { count } onChange = { this.handleClick }  /> }
            </div>
        );
    }
}

export default TestCommunication1;