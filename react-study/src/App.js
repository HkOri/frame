import React from 'react';

// 路由使用
// 两种路由模式的选择：BrowerRouter / HashRouter
// 思考如何改变url？使用NavLink/Link来实现声明式路由跳转
// 思考如何定义路由的匹配规则？使用Route来定义路由一一对应
// 如何实现重定向？Redirect，但是要用Switch将所有路由匹配规则包裹起来，且Switch和路由匹配规则必须是直接的父子关系
import { BrowserRouter, HashRouter, NavLink, Redirect, Route, Switch, } from 'react-router-dom';
import ThemeCtx from '@/utils/theme';
import routes from '@/pages/index'

// 把mobx和react链接起来
import { Provider } from 'mobx-react';
import store from '@/store/index.js'

// 理解成react系统的根组件，像是vue里面的那个最基础的vue实例
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#000',
            background: '#eee'
        }
    }
    themeChange(e, key) {
        this.setState({ [key]: e.target.value })
    }
    // 渲染NavLink
    renderNavLinks() {
        return routes.map(ele => (
            <NavLink key = { ele.id } to = { `${ele.path}` }>{ ele.text }</NavLink>
        ))
    }
    // 渲染Route容器
    renderRoutes() {
        let res = [];
        routes.map(ele => {
            res.push(<Route key = { ele.id } path = { `${ele.path}` } component = { ele.component } exact strict/>);
            if (ele.children) {
                ele.children.map(item => {
                    res.push(<Route key = { item.id } path = { ele.path + item.path } component = { item.component } exact strict/>);
                })
            }
        })
        // console.log(res);
        return res;
    }
    render() {
        let { color, background } = this.state;
        return (
            <HashRouter>
                <Provider store = { store }>
                    <ThemeCtx.Provider value = {{ color, background }}> 
                        <div className = 'hk-layout'>
                            <div className = 'hk-l'>
                                { this.renderNavLinks() }
                            </div>
                            <div className = 'hk-r'>
                                <div className = 'hk-header'>导航栏</div>
                                <div className = 'hk-main'>
                                    <Switch>
                                        { this.renderRoutes() }
                                        <Redirect from = '/*' to = '/jsx' />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </ThemeCtx.Provider>
                </Provider>
            </HashRouter>
        );
    }
}

/* class App extends React.Component {
    render() {
        return <h1>Hello App</h1>
    }
} */


// default...
export default App;