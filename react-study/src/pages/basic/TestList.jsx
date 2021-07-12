import React, { Component } from 'react';

export default class TestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                { id: 1, name: '张三' },
                { id: 2, name: '李四' },
                { id: 3, name: '王五' },
                { id: 4, name: '赵六' },
                { id: 5, name: '孙七' }
            ]
        }
    }

    listRender() {
        let { list } = this.state;
        return list.map(ele => (<div key = { ele.id }>{ ele.id } - { ele.name }</div>))
    }
    
    listRender2() {
        let { list } = this.state;
        let res = [];
        list.map((ele, idx) => {
            res.push(
                <div key = { ele.id }>
                    <input type='checkbox' checked = { idx % 2 === 0} onChange = { () => (1) } />
                    --
                    <span>{ ele.id }</span>
                    --
                    <span>{ ele.name }</span>
                </div>
            )
        });
        return res;
    }
    render() {
        let { list } = this.state;
        return (
            <section>
                <h2>列表渲染</h2>
                {/* 第一种方式 */}
                { 
                    list.map((ele) => (<div key = { ele.id } >{ ele.name }</div>))
                }
                {/* 第二种方式 */}
                { this.listRender() }
                {/* 更复杂的处理 */}
                { this.listRender2() }
            </section>
        );
    }
}