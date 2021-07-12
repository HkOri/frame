module.exports = {
	devServer: {
		port: 8081, // 修改项目启动窗口为8081，注意这里的端口号要和axios里面baseURL的端口一样
		open: true,
		proxy: {
			'/api': {
				target: 'http://10.36.149.14:9999',
				changeOrigin: true
			},
			// 京东数据的代理
			// 调不了，有两个参数一直在变化
			'/mcoss': {
				target: 'https://wq.jd.com',
				changeOrigin: true
			}
		}
	}
};
