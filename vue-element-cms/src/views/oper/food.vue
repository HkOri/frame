<template>
    <div class="hk-foodrecord">
		<el-row>
			<el-button @click="add">新增</el-button>
		</el-row>
		<div class="table-area">
			<el-table
				:data="recordList"
				:border="false"
				style="width: 100%"
				:highlight-current-row="true"
				size="mini"
				class="roomtype-tb"
			>
				<el-table-column
					prop="name"
					label="开房人"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="date"
					label="时间"
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
					prop="idCard"
					label="身份证号"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="fname"
					label="食物名字"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="count"
					label="份额"
					width=""
					align="center"
				>
				</el-table-column>
				<el-table-column
					prop="price"
					label="单价"
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
						<el-button @click="delOrNot(scope.row)" type="danger" size="small">删除</el-button>
						<el-button @click="edit(scope.row)" size="small">编辑</el-button>
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
					:total="recordInfoLen">
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
				<el-form-item label="时间" prop="date">
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
				<el-form-item label="身份证号" prop="idCard">
					<el-input v-model="spec.idCard" :size="size" class="vid-input"></el-input>
				</el-form-item>
				<el-form-item label="房间号" prop="rid">
					<el-input v-model="spec.rid" :size="size" class="vid-input"></el-input>
				</el-form-item>
				<el-form-item label="食物名字" prop="fname">
					<el-select v-model="spec.fname" placeholder="请选择" :size="size" class="vid-input">
						<el-option :label="food.name"  v-for="(food, index) in foodChoice" :key="index" :value="food.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="份额" prop="count">
					<el-input v-model="spec.count" :size="size" class="vid-input"></el-input>
				</el-form-item>
				<el-form-item label="单价">
					<el-input v-model="spec.price" :size="size" class="vid-input" readonly></el-input>
				</el-form-item>
				<el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('spec')" size="mini">提交</el-button>
						<el-button @click="close" size="mini">取消</el-button>
					</el-form-item>
				</el-form-item>
			</el-form>

			<!-- <el-row>
				<el-col :span="24">
					<div class="food-desc">
						<p><span>开房人: </span><input type="text" v-model="spec.name" :readonly="spec.readOnly"></p>
						<div>
							<span>时间: </span>
							<div class="block">
								<el-date-picker
									v-model="spec.date"
									type="date"
									placeholder="选择日期"
									size="mini"
									format="yyyy年MM月dd日"
									value-format="yyyy-MM-dd"
									class="time-select"
								>
								</el-date-picker>
							</div>
						</div>
						<p><span>房间号: </span><input type="text" v-model="spec.rid" :readonly="spec.readOnly"></p>
						<p><span>身份证号: </span><input type="text" v-model="spec.idCard" :readonly="spec.readOnly"></p>
						<p><span>食物名字: </span><input type="text" v-model="spec.fname" :readonly="spec.readOnly"></p>
						<p><span>份额: </span><input type="text" v-model="spec.count" :readonly="spec.readOnly"></p>
						<p><span>单价: </span><input type="text" v-model="spec.price" :readonly="spec.readOnly"></p>
					</div>
				</el-col>
			</el-row>
			<div class="bottom-btn">
				<el-button plain @click="submit">确认</el-button>
				<el-button plain @click="close">取消</el-button>
			</div> -->
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
import * as checkMethods from '@/utils/validate.js';
export default {
	name: 'Info',
	data() {
		let validateFname = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('不能为空'));
			}
			else {
				for (let item of this.foodChoice) {
					if (item.name === value) {
						this.spec.price = item.price;
					}
				}
				callback();
			}
		};
		return {
			size: 'mini',
			rMsg: '编辑信息',
			delObj: {},
			spec: {
				name: '', // 开房人的名字
                date: '', // 时间
                idCard: '', // 身份证号
                loc: '', // 地区
                rid: '', // 房间号
				fname: '', // 美食名字
				count: '', // 点了几份
				price: '', // 单价
			},
			filter: {
				page: 1,
				size: 10,
				loc: '',
			},
			flag: false,
			delFlag: false, // 点击删除时候的确认框
			rules: {
                name: [
                    { validator: checkMethods.validateZh, trigger: 'blur' }
                ],
                date: [
                    { validator: checkMethods.validateZh, trigger: 'blur' }
                ],
                idCard: [
                    { validator: checkMethods.validateIdCard, trigger: 'blur' }
                ],
                rid: [
                    { validator: checkMethods.validateNumber, trigger: 'blur' }
                ],
                fname: [
                    { validator: validateFname, trigger: 'change' }
                ],
                count: [
                    { validator: checkMethods.validateNumber, trigger: 'blur' }
                ]
            },
		};
	},
	computed: {
		...mapState('user', ['user']),
		...mapState('food', ['foodList']),
		...mapState('foodrecord', ['recordList', 'recordInfoLen']),
		// 获取到可选的所有食物名字和对应的单价
		foodChoice: function() {
			let result = [];
			for (let item of this.foodList) {
				result.push({ name: item.name, price: item.price * item.discount });
			}
			return result;
		},

	},
	methods: {
		...mapActions('food', ['getAllFoodInfo']),
		...mapActions('foodrecord', ['getAllRecordInfo']),
		pageChange(e) {
			this.filter.page = e;
			this.init();
		},
		init() {
			// 发起请求
			this.filter.loc = this.user.loc || getCookie('loc');
			this.getAllRecordInfo(this.filter);
			this.close();
		},
		delOrNot(row) {
			this.delFlag = true;
			for (let attr in row) {
				this.delObj[attr] = row[attr];
			}
		},
		delSure() {
			// 删除逻辑
			this.$http.delFoodRecordInfo(this.delObj).then(res => {
				if (res.code === 9000) {
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
			// 图片预览
			let url = this.$img.imgBase + this.spec.img;
			this.fileList = [{ url }];
		},
		add() {
			// 显示弹框
			this.flag = true;
			// 头部信息变卦
			this.rMsg = '新增信息';
			this.spec['readOnly'] = false;
		},
		close() {
			// 回到页面初始状态
			this.flag = false;
			this.rMsg = '编辑信息';
			for (let attr in this.spec) {
				this.spec[attr] = '';
			}
			this.fileList = [];
			this.delFlag = false;
		},
		submit() {
			// 判断是更新还是新增
			if (this.rMsg === '新增信息') {
				// 新增逻辑，注意加上loc
				this.spec['loc'] = this.user.loc || getCookie('loc');
				this.$http.updateFoodRecordInfo(this.spec).then(res => {
					if (res.code === 9000) {
						// this.$router.go(0);
						this.init();
					}
					this.$message(res.msg);
				});
			}
			else {
				// 更新逻辑时候，在edit里面已经加上了loc了
				this.$http.updateFoodRecordInfo(this.spec).then(res => {
					if (res.code === 9000) {
						// this.$router.go(0);
						this.init();
					}
					this.$message(res.msg);
				});
			}
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
		sizeChange(val) {
			let loc = this.user.loc || getCookie('loc');
			this.filter.loc = loc;
			this.filter.size = val;
			this.getAllRecordInfo(this.filter);
		}
	},
	created() {
		let loc = this.user.loc || getCookie('loc');
		this.filter.loc = loc;
		/* 把工号加上 */
		this.delObj['eid'] = this.user.eid || getCookie('eid');
		this.spec['eid'] = this.user.eid || getCookie('eid');
		this.getAllRecordInfo(this.filter);
		// 要获取到目前所有的食物信息，然后根据食物信息来编辑或者新增
		if (!this.foodList.length) {
			// 去拿食物信息
			this.getAllFoodInfo({ loc });
		}
	}
};
</script>

<style lang="scss" scoped>
.hk-foodrecord {
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
		overflow: hidden;
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
	}
	.vid-input {
		width: 170px;
	}
	.time-select {
		width: 150px;
	}
}
</style>