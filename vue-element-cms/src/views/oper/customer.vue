<!-- 客户信息就昵称、电话、密码、身份证号 -->
<template>
    <div class="hk-liverecord">
		<el-row>
            <el-form :inline="true" :model="filter" class="demo-form-inline" size="mini">
                <el-form-item label="姓名">
                    <el-input v-model="filter.nickname" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="filter.idCard" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
		</el-row>
		<div class="table-area">
			<el-table
				:data="customerList"
				:border="false"
				style="width: 100%"
				:highlight-current-row="true"
				class="roomtype-tb"
                size="mini"
			>
				<el-table-column
					prop="nickname"
					label="客户"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="phone"
					label="电话号码"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="idCard"
					label="身份证号"
					width="150"
                    fixed
					align="center"
				>
				</el-table-column>
				<el-table-column
					label="操作"
					width=""
					align="center"
				>
					<template slot-scope="scope">
						<el-button @click="delOrNot(scope.row)" type="danger" size="mini" class="btn">删除</el-button>
						<el-button @click="edit(scope.row)" size="mini" class="btn">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block hk-pagination">
				<el-pagination
					background
					:current-page="filter.page"
					@size-change="sizeChange"
					@current-change="pageChange"
					:page-sizes="[5, 10, 15, 20]"
					:page-size="filter.size"
					layout="total, sizes, prev, pager, next"
					:total="customerInfoLen">
				</el-pagination>
			</div>
		</div>
		<div class="roomtype-info" v-show="flag">
			<div class="top">
				<h3 v-text="rMsg"></h3>
				<i class="el-icon-close close" @click="close"></i>
			</div>
			<el-row>
				<el-col :span="24">
					<div class="food-desc">
						<p><span>客户: </span><input type="text" v-model="spec.nickname" :readonly="spec.readOnly"></p>
						<p><span>电话号码: </span><input type="text" v-model="spec.phone" :readonly="spec.readOnly"></p>
						<p><span>身份证号: </span><input type="text" v-model="spec.idCard" :readonly="spec.readOnly"></p>
					</div>
				</el-col>
			</el-row>
			<div class="bottom-btn">
				<el-button plain @click="submit">确认</el-button>
				<el-button plain @click="close">取消</el-button>
			</div>
		</div>
		<div class="roomtype-info del-rect" v-show="delFlag">
			<el-button type="danger" size="mini" @click="delSure">确认</el-button>
			<el-button plain size="mini" @click="delCancer">取消</el-button>
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
			rMsg: '编辑信息',
			delObj: {},
			spec: {
				nickname: '', // 客户名
                phone: '',	// 客户电话
                idCard: '', // 客户身份证号
			},
			filter: {
				page: 1,
				size: 5,
                idCard: '',
                nickname: '',
			},
			flag: false, // 点击编辑弹出的信息框
			delFlag: false, // 点击删除时候的确认框
		};
	},
	computed: {
		...mapState('customer', ['customerList', 'customerInfoLen']),
		...mapState('user', ['user']),
	},
	methods: {
		...mapActions('customer', ['getAllCustomerInfo']),
		pageChange(e) {
			this.filter.page = e;
			this.init();
		},
		init() {
			// 发起请求
            this.getAllCustomerInfo(this.filter);
			this.close();
		},
        onSubmit() {
            this.init();
        },
		delOrNot(row) {
			this.delFlag = true;
			for (let attr in row) {
				this.delObj[attr] = row[attr];
			}
		},
		delSure() {
			// 删除逻辑
			this.$http.delCustomer(this.delObj).then(res => {
				if (res.code === 8000) {
					// this.$router.go(0);
					this.init();
				}
				this.$message(res.msg);
			});
		},
		delCancer() {
			this.delFlag = false;
		},
		edit(row) {
			// 显示弹框
			this.flag = true;
			// 将要编辑的这一行的信息赋值给spec
			for (let attr in row) {
				this.spec[attr] = row[attr];
			}
			this.spec['readOnly'] = false;
		},
		close() {
			// 回到页面初始状态
			this.flag = false;
			for (let attr in this.spec) {
				this.spec[attr] = '';
			}
		},
		submit() {
			this.$http.editCustomer(this.spec).then(res => {
				if (res.code === 8000) {
					// this.$router.go(0);
					this.init();
				}
				this.$message(res.msg);
			});
		},
		sizeChange(val) {
			this.filter.size = val;
			this.getAllCustomerInfo(this.filter);
		}
	},
	created() {
		/* 把工号加上 */
		this.delObj['eid'] = this.user.eid || getCookie('eid');
		this.spec['eid'] = this.user.eid || getCookie('eid');
		this.getAllCustomerInfo(this.filter);
	}
};
</script>

<style lang="scss" scoped>
.hk-liverecord {
	width: 100%;
	height: 100%;
	text-align: left;
	padding: 10px 20px;
	box-sizing: border-box;
	background-color: #394056;
	overflow: auto;
	position: relative;
	.el-row {
		.el-button {
			padding: 8px 15px;
		}
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
	.el-table {
		margin-top: 10px;
		background-color: transparent;
		border: none;
	}
	.el-table::before {
		width: 0;
	}
	.roomtype-info {
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
				width: 150px;
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
	.del-rect {
		padding: 30px;
	}
	.table-area {
		// overflow: hidden;
		.hk-pagination {
			float: right;
			margin-top: 15px;
			::v-deep span.el-pagination__total {
				color: #fff;
			}
			::v-deep span.el-pagination__jump {
				color: #fff;
			}
		}
		::v-deep .el-table__header-wrapper {
			background-color: #fff;
		}
		.roomtype-tb {
			.btn {
				padding: 5px 10px !important;
			}
		}
	}
}
</style>