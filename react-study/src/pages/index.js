import TestJSX from './basic/TestJsx';
import TestProps from './basic/TestProps';
import TestCommunication from './basic/TestCommunication';
import TestEvent from './basic/TestEvent';
import TestState from './basic/TestState';
import TestCondition from './basic/TestCondition';
import TestList from './basic/TestList';
// demo
import TestLanguage from './basic/TestLanguage';
// 表单
import TestForm from './basic/TestForm';

import TestLife from './basic/TestLife';
import TestLift from './basic/TestLift';

// 组合
import TestCombine from './basic/TestCombine';
// 上下文
import TestContext from './basic/TestContext';

// 高阶组件
import TestHoc from './basic/TestHoc';
// PropsType检查
import TestTypes from './basic/TestTypes';
// hook
import TestHooks from './basic/TestHooks';

import TestRoute from './TestRoute';

/* import loadable from "@loadable/component";
const TestJSX = loadable(() => import("./basic/TestJsx")); */
/* import React, { Suspense } from 'react';
const TestJSX = React.lazy(() => import('./basic/TestJsx')); */

import MusicList from './music/MusicList';
import MusicDetail from './music/MusicDetail';

export default [
    { 
        id: 1,
        path: '/jsx',
        text: 'JSX',
        component: TestJSX
    },
    { 
        id: 2,
        path: '/props',
        text: 'props',
        component: TestProps
    },
    { 
        id: 3,
        path: '/communication',
        text: '组件通信',
        component: TestCommunication
    },
    { 
        id: 4,
        path: '/event',
        text: '事件绑定',
        component: TestEvent
    },
    { 
        id: 5,
        path: '/state',
        text: '状态(声明式变量)',
        component: TestState
    },
    { 
        id: 6,
        path: '/condition',
        text: '条件渲染',
        component: TestCondition
    },
    { 
        id: 7,
        path: '/list',
        text: '列表渲染',
        component: TestList
    },
    { 
        id: 8,
        path: '/language',
        text: 'demo',
        component: TestLanguage
    },
    { 
        id: 9,
        path: '/form',
        text: '表单',
        component: TestForm
    },
    { 
        id: 10,
        path: '/life',
        text: '生命周期',
        component: TestLife
    },
    { 
        id: 11,
        path: '/lift',
        text: '状态提升',
        component: TestLift
    },
    { 
        id: 12,
        path: '/combine',
        text: '组合',
        component: TestCombine
    },
    { 
        id: 13,
        path: '/context',
        text: '上下文',
        component: TestContext
    },
    { 
        id: 14,
        path: '/hoc',
        text: '高阶组件',
        component: TestHoc
    },
    { 
        id: 15,
        path: '/type',
        text: '类型检查',
        component: TestTypes
    },
    { 
        id: 16,
        path: '/hook',
        text: 'Hook',
        component: TestHooks
    },
    { 
        id: 17,
        path: '/route',
        text: '测试路由API',
        component: TestRoute
    },
    { 
        id: 18,
        path: '/music/list',
        text: '动态路由和传参',
        component: MusicList,
        children: [
            {
                id: 19,
                path: '/detail/:id',
                text: '辅助上一个',
                component: MusicDetail
            }
        ]
    },
];