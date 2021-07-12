var path = require('path')
const webpack = require('webpack')

// 作用：使用它，把main.js入口文件和public/index.html结合起来
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 作用：每次打包都，自动帮助我们清理掉 dist文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 这是最新集成ESlint的方法
const ESLintPlugin = require('eslint-webpack-plugin')

// 当我们执行 npm run build，isDev=false，代表你正在打包上线
// 当我们执行 npm run serve，isDev=true，代表你正在启动本地开发环境
const isDev = process.env.NODE_ENV === 'development'

// 一开始配置时，就以生产环境为基准来配置
const config = {
  mode: 'production',
  // 入口，就是打包运行的起点
  // 路径可以相对路径，也可以是绝对路径
  // entry: path.resolve(__dirname, './src/main.js'),
  // entry: './src/main.js'
  entry: {
    app: path.resolve(__dirname, './src/main.js')
  },
  output: {
    filename: '[name].[chunkhash].js',  // 一捆、一束
    path: path.resolve(__dirname, './dist')
  },
  // plugins插件，它是一个数组
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      title: 'reactStudy'
    }),
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin()
  ],
  // 一切皆模块
  module: {
    // 用于定义各种模块的处理和编译方案
    rules: [
      // 当我们在打包或启动本地服务时，如果遇到.png结尾的模块，咱们就使用 file-loader 来进行加载、编译
      { test: /\.(png|jpg|gif)$/, use: ['file-loader'] },
      // 当我们执行打包或运行服务时，如果遇到.css文件模块时，咱们先使用css-loader加载css文件，然后将其交给style-loader把css样式代码注入到HTML结构。
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },

      // 当遇到.scss文件模块时，第一步使用sass-loader加载scss文件，交给sass处理器，把scss文件编译成css文件；第二步，再使用css-loader加载sass编译好的css文件；第三步，最后使用style-loader把上一步中加载进来的css代码注入到DOM中。
      // { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},

      { test: /\.(css|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader']},

      // less用于实实地把.less编译成.css代码
      // less-loader只是用于加载.less文件，交给less来处理
      { test: /\.less$/, use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {            
            lessOptions: {
              modifyVars: {
                'primary-color': '#1DA57A'
              },
              javascriptEnabled: true
            }
          }
        }]
      },

      // 当遇到.js文件时，使用babel-loader加载.js文件，交给Babel编译器（@babel/core、@babel/preset-env）来编译成ES5
      // @babel/core 是Babel编译器的核心库，必须安装
      // @babel/preset-env 它一个具体的Babel编译器，作用是把ES6代码编译成ES5
      // 在使用Babel时，一定要在项目根目录添加一个名字叫 babel.config.js 的文件，用于指定.js编译细节。（这个配置文件每次修改，都要重启项目）
      { test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  resolve: {
    // 别名
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    // 指定可以忽略的扩展名列表
    extensions: [".js", ".jsx", ".ts", ".json"]
  }
}

if(isDev) {
  // 开发环境
  config.mode = 'development'
  // 当代码报错，显示源码中错误的位置
  config.devtool = 'source-map'
  config.devServer = {
    // 本地服务的端口号
    port: 8088,
    open: true,
    // 开启热更新
    // 实际上创建了一个客户端到node服务的WebSocket长连接（订阅发布）
    hot: true,
    // 指定本地服务的静态资源目录
    contentBase: path.resolve(__dirname, './public'),
    overlay: {
      errors: true
    },
    proxy: {
      '/soso': {
        target: 'https://c.y.qq.com',
        changeOrigin: true
      }
    }
  }
  // 使用ESLint的旧写法
  // config.module.rules.push({
  //   test: /\.js$/, use: ['eslint-loader'], exclude: /node_modules/, enforce:'pre'
  // })

  // 使用ESLint的最新写法（使用ESLint时，要添加eslint配置文件）
  // 谁才是真正检测代码？—— eslint
  // 在代码如何解决ESLint的报错问题呢？
  // 1、遵从规则，把代码改成规范写法
  // 2、使用eslint的配置文件，把关闭掉（在团队协作中慎用）
  // 3、使用eslint的各种注释，临时关闭掉ESlint的检测
  config.plugins.push(new ESLintPlugin())
}

// 这个配置文件，是给webpack用的
// 代码语法：node代码、CommonJS模块语法
module.exports = config
