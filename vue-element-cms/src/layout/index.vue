<template>
	<div id="hk-layout">
		<el-container>
			<el-aside><hkAside/></el-aside>
			<el-container>
				<el-header><hkHeader/></el-header>
				<el-main>
					<!-- 给路由中children显示的位置 -->
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
// 导入组件
import hkAside from './components/aside';
import hkHeader from './components/header';
export default {
	name: 'Layout',
	components: {
		hkAside,
		hkHeader
	}
};
</script>

<style lang="scss" scoped>
#hk-layout {
	height: 100%;
}
.el-container {
	height: 100%;
	.el-header {
		height: 53px !important; // 50 + 35
		background-color: #fff;
	}
	.el-aside {
		width: 210px !important;
		height: 100%;
		background-color: #304156;
		text-align: left;
		// border-right: 3px double #fff;
		border-right: 1px solid #fff;
	}
}
.el-header,
.el-footer {
	background-color: #b3c0d1;
	color: #333;
	text-align: center;
	padding: 0;
}
.el-main {
	background-color: #e9eef3;
	color: #333;
	text-align: center;
	padding: 0;
}

body > .el-container {
	margin-bottom: 40px;
}
</style>
