<template>
    <div class="hk-find">
        <div class="header">
			<van-nav-bar
				left-text="返回"
				left-arrow
				@click-left="onClickLeft"
			>
				<template #title>
					<input type="text">
				</template>
			</van-nav-bar>
		</div>
        <section class="hk-find-l">
            <van-sidebar v-model="activeKey" class="hk-sidebar">
                <van-sidebar-item :title="item.cate_zh" v-for="(item,index) in categoryList" :key="index"  />
            </van-sidebar>
        </section>
        <section class="hk-find-r">
            <van-grid square column-num="3">
                <van-grid-item 
					v-for="item in allCategoryGoods[activeKey]" 
					:key="item._id" 
					:icon="item.img|imgPrefix" 
					:text="item.name" />
            </van-grid>
        </section>
        <commonFooter></commonFooter>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import commonFooter from '@/components/commonTabbar.vue';
import { Sidebar, SidebarItem, Grid, GridItem, NavBar } from 'vant';
export default {
	name: 'Find',
	data: function () {
		return {
			activeKey: 0,
			categoryList: []
		};
	},
	components: {
		commonFooter,
		[Sidebar.name]: Sidebar,
		[SidebarItem.name]: SidebarItem,
		[Grid.name]: Grid,
		[GridItem.name]: GridItem,
		[NavBar.name]: NavBar
	},
	watch: {
		activeKey: function () {
			// 判断是否当前activekey对应的数据是否已经传送过来了
			// 如果没有，调用接口
			if (!this.allCategoryGoods[this.activeKey]) {
				this.getSpecialGoodInfo();
			}
			// console.log(this.allCategoryGoods);
			// this.$forceUpdate();
		}
	},
	computed: {
		...mapState('find', ['allCategoryGoods'])
	},
	methods: {
		...mapActions('find', ['getFocusGoodInfo']),
		...mapMutations('find', ['clear']),
		// async函数的返回值是Promise对象，await命令时内部then命令的语法糖
		// 正常情况下，await命令后面是一个Promise对象，返回该对象的结果，如果不是Promise对象，就直接返回对应的值
		async initialize() {
			let { list } = await this.$http.getCategory({});
			this.categoryList = list;
			// 之所以加async是因为要等到商品类别加载完毕再调用接口获取商品类别下的数据
			this.getSpecialGoodInfo();
		},
		getSpecialGoodInfo() {
			this.getFocusGoodInfo({
				index: this.activeKey,
				cate: this.categoryList[this.activeKey].cate
			});
		},
		onClickLeft() {
			this.$router.back();
		}
	},
	created() {
		this.initialize();
	},
	beforeDestroy() {
		this.clear();
	}
};
</script>
<style lang="scss" scoped>
.hk-find {
	background-color: #f6f6f6;
	position: relative;
	height: calc(100vh - 1.333333rem);
	overflow: hidden;
	& .header {
		height: 1.173333rem;
		background-color: chocolate;
		margin-bottom: 1px;
		overflow: hidden;
		.van-hairline--bottom::after {
			border-bottom: 2px solid #ccc;
		}
		::v-deep .van-nav-bar {
			height: 100%;
			::v-deep .van-nav-bar__content {
				height: 100%;
			}
		}
	}
	& .hk-find-l {
		position: absolute;
		height: calc(100% - 1.2rem);
		overflow: auto;
		width: 2.266667rem; //85
		// background-color: cornflowerblue;
		& .hk-sidebar {
			width: 100%;
			& a {
				height: 1.226667rem;
				padding: 0;
				text-align: center;
				line-height: 1.226667rem;
			}
		}
	}
	& .hk-find-r {
		position: absolute;
		background-color: white;
		height: calc(100% - 1.2rem);
		width: calc(100% - 2.27rem);
		overflow: auto;
		left: 2.3rem;
		// background-color: cornflowerblue;
		.van-grid-item {
			::v-deep .van-grid-item__content {
				padding: 0;
			}
			::v-deep .van-grid-item__icon {
				font-size: 1.866667rem;
			}
			::v-deep .van-grid-item__text {
				color: #333;
			}
		}
	}
}
</style>