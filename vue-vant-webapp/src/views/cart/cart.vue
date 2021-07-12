<template>
    <div class="hk-cart">
		<van-nav-bar
			title="购物车"
			class="hk-cart-title"
			@click-left="onClickLeft"
		>
			<template #left>
				<span class="hk-left-arrow"></span>
			</template>
			<template #right>
				<span class="hk-right-more"></span>
			</template>
		</van-nav-bar>
		<div class="hk-good-cell" v-for="(item,index) in list" :key="index">
			<van-nav-bar>
                <template #left>
                    <van-checkbox @click="checkChange" v-model="item.checked" checked-color="#F93B19" icon-size=".46rem"></van-checkbox>
                </template>
                <template #title>
                    <span class="shop-icon"></span><a href="#">邻里有赞官方旗舰店</a>
                </template>
            </van-nav-bar>
			<van-swipe-cell>
				<van-checkbox @click="checkChange" v-model="item.checked" checked-color="#F93B19" icon-size=".46rem"></van-checkbox>
				<van-card
					:num="item.num"
					:price="item.good.price|toThousandFilter"
					:desc="item.good.desc"
					:title="item.good.name"
					class="goods-card"
					:thumb="item.good.img|imgPrefix"
				>
					<template #tags>
						<van-tag plain type="success">标签</van-tag>
						<van-tag plain type="danger">标签</van-tag>
					</template>
					<template #footer>
						<van-stepper 
							v-model="item.num" 
							input-width="36px" 
							button-size="15px" 
							:disable-input='true' 
							@change="numChange(item)"
						/>
						<p class="delCurrentGood"><span @click='delGood({index, item})'>删除</span></p>
					</template>
				</van-card>
			</van-swipe-cell>
		</div>
        <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit" v-show="!showNull">
			<van-checkbox @click="allCheck" v-model="allChecked" checked-color="#F93B19">全选</van-checkbox>
		</van-submit-bar>
		<van-dialog 
			v-model="show" 
			:show-cancel-button="true"
			:show-confirm-button="true" 
			class="hk-dialog" 
			:overlay="true"
			confirm-button-color="#fff"
			confirm-button-text="删除"
			@confirm="confirm"
		>
			<template #title>
				<span class="warnings"></span>
				<p>确认要删除此商品？</p>
			</template>
		</van-dialog>
		<!-- <div class="cart-null" v-show="showNull">
			<img src="./img/cartnull.png" alt="">
		</div> -->
		<van-empty 
			description="空空如也，快去选购吧~" 
			v-show="showNull" 
			image="https://img.yzcdn.cn/vant/custom-empty-image.png"
		/>
    </div>
