<template>
    <div class="hk-footer-bar">
		<!-- route开启路由模式，fixed固定底部 -->
        <van-tabbar v-model="active" fixed route>
            <van-tabbar-item v-for="item in icons" :key="item.id" :to="item.route">
                <!-- <span v-text="item.msg"></span> -->
                <template #icon="props">
                    <img :src="props.active ? item.active : item.inactive" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
	name: 'hk-footer-bar',
	components: {
		[Tabbar.name]: Tabbar,
		[TabbarItem.name]: TabbarItem
	},
	data() {
		return {
			active: 0,
			icons: [
				{
					id: 0,
					route: '/home',
					active:
						'https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/67550/26/12426/5094/5d9c4b13Eea435a3f/81328b0609c60a3c.png',
					inactive:
						'https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/81741/30/12345/4140/5d9c4b13E726f0a1e/82c582e7c375e4b3.png'
				},
				{
					id: 1,
					route: '/find',
					active:
						'https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/48787/24/12910/3390/5d9c4b12Ee63270e4/4481f5b3dbad979d.png',
					inactive:
						'https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/56507/6/12787/3168/5d9c4b12Ef363dd8d/4af32f42575509d8.png'
				},
				{
					id: 2,
					route: '/surprise',
					active:
						'https://img12.360buyimg.com/img/s130x100_jfs/t1/152922/39/13124/3525/5ff2ae9eE4a0a7636/a161ad4f4d2bb5ea.png',
					inactive:
						'https://img12.360buyimg.com/img/s130x100_jfs/t1/152922/39/13124/3525/5ff2ae9eE4a0a7636/a161ad4f4d2bb5ea.png'
				},
				{
					id: 3,
					route: '/cart',
					active:
						'https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/64954/4/12406/3529/5d9c4b12Ee7a82735/f2fe0a88bf344736.png',
					inactive:
						'https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/64954/4/12406/3529/5d9c4b12Ee7a82735/f2fe0a88bf344736.png'
				},
				{
					id: 4,
					route: '/user',
					active:
						'https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/68400/36/12368/3153/5d9c4b13E0e0d80a8/876c40f17d91ce44.png',
					inactive:
						'https://img11.360buyimg.com/jdphoto/s130x100_jfs/t1/68400/36/12368/3153/5d9c4b13E0e0d80a8/876c40f17d91ce44.png'
				}
			]
			// icon: {
			// 	active: 'https://img.yzcdn.cn/vant/user-active.png',
			// 	inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
			// }
		};
	}
};
</script>
<style lang="scss" scoped>
.hk-footer-bar {
	& img {
		width: 1.6rem;
		height: 1.226667rem;
	}
}
</style>