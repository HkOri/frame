import React from 'react';
export default function test(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                list: []
            }
        }
        componentDidMount() {
            // 调接口
            const arr = [
                { id: 1, label: '关于我们' },
                { id: 2, label: '产品中心' },
                { id: 3, label: '新闻列表' },
            ];
            this.setState({ list: arr });
        }
        componentWillUnmount() {
            // localStorage...
        }
        render() {
            let { list } = this.state;
            return (
                <section>
                    <header>这是官网的菜单</header>
                    <WrappedComponent {...this.props} hehe = 'hehe' navs = { list }/>
                    <footer>这是官网的底部</footer>
                </section>
            );
        }
    }
}