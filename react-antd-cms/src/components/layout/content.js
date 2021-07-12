import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import routes from '@/views'
export default props => {
    const createRoutes = () => {
        let res = [];
        routes.map(ele => {
            if (ele.children) {
                ele.children.map(item => {
                    res.push(<Route path = {item.path} key = {item.path} component = { item.component }  exact strict />);
                })
            }
        })
        return res;
    }
    return (
        <div className = 'hk-content'>
            <Switch>
                { createRoutes() }
                <Redirect from = '/*' to = '/home'></Redirect>
            </Switch>
        </div>
    );
}