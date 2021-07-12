import Vue from 'vue';
import VueRouter from 'vue-router';
import { getCookie } from '@/utils/cookie';
// 注册路由
Vue.use(VueRouter);

import routes from './router';
// 导出路由
const router = new VueRouter({
	// history模式
	mode: 'history',
	routes: [
		...routes,
		// 针对无效的各种url，比如404
		{ path: '/*', redirect: '/home' }
	]
});
router.beforeEach((to, from, next) => {
	// 需要校验才能进入的页面
	const pages = ['/cart', '/user'];
	// 要进入需要校验的页面
	if (pages.includes(to.path)) {
		// 校验条件
		if (getCookie('token')) {
			// 检验通过
			next();
		} else {
			// 校验不通过
			next('/login');
		}
	}
	// 不是进入需要校验的页面，直接走默认就行
	else {
		next();
	}
	// console.log(to, from);
});

export { router };
