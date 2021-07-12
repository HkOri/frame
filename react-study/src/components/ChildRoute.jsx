import React from 'react';
import { withRouter, useParams, useLocation } from 'react-router';

@withRouter/* 第二种写法，后面需要紧跟class，因为装饰器是装饰class */
class ChildRoute1 extends React.Component {
    render() {
        console.log('props', this.props);
        return (
            <div>
                这个组件没有被Route直接包裹
                上一级的TestRoute被Route直接包裹
            </div>
        );
    }
}
// export default ChildRoute1;
// export default withRouter(ChildRoute); // withRouter是高阶组件(也就是一个修饰函数)，所以也可以用装饰器语法

const ChildRoute2 = props => {
    console.log('this.props', props);
    console.log('useParams', useParams());
    console.log('useLocation', useLocation());
    return (
        <div>
            这个组件没有被Route直接包裹
            上一级的TestRoute被Route直接包裹
        </div>
    );
}
export default withRouter(ChildRoute2)

// 装饰器语法只能用于类组件