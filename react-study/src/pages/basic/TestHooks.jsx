/* 
    函数式组件：性能更好，但在默认情况下无法使用生命周期、ref、context、state、this等特性
    class类组件：性能稍差，但什么都有
    从react16.8开始，增加了Hooks新特性

    Hooks实际上就是一组api，用于帮助使用react的固有特性

    在函数式组件中，如果要使用副作用(调接口、DOM、开定时器、建立长连接等)，
        必须使用生命周期的特性，useEffect可以帮助模拟出生命周期的特性
    注意：useEffect可以有多个，一个useEffect只做一件事情
*/
import React, { useState, useEffect } from 'react';
/* const TestHooks = props => {
    return (
        <section>
            <h1>性能更好的无状态组件</h1>
        </section>
    );
}
export default TestHooks;
 */
export default props => {
    const [count, setCount] = useState(1); // 定义了一个声明式变量count，初值为1，且定义了一个专门的函数setCount用于修改这个声明式变量
    const [list, setList] = useState([
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' },
    ]);
    const [user, setUser] = useState('');

    // useEffect(function(){return function() {}}, []) // es5写法
    useEffect(() => {
        //do something --- 这里相当于componentDidMount()，也就是vue的mounted()
        // 调接口、开定时器、dom初始化操作
        return () => {
            // do something --- 这里相当于componentWillUnmount()，相当于vue的beforeDestroy()
            // 关闭长连接、关闭定时器、清除缓存
        }
    }, []); // 这个数组的作用是：如果数组内的变量发生了变化，那么这个useEffect会再次执行一次。这个特性可用于防止useEffect每次都执行从而提升性能

    useEffect(() => {
        const timer = setTimeout(() => {
            document.getElementById('box').style.color = 'red';
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [])
    useEffect(() => {
        // componentDidMount
        console.log('start');
        const timer = setInterval(() => {
            setCount(count + 1);
        }, 1000);
        return () => {
            // componentWillUnmount
            console.log('end'); // ???????????为什么会和start成对多次出现

            /* 
                默认情况下，useEffect在首次渲染后和每次更新之后都会执行，即每一次重新渲染之后useEffect都会重新执行
                传给useEffect的函数在每次渲染中都是不一样的，每次重新渲染都会生成新的effect替换掉之前的
                某种意义上讲，effect更像是渲染结果的一部分——每个effect“属于”一次特定的渲染
                
                注意：此处确实相当于componentWillUnmount，但是如上面所说，每一次的effect都是不同的，react会在
                执行当前effect之前对上一个effect进行清除——》看起来effect更新是把之前的卸掉然后换新的
        
            */

            clearInterval(timer);
        }
    }, [count]); // componentDidUpdate()

    const sub = () => {
        setCount(count - 1); // 注意不能直接修改count本身，比如--count
    }  
    const addUser = () => {
        setList([...list, { id: Date.now(), name: user }]);
        setUser('');
    } 
    return (
        <section>
            <h1>性能更好的无状态组件</h1>
            {/* 需求，点击增加count，但是函数里面没有state、ref、this等特性 */}
            <h2>{ count }</h2>
            <button onClick = {() => setCount(count + 1)}>自增</button>
            <button onClick = {sub}>自减</button>
            <hr/>
            {
                list.map(ele => (
                    <section key = { ele.id }>{ ele.name }</section>
                ))
            }
            <label>
                <span>添加用户</span>
                <input type = 'text' value = {user} onChange = {(e) => setUser(e.target.value)}/>
                <button onClick = {addUser} >提交</button>
                <h2 id = 'box'>hello hooks</h2>
            </label>
        </section>
    );
}