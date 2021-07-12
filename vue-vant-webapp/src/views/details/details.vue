<template>
    <div class="hk-details">
		<div class="hk-details-nav">
			<van-nav-bar
				left-arrow
				@click-left="onClickLeft"
				@click-right="onClickRight"
			>
				<template #left>
					<span></span>
				</template>
				<template #right>
					<span></span>
				</template>
			</van-nav-bar>
		</div>
		<div class="hk-good-msg">
			<div class="hk-good-card">
				<img :src="item.img | imgPrefix" alt="" >
				<div class="hk-good-discount">
					<div class="price">
						<div class="new">¥<em v-cloak>{{item.price | toThousandFilter}}</em>.00</div>
						<div class="old">¥1499.00</div>
					</div>
					<div class="hk-good-msg-ms">
						<p>距离结束还有</p>
						<van-count-down :time="time">
							<template #default="timeData">
								<span class="block">{{ timeData.hours }}</span>
								<span class="colon">:</span>
								<span class="block">{{ timeData.minutes }}</span>
								<span class="colon">:</span>
								<span class="block">{{ timeData.seconds }}</span>
							</template>
						</van-count-down>
					</div>
				</div>
				<div class="hk-good-desc van-multi-ellipsis--l3 main">
					<div class="desc-word" v-text="item.desc">
						<!-- PHJ 加绒宽松连帽卫衣女2020秋冬女装大码中长款套头长袖灯笼袖上衣 tj2313 红色-加绒款 M（105-120斤） -->
					</div>
					<div class="like">
						<span>收藏</span>
					</div>
				</div>
			</div>
			<div class="hk-coupon-area">
				<!-- 优惠券单元格 -->
				<van-coupon-cell
					:coupons="coupons"
					:chosen-coupon="chosenCoupon"
					@click="showList = true"
				/>
				<!-- 优惠券列表 -->
				<van-popup
					v-model="showList"
					round
					position="bottom"
					style="height: 90%; padding-top: 4px;"
				>
				<van-coupon-list
					:coupons="coupons"
					:chosen-coupon="chosenCoupon"
					:disabled-coupons="disabledCoupons"
					@change="onChange"
					@exchange="onExchange"
				/>
				</van-popup>
			</div>
			<div class="hk-select-area">
				
			</div>
		</div>
        <van-goods-action>
            <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
            <van-goods-action-icon icon="chat-o" text="客服" dot />
            <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
            <van-goods-action-button type="warning" text="加入购物车" class="add" @touchend.native.prevent='addToCart'/>
            <van-goods-action-button type="danger" text="立即购买" class="buy" @touchend.native.prevent='buyNow' />
        </van-goods-action>
		
    </div>
</template>
<script>
const coupon = {
	available: 1,
	condition: '无使用门槛\n最多优惠12元',
	reason: '',
	value: 150,
	name: '优惠券名称',
	startAt: 1489104000,
	endAt: 1514592000,
	valueDesc: '1.5',
	unitDesc: '元'
};

import { getCookie } from '@/utils/cookie';
import {
	GoodsAction,
	GoodsActionIcon,
	GoodsActionButton,
	CountDown,
	Toast,
	CouponCell,
	CouponList,
	Popup,
	NavBar
} from 'vant';
export default {
	name: 'Details',
	data() {
		return {
			item: {},
			time: 30 * 60 * 60 * 1000, // 打折倒计时
			timer: '', // 定时器
			// -------------
			chosenCoupon: -1,
			coupons: [coupon],
			disabledCoupons: [coupon],
			showList: false
		};
	},
	components: {
		[GoodsAction.name]: GoodsAction,
		[GoodsActionIcon.name]: GoodsActionIcon,
		[GoodsActionButton.name]: GoodsActionButton,
		[CountDown.name]: CountDown,
		[Toast.name]: Toast,
		[CouponCell.name]: CouponCell,
		[CouponList.name]: CouponList,
		[Popup.name]: Popup,
		[NavBar.name]: NavBar
		// [Sku.name]: Sku
	},
	created() {
		// console.log(
		// 	getComputedStyle(window.document.documentElement)['font-size']
		// );
		this.getInfo();
		// 将Toast轻提示的持续时间设置为1s
		Toast.setDefaultOptions({ duration: 1000 });
	},
	beforeDestroy() {
		// 清除定时器
		clearTimeout(this.timer);
	},
	methods: {
		getInfo() {
			this.$http
				.getFocusGoodInfo({ id: this.$route.params.id })
				.then(res => {
					this.item = res;
				});
		},
		addToCart() {
			this.isLogin('add');
		},
		buyNow() {
			this.isLogin('buy');
		},
		isLogin(str) {
			if (!getCookie('token')) {
				// 轻提示先显示完毕再跳转到登录页面
				Toast('请先登录');
				this.timer = setTimeout(() => {
					window.location.href = '/login';
				}, 1000);
			} else {
				this.$http
					.addCart({
						good_id: this.item._id
					})
					.then(res => {
						console.log(res);
					});
				if (str === 'add') {
					Toast.success('添加成功');
				} else {
					this.$router.push('/cart');
				}
			}
		},
		// 折扣券
		onChange(index) {
			this.showList = false;
			this.chosenCoupon = index;
		},
		// param - code
		onExchange() {
			this.coupons.push(coupon);
		},
		// 头部返回
		onClickLeft() {
			this.$router.go(-1);
		},
		onClickRight() {
			Toast('未实现');
		}
	}
};
</script>

