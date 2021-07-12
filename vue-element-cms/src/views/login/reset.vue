<template>
    <div class="hk-pwd">
        <div class="rect">
            <h3>重置密码</h3>
            <el-form 
                label-position="left" 
                :model="findForm" 
                status-icon 
                ref="findForm" 
                label-width="60px" 
                class="demo-ruleForm index-form" 
                size="mini"
            >
                <el-form-item label="工号" prop="eid">
                    <el-input type="text" v-model="findForm.eid" autocomplete="off" placeholder="请输入工号"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input type="password" v-model="findForm.password" autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="凭证码" prop="mailcode">
                    <el-input type="text" v-model="findForm.mailcode" autocomplete="off" class="mailcode" placeholder="请点击右方按钮获取"></el-input>
                    <el-button @click="getMailCode" type="success">获取凭证</el-button>
                </el-form-item>
                <el-form-item class="last">
                    <el-button type="primary" @click="go('findForm')">点击重置</el-button>
                    <el-button>取消找回</el-button>
                </el-form-item>
            </el-form>
        </div>
	</div>
</template>

<script>
export default {
    name: 'Pwd',
    data() {
        return {
            proof: '',
            findForm: {
                eid: '',
                password: '',
                mailcode: ''
            }
        }
    },
    methods: {
        go() {
            if (this.proof === this.findForm.mailcode) {
                if (this.findForm.password) {
                    this.$http.changePwd(this.findForm).then(res => {
                        this.$message(res.msg);
                    });
                }
                else {
                    this.$message('密码不能为空');
                }
            }
            else {
                this.$message('凭证码错误');
            }
        },
        getMailCode() {
            if (this.findForm.eid !== '') {
                this.$http.sendMail({ eid: this.findForm.eid }).then(res => {
                    this.proof = res.data;
                    this.$message(res.msg); 
                });
            }
            else {
                this.$message('请先填写工号');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.hk-pwd {
	min-height: 100%;
	width: 100%;
	// background-color: rgba(28, 28, 28, 0.8);
	background: url(../../assets/idxbg.jpg) no-repeat 0 0;
	overflow: hidden;
	.rect {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
		h3 {
			text-align: center;
			color: #eee;
		}
		.mailcode {
			width: 69.5%;
		}
		.last {
			::v-deep .el-form-item__content {
				margin-left: 0 !important;
				button {
					width: 40%;
				}
				button:nth-last-child(1) {
					float: right;
				}
			}
		}
	}
}
</style>