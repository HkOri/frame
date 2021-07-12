import { getRoomTypeInfo } from '@/api/index';
const state = {
	roomInfo: [],
	/* 
		room: {
			_id
			desc,
			discount,
			img,
			loc,
			price,
			repertory,
			status,
			tid,
			type
		}
	*/
};
const getters = {};
const mutations = {
	// 这里要更新state
	setRoomInfo(state, payload) {
		// 赋新值之前先清空原数据
		state.roomInfo = [];
        for (let item of payload) {
			// 如果没有房间了，设置为不可点击
			if (item.repertory <= 0) {
				item['disabled'] = true;
			}
            state.roomInfo.push(item);
        }
	},
	// 清空
	clear(state) {
		state.roomInfo = [];
	}
};
const actions = {
	// 这里要调用接口，需要cate，然后再commit通知mutations方法
	getRoomInfo(store, payload) {
		getRoomTypeInfo(payload).then(res => {
			store.commit('setRoomInfo', res.data.list);
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
