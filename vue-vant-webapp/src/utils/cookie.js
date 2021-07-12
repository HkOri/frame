// 根据传入的参数获取该键对应的值
export function getCookie(key) {
	// 获取当前域名下所有的cookie
	let cookies = document.cookie;
	// 分割字符串，转为数组
	let arr = cookies.split('; ');
	// 遍历数组中所有元素
	for (let attr in arr) {
		// 再次把数组中元素进行分割
		let res = arr[attr].split('=');
		if (res[0] == key) {
			return decodeURI(res[1]);
		}
	}
}

// 添加cookie
export function setCookie(key, value, time) {
	/* console.log(key); */
	if (key) {
		// 获取当前时间
		let now = new Date();
		let end = now.getTime() - 8 * 3600 * 1000 + time * 1000;
		// 转码，以防止获取cookie内中文时出错
		value = encodeURI(value);
		// 重新把当前时间戳转为时间格式，并设置给cookie
		document.cookie = `${key}=${value};expires=${new Date(end)}`;
	}
}

// 删除cookie
export function delCookie(key, time) {
	setCookie(key, '', time);
}
