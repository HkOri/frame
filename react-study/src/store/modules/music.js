import {
    observable, // 用于定义可共享的数据，像是vuex中的state
    action,     // 相当于vuex中的mutations(同步) + actions(异步)
    computed,   // 相当于是vuex的getters
    makeObservable,
    makeAutoObservable
} from 'mobx';

import { fetchMusic } from '@/utils/api';

export default class MusicStore {
    msg = 'Hello Mobx';
    list = [];
    constructor() {
        // makeAutoObservable(this);
        makeObservable(this, {
            msg: observable,  
            list: observable,
            getMusicList: action,
            changeList: action,
            total: computed
        }); 
    }
    // 对于list来说，这个函数就相当于vue的actions
    getMusicList(payload) {
        // 异步调接口
        fetchMusic(payload).then(res => {
            console.log('music this', this);
            this.changeList(res.song.list);
        })
    }
    // 对于list来说，这个函数就相当于vue的mutations
    changeList(list) {
        this.list = list;
    }
    test() {
        this.msg = 'tets'
    }
    // 计算属性前要加上get关键字，注意这里虽然是方法，但是和vue一样也是作为实例属性变量直接使用
    get total() {
        return this.list.length;
    }
}

/* 
    mobx5的写法，看文档有
    class MusicStore {
        @observable list = [];
        @action
        getMusicList() {

        }
        @computed
        get total() {

        }
    }

*/