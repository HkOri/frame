let baseUrl = 'http://10.36.149.14:9999';
// 商品预览列表图标过滤器，添加前缀
export function imgPrefix(value) {
	return baseUrl + value;
}
// 商品预览列表价格添加前缀
export function pricePrefix(num) {
	return (
		'¥' +
		(+num || 0)
			.toString()
			.replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
	);
}
// 详情页
export function toThousandFilter(num) {
	return (+num || 0)
		.toString()
		.replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}
