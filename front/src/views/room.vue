<!-- 这是显示房间信息的页面，用来预定的 -->
<template>
    <div class="hk-room">
        <div class="room-area">
            <div class="time">
                <div class="block">
                    <span class="demonstration">入住时间</span>
                    <el-date-picker
                        v-model="inTime"
                        type="date"
                        size="mini"
                        class="time-stamp"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="block">
                    <span class="demonstration">离开时间</span>
                    <el-date-picker
                        v-model="outTime"
                        type="date"
                        size="mini"
                        class="time-stamp"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
            </div>

            <el-table
                :data="roomInfo"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
            >
                <el-table-column
                    label="预览"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-image :src="$img.imgBase + scope.row.img" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="desc"
                    label="描述"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    label="房价"
                    sortable
                    align="center"
                >
                    <template slot-scope="scope">
                        <span v-text="'¥' + (scope.row.price * scope.row.discount)" class="price"></span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" >
                    <template slot-scope="scope">
                        <el-button size="mini" @click="subscribe(scope.row)" :disabled="scope.row.disabled">预定</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from  'vuex';
export default {
    name: 'Room',
    data() {
        return {
            inTime: '',
            outTime: '',
            loc: 200,
        }
    },
    // props: ['timeOne', 'timeTwo'],
    computed: {
        ...mapState('room', ['roomInfo']),
        ...mapState('user', ['userInfo']),
        /* inTime: {
            get() {
                return this.$route.params.timeOne || '';
            },
            set(val) {
                console.log(val);
            }
        },
        outTime() {
            return this.$route.params.timeTwo || '';
        } */
    },
    watch: {
        '$route.params.timeOne': {
            handler(newVal) {
                this.inTime = newVal;
            }
        },
        '$route.params.timeTwo': {
            handler(newVal) {
                this.outTime = newVal;
            }
        }
    },
    methods: {
        ...mapActions('room', ['getRoomInfo']),
        subscribe(item) {
            if (Object.keys(this.userInfo).length === 0) {
                window.alert('请先登录');
                window.location.replace('/');
                return false;
            }
            else if (!this.inTime || !this.outTime) {
                this.$message('请先选择入住时间和退房时间');
				return false;
			}
            else if (Date.parse(this.outTime) < Date.parse(this.inTime)) {
                this.$message('退房时间不能在入住时间前');
                return false;
            }
            else {
                /* this.$http.goPay({ outTradeNo: '1995053212218' }).then(res => {
                    window.open(res.url);
                }); */
                let tmpDate = new Date();
                let $year = tmpDate.getFullYear();
                let $month = tmpDate.getMonth() >= 9 ? (tmpDate().getMonth() + 1) : ('0' + (tmpDate.getMonth() + 1));
                let $day = tmpDate.getDate() >= 10 ? (tmpDate.getDate()) : ('0' + tmpDate.getDate());
                let date = $year + '-' + $month + '-' + $day; // 这里是弄出预定房间的时间
                let dt = {
                    _id: item._id,
                    name: this.userInfo.nickname,
                    idCard: this.userInfo.idCard,
                    date,
                    type: item.type,
                    inTime: this.inTime,
                    outTime: this.outTime,
                };
                let days = (Date.parse(dt.outTime) - Date.parse(dt.inTime)) / (1 * 24 * 60 *60 * 1000);
                days = days > 0 ? days : 1; // 至少一天
                dt['price'] = days * item.price * item.discount;
                this.$http.subscribeRoomType(dt).then(res => {
                    // 预定成功, 预定成功后应该重新更新一下vuex里面的数据
                    if (res.code === 10000) {
                        // this.$message(res.msg);
                        this.getRoomInfo({ loc: this.loc });
                    }
                    this.$message(res.msg);
                });
            }
        }
    },
    created() {
        this.getRoomInfo({ loc: this.loc });
    }
}
</script>
<style lang="scss" scoped>
.hk-room {
	background-color: #f7f7f7;
	padding-top: 10px;
	min-height: 100vh;
	box-sizing: border-box;
	.room-area {
		width: 1200px;
		margin: 0 auto;
		background-color: #fff;
		padding-top: 20px;
		.time {
			display: flex;
			.block {
				margin-right: 50px;
				span {
					margin-right: 10px;
					margin-left: 10px;
					transform: scale(0.9);
					display: inline-block;
				}
				.time-stamp {
					::v-deep input {
						cursor: pointer;
					}
				}
			}
		}
		.el-table {
			::v-deep img {
				width: 150px;
				height: 150px;
			}
			.price {
				color: rgb(236, 49, 49);
				font-size: 20px;
			}
		}
	}
}
</style>