import React, { Component } from 'react';
export default function user(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                userinfo: {}
            }
        }
        componentDidMount() {
            // 调接口或者从本地缓存中拿到数据
            let userinfo = {
                username: 'lili',
                age: 18,
                role: 1,
                phone: '110'
            }
            this.setState({ userinfo });
        }
        render() {
            let { userinfo } = this.state;
            return (
                <WrappedComponent {...this.props} userinfo = { userinfo }/>
            );
        }
    }
}