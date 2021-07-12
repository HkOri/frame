<template>
    <div class="hk-foods">
		<div class="food-info-container">
			<div class="hk-food">
				<div 
					@mouseenter="maskDisplay(item)" 
					@mouseleave="maskHide(item)" 
					v-for="item in foodList" 
					:key="item._id" 
					class="el-coll"
				>
					<el-card>
						<el-image
							:src="$img.imgBase + item.img"		
							fit="cover"	
							class="food-img"
						>
							<div slot="error" class="image-slot">
								<i class="el-icon-picture-outline"></i>
							</div>
						</el-image>
					</el-card>
					<div class="mask" v-show="item.mask">
						<el-button type="info" round class="mask-btn" @click="seeMore(item)">查看详情</el-button>
					</div>
				</div>
				<div class="create" @click="createFood">+</div>
			</div>
		</div>
		<div class="food-info" v-show="flag">
			<div class="top">
				<h3 v-text="hMsg"></h3>
				<i class="el-icon-close close" @click="close"></i>
			</div>
			<el-row>
				<el-col :span="12">
					<div class="food-desc">
						<p><span>名字: </span><input type="text" v-model="spec.name" :readonly="spec.readOnly"></p>
						<p><span>价格: </span><input type="text" v-model="spec.price" :readonly="spec.readOnly"></p>
						<p><span>折扣: </span><input type="text" v-model="spec.discount" :readonly="spec.readOnly"></p>
						<p><span>描述: </span><input type="text" v-model="spec.desc" :readonly="spec.readOnly"></p>
						<!-- <p><span>数量: </span><input type="text" v-model="spec.count" :readonly="spec.readOnly"></p>
						<p><span>销量: </span><input type="text" v-model="spec.sale" :readonly="spec.readOnly"></p> -->
					</div>
				</el-col>
				<el-col :span="12">
					<el-upload
						:action="$img.imgAction"
						list-type="picture-card"
						:on-preview="imgPreview"
						:on-success="imgSuccess"
						:file-list="fileList"
						:limit="1"
						name="file"
						class="img-upload"
					>
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-col>
			</el-row>
			<div class="bottom-btn">
				<el-button plain @click="edit(spec)" v-show="!insFlag">修改编辑</el-button>
				<el-button :type="type" @click="del(spec)" v-text="msg" v-show="!insFlag"></el-button>
				<el-button plain @click="ins(spec)" v-show="insFlag">确认</el-button>
				<el-button :type="type" @click="close" v-show="insFlag">取消</el-button>
			</div>
		</div>
    </div>
</template>

<script>
import { getCookie } from '@/utils/cookie';
import { mapState, mapActions } from 'vuex';
export default {
	name: 'Info',
	data() {
		return {
			msg: '删除此项',
			hMsg: '详细信息',
			type: 'danger',
			spec: {
				_id: '',
				name: '',
				img: '',
				price: '',
				discount: '',
				desc: '',
				count: '',
				sale: '',
			},
			flag: false,
			insFlag: false, // 是否新增的标志
			fileList: [],
			dialogImageUrl: '',
            dialogVisible: false
		};
	},
	computed: {
		...mapState('user', ['user']),
		...mapState('food', ['foodList']),
	},
    created() {
		/* let loc = this.user.loc || getCookie('loc');
        this.getAllFoodInfo({ loc }); */
		this.init();
    },
	methods: {
		...mapActions('food', ['getAllFoodInfo']),
		init() {
			let loc = this.user.loc || getCookie('loc');
			this.getAllFoodInfo({ loc });
			this.close();
		},
		edit(item) {
			item.readOnly = false;
			this.msg = '确认修改';
			this.type = 'success';
		},
		del(item) {
			item.readOnly = true;
			if (this.type === 'success') {
				// 发起修改请求
				/* 
					发起之前要先验证一下
					名字name、价格price、折扣discount、描述desc、图片img 
				*/
				this.$http.updateFoodInfo(item).then(res => {
					if (res.code === 6000) {
						this.$message(res.msg);
						this.init();
					}
				});
			}
			else {
				// 真删除
				this.$http.delFoodInfo({ name: item.name, loc: item.loc }).then(res => {
					if (res.code === 6000) {
						this.$message(res.msg);
						this.init();
					}
				});
			}
		},
		maskDisplay(item) {
			item.mask = true;
		},
		maskHide(item) {
			item.mask = false;
		},
		seeMore(ev) {
			for (let attr in ev) {
				this.spec[attr] = ev[attr];
			}
			let url = this.$img.imgBase + this.spec.img;
            this.fileList = [ { url } ]
			this.flag = true;
		},
		imgPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        imgSuccess(res) {
            // console.log('img res ----', res);
            this.spec.img = res.data.url;
        },
		createFood() {
			this.flag = true;
			this.insFlag = true;
			this.hMsg = '新增美食';
			// 新增的时候清空一下数据
			for (let attr in this.spec) {
				this.spec[attr] = '';
			}
			this.fileList = [];
			this.spec['readOnly'] = false;
			this.spec['loc'] = this.user.loc || getCookie('loc');
		},
		ins(item) {
			// 新增
			this.$http.updateFoodInfo(item).then(res => {
				if (res.code === 6000) {
					this.$message(res.msg);
					this.init();
				}
			});
		},
		close() {
			this.flag = false;
			this.insFlag = false;
			this.msg = '删除此项'; // 定稿后新加的
			this.type = 'danger'; // 定稿后新加的
			this.hMsg = '详细信息';
		},
	}
};
</script>

