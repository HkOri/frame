<template>
    <div class="hk-header">
        <div class="hk-top">
            <div class="system-desc">
                <h1>乐休后台</h1>
            </div>
            <div class="user-img" @click="see">
                <el-avatar 
                    :size="40" 
                    :src="$img.imgBase + user.img" 
                    @error="errorHandler" 
                    shape="square" 
                    class="avatar"
                >
                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                </el-avatar>
            </div>
        </div>
        <!-- 这里应该放小标签 -->
        <div class="hk-bottom">
            <!-- <span v-for="item in tagArr" :key="item.id">
                <router-link :to="item.text" tag="em" v-text="item.desc"/>
                <i class="el-icon-close close" />
            </span> -->
        </div>
        <!-- 个人信息弹框 -->
        <infoEdit :obj="user" @update="updateCurrentUser" @close="closeRect" v-show="flag" />
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import infoEdit from '@/views/self/edit.vue';
export default {
	name: 'hkHeader',
    components: {
        infoEdit
    },
    data() {
        return {
            flag: false,
            tagArr: [
                { id: 1, text: '/dashboard', desc: '数据概览' }
            ]
        }
    },
    computed: {
        ...mapState('user', ['user']),
    },
    methods: {
        ...mapActions('user', ['setOwnInfo']),
        errorHandler() {
            return true
        },
        see() {
            this.flag = true;
        },
        closeRect() {
            this.flag = false;
        },
        updateCurrentUser(item) {
            this.setOwnInfo(item);
        }
    }
};
</script>
<style lang="scss" scoped>
.hk-top {
	height: 50px;
	position: relative;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	.user-img {
		position: absolute;
		right: 0%;
		top: 50%;
		cursor: pointer;
		transform: translateY(-50%) translateX(-50%);
		font-size: 0;
		.avatar {
			cursor: pointer;
		}
	}
	.system-desc {
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
	}
}
.hk-bottom {
	height: 35px;
	text-align: left;
	position: relative;
	/* span {
		font-size: 16px;
		position: absolute;
		top: 50%;
		padding: 7px 12px;
		transform: translateY(-50%) scale(0.8);
		border-radius: 6px;
		border: 1px solid #ccc;
		background-color: rgb(137, 218, 245);
		color: #fff;
		cursor: pointer;
		em {
			margin-right: 10px;
			font-style: normal;
		}
		.close {
			position: absolute;
			right: 0;
			top: 0;
		}
		.close:hover {
			background-color: lightsalmon;
		}
	} */
}
</style>