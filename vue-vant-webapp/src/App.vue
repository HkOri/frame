<template>
	<div class="app">
		<router-view></router-view>
		<!-- 首页要保持活性 -->
		<keep-alive>
			<router-view name="alive"></router-view>
		</keep-alive>
	</div>
</template>

<script>
export default {
	name: 'App'
};
</script>

<style lang="scss">
html,
body {
	overflow-x: hidden;
	// overflow-y: hidden;
	// height: 100%;
	background-color: #f6f6f6;
}
.main {
	width: 9.466667rem;
	margin: 0 auto;
}
[v-cloak] {
	display: none;
}
@import url('./styles/common.scss');
</style>
