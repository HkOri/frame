import Vue from 'vue';
import Router from 'vue-router';
// import store from '@/store/index'

Vue.use(Router);

/* 导入layout的index.vue */
import Layout from '@/layout';
// 导入登录函数
// import * as ways from '@/api/index';

// 配置路由(嵌套路由)
const constantRoutes = [
	{
		path: '/',
		component: () => import('@/views/login/index'),
		hidden: true,
	},
	{
		path: '/resetpwd',
		component: () => import('@/views/login/reset'),
		hidden: true,
	},
	{
		path: '/dashboard',
		component: Layout,
		text: '营业数据概览',
		icon: 'el-icon-pie-chart',
		children: [
			{
				path: '',
				icon: 'el-icon-s-data',
				text: '数据概览',
				component: () => import('@/views/dashboard/index')
			}
		],
		level: [9]
	},
	{
		path: '/roomtype',
		component: Layout,
		text: '客房信息管理',
		icon: 'el-icon-s-home',
		children: [
			{
				path: '', // 注意，嵌套路由里面的路由不要加/
				text: '客房信息概览',
				component: () => import('@/views/roomtype/info')
			},
		],
		level: [9]
	},
	{
		path: '/employee',
		component: Layout,
		text: '员工信息管理',
		icon: 'el-icon-user-solid',
		children: [
			{
				path: '', // 注意，嵌套路由里面的路由不要加/，从reaact和aside组件来看并不是
				text: '员工信息概览',
				component: () => import('@/views/employee/info')
			},
			{
				path: 'update', // 注意，嵌套路由里面的路由不要加/
				text: '编辑员工信息',
				component: () => import('@/views/employee/edit'),
				name: 'employeeUpdate',
				props: true,
			}
		],
		level: [9]
	},
	{
		path: '/food',
		component: Layout,
		text: '餐饮信息管理',
		icon: 'el-icon-platform-eleme',
		children: [
			{
				path: '', // 注意，嵌套路由里面的路由不要加/
				text: '餐饮信息概览',
				component: () => import('@/views/food/info'),
			}
		],
		level: [9]
	},
	{
		path: '/oper',
		component: Layout,
		text: '员工操作项',
		icon: 'el-icon-s-promotion',
		level: [9, 5],
		children: [
			{
				path: '',
				text: '消费信息登记',
				component: () => import('@/views/oper/food'),
			},
			{
				path: 'live',
				text: '住房信息登记',
				component: () => import('@/views/oper/live'),
			},
			{
				path: 'customer',
				text: '客户信息概览',
				component: () => import('@/views/oper/customer'),
			}
		]
	},
	{
		path: '*',
		redirect: '/',
		hidden: true, // hidden的作用是让这个路由不在二级菜单中显示，这个或许能在权限管理上派上作用
	}
];

const createRouter = () =>
	new Router({
		// mode: 'history', // require service support
		// scrollBehavior: () => ({ y: 0 }),
		routes: constantRoutes
	});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export { constantRoutes }

export default router;

// 路由守卫
router.beforeEach((to, from, next) => {
	// 后台所有页面除了登录页面全部都要登录后才能进入
	let utoken = localStorage.getItem('utoken');
	// 如果要进入的页面不是登录页并且没有身份信息，那么重定向到登录页面
	if (!utoken) {
		// 如果没有身份令牌，如果是去登录或者重置密码，那没问题
		if (to.path === '/' || to.path === '/resetpwd') {
			next();
		}
		// 否则回到登录
		else {
			next('/')
		}
	}
	else {
		next();
	}
})
