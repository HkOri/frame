<template>
    <div class="hk-info">
        <section class="logo">
            <img src="http://localhost:3000/upload/logo_03.png" />
        </section>
        <section class="content hk-main">
            <div class="t">
                <span  @click="changeTab(1)" :class="{ 'active': tag === 1 }">个人信息</span>
                <span  @click="changeTab(2)" :class="{ 'active': tag === 2 }">订单记录</span>
            </div>
            <div class="panel">
                <selfInfo :obj="userInfo" v-show="(tag === 1)" @update="updateUser" />
				<el-row  class="table-area" v-show="(tag === 2)" >
					<div>
						<el-table
							:data="lives"
							:border="false"
							style="width: 100%"
							:highlight-current-row="true"
							class="roomtype-tb"
							size="mini"
						>
							<el-table-column
								prop="idCard"
								label="身份证号"
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
									<el-button 
										@click="unsubscribe(scope.row)" 
										size="mini" 
										class="btn"
										:disabled="scope.row.state !== 'undetermined'"
									>退订</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-row>
            </div>
        </section>
    </div>
</template>
<script>
import selfInfo from './self';
import { mapState, mapActions } from 'vuex';
export default {
    name: 'Info',
    data() {
        return {
			loc: 200,
            tag: 2,
			lives: [], // 住房记录
        }
    },  
    computed: {
        ...mapState('user', ['userInfo'])
    },
	created() {
		// 获取住房记录信息
		this.getRecord();
	},
    components: {
        selfInfo
    },
    methods: {
		...mapActions('room', ['getRoomInfo']),
		...mapActions('user', ['setUser']),
        changeTab(num) {
            this.tag = num;
        },
		updateUser(item) {
			// 编辑更新个人信息之后，vuex里面信息也得更新
			this.setUser(item);
			this.getRecord({ idCard: item.idCard });
		},
		getRecord() {
			// 登录成功，获取个人住房记录
			this.$http.getLiveRecord({ idCard: this.userInfo.idCard }).then(res => {
				if (res.code === 10000) {
					this.lives = res.data;
				}
			});
		},
		unsubscribe(item) {
			// 退订要两个参数，一个订单的_id，一个客房信息的_id
			let orderId = item._id; // 订单_id
			let roomId = item.roomId; // 订单的房间类型标志
			this.$http.unsubscribeRoomType({ _id: orderId, tid: roomId }).then(res => {
				this.$message(res.msg);
				this.getRecord();
				// 退订之后还得更新房间信息
				this.getRoomInfo({ loc: this.loc });
			});
		}
    },
}
</script>
<style lang="scss" scoped>
.hk-info {
	.logo {
		height: 100px;
		position: relative;
		background-color: #eee;
		::v-deep img {
			height: 80px;
			position: absolute;
			top: 50%;
			left: 10%;
			transform: translateY(-50%);
		}
	}
	.content {
		margin-top: 10px;
		.t {
			border-bottom: 1px solid #ccc;
			font-size: 0px;
			overflow: hidden;
			span {
				font-size: 16px;
				padding: 5px 10px;
				margin-left: 10px;
				float: right;
				background-color: #fff;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				cursor: pointer;
				font-family: '楷体';
				color: #1e1e1e;
			}
			.active {
				color: #fff;
				background-color: #409eff;
			}
		}
	}
}
</style>