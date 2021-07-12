import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// 导入路由
import router from './router';

// 引入过滤器
import * as filters from '@/filters/index';
for (let key in filters) {
	Vue.filter(key, filters[key]);
}

import img from './utils/img';
Vue.prototype.$img = img;


// 这一步引入整个ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 将axios中调用接口的方法放到vue的原型上
import * as http from '@/api/index';
Vue.prototype.$http = http;

// 挂载vuex
import store from '@/store/';

new Vue({
	store,
	router, // 挂载路由
	render: h => h(App)
}).$mount('#app');
