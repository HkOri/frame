<template>
	<div class="hk-login">
		<el-form 
			ref="loginForm" 
			:model="loginForm" 
			:rules="loginRules" 
			class="login-form" 
			autocomplete="on" 
			label-position="left">
			<div class="title-container">
				<h3 class="title">欢迎登录</h3>
			</div>
			<el-form-item prop="eid" class="hk-form-item">
				<i class="el-icon-user hk-login-icon"></i>
				<el-input
					ref="eid"
					v-model="loginForm.eid"
					placeholder="工号"
					name="eid"
					type="text"
					tabindex="1"
					autocomplete="off"
				/>
			</el-form-item>
			<el-form-item prop="password" class="hk-form-item">
				<i class="el-icon-lock hk-login-icon"></i>
				<el-input
					ref="password"
					v-model="loginForm.password"
					placeholder="密码"
					name="password"
					tabindex="2"
					type="password"
					autocomplete="off"
				/>
			</el-form-item>
			<el-form-item class="btn-box">
				<el-button type="primary" @click="submitForm('loginForm')" class="btn">登录</el-button>
				<router-link to="resetpwd" class="btn btn2">
					<el-button type="primary">重置密码</el-button>
				</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { setCookie } from '@/utils/cookie';
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {
			loginForm: {
				eid: '',
				password: ''
			},
			loginRules: {
				eid: [{ required: true, trigger: 'blur' }],
				password: [{ required: true, trigger: 'blur' }]
			},
		}
	},
	computed: {
		...mapState('user', ['user'])
	},
	watch: {
		user: {
			handler(newVal) {
				if (newVal) {
					if (newVal.level === 9) {
						this.$router.replace('/dashboard');
					}
					else if (newVal.level === 5) {
						this.$router.replace('/oper');
					}
				}
			},
			deep: true
		}
	},
	methods: {
		...mapActions('user', ['setOwnInfo']),
		login() {
			/* 
				200210413180516
				123456Qwer
			*/
			this.$http.userLogin(this.loginForm).then(res =>{
				// 说明登录成功，之所以是2000，是因为服务端设置的业务码是2000
				if (res.code === 2000) {
					// 登陆成功，保存token
					localStorage.setItem('utoken', res.token);
					// 登录成功保存工号和地区(保存地区是因为有其他功能需要用到)
					setCookie('eid', this.loginForm.eid);
					setCookie('loc', res.data.loc);
					setCookie('img', res.data.img); // 加一个
					// 三个cookie是为防止vuex数据出错
					this.setOwnInfo(res.data); // 登录成功后，将登录用户个人信息存入vuex
					// this.getOwnInfo({ eid: this.loginForm.eid }); // 在这一步向服务端发起请求获取当前登录用户的所有信息
				}
				else {
					this.$message(res.msg);
				}
			})
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
			if (valid) {
				this.login();
			} else {
				alert('请先正确填写信息');
				return false;
			}
			});
		},
		/* resetPwd() {
			console.log(1);
		} */
	}
}
</script>

<style lang="scss" scoped>
.hk-login {
	min-height: 100%;
	width: 100%;
	// background-color: rgba(28, 28, 28, 0.8);
	background: url(../../assets/idxbg.jpg) no-repeat 0 0;
	overflow: hidden;
	.login-form {
		position: relative;
		width: 450px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
		.hk-form-item {
			position: relative;
			.hk-login-icon {
				position: absolute;
				z-index: 1000;
				font-size: 20px;
				top: 50%;
				left: 10px;
				transform: translateY(-50%);
			}
			::v-deep input {
				text-indent: 20px;
			}
		}
	}
	.title-container {
		h3 {
			text-align: center;
			color: #eee;
		}
	}
	.btn-box {
		::v-deep .el-form-item__content {
			.btn {
				width: 45%;
				// width: auto;
				button {
					width: 100%;
				}
			}
			.btn2 {
				float: right;
			}
		}
	}
}
</style>
