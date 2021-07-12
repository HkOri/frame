import React from 'react';

import ChildRoute from '../components/ChildRoute';

import { Button } from 'antd';

export default props => {
    console.log('props', props);
    return (
        <div>
            <h1>测试路由API</h1>
            <hr/>
            <ChildRoute/>
            <Button type = 'primary'>主按钮</Button>
        </div>
    );
}