import {
    getUserInfo,
    getMoreUserInfo,
} from '@/api/index';

const state = {
    user: {
        username: '',
		password: '',
		hireDate: '',
        email: '',
		idCard: '',
		salary: '',
		level: '',
		phone: '',
		contacts: '',
		telephone: '',
		loc: '',
		img: '',
		eid: '',
    }, 
    userList: [],
    userInfoLen: 0,
};
const getters = { }
const mutations = {
    // 获取当前用户信息
    getUserInfoVuex(state, payload) {
        for (let attr in state.user) {
            state.user[attr] = payload[attr];
        }
        sessionStorage.setItem('img', state.user.img);
        sessionStorage.setItem('level', state.user.level);
    },
    setUserInfoVuex(state, payload) {
        for (let attr in state.user) {
            state.user[attr] = payload[attr];
        }
    },
    // 获取当前用户权限下所能知晓的所有信息
    getMoreUserInfoVuex(state, payload) {
        let len = state.userList.length;
        state.userList.splice(0, len); // 赋值之前先清空

        // 如果查询没有数据
        if (payload.list.length === 0) {
            // 主动给userlist值
            state.userList.push({
                username: 'xxx',
                level: 'xxx',
                eid: 'xxx',
                phone: 'xxx',
                hireDate: 'xxx',
                img: '',
            })
        }
        else {
            for (let item of payload.list) {
                // 每一个item就是一个user
                state.userList.push(item);
            }
        }
        state.userInfoLen = payload.total;
    },
    clear(state) {
        state.userList = [];
    }
}
const actions = {
    // 获取自身信息 // 不用
    getOwnInfo(store, payload) {
        getUserInfo(payload).then(res => {
            if (res.code === 2000) {
                store.commit('getUserInfoVuex', res.data[0]);
            }
        });
    },
    // 设置自身信息
    setOwnInfo(store, payload) {
        store.commit('setUserInfoVuex', payload);
    },
    // 获取权限内可知的所有用户信息
    getMoreInfo(store, payload) {
        getMoreUserInfo(payload).then(res => {
            if (res.code === 2000) {
                store.commit('getMoreUserInfoVuex', res.data);
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