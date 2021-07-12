<template>
    <div class="hk-liverecord">
		<el-row>
            <el-form :inline="true" :model="filter" class="demo-form-inline" size="mini">
                <el-form-item label="姓名">
                    <el-input v-model="filter.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="filter.idCard" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="filter.state" placeholder="请选择">
                        <el-option label="完成(complete)" value="complete"></el-option>
                        <el-option label="待定(undetermined)" value="undetermined"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
			<el-button @click="add">新增</el-button>
		</el-row>
		<div class="table-area">
			<el-table
				:data="orderList"
				:border="false"
				style="width: 100%"
				:highlight-current-row="true"
				class="roomtype-tb"
                size="mini"
			>
				<el-table-column
					prop="name"
					label="开房人"
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
					prop="date"
					label="下单时间"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="roomId"
					label="房间类型标志"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="type"
					label="房间类型"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="inTime"
					label="入住时间"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="outTime"
					label="退房时间"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="rid"
					label="房间号"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="price"
					label="所付金额"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="state"
					label="订单状态"
					width=""
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
					:total="orderInfoLen">
				</el-pagination>
			</div>
		</div>
		<div class="roomtype-info" v-show="flag">
			<div class="top">
				<h3 v-text="rMsg"></h3>
				<i class="el-icon-close close" @click="close"></i>
			</div>

			<el-form
				status-icon
				class="demo-ruleForm"
				ref="spec" 
				:rules="rules"
				:model="spec" 
				label-width="100px" 
				label-position="left"
				:inline="true">
				<el-form-item label="开房人" prop="name">
					<el-input v-model="spec.name" :size="size" class="vid-input"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="idCard">
					<el-input v-model="spec.idCard" :size="size" class="vid-input"></el-input>
				</el-form-item>
				<el-form-item label="房间号" prop="rid">
					<el-input v-model="spec.rid" :size="size" class="vid-input"></el-input>
				</el-form-item>
				<el-form-item label="订房时间" prop="date">
					<div class="block">
						<el-date-picker
							v-model="spec.date"
							type="date"
							placeholder="选择日期时间"
							:size="size"
							format="yyyy 年 MM 月 dd 日"
							value-format="yyyy-MM-dd"
							class="vid-input"
						>
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="房间类型标志" prop="roomId">
					<el-select v-model="spec.roomId" placeholder="请选择" :size="size" class="vid-input" :disabled="(spec._id ? true : false)">
						<el-option :label="room.id"  v-for="room in roomTypeChoice" :key="room.id" :value="room.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="房间类型">
					<el-input v-model="spec.type" :size="size" class="vid-input" readonly></el-input><!-- 根据前面的类型标志自动变化 -->
				</el-form-item>
				<el-form-item label="入住时间" prop="inTime">
					<div class="block">
						<el-date-picker
							v-model="spec.inTime"
							type="date"
							placeholder="选择日期时间"
							:size="size"
							format="yyyy 年 MM 月 dd 日"
							value-format="yyyy-MM-dd"
							class="vid-input"
						>
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="退房时间" prop="outTime">
					<div class="block">
						<el-date-picker
							v-model="spec.outTime"
							type="date"
							placeholder="选择日期时间"
							:size="size"
							format="yyyy 年 MM 月 dd 日"
							value-format="yyyy-MM-dd"
							class="vid-input"
						>
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="需付金额" prop="price">
					<el-input v-model="spec.price" :size="size" class="vid-input" readonly=""></el-input><!-- 根据单价和时间计算 -->
				</el-form-item>
				<el-form-item label="订单状态" prop="state">
					<el-select v-model="spec.state" placeholder="请选择" :size="size" class="vid-input">
						<el-option :label="choose.desc"  v-for="choose in stateChoice" :key="choose.id" :value="choose.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('spec')" size="mini">提交</el-button>
						<el-button @click="close" size="mini">取消</el-button>
					</el-form-item>
				</el-form-item>
			</el-form>
		</div>
		<div class="roomtype-info del-rect" v-show="delFlag">
			<el-button type="danger" size="mini" @click="delSure">确认</el-button>
			<el-button plain size="mini" @click="delCancer">取消</el-button>
		</div>

    </div>
</template>

