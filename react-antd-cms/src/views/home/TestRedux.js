import React from 'react';

// 一、使用connect高阶组件的方式使用store
// 这种写法对类组件、函数式组件都可以使用
import { connect } from 'react-redux'; // 向mobx的inject一样，比高阶还高阶的组件

// 二、使用hook api的写法，看下方二
import { useSelector, useDispatch } from 'react-redux';

import { changeMsg } from '@/store/actions/test';

const TestRedux = props => {
    console.log('test redux props', props);
    const clickHandle = () => {
        props.changeMsg();
    }
    return (
        <section className = 'hk-redux'>
            <h1>测试redux流程</h1>
            <h2>{props.xxx}</h2>
            <h3>这都不用解构了啊，mobx还需要解构一下store上面的模块</h3>
            <button onClick = {clickHandle}>修改store中的msg</button>
        </section>
    );
}

// 把store中共享的数据映射进来，有点像是vuex的mapState
function mapStateToProps(store) {
    return {
        xxx: store.msg,
        list: store.list
    }
}
// 有点像是vuex的mapActions、mapMutations
function mapDispatchToProps(dispatch) {
    return {
        changeMsg: () => dispatch({ type: 'add', payload: 'Changing' })
    }
}

connect(mapStateToProps, mapDispatchToProps)(TestRedux)

// 二、使用hook api的写法
// import { useSelector } from 'react-redux';
export default props => {
    console.log('test redux props', props);

    const msg = useSelector(state => state.test.msg);
    const dispatch = useDispatch();

    const clickHandle = () => {
        // props.changeMsg();
        dispatch(changeMsg('Changing'));
    }
    return (
        <section className = 'hk-redux'>
            <h1>测试redux流程</h1>
            <h2>{msg}</h2>
            <h3>这都不用解构了啊，mobx还需要解构一下store上面的模块</h3>
            <button onClick = {clickHandle}>修改store中的msg</button>
        </section>
    );
}