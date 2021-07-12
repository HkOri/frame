// 这个是辅助侧边栏高亮显示
export function asideRoute(value) {
	if (value[0].path === '/') {
		// console.log('命中');
		return '/';
	} else {
		// console.log(value[0].path + '/' + value[1].path);
		return value[0].path + '/' + value[1].path;
	}
}