<style lang="scss" scoped>
html {
	font-size: 37.5px;
}
.hk-details {
	position: relative;
	& .main {
		width: 9.04rem;
		margin: 0 auto;
	}
	& .hk-details-nav {
		height: 1.2rem;
		width: 100%;
		position: absolute;
		z-index: 200;
		.van-nav-bar {
			background-color: transparent;
			span {
				width: 0.533333rem;
				height: 0.533333rem;
				padding: 0.133333rem;
				border-radius: 0.533333rem;
			}
			.van-nav-bar__left {
				padding-left: 0.133333rem;
				span {
					background: #666 url(./img/back.png) no-repeat center;
					background-size: 0.533333rem 0.533333rem;
				}
			}
			.van-nav-bar__right {
				padding-right: 0.133333rem;
				span {
					background: #666 url(./img/more.png) no-repeat center;
					background-size: 0.533333rem 0.533333rem;
				}
			}
		}
	}
	& .hk-good-msg {
		.hk-good-card {
			background-color: white;
			border-bottom-left-radius: 0.32rem;
			border-bottom-right-radius: 0.32rem;
			& > img {
				width: 10rem;
				height: 10rem;
				display: block;
			}
			& .hk-good-discount {
				width: 100%;
				height: 1.333333rem;
				background: url(./img/detailsmsbg.png) no-repeat 0 0;
				background-size: cover;
				display: flex;
				align-items: center;
				& .price {
					margin-left: 1.44rem;
					line-height: 1;
					color: #fff;
					margin-right: 0.16rem;
					& .new {
						font-size: 0.426667rem;
						& em {
							font-size: 0.64rem;
						}
						margin-bottom: 3px;
					}
					& .old {
						font-size: 0.32rem;
						opacity: 0.8;
						filter: alpha(filter=80);
						text-decoration: line-through;
					}
				}
				& .hk-good-msg-ms {
					// flex子项目靠近主轴右侧
					margin-left: auto;
					width: 28%;
					text-align: center;
					p {
						font-size: 0.32rem;
						text-align: center;
						color: #f71471;
					}
					.colon {
						display: inline-block;
						color: #ee0a24;
					}
					.block {
						display: inline-block;
						margin: 0 3px;
						width: 0.48rem;
						height: 0.586667rem;
						color: #fff;
						font-size: 0.32rem;
						text-align: center;
						background-color: #f71471;
						border-radius: 0.106667rem;
					}
				}
			}
			& .hk-good-desc {
				line-height: 0.56rem;
				font-weight: 700;
				color: #262626;
				font-size: 0.426667rem;
				display: flex;
				padding: 0.32rem 0;
				.desc-word {
					width: 7.653333rem; // 287
				}
				.like {
					width: 1.333333rem;
					margin-left: auto;
					text-align: center;
					// background-color: brown;
					& img {
						width: 0.48rem;
						height: 0.48rem;
						display: block;
						margin: 0 auto;
					}
					& span {
						display: block;
						line-height: 1;
						font-size: 0.32rem;
						color: #333;
						padding-top: 0.8rem;
						position: relative;
						&::before {
							content: ' ';
							position: absolute;
							top: 0;
							left: 50%;
							transform: translateX(-50%);
							width: 0.48rem;
							height: 0.48rem;
							background: url(./img/like.png) no-repeat 0 0;
							background-size: cover;
						}
						// 实现0.5像素边框
						&::after {
							content: ' ';
							position: absolute;
							left: 0;
							top: 0;
							height: 100%;
							width: 1px;
							background-image: linear-gradient(
								to right,
								transparent 50%,
								#ccc 50%
							);
						}
					}
				}
			}
		}
		.hk-coupon-area {
			margin-top: 0.32rem;
			.van-cell {
				border-radius: 0.32rem;
			}
			.van-popup {
				max-height: 14.773333rem; //554px;
				min-height: 9.04rem; //339px;;
			}
		}
	}
	& .van-goods-action {
		box-sizing: border-box;
		border-top: 1px solid #fafafa;
		justify-content: flex-end;
		& .van-goods-action-icon {
			width: 1.386667rem; // 52
		}
		& .van-goods-action-button {
			display: block;
			flex: 0 0 auto;
			width: 2.773333rem;
			height: 1.013333rem;
			margin: 0;
			margin-right: 0.133333rem;
			box-sizing: border-box;
			border-radius: 0.506667rem;
			&::before {
				display: none;
			}
			& span {
				font-size: 0.346667rem;
				font-weight: 700;
			}
		}
		& .add {
			margin-left: 0.213333rem;
			background-image: linear-gradient(
				135deg,
				#f2140c,
				#f2270c 70%,
				#f24d0c
			);
		}
		& .buy {
			background-image: linear-gradient(
				135deg,
				#ffba0d,
				#ffc30d 69%,
				#ffcf0d
			);
		}
	}
}
</style>