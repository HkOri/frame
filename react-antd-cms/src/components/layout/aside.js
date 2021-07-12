import React, { useState } from 'react';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router';

// 导入菜单路由配置
import routes from '@/views/index';


const { SubMenu } = Menu;

const Aside =  props => {
    const [collapsed, setCollapsed] = useState(true);
    // const history = useHistory();
    function changeCollapsed() {
        console.log('收起');
        setCollapsed(!collapsed);
    }
    const renderNavLink = () => {
        return routes.map(ele => (
            <SubMenu key={ele.id} icon={ele.icon} title={ele.text}>
                {
                    ele.children.map(item => (
                        <Menu.Item key={item.id}>
                            <Link to = {item.path}>{item.text}</Link>
                        </Menu.Item>
                    ))
                }
            </SubMenu>
        ));
    }
    return (
        <div className = 'hk-aside'>
            <Button type="primary" onClick={ changeCollapsed } style={{ marginBottom: 16 }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                // onClick = {(item, key, keyPath, domEvent) => history.push(item.key)}
                // onClick = {({key}) => history.push(key)} // 这是编程式导航
            >
                { renderNavLink() }
            </Menu>
        </div>
    );
}
export default Aside