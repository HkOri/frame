/* 该文件用于Babel编译器，用于更加精细地指定js编译细节 */

// 两个非常重要的配置
// presets  用于指定当前环境中所使用的的js主版本有哪些(es6:@babel/preset-env,@babel/preset-react用于帮助浏览器识别jsx语法)
// plugin   用于指定特殊的js语法的编译功能
// @xxx     装饰器语法

module.exports = {
	presets: ['@babel/preset-env', '@babel/preset-react'],
	plugins: [
		// 这两个插件，用于编译 装饰器 语法
		["@babel/plugin-proposal-decorators", { "legacy": true }],
		["@babel/plugin-proposal-class-properties", { "loose" : false }],
		// 这个插件，用于编译 ()=>import() 动态导入的语法
		["@babel/plugin-syntax-dynamic-import"]
	],
};
