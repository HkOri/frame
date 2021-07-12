/* demo */
import React, { Component } from 'react';

const Lang = props => {
    let { list, lang } = props; 
    const click = (param) => {
        props.onChangeLang(param.lang);
    }
    const listRender = () => {
        return list.map(ele => (
            <span 
                key = { ele.id } 
                className = { lang === ele.lang ? 'on' : '' }
                onClick = { () => click(ele) }
            >
                { ele.name }
            </span>
        ));
    }
    return (
        <section className = 'language'>
            { listRender() }
        </section>
    );
}

export default class TestLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                { id: 1, name: '中文', lang: 'zh' },
                { id: 2, name: '英文', lang: 'en' },
                { id: 3, name: '德文', lang: 'de' }
            ],
            lang: 'en'
        }
    }
    changeLang(params) {
        this.setState({ lang: params });
    }
    render() {
        let { list, lang } = this.state;
        return (
            <div>
                <Lang list = { list } lang = { lang } onChangeLang = {(params) => this.changeLang(params) }/>
                <p>你选择的语言是：{ (list.find(ele => ele.lang === lang )).name }</p>
            </div>
        );
    }
}