<style lang="scss" scoped>
.hk-foods {
	width: 100%;
	height: 100%;
	text-align: left;
	padding: 10px 20px;
	box-sizing: border-box;
	background-color: #394056;
	overflow: auto;
	position: relative;
	.hk-middle-box {
		overflow: hidden;
		.insert-btn {
			float: left;
			margin-right: 30px;
		}
	}
	.food-info-container {
		.hk-food {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			.el-coll {
				cursor: pointer;
				// overflow: hidden;
				position: relative;
				margin-top: 20px;
				margin-left: 20px;
				width: 18%;
				.mask {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(102, 102, 102, 0.8);
					border-radius: 5px;
					.mask-btn {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translateX(-50%) translateY(-50%);
					}
				}
				.food-img {
					border-radius: 5px;
					// border: 1px solid #ccc;
					box-shadow: 0 0 2px #ccc;
				}
			}
			/* .el-coll:nth-last-child(1)::after {
				content: '+';
				font-size: 50px;
				line-height: 230px;
				text-align: center;
				position: absolute;
				width: 100%;
				height: 100%;
				background-color: #fff;
				left: 100%;
				border-radius: 5px;
				top: 0%;
				margin-left: 20px;
			} */
			.create {
				width: 231px;
				height: 236px;
				background-color: #fff;
				border-radius: 6px;
				margin-top: 20px;
				margin-left: 20px;
				font-size: 50px;
				text-align: center;
				line-height: 236px;
				cursor: pointer;
			}
		}
		.hk-pagination {
			float: right;
			margin-top: 20px;
			padding-bottom: 20px;
		}
	}
	::v-deep label {
		color: white;
	}
	.demo-form-inline {
		margin-top: 10px;
		::v-deep .el-form-item {
			margin-right: 30px;
		}
		::v-deep .price {
			width: 60px;
			margin-right: 10px;
		}
	}
	.food-info {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateY(-50%) translateX(-50%);
		background-color: white;
		border-radius: 6px;
		padding: 10px 30px 30px 30px;
		box-shadow: 0 0 10px #666;
		p {
			overflow: hidden;
			input {
				border: 0;
				outline: none;
				width: 100px;
				font-size: 16px;
			}
		}
		.bottom-btn {
			text-align: center;
		}
		.img-upload {
			width: 150px;
			height: 150px;
			overflow: hidden;
		}
		.top {
			overflow: hidden;
			position: relative;
			h3 {
				float: left;
				font-size: 20px;
				line-height: 20px;
			}
			.close {
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				cursor: pointer;
			}
		}
	}
}
</style>