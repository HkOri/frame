<template>
    <div class="hk-employee">
        <el-form 
			:inline="true" 
			:model="formInline" 
			class="demo-form-inline demo-ruleForm" 
			status-icon
			size="mini"
			:rules="rules" 
			ref="formInline"
		>
            <el-form-item label="名称" prop="username">
                <el-input v-model="formInline.username" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="eid">
                <el-input v-model="formInline.eid" placeholder="请输入工号"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="formInline.idCard" placeholder="请输入身份证号"></el-input>
            </el-form-item>
            <el-form-item>
				<el-button type="primary" @click="submitForm('formInline')">查询</el-button>
            </el-form-item>
        </el-form>
		<!--  -->
		<div class="hk-middle-box">
			<el-button plain size="mini" class="insert-btn" @click="ins">新增</el-button>
			<el-form :inline="true" size="mini">
				<el-form-item>
					<el-select v-model="sort" placeholder="请选择排序条件">
						<el-option 
							v-for="item in sortFilters" 
							:label="item.desc" 
							:value="item.value" 
							:key="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model="sortNumber" placeholder="请选择排序条件">
						<el-option 
							v-for="item in sortWay" 
							:label="item.desc" 
							:value="item.value" 
							:key="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="sortByWay">条件排序</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!--  -->
		<div class="user-info-container">
			<div class="hk-user">
				<el-col v-for="item in userList" :key="item.idCard">
					<el-card :body-style="{ padding: '0px' }">
						<el-image
							:src="$img.imgBase + item.img"			
							class="user-img"
						>
							<div slot="error" class="image-slot">
								<i class="el-icon-picture-outline"></i>
							</div>
						</el-image>
						<div class="user-info">
							<p>用户名: <span v-text="item.username"></span></p>
							<p>权限级别: <span v-text="item.level"></span></p>
							<p>工号: <span v-text="item.eid"></span></p>
							<p>手机号码: <span v-text="item.phone"></span></p>
							<p>雇佣时间: <span v-text="item.hireDate"></span></p>
							<el-button plain @click="seeMore(item)">查看更多</el-button>
							<el-button plain @click="edit(item)">修改编辑</el-button>
						</div>
					</el-card>
				</el-col>
			</div>
			<div class="block hk-pagination">
				<el-pagination
					background
					:current-page="filters.currentPage"
					@current-change="pageChange"
					layout="prev, pager, next"
					:total="userInfoLen">
				</el-pagination>
			</div>
		</div>
		<div class="userinfo-rect" v-show="showFlag">
			<div class="show-desc">
				<h3>详细信息</h3>
				<el-button type="danger" icon="el-icon-delete" circle @click="del(showUser)" class="delBtn"></el-button>
				<i class="el-icon-close" @click="close" />
			</div>
			<el-row :gutter="50">
				<el-col :span="10" class="imgRect">
					<el-image
						:src="$img.imgBase + showUser.img"			
						class="user-img"
						fit="cover"
					>
						<div slot="error" class="image-slot">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
				</el-col>
				<el-col :span="12">
					<div>
						<p>用户名: <span v-text="showUser.username"></span></p>
						<p>权限级别: <span v-text="showUser.level"></span></p>
						<p>工号: <span v-text="showUser.eid"></span></p>
						<p>手机号码: <span v-text="showUser.phone"></span></p>
						<p>雇佣时间: <span v-text="showUser.hireDate"></span></p>
						<p>邮箱地址: <span v-text="showUser.email"></span></p>
						<p>身份证号: <span v-text="showUser.idCard"></span></p>
						<p>工资: <span v-text="showUser.salary"></span></p>
						<p>联系人: <span v-text="showUser.contacts"></span></p>
						<p>联系人电话: <span v-text="showUser.telephone"></span></p>
					</div>
				</el-col>
			</el-row>
		</div>	
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'Info',
	data() {
		let checkIdCard = (rule, value, callback) => {
			if (value !== '') {
				let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				let _IDre15 =  /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
				if ((_IDRe18.test(value) || _IDre15.test(value))) {
					callback();
				}
				else {
					callback(new Error('身份证号码格式错误'))
				}
            }
			else {
				callback();
			}
		};
		return {
			formInline: {
				username: '',
				eid: '',
				idCard: '',
			},
			rules: {
				idCard: [
					{ validator: checkIdCard, trigger: 'blur' }
				]
			},
			sort: '', // 排序的条件
			sortFilters: [
				{ id: 1, value: 'eid', desc: '工号' },
				{ id: 2, value: 'salary', desc: '工作薪资' },
				{ id: 3, value: 'level', desc: '权限等级' },
			],
			sortNumber: 1, // 升序还是降序(-1)
			sortWay: [
				{ id: 1, value: 1, desc: '升序排序' },
				{ id: 2, value: -1, desc: '降序排列' },
			],
			filters: {
				currentPage: 1,
				size: 10,
				loc: '',
				lv: '',
			},
			showFlag: false, // 查看更多弹框是否显示
			// showFlagRect: false, // 辅助更多显示弹框小时
			// pageChangeFlag: false, // 是否换页了，帮助解决点击换页后导致错误设置showFlagRect的值而让更多显示弹框有个小bug
			showUser: { // 查看更多对应的用户信息
				username: '',
				level: '',
				eid: '',
				phone: '',
				hireDate: '',
				email: '',
				idCard: '',
				salary: '',
				contacts: '',
				telephone: '',
				img: '',
			}
		};
	},
	created() {
		this.init();
	},
	computed: {
		...mapState('user', ['user', 'userList', 'userInfoLen']),
	},
	watch: {
		user: {
			handler(newVal) {
				if (newVal) {
					this.init();
				}
			},
			deep: true,
		}
	},
	methods: {
		...mapActions('user', ['getOwnInfo', 'getMoreInfo']),
		pageChange(e) {
			this.filters.currentPage = e;
			this.showFlagRect = false;
			this.showFlag = false;
			this.init();
		},
		init() {
			// 发起请求
			this.filters.loc = this.user.loc;
			this.filters.lv = this.user.level;

			let con = {};
			// 判断时普通查询还是条件查询
			for (let attr in this.formInline) {
				con[attr] = this.formInline[attr]
			}
			for (let attr in this.filters) {
				con[attr] = this.filters[attr]
			}
			con['sortFilter'] = this.sort;
			con['sortNumber'] = this.sortNumber;
			for (let attr in con) {
				if (con[attr] === '' || (!con[attr])) {
					delete con[attr];
				}
			}
			console.log(con);
			this.getMoreInfo(con);
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.init();
				} else {
					return false;
				}
			});
		},
		sortByWay() {
			if (!this.sort || !this.sortNumber) {
				alert('请先确认排序条件');
				return false;
			}
			else {
				this.init();
			} 
		},
		seeMore(item) {
			this.showFlag = true;
			for (let attr in this.showUser) {
				this.showUser[attr] = item[attr];
			}
		},
		del(item) {
			// console.log(item);
			this.$http.delUser({ eid: item.eid }).then(res => {
				if (res.code === 2000) {
					this.init();
				}
				this.$message(res.msg);
				this.close();
			});
		},
		ins() {
			this.$router.push({ name: 'employeeUpdate', params: { item: undefined } });
		},
		edit(item) {
			this.$router.push({ name: 'employeeUpdate', params: { item } });
		},
		close() {
			this.showFlag = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.hk-employee {
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
	.user-info-container {
		.hk-user {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			.el-col {
				overflow: hidden;
				position: relative;
				margin-top: 20px;
				margin-left: 20px;
				width: 18%;
				.user-img {
					width: 30%;
					height: 30%;
					/* position: absolute;
					top: 0;
					right: 0; */
					float: right;
					margin-right: 20px;
					border-radius: 5px;
				}
				.user-info {
					margin-left: 10px;
					font-size: 16px;
					transform: scale(0.9);
				}
			}
		}
		.hk-pagination {
			float: right;
			margin-top: 20px;
			padding-bottom: 20px;
		}
	}

	.userinfo-rect {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		border-radius: 5px;
		box-shadow: 0 0 10px #666;
		pointer-events: none;
		background-color: #fff;
		width: 45%;
		.user-img {
			border-radius: 5px;
			transform: translateY(20%) translateX(10%);
		}
		.show-desc {
			border-bottom: 1px solid #ccc;
			position: relative;
			height: 35px;
			h3 {
				text-indent: 20px;
				line-height: 35px;
				margin: 0;
			}
			i {
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%) translateX(-10%) scale(0.7);
				background-color: #ccc;
				width: 40px;
				height: 40px;
				text-align: center;
				line-height: 40px;
				border-radius: 50%;
				cursor: pointer;
			}
			i::before {
				pointer-events: auto;
				cursor: pointer;
			}
			.delBtn {
				pointer-events: auto;
				position: absolute;
				right: 0;
				top: 50%;
				cursor: pointer;
				transform: translateY(-50%) translateX(-100%) scale(0.7);
			}
		}
	}

	.panel {
		.grid-content {
			height: 80px;
		}
		input {
			border: 0;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			font-size: 16px;
			text-align: center;
			outline: none;
			color: gray;
		}
	}
	::v-deep label {
		color: white;
	}
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
	}

	.el-row {
		margin-bottom: 0px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 4px;
	}
	.bg-gray {
		background: #eee;
	}
	.bg-light {
		background: #fff;
	}
	.grid-content {
		min-height: 36px;
		text-align: center;
		height: 36px;
		line-height: 36px;
		border-right: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
}
</style>