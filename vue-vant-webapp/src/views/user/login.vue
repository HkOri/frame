<template>
    <div class="hk-login main">
        <van-nav-bar @click-left="onClickLeft">
            <template #left>
                <span class="left-arrow"></span>
            </template>
            <template #title>
                <span class="title">京东登录注册</span>
            </template>
        </van-nav-bar>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="用户名"
                placeholder="用户名/邮箱/手机号"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                placeholder="请输入密码"
				autocomplete="false"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div class="login-button">
                <van-button round block type="info" native-type="submit">登录</van-button>
                <van-button round block type="info" native-type="submit">一键登录</van-button>
            </div>
        </van-form>
        <div class="quick-way">
            <span>短信验证码登录</span>
            <span @touchend='goRegister'>手机快速注册</span>
        </div>
        <div class="other-way">
            <h4>其他登录方式</h4>
            <div class="quick-type">
                <a>QQ</a>
                <a>微信</a>
                <a>苹果</a>
            </div>
        </div>
        <p class="policy">登录即代表您已同意<a>京东隐式政策</a></p>
    </div>
</template>

<script>
// 导入操作cookie的函数
import { setCookie } from '@/utils/cookie.js';
import { Form, Button, Field, NavBar, Toast } from 'vant';
export default {
	name: 'Login',
	components: {
		[Form.name]: Form,
		[Button.name]: Button,
		[Field.name]: Field,
		[NavBar.name]: NavBar,
		[Toast.name]: Toast
	},
	data() {
		return {
			username: '',
			password: ''
		};
	},
	created() {
		Toast.setDefaultOptions({ duration: 1000 });
	},
	methods: {
		onSubmit() {
			this.$http
				.loginUser({ username: this.username, password: this.password })
				.then(res => {
					// 登录成功，返回一个对象，对象里面是token字符串
					if (res !== 0) {
						// 登录成功，存入token
						setCookie('token', res.token);
						// localStorage.setItem('token', res.token);
						// 跳转到首页
						// window.location.href = '/home';
						this.$router.back();
					}
				});
		},
		onClickLeft() {
			this.$router.back();
		},
		goRegister() {
			this.$router.push('/register');
		}
	}
};
</script>
<style lang="scss" scoped>
.main {
	height: 100vh;
	background-color: white;
	width: 8.666667rem;
	padding: 0 25px;
}
.hk-login {
	font-size: 0.32rem;
	text-align: center;
	color: #ccc;
	// 头部的左返回箭头
	::v-deep .van-nav-bar__left {
		padding-left: 0;
	}
	.van-nav-bar__content {
		height: 1.173333rem;
		.left-arrow {
			width: 0.64rem;
			height: 0.64rem;
			// background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAAYpJREFUaAXtmLFOwzAQhhvKE2Rnygu1EhIDezeeho2doRIDG++BhARDNvY8QZX+f6ilArbjs1t0FmcpcWPfnf/v6sinLBbWLAOWAcuAZeA/Z6A5FXzXdSvEuj/E2/R9/3Kq2LE4l7HJ1DmIvxnH8RH2S/o0TfOA7oq/z90uShf4Kb40ntS/CCAgfgcRd1IhufbZACHx2D632P/PuYKkflkv8Yz4rVREib0YQJN4gosAtIkXAWgUnwygVXwSgGbxswDaxUcBahAfBKhFvBcA4lcozJ4wORVmNELbHU7YPz2kvpaO332lBEviKsQTzQcQR1Y26wNgJcmK0rUla32+F25AU3+8VSZdwzC8t237gYc1LgfIfs1xzL9NhkpuvwCoiyJrgfAC1AQRBKgFIgpQA8QsgHaIJADNEMkAWiFEABohxADaILIAEiBeeaLT7tzNlQpZ6+AD1pZlNpy/1U54dh95s+JKnIoAuFAAQqKhyLYY4AjiGv/GJy+MbYpUmbNlwDJgGbAMWAYSM7AH/J4Amlfxzk4AAAAASUVORK5CYII=);
			background-image: url(./img/leftarrow.png);
			background-size: cover;
		}
		.title {
			font-size: 0.453333rem;
		}
	}
	// 去除导航栏的地步边框
	.van-hairline--bottom::after {
		border-bottom: none;
	}
	.van-form {
		.van-cell {
			margin-top: 0.533333rem;
			padding-left: 0;
			.van-field__control {
				font-size: 0.426667rem;
				color: #000;
			}
			input {
				height: 0.773333rem;
			}
		}
		.van-cell::after {
			left: 0;
			right: 0;
			border-bottom: 1px solid #efefef;
		}
		.van-button--info {
			font-size: 0.4rem;
			height: 1.333333rem;
		}
		.van-button--info:nth-of-type(1) {
			letter-spacing: 0.106667rem;
			background-image: linear-gradient(
				90deg,
				#fab3b3,
				#ffbcb3 73%,
				#ffcaba
			);
			border: none;
			margin-bottom: 0.266667rem;
		}
		.van-button--info:nth-of-type(2) {
			letter-spacing: 1px;
			border: 1px solid #ff2000;
			color: #ff2000;
			background-color: #fff;
		}
		.login-button {
			margin-top: 0.426667rem;
		}
	}
	.quick-way {
		margin-top: 0.533333rem;
		display: flex;
		justify-content: space-between;
		font-size: 0.373333rem;
		color: #999999;
	}
	.other-way {
		margin-top: 2.346667rem;
		font-size: 0.32rem;
		color: #ccc;
		border-top: 1px solid #ddd;
		h4 {
			width: 3.733333rem;
			margin: -0.293333rem auto 0;
			background-color: #fff;
			vertical-align: baseline;
		}
		.quick-type {
			margin-top: 0.666667rem;
			font-size: 0;
			a {
				display: inline-block;
				font-size: 0.32rem;
				width: 1.28rem;
				margin: 0 0.45rem;
				padding-top: 1.413333rem;
				background-size: 100% auto;
				background-repeat: no-repeat;
				background-position: 0 0;
			}
			& a:nth-of-type(1) {
				background-image: url(./img/qq.png);
			}
			& a:nth-of-type(2) {
				background-image: url(./img/weixin.png);
			}
			& a:nth-of-type(3) {
				background-image: url(./img/iphone.png);
			}
		}
	}
	.policy {
		margin-top: 0.4rem;
		font-size: 0.346667rem;
		a {
			color: #4a90e2;
		}
	}
}
</style>