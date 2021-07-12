<template>
  <div id="app">
	<router-view></router-view>
  </div>
</template>

<script>
export default {
	name: 'App'
};
</script>

<style lang="scss">
html,
body,
#app {
	margin: 0;
	padding: 0;
	height: 100%;
	overflow: hidden;
	background-color: rgb(239, 241, 244);
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
		Microsoft YaHei, Arial, sans-serif;
}
</style>
