import {
    getAllCustomer
} from '@/api/index';

const state = {
    customer: {
        nickname: '', // 客户名
        phone: '',	// 客户电话
        idCard: '', // 客户身份证号
    }, 
    customerList: [],
    customerInfoLen: 0,
};
const getters = { }
const mutations = {
    // 获取当前用户权限下所能知晓的所有信息
    setAllCustomer(state, payload) {
        let len = state.customerList.length;
        state.customerList.splice(0, len); // 赋值之前先清空
        // 如果查询没有数据
        if (payload.list.length === 0) {
            // 主动给customerList值
            state.customerList.push({
                nickname: 'xxx', // 客户名
                phone: 'xxx',	// 客户电话
                idCard: 'xxx', // 客户身份证号
            })
        }
        else {
            for (let item of payload.list) {
                state.customerList.push(item);
            }
        }
        state.customerInfoLen = payload.total;
    },
    clear(state) {
        state.customerList = [];
    }
}
const actions = {
    // 获取所有客户信息
    getAllCustomerInfo(store, payload) {
        getAllCustomer(payload).then(res => {
            if (res.code === 8000) {
                store.commit('setAllCustomer', res.data);
            }
        });
    },
}
export default {
    // 开启命名空间
    namespaced: true,
    state, 
    getters,
    mutations,
    actions
}