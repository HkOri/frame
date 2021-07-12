<!-- 这里是用户信息编辑的组件 -->
<template>
    <div class="hk-edit">
        <div class="rect">
            <div class="head">
                <span>个人信息</span>
                <i class="el-icon-close close" @click="close"></i>
            </div>
            <el-form label-position="left" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="mini">
                <el-form-item label="工号" prop="eid">
                    <el-input type="text" v-model="ruleForm.eid" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off" :readonly="ruleForm.readOnly"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="不需更改请勿点击填写" :readonly="ruleForm.readOnly"></el-input>
                </el-form-item>
                <el-form-item label="入职时间" prop="hireDate">
                    <el-input type="text" v-model="ruleForm.hireDate" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="ruleForm.email" autocomplete="off" :readonly="ruleForm.readOnly"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="idCard">
                    <el-input v-model="ruleForm.idCard" auto-complete="off" :readonly="ruleForm.readOnly"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input v-model="ruleForm.phone" auto-complete="off" :readonly="ruleForm.readOnly"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contacts">
                    <el-input v-model="ruleForm.contacts" auto-complete="off" :readonly="ruleForm.readOnly"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话" prop="telephone">
                    <el-input v-model="ruleForm.telephone" auto-complete="off" :readonly="ruleForm.readOnly"></el-input>
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
                    <el-button @click="loginOut">退出登录</el-button>
                    <el-button @click="editForm">点击修改</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">点击提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { validateMail } from '@/utils/validate.js';
export default {
    name: 'Edit',
    data() {
        let validateName = (rule, value, callback) => {
            // !this.ruleForm.readOnly说明点了编辑
            let str = /^[\u4e00-\u9fa5]{2,15}$/;
            if (!this.ruleForm.readOnly) {
                if (!value) {
                    callback(new Error('名字不能为空'));
                }
                else if (!(str.test(value))) {
                    callback(new Error('请输入2~15个中文字符'));
                }
                else {
                    callback();
                }
            }
            else {
                callback();
            }
        };
        let validatePass = (rule, value, callback) => {
            // 如果修改密码
            if (value !== '') {
                let str = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
                if (!(str.test(value))) {
                    callback(new Error('8~10位且必须包含大小写字母和数字'))
                }
                else {
                    callback();
                }
            }
            else {
                callback();
            }
        };
        let validatePhone = (rule, value, callback) => {
            if (!this.ruleForm.readOnly) {
                let telStr = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				if (!(telStr.test(value))) {
                    callback(new Error('手机号码格式错误'))
				}
				else {
                    callback();
				}
            }
            else {
                callback();
            }
        };
        let validateTelephone = (rule, value, callback) => {
            if (!this.ruleForm.readOnly) {
                let telStr = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                if (value === this.ruleForm.phone) {
                    callback(new Error('两次号码不能一致'));
                }
                else if (!(telStr.test(value))) {
                    callback(new Error('手机号码格式错误'))
				}
                else {
                    callback();
                }
            }
            else {
                callback();
            }
        };
        let validateIdCard = (rule, value, callback) => {
            if (!this.ruleForm.readOnly) {
                let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (reg.test(value)) {
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
            ruleForm: {
                username: '',
                password: '',
                hireDate: '',
                email: '',
                idCard: '',
                phone: '',
                contacts: '',
                telephone: '',
                img: '',
                eid: '',
                readOnly: true
            },
            rules: {
                username: [
                    { validator: validateName, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                email: [
                    { validator: validateMail, trigger: 'blur' }
                ],
                idCard: [
                    { validator: validateIdCard, trigger: 'blur' }
                ],
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ],
                contacts: [
                    { validator: validateName, trigger: 'blur' }
                ],
                telephone: [
                    { validator: validateTelephone, trigger: 'blur' }
                ],
            },
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            displayFlag: true
        };
    },
    methods: {
        submitForm(formName) {
            // 真改了数据才发起请求
            if (!this.ruleForm.readOnly) { 
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 发起更新请求
                        this.$http.updateUser(this.ruleForm).then(res => {
                            if (res.code === 2000) {
                                // 存储新的身份令牌
                                localStorage.setItem('utoken', res.token);
                                // 通知父组件
                                this.$emit('update', this.ruleForm);
                                this.$emit('close');
                                this.ruleForm.readOnly = true;
                            }   
                            this.$message(res.msg);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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
        close() {
            // this.displayFlag = false;
            this.$emit('close');
        },
        imgPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        imgSuccess(res) {
            this.ruleForm.img = res.data.url;
        },
        loginOut() {
            localStorage.removeItem('utoken');
            window.location.replace('/');
        }
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
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	z-index: 1000;
	.rect {
		width: 300px;
		background-color: #fff;
		box-shadow: 0 0 10px #666;
		z-index: 100;
		border-radius: 6px;
		padding: 20px;
	}
	.head {
		overflow: hidden;
		.close {
			float: right;
			cursor: pointer;
		}
		margin-bottom: 10px;
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
	.el-form-item:nth-last-child(1) {
		::v-deep .el-form-item__content {
			margin-left: 0 !important;
		}
	}
}
</style>