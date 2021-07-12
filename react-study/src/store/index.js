import MusicStore from "./modules/music";
import TodoStore from "./modules/todo";
class Store {
    constructor() {
        // 在这里对子store进行实例化
        this.music = new MusicStore();
        this.todo = new TodoStore();
    }
}

export default new Store();

/* 
    mobx状态管理的使用流程
    npm i mobx -S   
    ES6类的语法封装store
    定义store的特性，用到observable/action/computed/makeObservable...
    在根Store中，实例化mobx的子store实例
    npm i mobx-react -S 关联mobx和react
    在App.js中，使用mobx-react提供的<Provider xxx = {store}></Provider>包裹组件
    在具体的组件中，使用mobx-react的inject('xxx')(observer(本组件))将状态数据注入到组件上(props上)
*/