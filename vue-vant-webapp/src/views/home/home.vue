<template>
	<div class="hk-home">
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<div class="top-banner" v-disappear="bannerDisplay">
				<span>
					<img
						src="//m.360buyimg.com/mobilecms/jfs/t19480/10/1439571805/820/787bec2c/5ac9d730N04e6d766.png"
						@click="close"
					/>
					<img
						src="//img11.360buyimg.com/jdphoto/s80x80_jfs/t27847/91/107794072/6854/14716732/5b850ecaN644d2983.png"
						alt=""
					/>
					<span>打开京东App，购物更轻松</span>
				</span>
				<span><em>立即打开</em></span>
			</div>
			<div class="slide-bg"><div class="bg"></div></div>
			<div class="header-search">
				<img src="./img/homemenu.jpg" alt="" />
				<div class="input-wraper">
					<span></span>
					<input type="text" placeholder="美的电压力锅" />
				</div>
				<span>登录</span>
			</div>
			<div class="slide-show">
				<van-swipe
					class="my-swipe"
					:autoplay="3000"
					indicator-color="#fa2c19"
				>
					<van-swipe-item
						v-for="(item, index) in swipeImgs"
						:key="index"
						class="hk-swipe-img"
					>
						<img v-lazy="item.url" alt="" />
					</van-swipe-item>
				</van-swipe>
			</div>
			<div class="icon-nav">
				<van-swipe class="my-swipe" indicator-color="#fa2c19" :loop="loopFlag" @change="onChange">
					<van-swipe-item>
						<van-grid :border="false" :column-num="5" square>
							<van-grid-item v-for="(item, index) in iconNavImgsOne" :key="index" class="hk-icon-content">
								<van-image :src="item.url" class="hk-icon-img"/>
								<span v-text="item.msg" class="hk-icon-msg"></span>
							</van-grid-item>
						</van-grid>
					</van-swipe-item>
					<van-swipe-item>
						<van-grid :border="false" :column-num="5" square>
							<van-grid-item v-for="(item, index) in iconNavImgsTwo" :key="index" class="hk-icon-content">
								<van-image :src="item.url" class="hk-icon-img"/>
								<span v-text="item.msg" class="hk-icon-msg"></span>
							</van-grid-item>
						</van-grid>
					</van-swipe-item>
					<template #indicator>
						<div class="custom-indicator">
							<span :class='(current===0?"on":"")'></span>
							<span :class='(current===1?"on":"")'></span>
						</div>
					</template>
				</van-swipe>
			</div>
			<div class="banner-newmember main">
				<a href="javascript:;"><img src="./img/newmember-01.png" alt=""></a>
				<a href="javascript:;"><img src="./img/newmember-02.png" alt=""></a>
				<a href="javascript:;"><img src="./img/newmember-03.webp" alt=""></a>
			</div>
			<div class="hk-goods-list main">
				<img src="./img/youlike.png" alt="">
				<van-list
					v-model="loading"
					loading-text
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
					:immediate-check='false'
				>
					<section class="good" v-for="item in goodsList" :key='item._id' @touchstart='cursorStart(item._id, $event)' @touchend='cursorEnd'>
						<img :src="item.img | imgPrefix" alt="">
						<p v-text="item.desc" class="desc"></p>
						<p class="price">
							<span class="money" v-cloak>{{item.price | pricePrefix}}</span>
							<span class="similar">看相似</span>
						</p>
					</section>
				</van-list>
			</div>
		</van-pull-refresh>
		<commonFooter></commonFooter>
	</div>
</template>

