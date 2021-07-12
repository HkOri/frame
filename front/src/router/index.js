import Vue from 'vue';
import VueRouter from 'vue-router';
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
		{ path: '/*', redirect: '/' }
	]
});
router.beforeEach((to, from, next) => {
	// 需要校验才能进入的页面
	const pages = ['/info'];
	// 要进入需要校验的页面
	if (pages.includes(to.path)) {
		// 校验条件
		if (localStorage.getItem('token')) {
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
});
export default router;
