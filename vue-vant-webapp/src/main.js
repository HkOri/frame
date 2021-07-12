import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// 引入路由
import { router } from '@/router/index';
// 引入状态管理
import store from '@/store/index';
// 引入过滤器
import * as filters from '@/filters/index';
for (let key in filters) {
	Vue.filter(key, filters[key]);
}

// 将axios中调用接口的方法直接放到Vue的原型上
import * as http from '@/api/api';
Vue.prototype.$http = http;

new Vue({
	store, // 挂载状态管理
	router, // 挂载路由
	render: h => h(App)
}).$mount('#app');
