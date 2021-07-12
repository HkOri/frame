/* 
    flux
        vuex
        mobx(定义状态管理) + mobx-react(将状态管理和react关联起来)
        redux(定义状态管理) + react-redux(同上)
*/

/* 
    Redux: 三个三原则
    1、三个api：createStore()、combineReducers()、applyMiddleware()
    2、三个特点：store是只读的、单向数据流，store只能通过纯函数reducer来修改
    3、三个概念：store、reducer、action
*/

// !!!redux只支持dispatch(action)派发同步的action(action格式必须是JSON对象那种的普通对象)


/* 
    当react组件中使用dispatch(fetch)触发接口时，因为fetch不是plain object，redux
    的store收到不是一个plain object的action时，就会报错

    解决方法：redux-thunk中间件
    当在组件中dispatch(xxx)时，thunk对xxx进行判断。如果xxx是plain object，不做任何处理，
    redux的store能够收到xxx这个action。如果xxx是function，那么在thunk中，执行xxx()
*/


import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
/* 
    redux-thunk源码：
    function createThunkMiddleware(extraArgument) {
        return ({ dispatch, getState }) => (next) => (action) => {
            if (typeof action === 'function') {
                return action(dispatch, getState, extraArgument);
            }

            return next(action);
        };
    }

    const thunk = createThunkMiddleware();
    thunk.withExtraArgument = createThunkMiddleware;

    export default thunk;
*/

import testReducer from "./reducers/testReducer";
import todoReducer from "./reducers/todoReducer";
import musicReducer from "./reducers/musicReducer";

// action = { type, payload }

// 合并reducer
// 猜测：combineReducers就是把各个模块下switch语句合并了起来
const rootReducer = combineReducers({
    test: testReducer,
    todo: todoReducer,
    music: musicReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));
// const store = createStore(reducer, applyMiddleware(...middleware)); 
// thunk插件解决来异步action的问题，redux生态还有很多别的插件解决别的问题，官网有
export default store;