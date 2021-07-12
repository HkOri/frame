<template>
    <div class="hk-roomtype">
		<el-row>
			<el-button @click="add">新增</el-button>
		</el-row>
		<el-table
			:data="roomTypeList"
			:border="false"
			style="width: 100%"
			:max-height="600"
			:highlight-current-row="true"
			class="roomtype-tb"
		>
			<el-table-column
				prop="tid"
				label="类型标志"
				width=""
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="repertory"
				label="房间数量"
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
				prop="price"
				label="价格"
				width=""
				align="center"
			>
			</el-table-column>
			<el-table-column
				prop="discount"
				label="折扣"
				width=""
				align="center"
			>
			</el-table-column>
			<el-table-column
				label="预览"
				width=""
				align="center"
			>
				<template  slot-scope="scope">
					<el-image :src="$img.imgBase + scope.row.img" fit="cover">
						<div slot="error" class="image-slot">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
				</template>
			</el-table-column>
			<el-table-column
				prop="desc"
				label="简要描述"
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
		<div class="roomtype-info" v-show="flag">
			<div class="top">
				<h3 v-text="rMsg"></h3>
				<i class="el-icon-close close" @click="close"></i>
			</div>

			<el-form
				status-icon
				class="demo-ruleForm"
				ref="spec"
				:model="spec"
				label-width="100px"
				label-position="left"
				:rules="rules"
			>
				<el-form-item label="类型标志" prop="tid">
					<el-input v-model="spec.tid" :size="size"/>
				</el-form-item>
				<el-form-item label="房间数量" prop="repertory">
					<el-input v-model="spec.repertory" :size="size"/>
				</el-form-item>
				<el-form-item label="房间类型" prop="type">
					<el-input v-model="spec.type" :size="size"/>
				</el-form-item>
				<el-form-item label="房间价格" prop="price">
					<el-input v-model="spec.price" :size="size"/>
				</el-form-item>
				<el-form-item label="优惠折扣" prop="discount">
					<el-input v-model="spec.discount" :size="size"/>
				</el-form-item>
				<el-form-item label="简要描述" prop="desc">
					<el-input v-model="spec.desc" :size="size"/>
				</el-form-item>
				<el-form-item label="房间图片" prop="img">
					<el-upload
						:action="$img.imgAction"
						list-type="picture-card"
						:on-preview="imgPreview"
						:on-success="imgSuccess"
						:file-list="fileList"
						:limit="1"
						:size="size"
						name="file"
						class="img-upload"
					>
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('spec')" :size="size">提交</el-button>
                    <el-button @click="resetForm('spec')" :size="size">取消</el-button>
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
import { validateTid, validateNumber, validateType, validateDesc, validateDecimal } from '@/utils/validate.js';
import { getCookie } from '@/utils/cookie';
import { mapState, mapActions } from 'vuex';
export default {
	name: 'Info',
	data() {
		return {
			size: 'mini',
			rMsg: '编辑信息',
			delObj: {},
			spec: {
				tid: '', // 标志
				repertory: '', // 库存
				type: '', // 类型
				price: '', // 价格
				discount: '', // 折扣
				desc: '', // 描述
				img: '', // 预览
			},
			fileList: [],
			flag: false,
			delFlag: false, // 点击删除时候的确认框
			dialogImageUrl: '',
            dialogVisible: false,
			rules: {
                tid: [
                    { validator: validateTid, trigger: 'blur' }
                ],
                repertory: [
                    { validator: validateNumber, trigger: 'blur' }
                ],
                type: [
                    { validator: validateType, trigger: 'blur' }
                ],
                price: [
                    { validator: validateNumber, trigger: 'blur' }
                ],
				discount: [
					{ validator: validateDecimal, trigger: 'blur' },
				],
                desc: [
                    { validator: validateDesc, trigger: 'blur' }
                ],
            },
		};
	},
	computed: {
		...mapState('user', ['user']),
		...mapState('roomtype', ['roomTypeList']),
	},
	methods: {
		...mapActions('roomtype', ['getAllRoomTypeInfo']),
		delOrNot(row) {
			this.delFlag = true;
			for (let attr in row) {
				this.delObj[attr] = row[attr];
			}
		},
		delSure() {
			// 删除逻辑
			this.$http.delRoomTypeInfo(this.delObj).then(res => {
				if (res.code === 5000) {
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
			// this.spec['readOnly'] = false;
			// 图片预览
			let url = this.$img.imgBase + this.spec.img;
			this.fileList = [{ url }];
		},
		add() {
			// 显示弹框
			this.flag = true;
			// 头部信息变卦
			this.rMsg = '新增信息';
			// this.spec['readOnly'] = false;
		},
		imgPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        imgSuccess(res) {
            this.spec.img = res.data.url;
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
			// this.$refs['spec'].resetFields();
		},
		submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
					if (this.spec.img) {
						this.submit();
					}
					else {
						window.alert('预览图片不能为空');
					}
                } else {
                    return false;
                }
            });
        },
		resetForm(formName) {
			// console.log(this.$refs);
			this.$refs[formName].resetFields();
			this.close();
		},
		submit() {
			// 判断是更新还是新增
			if (this.rMsg === '新增信息') {
				// 新增逻辑，注意加上loc
				this.spec['loc'] = this.user.loc || getCookie('loc');
				this.$http.updateRoomTypeInfo(this.spec).then(res => {
					if (res.code === 5000) {
						// this.$router.go(0);
						this.init();
					}
					this.$message(res.msg);
				});
			}
			else {
				// 更新逻辑时候，在edit里面已经加上了loc了
				this.$http.updateRoomTypeInfo(this.spec).then(res => {
					if (res.code === 5000) {
						// this.$router.go(0);
						this.init();
					}
					this.$message(res.msg);
				});
			}
		},
		init() {
			let loc = this.user.loc || getCookie('loc');
			this.getAllRoomTypeInfo({ loc });
			this.close();
		}
	},
	created() {
		/* let loc = this.user.loc || getCookie('loc');
		this.getAllRoomTypeInfo({ loc }); */
		this.init();
	}
};
</script>

<style lang="scss" scoped>
.hk-roomtype {
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
		padding: 0 30px 10px 30px;
		box-shadow: 0 0 10px #666;
		.el-form-item {
			margin-bottom: 10px;
		}
		::v-deep .el-form-item__error {
			padding-top: 0;
		}
		.img-upload {
			width: 150px;
			height: 150px;
			overflow: hidden;
			margin-top: 10px;
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
}
</style>