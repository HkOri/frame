// prettier.config.js or .prettierrc.js
module.exports = {
	trailingComma: 'es5',
	tabWidth: 4,
	// 单行输出不换行的最大长度(默认80)
	printWidth: 80,
	useTabs: true,
	// semi: true, // 行尾添加分号
	singleQuote: true,
	// 在对象字面量声明所使用的的花括号前后输出空格{ foo: 'bar' }
	bracketSpacing: true,
	// 箭头函数不总是添加圆括号
	arrowParens: 'avoid',
	// 不加尾逗号
	trailingComma: 'none',
	proseWrap: 'never' // 是否要换行
};
