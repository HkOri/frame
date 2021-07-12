/* */

import React, { useEffect } from 'react';
import { fetchMusic } from '@/utils/api';
import { useDispatch, useSelector } from 'react-redux';
import type from '@/store/actionTypes'
export default props => {
    const dispath = useDispatch();
    const musicList = useSelector(state => state.music.list);
    useEffect(() => {
        const str = 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.top&searchid=56144482543391076&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&_=1625967980910&cv=4747474&ct=24&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&uin=0&g_tk_new_20200303=5381&g_tk=5381&hostUin=0&loginUin=0';
        const params = {};
        str.split('&').map(ele => {
            let arr = ele.split('=');
            params[arr[0]] = arr[1];
        })
        params.w = decodeURI(params.w);
        
        // 完成一次异步的action由两步同步的action构成：第一次派发一个空的action触发调接口，第二次再派发赋值
        const myAction = getMusic(params);
        dispath(myAction); // 中间件applyMiddleware(thunk)会判断这个参数是不是普通的JSON对象
        // 如果是，那就直接派发走流程，和没有加中间价的情况下一样
        // 如果是函数，阻止派发，函数被执行

        return undefined;
    }, []); 
    return (
        <div>
            <h1>音乐列表</h1>
            {
                musicList.map(ele => (
                    <div key = {ele.id}>
                        <span>{ele.id}</span>
                        ---
                        <span>{ele.name}</span>
                    </div>
                ))
            }
        </div>
    );
}

function getMusic(params) {
    return function(dispatch) {
        fetchMusic(params).then(res => {
            // 这是第二次派发
            dispatch({
                type: type.MUSIC_UPDATE,
                payload: res.song.list
            })
        })
    }
}