import {
    getFoodInfo
} from '@/api/index';

const state = {
    food: {
        name: '', // 名字
		loc: 0, // 地区
		img: '', // 图片
        price: 0, // 价格
        discount: 0, // 折扣
        desc: '', // 描述
        count: 0, // 数量
        sale: 0, // 销量
    }, 
    foodList: [],
    foodInfoLen: 0,
};
const getters = { }
const mutations = {
    getFoodInfoVuex(state, payload) {
        let len = state.foodList.length;
        state.foodList.splice(0, len); // 赋值之前先清空
        // 如果查询没有数据
        if (payload.length === 0) {
            state.foodList.push({
                name: 'xxx',
                img: '',
                price: 'xxx',
                discount: 'xxx',
                desc: 'xxx',
                count: 'xxx',
                sale: '',
                readOnly: true
            })
        }
        else {
            for (let item of payload) {
                item['readOnly'] = true;
                item['mask'] = false;
                state.foodList.push(item);
            }
        }
        state.foodInfoLen = payload.length;
    }
}
const actions = {
    // 获取美食信息
    getAllFoodInfo(store, payload) {
        getFoodInfo(payload).then(res => {
            if (res.code === 6000) {
                store.commit('getFoodInfoVuex', res.data);
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