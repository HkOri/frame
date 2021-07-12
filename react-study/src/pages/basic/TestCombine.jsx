import React, { Component } from "react";

/* 
    组合
*/

const HkModal = props => {
    const TOGGLE = key => (props[key] ? 'block' : 'none');
    // show为真时，弹框出现
    // hasHeader布尔类型，控制是否有header
    // onClose绑定close事件
    // onConfirm 提交
    // onCancel 取消
    // tipText 指定弹框的标题提示文字，非必传，默认值是'标题'
    // closeable布尔类型，表示右上角是否有x

    const renderBtns = () => {
        let btns = null;
        switch (props.type) {
            case 'info':
                btns = (
                    <>
                        <span className = 'confirm' onClick = {() => props.onConfirm && props.onConfirm()}>确定</span>
                        <span onClick = {() => props.onCancel && props.onCancel()}>取消</span>
                    </>
                );
                break;
            case 'delete': 
                btns = (
                    <>
                        <span className = 'delete'>删除</span>
                        <span onClick = {() => props.onCancel && props.onCancel()}>取消</span>
                    </>
                );
                break;
            default:
                btns = (
                    <>
                        <span onClick = {() => props.onConfirm && props.onConfirm()}>确定</span>
                        <span onClick = {() => props.onCancel && props.onCancel()}>取消</span>
                    </>
                );
                break;
        }
        return btns;
    }

    return (
        <section className = 'mask' style = {{ display: TOGGLE('show') }}>
            <section className = 'hk-modal' style = {{ width: `${ props.width || 520}px` }}>
                <section className = 'header' style = {{ display: TOGGLE('hasHeader') }}>
                    <span>{ props.tipText || '标题' }</span>
                    <span 
                        onClick = {() => props.onClose && props.onClose()}
                        style = {{ display: TOGGLE('closeable') }}
                    >X</span>
                </section>
                <section className = 'body'>
                    { props.children }
                </section>
                <section className = 'footer'>
                    { renderBtns() }
                </section>
            </section>
        </section>
    );
} 

export default class TestCombine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    clickHandle() {
        this.setState({ show: true });
    }
    modalClose() {
        // do something
        this.setState({ show: false });
    }
    modalCancel() {
        // do something
        this.setState({ show: false });
    }
    modalConfirm() {
        // do something
        this.setState({ show: false });
    }
    render() {
        let { show } = this.state;  
        return (
            <section>
                <h1>测试组合</h1>
                <button onClick = { () => this.clickHandle() }>点击</button>
                <HkModal
                    show = { show }
                    hasHeader = { true }
                    tipText = { <div className = 'tc-modal-icon'><em></em><span>告知</span></div> }
                    closeable
                    onClose = { () => this.modalClose() }
                    onCancel = { () => this.modalCancel() }
                    onConfirm = { () => this.modalConfirm() }
                    type = 'info'
                    width = '300'
                >
                    <p>上</p>
                    <p>加油</p>
                    <p>要成为一个纯粹的开发者</p>
                </HkModal>
            </section>
        );
    }
}