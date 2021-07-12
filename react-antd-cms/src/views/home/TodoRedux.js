import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default props => {
    const dispatch = useDispatch();
    const [task, setTask] = useState('');
    const list = useSelector(store => store.todo.list);
    const renderList = () => {
        return list.map(ele => (
            <section key = { ele.id }>
                <span>{ele.id}</span>
                ---
                <input value = {ele.task} onChange = {(e) => dispatch({ type: 'todoedit', payload: { id: ele.id, task: e.target.value} })} />
                --
                <span onClick = {() => dispatch({ type: 'tododel', payload: ele.id })}>删除</span>
                {/* <span onClick = {() => console.log(ele.id)}>删除</span> */}
            </section>
        ))
    }
    const add = () => {
        dispatch({type: 'todoadd', payload: { id: Date.now(), task }});
        setTask('');
    }
    return (
        <>
            <h2>TodoList</h2>
            <label><input type = 'text' value = {task} onChange = {(e) => setTask(e.target.value)}/><button onClick = {add}>添加</button></label>
            <hr/>
            {renderList()}
        </>
    );
}