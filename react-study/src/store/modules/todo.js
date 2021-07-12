import {
    observable,
    computed,
    makeObservable,
    action
} from 'mobx';

export default class TodoStore {
    constructor() {
        makeObservable(this, {
            list: observable,
            updateList: action,
            total: computed
        })
    }
    list = [];
    updateList({ type, data }) {
        switch (type) {
            case 'add':
                this.list.push(data);
                break;
            case 'del': 
                this.list = this.list.filter(ele => ele.id !== data);
                break;
            case 'edit':
                this.list.map((ele, idx, arr) => {
                    if (ele.id === data.id) {
                        // data: { id: 1, task: 'xxx' }
                        arr[idx].task = data.task;
                    }
                });
                break;
            case 'clean':
                this.list = [];
                break;
            default:
                break;
        }
    }
    get total() {
        return this.list.length;
    }
}