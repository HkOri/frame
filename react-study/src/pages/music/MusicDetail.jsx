import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { inject, observer } from 'mobx-react';

export default inject('store')(observer(props => {
    const params = useParams();
    const { id } = useParams();
    const [task, setTask] = useState('');
    const { todo } = props.store;
    useEffect(() => {
        console.log('params', params); 
        console.log('id', id); 
    });
    const renderList = () => {
        return todo.list.map(ele => (
            <section key = { ele.id }>
                <span>{ ele.id }</span>     
                --
                <input type = 'text' value = { ele.task } onChange = {(e) => rowChange(e, ele)} />
                --
                <span onClick = {() => todo.updateList({ type: 'del', data: ele.id })}>删除</span>
            </section>
        ));
    }
    function rowChange(e, item) {
        todo.updateList({ type: 'edit', data: { id: item.id, task: e.target.value } });
    }
    const addTask = () => {
        todo.updateList({
            type: 'add',
            data: {
                id: Date.now(),
                task
            }
        });
        setTask('');
    }
    return (
        <div>
            <h1>音乐详情页</h1>
            <h1>{ id }</h1>
            <hr/>
            {/* 实现todollist */}
            <input type = 'text' value = { task } onChange = { (e) => setTask(e.target.value) } />
            <button onClick = { () => addTask() }>添加</button>
            {
                renderList()
            }
            <h3>总共有{ todo.total }条任务</h3>
            <button onClick = {() => todo.updateList({ type: 'clean' })}>清空所有任务</button>
        </div>
    );
}))