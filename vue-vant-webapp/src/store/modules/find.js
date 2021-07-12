import { getGoodInfo } from '@/api/api';
const state = {
	allCategoryGoods: {}
};
const getters = {};
const mutations = {
	// 这里要更新state
	updateAllCategoryGoods(state, payload) {
		// console.log(payload);
		state.allCategoryGoods[payload.index] = payload.info;
		state.allCategoryGoods = JSON.parse(
			JSON.stringify(state.allCategoryGoods)
		);
	},
	// 清空
	clear(state) {
		state.allCategoryGoods = {};
	}
};
const actions = {
	// 这里要调用接口，需要cate，然后再commit通知mutations方法
	getFocusGoodInfo(store, payload) {
		getGoodInfo({ cate: payload.cate }).then(res => {
			// console.log(res);
			// 触发一个mutations方法
			store.commit('updateAllCategoryGoods', {
				index: payload.index,
				info: res.list
			});
		});
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