<script>
// 导入图片数据
import { data } from '@/data/home';
// 引入底部tab栏
import commonFooter from '@/components/commonTabbar.vue';
// 引入接口
// import * as http from '@/api/api';
import Vue from 'vue';
import {
	Swipe,
	SwipeItem,
	Lazyload,
	Grid,
	GridItem,
	Image as VanImage,
	PullRefresh,
	Toast,
	List
} from 'vant';
// 注意，图片懒加载需要手动注册
Vue.use(Lazyload);
export default {
	name: 'Home',
	data: function () {
		return {
			bannerDisplay: 'block', // 纯粹是为了配合自定义指令
			loopFlag: false,
			current: 0,
			refreshing: false, // 下拉刷新是否正在进行完成
			loading: false, // List列表自动加载
			finished: false, // List列表自动加载
			page: 1,
			touchStartLoc: {}, // 触摸事件起点的坐标
			touchEndLoc: {}, // 触摸事件终点的坐标
			focusGoodId: '', // 要查看的商品详情的id
			total: 0, // 数据总条数
			swipeImgs: data.swipeImgs,
			iconNavImgsOne: data.iconNavImgsOne,
			iconNavImgsTwo: data.iconNavImgsTwo,
			goodsList: []
		};
	},
	components: {
		commonFooter,
		[Swipe.name]: Swipe,
		[SwipeItem.name]: SwipeItem,
		[Grid.name]: Grid,
		[GridItem.name]: GridItem,
		[VanImage.name]: VanImage,
		[PullRefresh.name]: PullRefresh,
		[List.name]: List
	},
	created() {
		this.getCommodityInfo(this.page);
	},
	watch: {
		// 这里不能监听起点位置，因为设置重点位置的函数在设置起点位置函数之后才执行
		touchEndLoc: function () {
			// console.log(
			// 	JSON.stringify(this.touchStartLoc),
			// 	JSON.stringify(this.touchEndLoc)
			// );
			if (
				JSON.stringify(this.touchStartLoc) ===
				JSON.stringify(this.touchEndLoc)
			) {
				this.$router.push('/good/' + this.focusGoodId);
			}
		}
	},
	methods: {
		// 自定义指令关闭头部广告
		close() {
			this.bannerDisplay = 'none';
		},
		// iconNav版切换的指示器高亮
		onChange(index) {
			this.current = index;
		},
		onLoad() {
			console.log('触底加载');
			setTimeout(() => {
				// 此时数据已经全部加载完毕
				if (this.goodsList.length === this.total) {
					this.finished = true;
					return;
				} else {
					this.getCommodityInfo(++this.page);
					this.loading = false;
				}
			}, 1000);
		},
		onRefresh() {
			setTimeout(() => {
				// 重置最初显示的数据条数
				this.page = 1;
				this.loading = false;
				// 重置，数据没有加载完毕
				this.finished = false;
				// 下拉刷新结束
				this.refreshing = false;
				// 重新赋值商品数据
				this.getCommodityInfo(this.page);
				Toast('刷新成功');
			}, 1000);
		},
		cursorStart(id, e) {
			this.focusGoodId = id;
			this.touchStartLoc = {
				x: e.changedTouches[0].screenX,
				y: e.changedTouches[0].screenY
			};
			// console.log(JSON.stringify(this.touchStartLoc));
		},
		cursorEnd(e) {
			this.touchEndLoc = {
				x: e.changedTouches[0].screenX,
				y: e.changedTouches[0].screenY
			};
			// console.log(JSON.stringify(this.touchEndLoc));
		},
		// skipToDetail(id) {
		// 	// console.log(this.$router);
		// 	// this.$router.push('/good/' + id);
		// 	console.log(e);
		// },
		getCommodityInfo(page) {
			this.$http.getGoodInfo({ size: 6, page }).then(res => {
				if (this.page === 1) {
					this.total = res.total;
					this.goodsList = res.list;
				} else {
					this.goodsList = [...this.goodsList, ...res.list];
				}
			});
		}
	},
	beforeDestroy() {
		console.log('要删除了？');
	},
	// 局部指令
	directives: {
		disappear: function (el, bind) {
			el.style.display = bind.value;
		}
	}
};
</script>

