import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
/* 引入整个Element */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import img from '@/utils/img';
Vue.prototype.$img = img;

// 将axios中调用接口的方法放到vue的原型上
import * as http from '@/api/index';
Vue.prototype.$http = http;

import router from './router/index';
import store from './store'

// 引入过滤器
import * as filters from '@/filters/index';
for (let key in filters) {
	Vue.filter(key, filters[key]);
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
