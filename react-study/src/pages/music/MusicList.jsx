import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';



// 一个非常重要的React开发思想(原则)：一切外部数据都要通过props传递进来

// 在组件中使用mobx状态数组
// 这两个都是高阶组件——高阶组件——修饰——多出数据
import { observer, inject } from 'mobx-react';
/* 
    inject语法：inject('xxx')(UI组件) 将xxx注入返回一个高阶函数，再用这个高阶函数去修饰UI组件
    observer语法：observer(UI组件) 把UI组件变成观察者UI组件，当store数据发生变化，视图自动更新
    总的来说：inject('xxx')(observer(UI组件))：先通过observer将UI组件变成观察者，然后通过inject将被观测的数据注入
*/


const MusicList = props => {
    console.log('props', props);
    const { music } = props.store;
    console.log(music);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const history = useHistory();
    useEffect(() => {
        const str = 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.top&searchid=56144482543391076&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&_=1625967980910&cv=4747474&ct=24&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&uin=0&g_tk_new_20200303=5381&g_tk=5381&hostUin=0&loginUin=0';
        const params = {};
        str.split('&').map(ele => {
            let arr = ele.split('=');
            params[arr[0]] = arr[1];
        })
        params.w = decodeURI(params.w);
        params.p = page > 0 ? page : 1;
        music.getMusicList(params);
        // console.log(page);
        return undefined;
    }, [page]);
    const renderList = () => {
        return music.list.map(ele => (
            <div key = { ele.id } onClick = {() => history.push('/music/list/detail/' + ele.id)}>
                <span>{ ele.id }</span>
                ---
                <span>{ ele.name }</span>
            </div>
        ))
    }
    return (
        <section>
            <h1>音乐列表</h1>
            { renderList() }
            <h2>{ music.msg }</h2>
            <h3>{ music.total }</h3>
            <button onClick = { () => setPage(page + 1) }>下一页</button>
            <button onClick = { () => setPage(page - 1) }>上一页</button>
        </section>
    );
}

export default inject('store')(observer(MusicList));
/* 
    如果是class类组件
    @inject('xxx')
    @observer
    class Demo extends React.Component
*/

// inject()返回一个高阶组件，参数之所以是'store'是因为App.js中Provider上属性名写成了'store'