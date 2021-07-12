import {
    getRoomOrderInfo
} from '@/api/index';

const state = {
    order: {
        rid: '', // 房号(这个得酒店前台在客户到酒店之后，给出钥匙之后，在系统中处理编辑)
        name: '', // 谁订的房
        idCard: '', // 谁订的房
		date: '', // 什么时候订的房
        type: '', // 订了什么类型的房
        inTime: '', // 入住时间
        outTime: '', // 退房时间
        price: '',
        state: '', // 状态(complete, undetermined) 
    }, 
    orderList: [],
    orderInfoLen: 0, // 辅助分页处理
};
const getters = { }
const mutations = {
    getRoomOrderInfoVuex(state, payload) {
        let len = state.orderList.length;
        state.orderList.splice(0, len); // 赋值之前先清空
        // 如果查询没有数据，放一个空数据
        if (payload.list.length === 0) {
            state.orderList.push({
                rid: 'xxx', // 房号(这个得酒店前台在客户到酒店之后，给出钥匙之后，在系统中处理编辑)
                name: 'xxx', // 谁订的房
                idCard: 'xxx', // 谁订的房
                date: 'xxx', // 什么时候订的房
                type: 'xxx', // 订了什么类型的房
                inTime: 'xxx', // 入住时间
                outTime: 'xxx', // 退房时间
                price: '',
                state: 'xxx',
            })
        }
        else {
            for (let item of payload.list) {
                item['readOnly'] = true;
                state.orderList.push(item);
            }
        }
        state.orderInfoLen = payload.total;
    }
}
const actions = {
    // 获取所有房型信息
    getAllOrderInfo(store, payload) {
        getRoomOrderInfo(payload).then(res => {
            if (res.code === 10000) {
                store.commit('getRoomOrderInfoVuex', res.data);
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