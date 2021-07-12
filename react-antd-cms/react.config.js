/* CommonJs语法 */
const path = require('path');

module.exports = {
    devServer: {
        port: 9000,
        proxy: {
            '/soso': {
                target: 'https://c.y.qq.com',
                changeOrigin: true
            }
        }
    },
    alias: {
        '@': path.resolve(__dirname, './src')
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [ 'style-loader', 'css-loader', // translates CSS into CommonJS
            {
                loader: 'less-loader', // compiles Less to CSS
                options: {
                    lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                        modifyVars: {
                            'primary-color': '#1DA57A',
                            'link-color': '#1DA57A',
                            'border-radius-base': '2px',
                        },
                        javascriptEnabled: true,
                    },
                },
            }],
            // ...other rules
        }],
    },
}