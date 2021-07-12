module.exports = {
	devServer: {
		port: '8088', // 指定项目启动端口号为8088
		open: true,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true
			}
		}
	}
};
