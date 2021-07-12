<template>
    <div class="hk-user">
		<div class="hk-user-top">
			<div class="hk-user-icon main">
				<van-image
					round
					width="2rem"
					height="2rem"
					src="https://img.yzcdn.cn/vant/cat.jpeg"
					fit="cover"
				/>
				<van-icon name="diamond-o" size="20" color="#fff" class="hk-user-member"/>
				<div class="hk-user-rightTop-icon">
					<van-icon name="chat-o" size="20" color="#fff" class="hk-user-msg" />
					<van-icon name="setting-o" size="20" color="#fff" class="hk-icon-settings" @touchend.native.prevent="set"/>
				</div>
				<a @click="loginOut">退出登录</a>
				<a @click="userInfo">个人信息</a>
				<van-popup v-model="addressArea" position="bottom" :style="{ height: '48%' }">
					<!-- value设置初始显示地区 -->
					<van-area 
						:area-list="areaList" 
						value="110101" 
						:columns-placeholder="['请选择', '请选择', '请选择']"
						@confirm='selectAddress' />
				</van-popup>
				<van-cell :title="address">
					<template #icon>
						<van-icon name="location-o" color="#fff"/>
					</template>
				</van-cell>
			</div>
		</div>
        <commonFooter></commonFooter>
    </div>
</template>
<script>
// 导入地址信息
import * as areaList from '@/data/address';
// 引入底部tab栏
import commonFooter from '@/components/commonTabbar.vue';
// 引入操作cookie的方法
import { delCookie } from '@/utils/cookie';
import {
	Image as VanImage,
	Lazyload,
	Icon,
	Popup,
	Area,
	Cell,
	CellGroup
} from 'vant';
export default {
	name: 'User',
	data() {
		return {
			addressArea: false,
			areaList: areaList.default,
			address: '请通过设置选择你的收货地址'
		};
	},
	components: {
		commonFooter,
		[VanImage.name]: VanImage,
		[Lazyload.name]: Lazyload,
		[Icon.name]: Icon,
		[Popup.name]: Popup,
		[Area.name]: Area,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup
	},
	methods: {
		loginOut() {
			delCookie('token');
			// 跳到登录
			this.$router.replace('/login');
		},
		// 用户个人信息
		userInfo() {
			console.log('当前用户信息为');
		},
		// 设置，目前只有地址
		set() {
			this.addressArea = true;
		},
		selectAddress(data) {
			// console.log(data);
			// 每次设置地址，先清空之前的地址
			this.address = '当前收货地址为：';
			for (let item of data) {
				this.address += item.name + ' ';
			}
			this.addressArea = false;
		}
	}
};
</script>
<style lang="scss" scoped>
.hk-user {
	.main {
		width: 90%;
		margin: 0 auto;
	}
	.hk-user-top {
		padding-top: 0.666667rem;
		height: 4.333333rem;
		box-sizing: border-box;
		background-color: rgba(225, 37, 27, 0.85);
		border-bottom-left-radius: 0.4rem;
		border-bottom-right-radius: 0.4rem;
		.hk-user-icon {
			position: relative;
			font-size: 0;
			a {
				font-size: 0.4rem;
				color: white;
				font-family: '楷体';
				line-height: 1;
				position: relative;
				left: 0.333333rem;
				bottom: 0.4rem;
			}
			a:nth-of-type(2) {
				margin-left: 0.266667rem;
			}
			.hk-user-rightTop-icon {
				position: absolute;
				right: 0;
				top: 0.2rem;
				.hk-user-msg {
					margin-right: 0.266667rem;
				}
			}
			.hk-user-member {
				position: absolute;
				top: 0.2rem;
				margin-left: 0.333333rem;
			}
			// 显示地址
			.van-cell {
				margin-top: 0.266667rem;
				padding: 0;
				padding-left: 0.2rem;
				background-color: transparent;
				justify-content: center;
				align-items: center;
				.van-cell__title {
					font-size: 0.373333rem;
					color: #fff;
					font-family: '楷体';
				}
			}
		}
	}
}
</style>