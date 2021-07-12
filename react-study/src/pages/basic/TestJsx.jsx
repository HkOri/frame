// React类 vs React元素
import React from 'react'; // 引入react作用：支持JSX语法

const E1 = <h2>hello jsx</h2>

let arr = [
    '第一行',
    <div key="1">第二行</div>,
    <div key="2">第三行</div>,
    <div key="3">第四行</div>,
    <div key="4">第五行</div>,
    null
];

// react类
export default function TestJSX() {
    return (
        <div>
            <h1>测试JSX语法</h1>
            { E1 }
            { arr }
        </div>
    );
}
