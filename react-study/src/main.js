// 只要使用了Jsx，就一定要引入React
import React from 'react';
// DOM是全大写
import ReactDOM from 'react-dom';

import App from './App';
import '@/assets/css/style.scss';
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'antd/dist/antd.less';
// 前者是用于渲染的组件，后者是挂载的dom节点
ReactDOM.render(<App/>, document.getElementById('app'));
