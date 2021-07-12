import loadable from '@loadable/component';
import React from 'react';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    ContainerOutlined,
} from '@ant-design/icons';

const Home = loadable(() => import('./home/Home'));
const TestRedux = loadable(() => import('./home/TestRedux'));
const TodoRedux = loadable(() => import('./home/TodoRedux'));
const MusicRedux = loadable(() => import('./home/MusicRedux'));

const routes = [
    {
        id: 1,
        text: '首页管理',
        icon: <AppstoreOutlined/>,
        children: [
            {
                id: 1001,
                text: '首页概况',
                icon: <MenuUnfoldOutlined/>,
                path: '/home',
                component: Home
            },
            {
                id: 1002,
                text: 'redux learn',
                icon: <PieChartOutlined/>, 
                path: '/redux',
                component: TestRedux
            },
            {
                id: 1003,
                text: 'todo练习redux',
                icon: <PieChartOutlined/>, 
                path: '/todo',
                component: TodoRedux
            },
            {
                id: 1004,
                text: '音乐列表',
                icon: <PieChartOutlined/>, 
                path: '/music',
                component: MusicRedux
            },
        ],
    },
    {
        id: 2,
        text: '客户管理',
        icon: <ContainerOutlined/>,
        children: []
    },
]
export default routes