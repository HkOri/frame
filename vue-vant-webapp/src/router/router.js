// 导入路由，懒加载模式
const Home = () => import('@/views/home/home.vue');
const Find = () => import('@/views/find/find.vue');
const Surprise = () => import('@/views/surprise/surprise.vue');
const Cart = () => import('@/views/cart/cart.vue');
const User = () => import('@/views/user/user.vue');
const Details = () => import('@/views/details/details.vue');
const Login = () => import('@/views/user/login.vue');
const Register = () => import('@/views/user/register.vue');

export default [
	{ path: '/home', components: { alive: Home } },
	{ path: '/find', component: Find },
	{ path: '/surprise', component: Surprise },
	{ path: '/cart', component: Cart },
	{ path: '/user', component: User },
	{ path: '/good/:id', component: Details },
	{ path: '/login', component: Login },
	{ path: '/register', component: Register }
];
