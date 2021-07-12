<template>
  <div id="app">
    <router-view></router-view>
    <!-- 房间信息那一页要保持活性 -->
    <keep-alive>
      <router-view name="alive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.hk-main {
	width: 1200px;
	margin: 0 auto;
}
@import url('./styles/common.scss');
</style>
