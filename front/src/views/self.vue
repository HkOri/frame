<!-- 这里是客户信息编辑的组件 -->
<template>
    <div class="hk-edit">
        <div class="rect">
            <el-form label-position="left" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
                <el-form-item label="昵称" prop="nickname">
                    <el-input type="text" v-model="ruleForm.nickname" autocomplete="off" :readonly="ruleForm.readOnly"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input type="text" v-model="ruleForm.phone" autocomplete="off" :readonly="ruleForm.readOnly"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" class="pwd">
                    <em>密码已加密转化，不需修改请勿点击</em>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" :readonly="ruleForm.readOnly" placeholder="密码已加密转化，不需修改请勿点击"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" auto-complete="off" :readonly="ruleForm.readOnly"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="idCard">
                    <el-input v-model="ruleForm.idCard" auto-complete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <template>
                        <!-- 这里是头像 -->
                        <el-upload
                            :action="$img.imgAction"
                            list-type="picture-card"
                            :on-preview="imgPreview"
                            :on-success="imgSuccess"
                            :file-list="fileList"
                            :limit="1"
                            name="file"
                            class="img-upload"
                            :before-upload="beforeAvatarUpload"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </template>
                </el-form-item>
                <el-form-item>
                    <el-button @click="editForm">点击修改</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">点击提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { validateSelfPwd, validateMail } from '@/utils/validateIndex'
export default {
    name: 'Self',
    data() {
        let validateNickname = (rule, value, callback) => {
            if (!value && !this.ruleForm.readOnly) {
                return callback(new Error('昵称不能为空'));
            }
            else {
                if (value.length > 15 && !this.ruleForm.readOnly) {
                    callback(new Error('昵称长度不能超过15'));
                } else {
                    callback();
                }
            }
        };
        let validatePhone = (rule, value, callback) => {
            if (value === '' && !this.ruleForm.readOnly) {
                callback(new Error('请输入手机号码'));
            } else {
                if (!(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(value)) && !this.ruleForm.readOnly) {
                    callback(new Error('手机号码格式错误'));
                }
                callback();
            }
        };
        return {
            ruleForm: {
                nickname: '',
                phone: '',
                password: '',
                email: '',
                idCard: '',
                img: '',
                readOnly: true
            },
            rules: {
                nickname: [
                    { validator: validateNickname, trigger: 'blur' }
                ],
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ],
                password: [
                    { validator: validateSelfPwd, trigger: 'blur' }
                ],
                email: [
                    { validator: validateMail, trigger: 'blur' }
                ]
                /* idCard: [
                    { validator: validateIdCard, trigger: 'blur' }
                ], */
            },
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            displayFlag: true
        };
    },
    methods: {
        submitForm(formName) {
            if (!this.ruleForm.readOnly) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 发起更新请求
                        this.$http.updateCustomer(this.ruleForm).then(res => {
                            if (res.code === 8000) {
                                // 通知父组件
                                this.$emit('update', this.ruleForm);
                                localStorage.setItem('token', res.token);
                            }   
                            this.$message(res.msg);
                        });
                    } else {
                        return false;
                    }
                });
            }
            else {
                return false;
            }
        },
        editForm() {
            this.ruleForm['readOnly'] = false;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        imgPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        imgSuccess(res) {
            this.ruleForm.img = res.data.url;
        },
    },
    // 父子组件传值
    props: {
        obj: {
            type: Object,
            required: true
        }
    },
    watch: {
        obj: {
            handler(newVal) {
                if (newVal) {
                    for (let attr in this.obj) {
                        this.ruleForm[attr] = this.obj[attr];
                        let url = this.$img.imgBase + this.ruleForm.img;
                        this.fileList = [{ url }];
                    }
                    this.ruleForm['password'] = '';
                }
            },
            deep: true
        }
    },
    created() {
        for (let attr in this.obj) {
            this.ruleForm[attr] = this.obj[attr];
            let url = this.$img.imgBase + this.ruleForm.img;
            this.fileList = [{ url }];
        }
        this.ruleForm['password'] = '';
    }
}
</script>
<style lang="scss" scoped>
.hk-edit {
	.rect {
		width: 300px;
		background-color: #fff;
		z-index: 100;
		border-radius: 6px;
		padding: 20px;
		.pwd {
			::v-deep .el-form-item__content {
				position: relative;
				em {
					position: absolute;
					color: #fff;
					left: 100%;
					width: 100%;
					top: 0;
					font-size: 16px;
					line-height: 16px;
					font-family: '楷体';
					background-color: rgba(0, 0, 0, 0.6);
					padding: 5px 10px;
					border-radius: 5px;
					transform: translateX(10%) scale(0.9) translateY(-10%);
				}
				em::after {
					content: '';
					position: absolute;
					left: 0;
					top: 0;
					transform: translateX(-100%) translateY(20%);
					border-top: 7px solid transparent;
					border-bottom: 7px solid transparent;
					border-right: 14px solid rgba(0, 0, 0, 0.6);
				}
			}
		}
	}
	.img-upload {
		width: 140px;
		height: 140px;
		overflow: hidden;
		::v-deep .el-upload--picture-card {
			width: 140px;
			height: 140px;
			line-height: 140px;
		}
	}
}
</style>