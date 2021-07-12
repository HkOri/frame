import React, { Component } from 'react';
import ThemeCtx from '../utils/theme';

export default function theme(WrappedComponent) {
    return class extends Component {
        render() {
            return (
                <ThemeCtx.Consumer>
                {
                    (value) => (<WrappedComponent {...this.props} theme = { value } />)
                }
                </ThemeCtx.Consumer>
            );
        }
    }
}