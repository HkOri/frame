<template>
  <div class="hk-container">
    <div class="header">
        <img src="../assets/bg.jpg" alt="" class="bgImg">
        <div class="bgMask"></div>
		<section class="t">
			<div class="t-box hk-main">
				<img src="http://localhost:3000/upload/logo_03.png" class="logo" />
				<div class="grid-content bg-purple oper">
					<span @click="loginRect" v-show="!loginTrue">登录</span>
					<span @click="registerRect" v-show="!loginTrue">注册</span>
					<!-- 登录成功之后显示这个 -->
					<router-link to="/info" v-show="loginTrue" class="hk-avatar">
						<el-image :src="$img.imgBase + userInfo.img" :title="userInfo.nickname"></el-image>
						<!-- <el-avatar size="small" :src="$img.imgBase + userInfo.img" :title="userInfo.nickname"></el-avatar> -->
						<!-- <span v-text="userInfo.nickname"></span> -->
					</router-link>
					<router-link to="/room">
						<span>订房</span>
					</router-link>
					<span @click="loginOut" v-show="loginTrue">登出</span>
					<span class="r">订房热线：012-345-6789</span>
				</div>
			</div>
		</section>
    </div>

	<section class="time-panel">
		<h3>酒店预订</h3>
		<div class="time">
			<div class="block">
				<span class="demonstration">入住时间</span>
				<el-date-picker
					v-model="inTime"
					type="date"
					class="time-stamp"
					placeholder="选择日期"
					format="yyyy 年 MM 月 dd 日"
					value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
			<div class="block">
				<span class="demonstration">离开时间</span>
				<el-date-picker
					v-model="outTime"
					type="date"
					class="time-stamp"
					placeholder="选择日期"
					format="yyyy 年 MM 月 dd 日"
					value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
			<el-button type="primary" @click="goSubscribe">立即预定</el-button>
		</div>
	</section>

	<section class="timePanelAfterSection">
		<div class="img-desc">
			<div class="fadeInUp fadeOutLeft">
				<p>一年，52周</p>
				<h3>如果旅行更自由</h3>
				<p>一年至少在5个城市醒来</p>
				<br>
				<p>如果工作很忙碌</p>
				<p>一个月至少在2个城市加过班</p>
				<p>不问出发理由</p>
				<h3>只愿你“忙碌过后，得以乐休”</h3>
			</div>
			<el-image src="http://localhost:3000/upload/i_02.jpg" alt="" fit="cover" class="imgSee" />
		</div>
	</section>

	<section>
		<div class="title">
			<span class="title-tag">NEW DEFINATION NEW JOURNEY</span>
			<h2>乐休酒店&nbsp;&nbsp;|&nbsp;新定义·再出发</h2>
		</div>
		<div class="img-desc">
			<div class="fadeInUp fadeOutLeft">
				<p class="line">COMFORTABLE</p>
				<p>自在舒适</p>
			</div>
			<el-image src="http://localhost:3000/upload/i_04.jpg" alt="" fit="cover" class="imgSee" />
		</div>
		<div class="img-desc">
			<div class="fadeInUp fadeInUpR fadeOutRight">
				<p class="line">FREE AND EFFECT</p>
				<p>自由高效</p>
			</div>
			<el-image src="http://localhost:3000/upload/i_06.jpg" alt="" fit="cover" class="imgSee" />
		</div>
		<div class="img-desc">
			<div class="fadeInUp fadeInUpBk fadeOutLeft">
				<p class="line">LIVELY AND FUN</p>
				<p>活力风趣</p>
			</div>
			<el-image src="http://localhost:3000/upload/i_08.jpg" alt="" fit="cover" class="imgSee" />
		</div>
	</section>
	<section class="company">
		<h2>合作伙伴</h2>
		<el-image src="http://localhost:3000/upload/company.jpg" alt="" fit="cover"></el-image>
	</section>
    <div class="hk-foot">
		乐休(酒店)有限公司版权所有 2005-2021  粤ICP备20210511号
	</div>

	<!-- 下面全是弹框 -->
	
	<div class="hk-login" v-show="loginFlag">
		<div class="login-header">
			<h3>登录</h3>
			<i class="el-icon-close close" @click="close"></i>
		</div>
		<el-form 
			label-position="left" 
			:model="loginForm" 
			status-icon 
			:rules="rules" 
			ref="loginForm" 
			label-width="50px" 
			class="demo-ruleForm index-form" 
			size="mini"
		>
			<el-form-item label="昵称" prop="nickname">
				<el-input type="text" v-model="loginForm.nickname" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item class="vr-code" prop="inputcode">
				<template>			
					<div>
						<el-input v-model="loginForm.inputcode" placeholder="验证码" class="code"></el-input>
						<canvas width="132" height="42" ref='loginpainter' class="painter" @click="draw($event)"></canvas>
					</div>
				</template>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('loginForm')">点击提交</el-button>
				<el-button @click="close">取消登录</el-button>
				<el-button @click="findPwd" type="success">找回密码</el-button>
			</el-form-item>
		</el-form>
		<el-image :src='src' class="hk-img">
			<div slot="error" class="image-slot">
				<i class="el-icon-picture-outline"></i>
			</div>
		</el-image>
	</div>

	<div class="hk-login hk-findpwd" v-show="findPwdFlag">
		<div class="login-header">
			<h3>找回密码</h3>
			<i class="el-icon-close close" @click="close"></i>
		</div>
		<el-form 
			label-position="left" 
			:model="findForm" 
			status-icon 
			:rules="rules" 
			ref="findForm" 
			label-width="70px" 
			class="demo-ruleForm index-form" 
			size="mini"
		>
			<el-form-item label="昵称" prop="nickname">
				<el-input type="text" v-model="findForm.nickname" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="password">
				<el-input type="password" v-model="findForm.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="凭证码" prop="mailcode">
				<el-input type="text" v-model="findForm.mailcode" autocomplete="off" class="mailcode"></el-input>
				<el-button @click="getMailCode" type="success">获取凭证</el-button>
			</el-form-item>
			<el-form-item class="vr-code" prop="inputcode">
				<template>			
					<div>
						<el-input v-model="findForm.inputcode" placeholder="验证码" class="code"></el-input>
						<canvas width="132" height="42" ref='findpainter' class="painter" @click="draw($event)"></canvas>
					</div>
				</template>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="tofind('findForm')">点击提交</el-button>
				<el-button @click="close">取消找回</el-button>
			</el-form-item>
		</el-form>
		<el-image :src='src' class="hk-img">
			<div slot="error" class="image-slot">
				<i class="el-icon-picture-outline"></i>
			</div>
		</el-image>
	</div>

	<div class="hk-login hk-register" v-show="registerFlag">
		<div class="login-header">
			<h3>注册</h3>
			<i class="el-icon-close close" @click="close"></i>
		</div>

		<el-form 
			label-position="left" 
			:model="registerForm" 
			status-icon 
			:rules="rules" 
			ref="registerForm" 
			label-width="80px" 
			class="demo-ruleForm index-form" 
			size="mini"
		>
			<el-form-item label="昵称" prop="nickname">
				<el-input type="text" v-model="registerForm.nickname" autocomplete="off" placeholder="请输入昵称"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="repassword">
				<el-input type="password" v-model="registerForm.repassword" autocomplete="off" placeholder="请确认密码"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input type="text" v-model="registerForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="电话号码" prop="phone">
				<el-input type="text" v-model="registerForm.phone" autocomplete="off" placeholder="请输入手机号码"></el-input>
			</el-form-item>
			<el-form-item label="身份证号" prop="idCard">
				<el-input type="text" v-model="registerForm.idCard" autocomplete="off" placeholder="请输入身份证号码"></el-input>
			</el-form-item>
			<el-form-item class="vr-code" prop="inputcode">
				<template>			
					<div>
						<el-input v-model="registerForm.inputcode" placeholder="验证码" class="code"></el-input>
						<canvas width="132" height="42" ref='registerpainter' class="painter" @click="draw($event)"></canvas>
					</div>
				</template>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="toregister('registerForm')">提交</el-button>
				<el-button @click="reset">重置</el-button>
			</el-form-item>
		</el-form>
		<el-image :src='src' class="hk-img">
			<div slot="error" class="image-slot">
				<i class="el-icon-picture-outline"></i>
			</div>
		</el-image>
	</div>
  </div>
