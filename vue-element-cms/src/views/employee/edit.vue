<template>
    <div class="hk-edit">
        <el-form
            status-icon 
            :rules="rules"
            class="demo-ruleForm"
            ref="form" 
            :model="form" 
            label-width="100px" 
            :label-position="labelPosition"
            :inline="true">
            <el-form-item label="员工号" v-show="item">
                <el-input v-model="form.eid" :size="size" class="vid-input" readonly></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" prop="username">
                <el-input v-model="form.username" :size="size" class="vid-input"></el-input>
            </el-form-item>
            <el-form-item label="账号密码" prop="password">
                <el-input v-model="form.password" :size="size" class="vid-input" :placeholder="pwdMsg"></el-input>
            </el-form-item>
            <el-form-item label="雇佣时间" prop="hireDate">
                <div class="block">
                    <el-date-picker
                        v-model="form.hireDate"
                        type="date"
                        placeholder="选择日期时间"
                        :size="size"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        class="vid-input"
                    >
                    </el-date-picker>
                </div>
                <!-- <el-input v-model="form.hireDate" :size="size" class="vid-input"></el-input> -->
            </el-form-item>
            <el-form-item label="邮箱地址" prop="email">
                <el-input v-model="form.email" :size="size" class="vid-input"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="form.idCard" :size="size" class="vid-input"></el-input>
            </el-form-item>
            <el-form-item label="员工工资" prop="salary">
                <el-input v-model="form.salary" :size="size" class="vid-input"></el-input>
            </el-form-item>
            <el-form-item label="员工权限" prop="level">
                <el-select v-model="form.level" placeholder="请选择" :size="size">
                    <el-option :label="lv.desc"  v-for="lv in levels" :key="lv.id" :value="lv.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="form.phone" :size="size" class="vid-input"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contacts">
                <el-input v-model="form.contacts" :size="size" class="vid-input"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话" prop="telephone">
                <el-input v-model="form.telephone" :size="size" class="vid-input"></el-input>
            </el-form-item>
            <el-form-item label="照片">
                <el-upload
                    :action="$img.imgAction"
                    list-type="picture-card"
                    :on-preview="imgPreview"
                    :on-success="imgSuccess"
                    :file-list="fileList"
                    :limit="1"
                    name="file"
                    class="uploadImg"
                    :before-upload="beforeAvatarUpload"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                    <el-button type="primary" @click="submitForm('form')" size="mini">提交</el-button>
                    <el-button @click="resetForm('form')" size="mini">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { validateName, validateIdCard, validateNumber, validateLevel, validateDate, validatePhone, validateMail } from  '@/utils/validate';
import { mapState } from 'vuex';
export default {
    data() {
        let validatePass = (rule, value, callback) => {
            let str = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
            if (this.msg === '修改') {
                // 如果打算修改密码，需要符合要求
                if (value !== '') {
                    if (!(str.test(value))) {
                        callback(new Error('8~10位且必须包含大小写字母和数字的组合'))
                    }
                    else {
                        callback();
                    }
                }
                // 不修改无要求
                else {
                    callback();
                }
            } 
            // 如果是新增管理用户
            else {
                if (!(str.test(value))) {
                    callback(new Error('8~10位且必须包含大小写字母和数字的组合'))
                }
                else {
                    callback();
                }
            }
        };
        let validateTelephone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('联系人电话不能为空'));
            } else {
                let telStr = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                if (value === this.form.phone) {
                    callback(new Error('两次号码不能一致'));
                }
                else if (!(telStr.test(value))) {
                    callback(new Error('手机号码格式错误'))
				}
                else {
                    callback();
                }
            }
        };
        return {
            name: 'Edit',
            labelPosition: 'left',
            size: 'mini',
            pwdMsg: '',
            msg: '修改',
            levels: [
                { id: 1, value: 5, desc: '员工' },
                { id: 2, value: 9, desc: '管理者' },
            ],
            fileList: [],
            form: {
                username: '',
                password: '',
                hireDate: '',
                email: '',
                idCard: '',
                salary: '',
                level: '',
                phone: '',
                contacts: '',
                telephone: '',
                loc: '', // 这个是定死的，不过是编辑还是注册都只能弄和当前用户同一地区的
                img: '',
                eid: '',
            },
            rules: {
                username: [
                    { validator: validateName, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                hireDate: [
                    { validator: validateDate, trigger: 'blur' }
                ],
                email: [
                    { validator: validateMail, trigger: 'blur' }
                ],
                idCard: [
                    { validator: validateIdCard, trigger: 'blur' }
                ],
                salary: [
                    { validator: validateNumber, trigger: 'blur' }
                ],
                level: [
                    { validator: validateLevel, trigger: 'change' }
                ],
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ],
                /* 加的 */
                contacts: [
                    { validator: validateName, trigger: 'blur' }
                ],
                telephone: [
                    { validator: validateTelephone, trigger: 'blur' }
                ],
            },
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    // 路由传参
    props: ['item'],
    methods: {
        onSubmit() {
            // 更新用户信息
            if (this.msg === '修改') {
                this.$http.updateUser(this.form).then(res => {
                    if (res.code === 2000) {
                        this.$message(res.msg);
                    }
                });
            }
            // 新增一个用户
            else {
                this.$http.userRegister(this.form).then(res => {
                    if (res.code === 2000) {
                        alert(`${ res.msg }，请保管好你的员工号：${ res.eid }`)
                    }
                });
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.form.img) {
                        this.onSubmit();
                    }
                    else {
                        this.$message({
                            message: '请选择图片',
                            type: 'warning'
                        });
                    }
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        imgPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        imgSuccess(res) {
            // console.log('img res ----', res);
            this.form.img = res.data.url;
        },
        beforeAvatarUpload(file) {
            // console.log(file);
            const isJPG = (file.type === 'image/jpeg');
            const isLt2M = (file.size / 1024 / 1024) < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    computed: {
        ...mapState('user', ['user']),
    },
    created() {
        // 说明是更新
        if (this.item) {
            for (let attr in this.item) {
                this.form[attr] = this.item[attr];
            }
            this.form.password = '';
            this.msg = '修改';
            this.pwdMsg = '如需修改密码，请输入';
            // console.log(this.$img.imgBase, this.form.img);
            let url = this.$img.imgBase + this.form.img;
            this.fileList = [ { url } ]
        }
        else {
            this.msg = '确定'
            this.pwdMsg = '';
            this.form['loc'] = this.user.loc;
            // 说明是注册
        }
        // console.log(this.item);
    }
}
</script>
<style lang="scss" scoped>
.hk-edit {
	width: 100%;
	height: 100%;
	text-align: left;
	padding: 10px 20px;
	box-sizing: border-box;
	// background-color: #394056;
	background: #394056 url(../../assets/editbg.png) no-repeat 0 -50px;
	overflow: auto;
	.el-form-item:nth-last-child(1) {
		margin-left: 50px;
	}
	.vid-input {
		width: 200px;
	}
	::v-deep .el-form-item__label {
		color: #ccc;
	}
	.uploadImg {
		width: 150px;
		height: 150px;
		overflow: hidden;
	}
}
</style>