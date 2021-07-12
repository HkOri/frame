<template>
    <div class="hk-dashboard">
		<div class="top">
			<div class="hk-chart">
				<h3>住房记录</h3>
				<div class="hkChart" ref="hkLive"></div>	
			</div>
			<div class="hk-chart">
				<h3>消费记录</h3>
				<div class="hkChart" ref="hkConsume"></div>	
			</div>
		</div>
		<div class="bottom">
			<el-table
				:data="tableData"
				style="width: 100%"
				:max-height="600"
				:default-sort = "{prop: 'date', order: 'descending'}">
				<el-table-column
					prop="date"
					label="日期"
					sortable>
				</el-table-column>
				<el-table-column
					prop="eid"
					label="操作人员工号"
					sortable>
				</el-table-column>
				<el-table-column
					prop="cname"
					label="被操作表名">
				</el-table-column>
				<el-table-column
					prop="recordId"
					label="被操作记录Id">
				</el-table-column>
				<el-table-column
					prop="oper"
					label="操作">
				</el-table-column>
			</el-table>
		</div>
    </div>
</template>
<script>
var echarts = require('echarts');
export default {
	name: 'Dashboard',
	data() {
		return {
			liveAttr: [],
			liveData: [],
			consumeData: [], // 饼状图
			tableData: []
		}
	},
	created() {
		this.$http.getLiveCount().then(res => {
			if (res.code === 10000) {
				for (let item of res.data) {
					this.liveAttr.push(Object.values(item)[0]);
					this.liveData.push(Object.values(item)[1]);
				}
			}
		});
		this.$http.getConsumeCount().then(res => {
			if (res.code === 9000) {
				for (let item of res.data) {
					this.consumeData.push({ value: Object.values(item)[1], name: Object.values(item)[0] });
				}
			}
		});
		this.$http.getOperInfo().then(res => {
			if (res.code === 20000) {
				this.tableData = res.data;
			}
		});
	},
	watch: {
		liveAttr: {
			handler(newVal) {
				if (newVal) {
					this.paintOne();
				}
			},
			deep: true
		},
		consumeData: {
			handler(newVal) {
				if (newVal) {
					this.paintTwo();
				}
			},
			deep: true
		},
	},
	methods: {
		paintOne() {
			// 基于准备好的dom，初始化echarts实例
			let liveChart = echarts.init(this.$refs.hkLive);
			// 绘制图表
			liveChart.setOption({
				tooltip: {},
				xAxis: {
					data: this.liveAttr
				},
				yAxis: {},
				series: [
					{
						name: '热度',
						type: 'bar',
						data: this.liveData
					}
				]
			});
		},
		paintTwo() {
			let consumeChart = echarts.init(this.$refs.hkConsume);
			consumeChart.setOption({
				tooltip: {},
				series : [
					{
						name: '消费热度',
						type: 'pie',
						radius: '55%',
						roseType: 'angle',
						data: this.consumeData
					}
				]
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.hk-dashboard {
	width: 100%;
	height: 100%;
	text-align: left;
	padding: 10px 20px;
	box-sizing: border-box;
	background-color: #394056;
	overflow: auto;
	.top {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: space-around;
		h3 {
			color: #ccc;
			margin-left: 20px;
		}
		.hk-chart {
			width: 45%;
			height: 50%;
			.hkChart {
				width: 100%;
				height: 100%;
			}
		}
	}
	.bottom {
		margin-top: -150px;
	}
}
</style>