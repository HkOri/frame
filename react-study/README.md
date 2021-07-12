webpack serve --open --config webpack.config.js(这个可以不写，默认就是这个文件，这里可以指定其他配置文件)

如何理解webpack？
1、这是一个打包器，作用是把前端模块编译成浏览器能够识别的HTML+CSS+JS
2、在Webpack眼中，一切都是模块
3、四个入门级的核心概念：入口entry、出口output、loader、plugin
4、Webpack可以做哪些事情？构建开发环境、上线打包

npm i webpack -D
npm i webpack-cli -D



### 什么是JSX？(TestJsx) ###
1、它是JavaScript XML(XML是一种数据的交换格式)
2、它是Js的一种语法扩展(语法糖——相当于把一种东西包装一下)
3、JSX是React推荐使用的一种语法格式，但不是强制的
4、JSX语法支持数组直接渲染

### (TestProps) ###
1、es6的结构赋值，let { a } = { b: 12, c: { a: 12 } }——a并不能解构出来，那import { Component } from 'react' ??? ——> React在'react'中被以export default的方式抛出，而Component以export的方式抛出
2、rest参数和扩展运算符——》吸星大法和化骨绵掌。前者收集后者平铺

### (TestCommunication) ###
1、点击按钮之后，函数式组件又从头执行？——触发事件之后，声明式变量发生变化，视图自然也重新渲染，所以专门显示这个声明式变量的函数式组件从头开始执行了

### (TestState) ###
1、注意，setState的修改操作是异步的，所以有可能虽然修改了state但是输出的state还是旧值


### 条件渲染和动态样式(TestCondition) ###
1、枚举：数量有限且不重复

### (TestForm) ###
1、对于多个单选框，使用name属性给单选框分组，达到只能选择一个框的效果
2、对于input[type = 'radio']来说，react并不是用value属性来实现受控，而是用checked

### (TestLife) ###
1、不能在render()中执行setState操作，会死循环：setState会触发render()。ps：自己定义的视图渲染方法也不可以用setState，总之记住，setState会触发页面重新渲染

### (TestCombine) ###
1、利用组合封装实现一个类似于开源UI库的弹框组件 
2、面向对象CSS——OOCSS：把各种出现的CSS效果分割开来，然后由开发者自己选择，然后根据选择的组合成一个完成的CSS效果
3、在react中，组合是一种非常强大的组件复用的设计模式
4、语法基础: props可传递任何数据类型、包括jsx对象
5、在自定义组件的内部，可以嵌套jsx对象，在子组件中使用props.children(类型是一个数组，很重要的点)进行渲染

### (TestHoc) ###
1、高阶组件的作用？像是对参数组件进行修饰，使其功能变得更强大
2、也能解决数据共享问题


三种路由库对应官网的三类
react-router        -- core
react-router-dom    -- web
react-router-native -- native
注意：用于重定向的Redirect，from和to搭配好，不要弄成死循环
注意：路由集成后(即使用了路由包裹之后)，只有被Route直接修饰的组件，其props上能访问路由相关的api。可以通过withRouter(一个高阶组件)修饰那些没有路由api的组件使其拥有


### mobx ###
unexpected token '=' ：注意eslint的配置
### 一个非常重要的React开发思想(原则)：一切外部数据都要通过props传递进来 ###







npm i -D 'xxx'会安装到package.json的devDependencies里面(这个单词的D也正好是大写)
babel搜decorators解决es6的装饰器问题，要安装两个插件
npm i -S 'xxx'会安装到package.json的另一个依赖里面，这些都需要在代码中手动导入