<script>
import { getCookie } from '@/utils/cookie'
import { mapState, mapActions } from 'vuex';
import * as checkMethods from '@/utils/validate.js';
export default {
	name: 'Info',
	data() {
		let validateRoomId = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('不能为空'));
			}
			else {
				for (let item of this.roomTypeChoice) {
					if (item.id === value) {
						this.spec.type = item.type;
						let days = (Date.parse(this.spec.outTime) - Date.parse(this.spec.inTime)) / (1 * 24 * 60 *60 * 1000);
						days = (days === 0 ? 1 : days); // 至少1天算
						this.spec['price'] = days * item.price;
						this.mon = item.price;
					}
				}
				callback();
			}
		};
		let validateTime = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('不能为空'));
			}
			else {
				let days = (Date.parse(this.spec.outTime) - Date.parse(this.spec.inTime)) / (1 * 24 * 60 *60 * 1000);
				days = (days === 0 ? 1 : days); // 至少1天算
				this.spec['price'] = days * this.mon;
				callback();
			}
		}
		return {
			rMsg: '编辑信息',
			delObj: {},
			size: 'mini',
			spec: {
				rid: '', // 房号(这个得酒店前台在客户到酒店之后，给出钥匙之后，在系统中处理编辑)
                name: '', // 谁订的房
                idCard: '', // 谁订的房
                date: '', // 什么时候订的房
				roomId: '', // 房型标志
                type: '', // 订了什么类型的房
                inTime: '', // 入住时间
                outTime: '', // 退房时间
				price: '',
                state: '', // 状态(complete, undetermined)
			},
			filter: {
				page: 1,
				size: 5,
                idCard: '',
                name: '',
                state: ''
			},
			flag: false,
			delFlag: false, // 点击删除时候的确认框
			rules: {
                name: [
                    { validator: checkMethods.validateZh, trigger: 'blur' }
                ],
				idCard: [
					{ validator: checkMethods.validateIdCard, trigger: 'blur' }
				],
                date: [
					{ validator: checkMethods.validateZh, trigger: 'blur' }
                ],
				roomId: [
					{ validator: validateRoomId, trigger: 'change' }
				],
				inTime: [
					{ validator: validateTime, trigger: 'blur' }
                ],
				outTime: [
					{ validator: validateTime, trigger: 'blur' }
                ],
				state: [
					{ validator: checkMethods.validateZh, trigger: 'change' }
                ],
            },
			mon: 0,
			stateChoice: [
				{ id: 0, value: 'complete', desc: '完成'},
				{ id: 1, value: 'undetermined', desc: '待定'},
			]
			// roomTypeChoice: []
		};
	},
	computed: {
		...mapState('user', ['user']),
		...mapState('roomtype', ['roomTypeList']),
		...mapState('roomorder', ['orderList', 'orderInfoLen']),
		roomTypeChoice: function() {
			let dt = [];
			for (let item of this.roomTypeList) {
				// 类型标志，类型，折算后的单价
				dt.push({
					id: item.tid,
					type: item.type,
					price: item.price * item.discount
				});
			}
			return dt;
		}
	},
	methods: {
		...mapActions('roomorder', ['getAllOrderInfo']),
		...mapActions('roomtype', ['getAllRoomTypeInfo']),
		pageChange(e) {
			this.filter.page = e;
			this.init();
		},
		init() {
			// 发起请求
            this.getAllOrderInfo(this.filter)
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
			this.$http.delRoomOrderInfo(this.delObj).then(res => {
				if (res.code === 10000) {
					// this.$message(res.msg);
					this.init();
				}
				this.$router.go(0);
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
			this.spec['readOnly'] = false; // 这个属性
			// 图片预览
			/* let url = this.$img.imgBase + this.spec.img;
			this.fileList = [{ url }]; */
			// 编辑的时候判断一下，如果编辑的记录状态已经是complete了，那么选项也设置成一个
			if (row.state === 'complete') {
				this.stateChoice = [ { id: 0, value: 'complete', desc: '完成'} ];
				// 因为接口写了当状态由待定变为完成时，对应客房类型会减去1，所以这里判断一下，如果编辑的这条信息本身已经是待定状态了，那么向服务端传数据时就不带上state
				// 还要给spec加个属性表明这条要编辑的信息本身已经是完成态了
				this.spec['nowState'] = 'yep';
			}
			// 编辑的时候同样,房间类型的标志也不能修改
			// this.roomTypeChoice = [].push(row.roomId)
		},
		add() {
			// 显示弹框
			this.flag = true;
			// 头部信息变卦
			this.rMsg = '新增信息';
			this.spec['readOnly'] = false;
			// 新增的时候只有待定
			this.stateChoice = [ { id: 1, value: 'undetermined', desc: '待定'} ];
		},
		close() {
			// 回到页面初始状态
			this.flag = false;
			this.rMsg = '编辑信息';
			for (let attr in this.spec) {
				this.spec[attr] = '';
			}
			// this.fileList = [];
			// 回到初始状态
			this.stateChoice = [
				{ id: 0, value: 'complete', desc: '完成'},
				{ id: 1, value: 'undetermined', desc: '待定'},
			];
		},
		submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submit();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
		submit() {
			// 判断是更新还是新增
			if (this.rMsg === '新增信息') {
				this.$http.updateRoomOrderInfo(this.spec).then(res => {
					if (res.code === 10000) {
						// this.$router.go(0);
						this.init();
					}
					this.$message(res.msg);
				});
			}
			else {
				// 更新逻辑时候，在edit里面已经加上了loc了
				this.$http.updateRoomOrderInfo(this.spec).then(res => {
					if (res.code === 10000) {
						// this.$router.go(0);
						this.init();
					}
					this.$message(res.msg);
				});
			}
			this.close();
		},
		sizeChange(val) {
			this.filter.size = val;
			this.getAllOrderInfo(this.filter);
		}
	},
	created() {
		this.getAllOrderInfo(this.filter);
		// 得去拿所有房型的信息
		let loc = this.user.loc || getCookie('loc');
		/* 把工号加上 */
		this.delObj['eid'] = this.user.eid || getCookie('eid');
		this.spec['eid'] = this.user.eid || getCookie('eid');
		// 没有要去拿
		if (!this.roomTypeList.length) {
			this.getAllRoomTypeInfo({ loc });
		}
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
				padding: 5px 7px !important;
			}
		}
	}
	.vid-input {
		width: 170px;
	}
}
</style>