const state = {
	userInfo: {},
};
const getters = {};
const mutations = {
	// 这里要更新state
	setUserInfo(state, payload) {
		// 赋新值之前先清空原数据
		state.userInfo = {};
        for (let attr in payload) {
            state.userInfo[attr] = payload[attr];
        }
	},
	// 清空
	clear(state) {
		state.allCategoryGoods = {};
	}
};
const actions = {
	// 这里要调用接口，需要cate，然后再commit通知mutations方法
	setUser(store, payload) {
		store.commit('setUserInfo', payload);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