</template>

<script>
import drawCode from '@/utils/verification-code.js';
import ScrollReveal from 'scrollreveal';
import { mapState, mapActions } from 'vuex';
import * as validateFn from '@/utils/validateIndex'
export default {
    name: 'Index',
	computed: {
		...mapState('user', ['userInfo'])
	},
    data() {
		let validateRePwd = (rule, value, callback)=> {
			if (value === '') {
				callback(new Error('确认密码不能为空'));
			} else {
				if (value !== this.registerForm.password) {
					callback(new Error('两次密码不一致'));
				}
				else {
					callback();
				}
			}
		};
		let validateidCard = (rule, value, callback)=> {
			if (value === '') {
				callback(new Error('身份证号不能为空'));
			} else {
				let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				let _IDre15 =  /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
				if ((_IDRe18.test(value) || _IDre15.test(value))) {
					callback();
				}
				else {
					callback(new Error('身份证号码格式错误'))
				}
			}
		}
		let validateCode = (rule, value, callback)=> {
			if (value === '') {
				callback(new Error('验证码不能为空'));
			} else {
				let str = this.vrcode.join('');
				if (value != str) {
					callback(new Error('验证码错误'));
				}
				else {
					callback();
				}
			}
		}
		let validateMailCode = (rule, value, callback) => {
			if (value !== this.proof || value === '') {
				callback(new Error('凭证码错误'));
			} 
			else {
				callback();
			}
		}
        return {
			inTime: '', // 入住时间
			outTime: '', // 退房时间
			loginFlag: false, // 是否登录
			loginTrue: false, // 是否已成功登录
			registerFlag: false,
			findPwdFlag: false, // 是否点击找回密码
			// inputcode: '', // 客户输入的验证码
			vrcode: [], // 验证码数组
			proof: '', // 客户输入的凭证码
			loginForm: { // 登录的信息
				nickname: '',
				password: '',
				inputcode: ''
			},
			findForm: { // 重置密码信息
				nickname: '',
				password: '',
				mailcode: '',
				inputcode: '',
				oper: 'findPwd'
			},
			registerForm: { // 注册的信息
				nickname: '',
				password: '',
				repassword: '',
				email: '',
				phone: '',
				img: '',
				idCard: '',
				inputcode: '',
			},
			src: 'http://localhost:3000/upload/1619687233658-300.png', // 登录弹框旁的图片
			rules: {
                nickname: [
                    { validator: validateFn.validateNickname, trigger: 'blur' }
                ],
                password: [
                    { validator: validateFn.validatePwd, trigger: 'blur' }
                ],
                repassword: [
                    { validator: validateRePwd, trigger: 'blur' }
                ],
				email: [
					{ validator: validateFn.validateMail, trigger: 'blur' }
				],
                phone: [
                    { validator: validateFn.validatePhone, trigger: 'blur' }
                ],
                idCard: [
                    { validator: validateidCard, trigger: 'blur' }
                ],
				inputcode: [
					{ validator: validateCode, trigger: 'blur' }
				],
				mailcode: [
					{ validator: validateMailCode, trigger: 'blur' }
				]
            },
		}
    },
	created() {
		let token = localStorage.getItem('token');
		if (token) {
			this.$http.loginCustomer().then(dt => {
				if (dt.code === 8000) {
					this.init(dt);
					this.$message('欢迎回来');
				}
			});	
		}
	},
	mounted() {
		let slideUp = {
			distance: '600px',
			origin: 'right',
			opacity: 0,
			// interval: 500,
			delay: 1000,
			/* rotate: {
				x: 0,
				y: 0,
				z: 180
			}, */
		};
		let nodeList = document.querySelectorAll('.fadeOutLeft');
		ScrollReveal().reveal(nodeList, slideUp);
	},
	methods: {
		...mapActions('user', ['setUser']),
		loginOut() {
			// 退出登录即恢复到初始状态，token情况看
			localStorage.removeItem('token');
			this.reset();
			window.location.reload();
		},
		// 封装两种登录的共同代码
		init(dt) {
			// 登录成功
			this.loginTrue = true;
			// 将当前用户信息存入vuex
			this.setUser(dt.data);
			this.reset();
		},
		loginRect() { // 登录弹框
			this.loginFlag = true;
			drawCode(this.vrcode, this.$refs.loginpainter);
		},
		registerRect() { // 注册弹框
			this.loginFlag = false;
			this.registerFlag = true;
			drawCode(this.vrcode, this.$refs.registerpainter);
		},
		// 重置密码
		findPwd() {
			this.findPwdFlag = true;
			drawCode(this.vrcode, this.$refs.findpainter);
		},
		close() {
			// 关闭弹窗，清空之前填写的数据
			this.reset();
			this.loginFlag = false;
			this.registerFlag = false;
			this.findPwdFlag = false;
		},
		draw(ev) {
			drawCode(this.vrcode, ev.target);
		},
		submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login();
                } else {
                    console.log('error login!!');
                    return false;
                }
            });
        },
		toregister(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.register();
                } else {
                    console.log('error register!!');
                    return false;
                }
            });
        },
		getMailCode() {
			if (!this.findForm.nickname) {
				this.$message('请先填写昵称');
				return false;
			}
			else {
				this.$http.getMailCode({ nickname: this.findForm.nickname }).then(res => {
					this.$message(res.msg);
					if (res.code === 8000) {
						this.proof = res.data;
					}
				})
			}

		},
		tofind(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.find();
                } else {
                    console.log('error find!!');
                    return false;
                }
            });
        },
		login() {
			// 这里要发起请求了
			this.$http.loginCustomer(this.loginForm).then(dt => {
				let { code, token } = dt;
				// 登录成功
				if (code === 8000) {
					localStorage.setItem('token', token);
					this.init(dt);
					// 消除弹框
					this.loginFlag = false;
				}
				this.$message(dt.msg);
			});
		},
		register() {
			// 发起请求
			this.$http.registerCustomer(this.registerForm).then(dt => {
				let { code } = dt;
				// 注册成功
				if (code === 8000) {
					// 消除弹框
					this.registerFlag = false;
					this.reset(dt);
				}
				this.$message(dt.msg);
			});
		},
		find() {
			this.$http.findSelfPwd(this.findForm).then(res => {
				this.$message(res.msg);
				window.location.reload();
			});
		},
		reset() {
			for (let attr in this.registerForm) {
				this.registerForm[attr] = '';
			}
			for (let attr in this.loginForm) {
				this.loginForm[attr] = '';
			}
			for (let attr in this.findForm) {
				this.findForm[attr] = '';
			}
			this.$refs['registerForm'].resetFields();
			this.$refs['loginForm'].resetFields();
			this.$refs['findForm'].resetFields();
		},
		goSubscribe() {
			this.$router.push({ name: 'order', params: { timeOne: this.inTime, timeTwo: this.outTime } });
		}
	}
}
</script>

