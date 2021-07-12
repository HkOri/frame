<template>
	<div class="hk-bar">
		<!-- 
			mode: 水平菜单模式还是垂直菜单模式
			collapse-transition: 是否开启折叠动画
		-->
		<el-menu
			default-active="/dashboard"
			:active-text-color="variables.menuActiveText"
			:background-color="variables.menuBg"
			:text-color="variables.menuText"
			:unique-opened="false"
			:collapse-transition="false" 
			mode="vertical"
			class="hk-menu"
		>
			<!-- 
				index: submenu的唯一标识，string/null
			-->
			<el-submenu
				v-for='item1 in routes'
				:index='item1.path'
				:key='item1.path'
				v-show='!item1.hidden'
			>
				<!-- 一级菜单 -->
				<template slot="title">
					<i :class="item1.icon"></i>
					<span slot="title" v-text='item1.text'></span>
				</template>
				<!-- 一级菜单下的二级菜单 -->
				<el-menu-item
					v-for='item2 in item1.children'
					:index="item1.path + '' + item2.path"
					:key='item2.path'
					v-show='!item2.hidden'
				>
					<!-- 
						还是用router-link来实现路由跳转
						为什么exact-active-class没有起作用呢
					-->
					<router-link
						:to='item1.path + "/" + item2.path'
						tag='div'
						exact-active-class='on'
						v-text='item2.text' 
					/>
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>

import variables from '@/styles/variables.scss'
import { constantRoutes } from '@/router'
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {
			routes: constantRoutes,
		}
	},
	computed: {
		...mapState('user', ['user']),
		variables() {
			return variables
		}
	},
	methods: {
		...mapActions('user', ['setOwnInfo']),
		judgeLevel(val) {
			let lv = val || this.user.level;
			for (let item of this.routes) {
				let tmp = item.level ?? [];
				if (!tmp.includes(lv)) {
					item['hidden'] = true;
				}
				else {
					item['hidden'] = false;
				}
			}
			// console.log(lv, 1);
		}
	},
	/* watch: {
		user: {
			handler(newVal) {
				if (newVal) {
					let lv = this.user.level;
					for (let item of this.routes) {
						let tmp = item.level ?? [];
						if (!tmp.includes(lv)) {
							item['hidden'] = true;
						}
						else {
							item['hidden'] = false;
						}
					}
				}
				// console.log(1);
			},
			deep: true
		}
	}, */
	created() {
		// this.judgeLevel(5);
		// 应对登录后页面刷新保持状态
		if (!this.user.eid) {
			this.$http.userLogin().then(res =>{
				// 说明登录成功，之所以是2000，是因为服务端设置的业务码是2000
				if (res.code === 2000) {
					this.setOwnInfo(res.data); // 登录成功后，将登录用户个人信息存入vuex
					this.judgeLevel();
					this.$forceUpdate(); // 强制页面组件更新，不然权限判断之后菜单组件还是不会变化
				}
			});
		}
		else {
			this.judgeLevel();
		}
	}
}
</script>

<style lang="scss" scoped>
.hkbar {
	.on {
		color: blue;
	}
	::v-deep .hk-menu {
		border: none;
	}
	ul {
		border: none;
	}
}
</style>