<style lang="scss" scoped>
.hk-home {
	margin-bottom: 1.333333rem;
	& .top-banner {
		width: 100%;
		height: 1.2rem;
		padding-top: 2px;
		box-sizing: border-box;
		background-color: #333333;
		font-size: 0; // 清除行内块元素之间的空格
		& > span {
			font-size: 14px;
			color: white;
			float: left;
			text-align: center;
			height: 100%;
			overflow: hidden; // bfc
			line-height: 1.2rem;
		}
		& > span:nth-of-type(1) {
			width: 7.493333rem; // 281*2px
			position: relative;
			padding-left: 1.813333rem; // 68*2
			box-sizing: border-box;
			& img {
				position: absolute;
				top: calc(50% - 1px);
				transform: translateY(-50%); // 垂直居中
			}
			& img:nth-last-of-type(1) {
				width: 0.8rem;
				height: 0.8rem;
				left: 0.906667rem;
			}
			& img:nth-of-type(1) {
				width: 0.266667rem;
				height: 0.266667rem;
				left: 0.266667rem;
			}
		}
		& > span:nth-last-of-type(1) {
			width: calc(100% - 7.5rem);
			background-color: #f63515;
			padding-top: 2px;
			position: relative;
			top: -2px;
			float: right;
		}
	}
	& .slide-bg {
		width: 100%;
		position: absolute; // 注意，如果父元素没有定位，而子元素有定位，overflow: hidden可能失效
		overflow-x: hidden;
		height: 3.866667rem;
		& .bg {
			background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
			position: absolute;
			width: 150%;
			left: -25%;
			height: 100%;
			border-bottom-left-radius: 100%;
			border-bottom-right-radius: 100%;
		}
	}
	& .header-search {
		height: 1.2rem; // 45px
		display: flex;
		align-items: center;
		justify-content: flex-start;
		z-index: 1000;
		width: 100%; // 要设定宽
		position: relative;
		top: -2.5px;
		& > img {
			width: 0.533333rem;
			height: 0.48rem;
			margin-left: 0.4rem;
			z-index: 1000;
		}
		& .input-wraper {
			z-index: 1000;
			width: 7.28rem; // 273
			height: 0.8rem;
			background-color: #f7f7f7;
			border-radius: 0.4rem;
			margin-left: 0.4rem;
			margin-right: 0.32rem;
			display: flex;
			align-items: center;
			& > span {
				width: 0.533333rem;
				height: 0.4rem;
				background: url('./img/jd-logo.jpg') no-repeat 0 0;
				background-size: 0.533333rem 0.4rem;
				margin-left: 0.4rem;
				padding-right: 0.16rem;
				border-right: 1px solid #dddddd;
				margin-right: 0.24rem;
			}
			& > input {
				width: 5.2rem;
				height: 0.4rem;
				border: 0;
				background: #f7f7f7 url('./img/search.jpg') no-repeat 0 0;
				background-size: 0.373333rem 0.373333rem;
				color: #757575;
				line-height: 0.4rem;
				text-indent: 0.72rem;
				font-size: 0.32rem;
			}
		}
		& > span {
			font-size: 0.373333rem;
			color: white;
			z-index: 1000;
			position: relative;
			top: -2.5px;
		}
	}
	& .slide-show {
		.my-swipe {
			margin-left: 0.346667rem;
			margin-right: 0.32rem;
			height: 3.733333rem;
			& img {
				// width: 100%;
				height: 100%;
			}
		}
		margin-bottom: 0.093333rem;
	}
	& .icon-nav {
		height: 4.32rem;
		& .my-swipe {
			position: relative;
			height: 100%;
			& .hk-icon-content {
				::v-deep .van-grid-item__content {
					background-color: #f6f6f6;
					padding: 0;
				}
			}
			& .hk-icon-img {
				width: 1.066667rem;
				height: 1.066667rem;
			}
			& .hk-icon-msg {
				text-align: center;
				font-size: 0.32rem;
				color: #666;
				margin-top: 0.16rem;
			}
			& .custom-indicator {
				position: absolute;
				bottom: 5px;
				height: 0.133333rem;
				width: 100%;
				text-align: center;
				font-size: 0;
				/* display: flex;
				align-items: center;
				justify-content: center; */
				& span {
					display: inline-block;
					width: 0.133333rem;
					height: 100%;
					background-color: #ccc;
					border-radius: 50%;
					margin: 0 0.08rem;
				}
				& span.on {
					background-color: #fa2c19;
				}
			}
		}
	} //162
	& .banner-newmember {
		font-size: 0;
		& a {
			display: inline-block;
			width: 50%;
			& img {
				width: 100%;
			}
		}
		& a:nth-last-of-type(1) {
			margin: 0.266667rem 0;
			width: 100%;
		}
	}
	& .hk-goods-list {
		// margin-bottom: 1.333333rem;
		& > img {
			width: 100%;
			display: block;
		}
		& .van-list {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			& section {
				background-color: #fff;
				border-radius: 0.266667rem;
				width: 4.613333rem; // 173
				height: 7.306667rem; // 274
				overflow: hidden;
				margin-bottom: 0.266667rem;
				& img {
					width: 100%;
					height: 4.613333rem;
					display: block;
				}
				& p.desc {
					font-size: 0.346667rem;
					height: 0.826667rem;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					color: #1a1a1a;
					margin-top: 0.133333rem;
					line-height: 0.426667rem;
					margin-bottom: 0.08rem;
					padding: 0 0.106667rem;
				}
				& p.price {
					font-size: 0.346667rem;
					overflow: hidden;
					height: 0.693333rem;
					line-height: 0.693333rem;
					position: relative;
					& .money {
						color: #fa2c19;
						font-weight: bold;
					}
					& .similar {
						position: absolute;
						font-size: 0.32rem;
						text-align: center;
						color: grey;
						padding: 0 0.133333rem;
						background-color: #f0f2f5;
						height: 0.586667rem;
						line-height: 0.586667rem;
						border-radius: 0.293333rem;
						right: 0.15rem;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
		::v-deep .van-list__loading {
			width: 100%;
		}
		::v-deep .van-list__finished-text {
			width: 100%;
			// text-align: center;
		}
	}
}
</style>