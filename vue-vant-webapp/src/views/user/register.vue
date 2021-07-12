<template>
    <div class="hk-login main">
        <van-nav-bar @click-left="onClickLeft">
            <template #left>
                <span class="left-arrow"></span>
            </template>
            <template #title>
                <span class="title">京东注册</span>
            </template>
        </van-nav-bar>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="用户名"
                autocomplete="off"
                placeholder="用户名/邮箱/手机号"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                placeholder="请输入密码"
                autocomplete="off"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                v-model="rePassword"
                type="password"
                name="确认密码"
                placeholder="请确认密码"
                autocomplete="off"
                :rules="[{ required: true, message: '请确认密码' }]"
            />
            <div class="login-button">
                <van-button round block type="info" native-type="submit">注册</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
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
			password: '',
			rePassword: '',
			timer: null
		};
	},
	created() {
		Toast.setDefaultOptions({ duration: 2000 });
	},
	beforeDestroy() {
		// 销毁定时器
		clearTimeout(this.timer);
	},
	methods: {
		onSubmit() {
			if (this.password !== this.rePassword) {
				Toast('两次密码不一致');
			} else {
				this.$http
					.registerUser({
						username: this.username,
						password: this.password,
						password2: this.rePassword
					})
					.then(res => {
						// username：superadmin，password：123456
						// 注册成功，等提示完成再跳转
						if (res === 1) {
							this.username = '';
							this.password = '';
							this.rePassword = '';
							this.timer = setTimeout(() => {
								// 跳到登录页面
								window.location.href = '/login';
							}, 2000);
						}
					});
			}
		},
		onClickLeft() {
			this.$router.back();
		}
	}
};
</script>
<style lang="scss" scoped>
body {
	background-color: white;
}
.main {
	width: 8.666667rem;
	margin: 0 auto;
}
.hk-login {
	font-size: 0.32rem;
	text-align: center;
	color: #ccc;
	.van-nav-bar__content {
		height: 1.173333rem;
		.van-nav-bar__left {
			padding-left: 0;
		}
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
			letter-spacing: 0.106667rem;
			background-image: linear-gradient(
				90deg,
				#fab3b3,
				#ffbcb3 73%,
				#ffcaba
			);
			border: none;
			margin-bottom: 0.266667rem;
			box-shadow: 0 0.266667rem 0.533333rem 0 rgba(255, 62, 62, 0.2);
		}
		.login-button {
			margin-top: 0.426667rem;
		}
	}
}
</style>