</template>
<script>
// 引入底部tab栏
import {
	SwipeCell,
	Button,
	Card,
	Tag,
	Stepper,
	NavBar,
	Toast,
	Checkbox,
	CheckboxGroup,
	SubmitBar,
	Dialog,
	Empty
} from 'vant';
export default {
	name: 'Cart',
	data: function () {
		return {
			show: false, // 弹框
			delItem: {}, //要删除的商品
			allChecked: false,
			showNull: false, // 购物车为空时展示的图片
			// value: false,
			price: 0, // 付的钱
			list: [] // 所有商品
		};
	},
	components: {
		[SwipeCell.name]: SwipeCell,
		[Button.name]: Button,
		[Card.name]: Card,
		[Tag.name]: Tag,
		[Stepper.name]: Stepper,
		[NavBar.name]: NavBar,
		[Toast.name]: Toast,
		[CheckboxGroup.name]: CheckboxGroup,
		[Checkbox.name]: Checkbox,
		[SubmitBar.name]: SubmitBar,
		[Dialog.Component.name]: Dialog.Component,
		[Empty.name]: Empty
	},
	watch: {
		list: function () {
			if (!this.list.length) {
				this.showNull = true;
			} else {
				this.showNull = false;
			}
			// console.log('侦听器启动了');
		}
	},
	// computed: {
	// 	// 购物车中选中商品的总价钱
	// 	price: function () {
	// 		console.log('计算属性正在计算');
	// 		let num = 0;
	// 		this.list.map(ele => {
	// 			// console.log(ele);
	// 			if (ele.checked) {
	// 				// console.log('check成功', 'ele.checked', ele.checked);
	// 				num += ele.num * ele.good.price;
	// 			}
	// 		});
	// 		// ------------
	// 		// if (this.allChecked) {
	// 		// 	this.list.map(ele => {
	// 		// 		num += ele.num * ele.good.price;
	// 		// 	});
	// 		// } else {
	// 		// 	this.list.map(ele => {
	// 		// 		// console.log(ele); // 这里不对劲，输出ele里面checked是false，但是却能判定成功
	// 		// 		if (ele.checked) {
	// 		// 			// console.log('check成功', 'ele.checked', ele.checked);
	// 		// 			num += ele.num * ele.good.price;
	// 		// 		}
	// 		// 	});
	// 		// 	// console.log(num);
	// 		// }
	// 		// -----------

	// 		// 绑定的钱是到分
	// 		return num * 100;
	// 	}
	// },
	methods: {
		// 计算金额
		computePrice() {
			let num = 0;
			this.list.map(ele => {
				if (ele.checked) {
					num += ele.num * ele.good.price;
				}
			});
			this.price = num * 100;
		},
		// 底部全选框
		allCheck() {
			this.list.map(ele => {
				ele.checked = this.allChecked;
				// 值已经改变，但是视图不变，强制更新
				this.$forceUpdate();
			});
			this.computePrice();
		},
		// 每一个商品前面的选框
		checkChange() {
			this.allChecked = true;
			// 如果有一个商品没有选中，即全选框不可能为true‘
			for (let item of this.list) {
				if (!item.checked) {
					this.allChecked = false;
					break;
				}
			}
			this.computePrice();
		},
		onClickLeft() {
			this.$router.back();
		},
		onSubmit() {
			let goods = '';
			// 获取选中的商品的id
			this.list.map(ele => {
				if (ele.checked) {
					goods += ';' + ele._id;
				}
			});
			if (goods !== '') {
				this.$http.goToPay({ goods }).then(() => {
					this.init();
				});
			} else {
				Toast('请先勾选商品');
			}
		},
		// 点击商品数量增加/减小按钮
		numChange(item) {
			// 调用接口
			this.$http
				.changeCartGoodNum({ id: item._id, num: item.num })
				.then(res => {
					console.log(res);
				});
			// 如果更改的是已经选中的商品，则修改结算金额
			if (item.checked) {
				this.computePrice();
			}
		},
		// 商品信息排序显示
		sortGoodInfo() {
			this.list.sort(function (a, b) {
				return a.good_id - b.good_id;
			});
		},
		// 删除商品
		delGood(good) {
			this.delItem = good;
			this.show = !this.show; // 弹框提示
		},
		// 确认删除商品
		confirm() {
			this.$http.delCartGood({ id: this.delItem.item._id }).then(res => {
				console.log(res);
				// 页面上删除
				this.remove(this.delItem.index);
			});
		},
		remove(index) {
			this.list.splice(index, 1);
		},
		init() {
			// 调用接口获取购物车信息
			this.$http.getCartInfo().then(res => {
				this.list = res;
				this.sortGoodInfo();
			});
		}
	},
	created() {
		this.init();
	}
};
</script>
<style lang="scss" scoped>
.goods-card {
	margin: 0;
	background-color: white;
}
.delete-button {
	height: 100%;
}
.hk-cart {
	margin-bottom: 1.6rem;
	.cart-null {
		text-align: center;
		img {
			width: 5.333333rem;
		}
	}
	.hk-cart-title {
		height: 1.173333rem;
		margin-bottom: 0.266667rem;
		border-bottom: 1px solid rgba($color: #ddd, $alpha: 0.1);
		::v-deep .van-nav-bar__title {
			font-size: 0.48rem;
		}
		::v-deep .van-nav-bar__left {
			padding-left: 0;
		}
		::v-deep .van-nav-bar__right {
			padding-right: 0;
		}
		.hk-left-arrow {
			height: 100%;
			width: 1.173333rem;
			background: url(./img/leftarrow.png) no-repeat center;
			background-size: 0.533333rem 0.533333rem;
		}
		.hk-right-more {
			height: 100%;
			width: 1.173333rem;
			background: url(./img/more.png) no-repeat center;
			background-size: 0.533333rem;
		}
	}
	.hk-good-cell:nth-of-type(2) {
		.van-nav-bar {
			border-top-left-radius: 0.4rem;
			border-top-right-radius: 0.4rem;
		}
	}
	.hk-good-cell:nth-last-of-type(2) {
		.van-swipe-cell {
			border-bottom-left-radius: 0.4rem;
			border-bottom-right-radius: 0.4rem;
		}
	}
	.hk-good-cell {
		::v-deep .van-nav-bar .van-icon {
			color: #fff;
		}
		::v-deep .van-nav-bar__title {
			margin: 0;
			margin-left: 1.2rem;
			display: flex;
			justify-content: center;
			a {
				display: flex;
				color: #333;
				font-size: 0.32rem;
				font-weight: 500;
				line-height: 0.373333rem;
				position: relative;
				padding-right: 0.213333rem;
				&::after {
					content: '';
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
					width: 0.213333rem;
					height: 0.213333rem;
					background: url(./img/sprite-cart.png) no-repeat -3.12rem -0.933333rem;
					background-size: 126px 118px;
				}
			}
			.shop-icon {
				display: inline-block;
				width: 0.373333rem;
				height: 0.373333rem;
				margin-right: 0.16rem;
				background: url(./img/sprite-cart.png) no-repeat -1.12rem -2.773333rem;
				background-size: 126px 118px;
			}
		}
		.van-hairline--bottom::after {
			border-bottom: none;
		}
		.van-swipe-cell {
			position: relative;
			.van-checkbox {
				position: absolute;
				left: 0.4rem;
				top: 40%;
				transform: translateY(-50%);
				z-index: 2000;
			}
			.van-card {
				padding-top: 0.106667rem;
				padding-left: 1.2rem;
				.van-card__footer {
					margin-top: 0.266667rem;
					.delCurrentGood {
						margin-top: 0.266667rem;
					}
				}
			}
			::v-deep .van-nav-bar__content {
				height: 1.066667rem;
			}
			::v-deep .van-nav-bar__title {
				margin: 0;
				margin-left: 1.066667rem;
				a {
					color: #1f1f1f;
					font-size: 0.373333rem;
				}
			}
		}
	}
	.hk-dialog {
		position: fixed;
		left: 50%;
		top: 45%;
		color: #333;
		border-radius: 0.266667rem;
		width: 6.4rem; // 240
		height: 3.706667rem; // 139
		padding: 0.533333rem 0.4rem;
		transform: translateX(-50%) translateY(-50%);
		z-index: 999;
		background-color: white;
		::v-deep .van-dialog__header--isolated {
			padding: 0;
			padding-top: 0.133333rem;
		}
		.warnings {
			display: block;
			margin: 0 auto;
			margin-bottom: 0.266667rem;
			width: 1.333333rem;
			height: 1.333333rem;
			background: url(./img/cart.png) no-repeat -0.133333rem -0.133333rem;
			background-size: 4.373333rem 3.84rem; // 164 144
		}
		p {
			height: 0.64rem;
			font-size: 0.426667rem;
			text-align: center;
		}
		::v-deep .van-dialog__footer {
			margin-top: 0.533333rem;
			justify-content: space-between;
			.van-button {
				height: 0.8rem;
				width: 3.093333rem;
				border-radius: 0.4rem;
				border: 1px solid #ccc;
				flex: 0 0 auto;
				box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
				font-size: 0.373333rem;
			}
			.van-button:nth-of-type(2) {
				background-color: #f2270c;
			}
		}
	}
}
</style>