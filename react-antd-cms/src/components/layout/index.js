import React from 'react';
import { Layout } from 'antd';
import './style.scss';
import HkAside from './aside';
import HkContent from './content';
import HkHeader from './header';
const { Header, Sider, Content } = Layout;

const Container =  props => {
    return (
        <section className = 'hk-layout'>
            <Layout>
                <Sider width = '150'>
                    <HkAside/>
                </Sider>
                <Layout>
                    <Header><HkHeader/></Header>
                    <Content>
                        <HkContent/>
                    </Content>
                </Layout>
            </Layout>
        </section>
    );
}
export default Container;