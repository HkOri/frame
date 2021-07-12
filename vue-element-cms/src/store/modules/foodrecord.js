import {
    getFoodRecordInfo
} from '@/api/index';

const state = {
    foodrecord: {
        name: '', // 开房人的名字
        date: '', // 时间
        idCard: '', // 身份证号
        loc: '', // 地区
        rid: '', // 房间号
        fname: '', // 美食名字
        count: '', // 点了几份
        price: '', // 单价
    }, 
    recordList: [],
    recordInfoLen: 0, // 辅助分页处理
};
const getters = { }
const mutations = {
    getFoodRecordInfoVuex(state, payload) {
        let len = state.recordList.length;
        state.recordList.splice(0, len); // 赋值之前先清空
        // 如果查询没有数据，放一个空数据
        if (payload.list.length === 0) {
            state.recordList.push({
                name: 'xxx', // 开房人的名字
                date: 'xxx', // 时间
                idCard: 'xxx', // 身份证号
                loc: 'xxx', // 地区
                rid: 'xxx', // 房间号
                fname: 'xxx', // 美食名字
                count: 'xxx', // 点了几份
                price: 'xxx', // 单价
            })
        }
        else {
            for (let item of payload.list) {
                item['readOnly'] = true;
                state.recordList.push(item);
            }
        }
        state.recordInfoLen = payload.total;
    }
}
const actions = {
    // 获取所有房型信息
    getAllRecordInfo(store, payload) {
        getFoodRecordInfo(payload).then(res => {
            if (res.code === 9000) {
                store.commit('getFoodRecordInfoVuex', res.data);
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