<style lang="scss" scoped>
.hk-container {
	font-family: '微软雅黑', Arial, sans-serif;
	position: relative;
	.header {
		position: relative;
		height: 660px;
		overflow: hidden;
		top: 0;
		left: 0;
		width: 100%;
		.bgMask {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba($color: #000000, $alpha: 0.2);
			background-image: linear-gradient(
				0deg,
				transparent 50%,
				rgba(0, 0, 0, 0.5)
			);
		}
		.bgImg {
			width: 100%;
		}
		.t {
			height: 80px;
			overflow: hidden;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			// background-color: rgba(255, 255, 255, 0.8);
			background-color: rgba(16, 58, 113, 0.93);
			color: #fff;
			.t-box {
				position: relative;
				height: 100%;
				.logo {
					height: 60px;
					float: left;
					padding-top: 10px;
				}
				.oper {
					text-align: right;
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
					span {
						margin: 0 10px;
						cursor: pointer;
					}
					span.r {
						margin-right: 0;
					}
					a {
						color: #fff;
						position: relative;
					}
					.hk-avatar {
						div {
							position: absolute;
							top: 50%;
							width: 30px;
							height: 30px;
							border-radius: 50%;
							transform: translateY(-50%) translateX(-180%);
						}
					}
				}
			}
		}
	}
	.time-panel {
		height: 300px;
		width: 1000px;
		background-color: rgba(16, 58, 113, 0.93);
		border-radius: 10px;
		margin: 0 auto;
		position: relative;
		bottom: 100px;
		color: #fff;
		h3 {
			font-size: 28px;
			text-align: center;
			padding-top: 70px;
			line-height: 1;
		}
		.time {
			display: flex;
			margin-top: 80px;
			justify-content: space-around;
			span {
				margin-right: 20px;
			}
			.time-stamp {
				::v-deep input {
					cursor: pointer;
				}
			}
		}
	}
	.timePanelAfterSection {
		margin-top: -50px;
	}
	.hk-login {
		position: fixed;
		left: 50%;
		top: 50%;
		transition: all 1s;
		transform: translateX(-50%) translateY(-50%);
		z-index: 21;
		background-color: white;
		border-radius: 5px;
		box-shadow: 0 0 15px #ccc;
		width: 450px;
		.login-header {
			position: relative;
			h3 {
				color: lightgreen;
				margin: 10px;
				text-indent: 5px;
			}
			.close {
				position: absolute;
				right: 15px;
				top: 50%;
				transform: translateY(-50%);
				cursor: pointer;
			}
		}
		.index-form {
			margin-left: 15px;
			::v-deep .el-input {
				width: 45%;
			}
		}
		.vr-code {
			margin-bottom: 0px;
			::v-deep .el-form-item__content {
				margin-left: 0px !important;
				.el-form-item__error {
					margin-top: -18px;
				}
			}
			.code {
				float: left;
				width: 100px;
				margin-right: 15px;
			}
			canvas {
				cursor: pointer;
			}
		}
		.hk-img {
			position: absolute;
			right: 20px;
			width: 30%;
			top: 20%;
			border-radius: 5px;
		}
	}
	.hk-register {
		.login-header {
			h3 {
				color: lightcoral;
			}
		}
	}
	.hk-findpwd {
		.mailcode {
			width: 23% !important;
		}
	}
	.hk-foot {
		background-color: #1b252e;
		text-align: center;
		color: #8a929c;
		height: 60px;
		line-height: 60px;
	}
	section {
		.img-desc {
			position: relative;
			font-size: 0;
			margin-bottom: 30px;
			.imgSee {
				width: 100%;
				text-align: center;
			}
			.fadeInUp {
				position: absolute;
				left: 18%;
				top: 50%;
				z-index: 3;
				color: #fff;
				font-size: 20px;
				transform: translateY(-50%);
				p {
					line-height: 30px;
				}
				h3 {
					font-size: 30px;
					font-weight: bolder;
				}
				.line {
					position: relative;
				}
				.line::after {
					content: '';
					width: 80px;
					height: 2px;
					background-color: #fff;
					position: absolute;
					top: -50px;
					left: 0%;
				}
			}
			.fadeInUpR {
				left: auto;
				right: 18%;
				.line::after {
					left: auto;
					right: 0%;
				}
			}
			.fadeInUpBk {
				color: #333;
				.line::after {
					background-color: #000;
				}
			}
		}
		.title {
			padding-top: 45px;
			text-align: center;
			margin-bottom: 20px;
			.title-tag {
				font-size: 20px;
				padding-top: 30px;
				display: inline-block;
				text-align: center;
				position: relative;
			}
			.title-tag::after {
				content: '';
				width: 20%;
				height: 2px;
				background-color: #000;
				position: absolute;
				left: 50%;
				top: 0;
				transform: translateX(-50%);
			}
		}
	}
	.company {
		padding: 10px;
		position: relative;
		margin-top: 20px;
		width: 1200px;
		margin: 20px auto;
		border: 5px solid #ccc;
		border-radius: 5px;
		h2 {
			position: absolute;
			top: 0%;
			left: 50%;
			transform: translateY(-50%) translateX(-50%);
			z-index: 10;
			width: 200px;
			text-align: center;
			background-color: #fff;
		}
	}
}
</style>
