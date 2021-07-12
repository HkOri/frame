// 导入路由，懒加载模式
const Index = () => import('@/views/index.vue');
const Info = () => import('@/views/info.vue');
const Room = () => import('@/views/room.vue');

export default [
	{ path: '/', component: Index },
	{ path: '/room', components: { alive: Room }, name: 'order', props: true },
	{ path: '/info', component: Info },
];
