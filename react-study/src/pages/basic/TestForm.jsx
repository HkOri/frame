import React, { Component } from 'react';

/* 
    表单
    文本类表单 input、textarea
    下拉框 select
    特殊的input框：input[type = password/number/color/email]
    单/复选：input[type = file]

    在mvvm中表单的进一步理解：表单、类表单

    两个概念：
        非受控表单：
            1、表单的值不受state控制，与state没有任何关系
            2、react建议，尽量不要使用非受控表单(除了type = 'file'文件上传)
        受控表单:
            1、表单的值value/checked，完全由state控制
            2、在react中，除了文件上传以外，其他都要使用受控表单
            3、使用受控表单时，value/checked和onChange成对出现

    关于文件上传，一般是在file外面包一层form标签，然后当用户选择完文件之后，浏览器就会通过form上的action地址将文件
    以二进制的形式传走，action就是上传文件的接口！！！！！
*/

export default class TestForm extends Component {
    constructor(props) {
        super(props);
        /* 
            react是单向数据绑定的。如何理解这句话？
            1、当state声明式变量发生变化时，视图自动更新
            2、当视图变化时，state声明式变量不会同步变化。只能依靠手动取值，手动更新state
        */
        this.state = {
            uname: '',
            phone: '',
            desc: '',
            school: '2',
            gender: '',
            hobby: []
        }
    }
    // 非受控表单
    submit1() {
        const data = {
            username: document.getElementById('ipt').value,
            password: this.refs.pass.value
        }
        console.log(data);
    }
    submit2() {
        console.log(this.state);
    }
    formChange(e, type) {
        if (type === 'hobby') {
           /*  
           // 搞复杂了
           this.setState((state, props) => {
                // console.log(state.hobby);
                if (state.hobby.includes(e.target.value)) {
                    let idx = state.hobby.indexOf(e.target.value);
                    delete state.hobby[idx];
                    return {
                        hobby: state.hobby.filter(ele => ele)
                    }
                }
                else {
                    state.hobby.push(e.target.value);
                    return {
                        hobby: state.hobby
                    }
                }
            }); 
            */
            if (e.target.checked) {
                this.setState(state => {
                    return { hobby: [...state.hobby, e.target.value] }
                });
            }
            else {
                this.setState(state => {
                    return { hobby: state.hobby.filter(ele => e.target.value !== ele) }
                });
            }
        }
        else {
            this.setState({ [type]: e.target.value })
        }
    }
    renderSchool() {
        let arr = [
            { id: 1, value: '北京航空航天大学', desc: '北京航空航天大学' },
            { id: 2, value: '西北工业大学', desc: '西北工业大学' },
            { id: 3, value: '哈尔滨工业大学', desc: '哈尔滨工业大学' },
            { id: 4, value: '南京理工大学', desc: '南京理工大学' },
            { id: 5, value: '北京理工大学', desc: '北京理工大学' },
            { id: 6, value: '哈尔滨工程大学', desc: '哈尔滨工程大学' },
            { id: 7, value: '南京航天航空大学', desc: '南京航天航空大学' }
        ];
        return arr.map(ele => (
            <option key = { ele.id } value = { ele.value }>{ ele.desc }</option>
        ));
    }   
    renderHobby() {
        let { hobby } = this.state;
        let arr = [
            { id: 1, name: '阅读', },
            { id: 2, name: '做饭' },
            { id: 3, name: '游泳' },
        ];
        // console.log('renderHobby', hobby);
        return arr.map(ele => (
            <section key = { ele.id } >
                <input 
                    value = { ele.name }
                    type = 'checkbox' 
                    checked = { hobby.includes(ele.name) }
                    onChange = { (e) => this.formChange(e, 'hobby') }
                />
                <span>{ ele.name }</span>
            </section>
        ))
    }
    setPhone(e) {
        this.setState({ phone: e.target.value })
    }
    render() {
        let { uname, phone, desc, school, gender } = this.state;
        return (
            <section>
                <h2>表单绑定</h2>
                <fieldset>
                    <legend>非受控表单</legend>
                    <span>用户名: <input type = 'text' id = 'ipt'/></span><br/>
                    <span>密码: <input ref = 'pass' type = 'password' /></span><br/>
                    <span>上传头像: <input type = 'file' /></span><br/>
                    <button onClick = {() => this.submit1()}>提交表单</button>
                </fieldset>
                <fieldset>
                    <legend>受控表单</legend>
                    <label><span>用户名: </span><input value = { uname } onChange = { (e) => this.formChange(e, 'uname') }></input></label><br/>
                    <span>手机号: <input type = 'text' onChange = { (e) => this.setPhone(e) } value = { phone } /></span><br/>
                    <textarea value = { desc } onChange = { (e) => this.formChange(e, 'desc') }></textarea>
                    <br/><label><span>国防七子: </span>
                        <select value = { school } onChange = { (e) => this.formChange(e, 'school') }>
                            { this.renderSchool() }
                        </select>
                    </label><br/>
                    <label>
                        <span>性别: </span>
                        <input name = 'gender' type = 'radio' value = 'male' checked = { gender === 'male' } onChange = { (e) => this.formChange(e, 'gender') } /><span>男</span>
                        <input name = 'gender' type = 'radio' value = 'female' checked = { gender === 'female' } onChange = { (e) => this.formChange(e, 'gender') } /><span>女</span>
                    </label><br/>
                    <label>
                        <span>选择你的爱好: </span>
                        { this.renderHobby() }    
                    </label><br/>
                    <button onClick = {() => this.submit2()}>提交表单</button>
                </fieldset>
            </section>
        );
    }
}