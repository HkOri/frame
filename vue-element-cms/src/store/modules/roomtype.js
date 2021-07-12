import {
    getRoomTypeInfo
} from '@/api/index';

const state = {
    roomType: {
        tid: '', // 标志
        repertory: '', // 库存
        type: '', // 类型
		loc: '', // 地区
		price: '', // 价格
		discount: '', // 折扣
		desc: '', // 描述
		img: '', // 预览
    }, 
    roomTypeList: [],
    roomTypeInfoLen: 0,
};
const getters = { }
const mutations = {
    getRoomTypeInfoVuex(state, payload) {
        let len = state.roomTypeList.length;
        state.roomTypeList.splice(0, len); // 赋值之前先清空
        // 如果查询没有数据，放一个空数据
        if (payload.list.length === 0) {
            state.roomTypeList.push({
                tid: '', // 标志
                repertory: '', // 库存
                type: '', // 类型
                loc: '', // 地区
                price: '', // 价格
                discount: '', // 折扣
                desc: '', // 描述
                img: '', // 预览
            })
        }
        else {
            for (let item of payload.list) {
                item['readOnly'] = true;
                state.roomTypeList.push(item);
            }
        }
        state.roomTypeInfoLen = payload.total;
    }
}
const actions = {
    // 获取所有房型信息
    getAllRoomTypeInfo(store, payload) {
        getRoomTypeInfo(payload).then(res => {
            if (res.code === 5000) {
                store.commit('getRoomTypeInfoVuex', res.data);
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