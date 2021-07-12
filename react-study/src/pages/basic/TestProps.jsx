import React from 'react'; // 为了定义react组件，为了支持JSX语法
// 两种定义组件的方式
/* 
    1、class类组件：有状态(state)
    2、函数式组件：无状态组件
*/


// props：在react中，props非常强大(比vue里面的作用更强)，它是父子组件之间的纽带
// props和state之间，原则上不能相互赋值
// props用于从父组件向子组件传值，可以传递任何数据或React元素，单向流动


/* 
    类组件
    特点：
        1、有生命周期、this、ref、上下文等特性
        2、有一个必须的生命周期是render()，返回一个JSX对象
        3、类组件相对于函数式组件，类组件的性能(渲染速度)稍差
*/
class TestPropsOne extends React.Component {
    constructor(props) {
        // 调用父类的构造器，即在这里调用React.Component里面的构造器
        super(props); // 必须是super的第一行代码
        this.state = {
            count: 1
        };
    }
    render() {
        // do something
        console.log(this.props);
        let {
            msg,
            abc, 
            bool,
            child, 
            arr
        } = this.props;
        // 返回一个JSX对象
        return (
            <div>
                <h1>测试Props，类组件---1</h1>
                <h2>{ msg }</h2>
                <p>{  abc }</p>
                { !bool && <div>should I display</div> }
                { child }
                { arr }
            </div>
            /* react中除了使用div表示根结点之外还可以使用<>&</>，这组是<React.Fragment></React.Fragment>的语法糖 */
            // 当然，也不一定非得用div包裹，用section也可以
        );
    }
}


/* 
    函数式组件组件
    特点：
        1、没有生命周期、state(状态)、this、ref、上下文等等
        2、必须有return，并且必须返回的是react元素
        3、相对于类组件，渲染速度稍好
*/
function TestPropsTwo(props) {
    // do something
    console.log(this, props); // undefined和父组件传过来的值
    let { msg, abc, bool, arr, child } = props;
    return (
        <div>
            <h1>无状态组件--2</h1>
            <p>{ msg }</p>
            <p>{  abc }</p>
            { !bool && <div>should I display</div> }
            { child }
            { arr }
        </div>
    );
}
// 箭头函数后面如果直接是()，那么()就是返回值。如果是{},那么需要return语句返回
// 前者不能在()里面做数据处理，{}可以做数据处理
const TestPropsThree = (props) => (
    <div>
        <span>箭头函数式无状态组件</span>
        <p>{ props.msg }</p>
        <p>{  props.abc }</p>
        { !props.bool && <div>should I display</div> }
        { props.child }
        { props.arr }    
    </div>
);

// let { ...c } = { a: 1, b: 2 };
const TestPropsFour = ({ msg, abc, bool, child, arr }) => (
    <div>
        <span>箭头函数式无状态组件</span>
        <p>{ msg }</p>
        <p>{  abc }</p>
        { !bool && <div>should I display</div> }
        { child }
        { arr }    
    </div>
);

export default TestPropsOne;