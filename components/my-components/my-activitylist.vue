<template>
	<ul>
		<uv-swipe-action>
			<li v-for="item in activityList1" :key="item.id" class="warpper-mini">
				<view class="bgNum">
					<text>Day {{getDayOfSmallPlan(planFirstDate, item.startDateTime)}}</text>
				</view>
				<uv-swipe-action-item :options="options" :name="item.id" :index="item.id" @click="handleClick()">
					<view class="activity">
						<view class="editBtn" @click="toEditEvent(item)">
							<text>编辑</text>
						</view>
						<view class="listItem">
							<text class="label">目的地:</text><text class="contentText">{{item.title}}</text>
						</view>
						<view class="warpper-micro listItem">
							<text class="label">地点：</text><text class="contentText">{{item.address}}</text>
						</view>
						<view class="warpper-micro listItem">
							<text class="label">价格：</text><text class="contentText">{{item.price}}</text>
						</view>
						<view class="warpper-micro listItem">
							<text class="label">开始时间：</text><text
								class="contentText">{{formatDate(item.startDateTime)}}</text>
						</view>
						<view class="warpper-micro listItem">
							<text class="label">结束时间：</text><text
								class="contentText">{{formatDate(item.endDateTime)}}</text>
						</view>
						<view class="warpper-micro listItem" v-if="item.other">
							<text class="label">备注：</text><text class="contentText">{{item.other}}</text>
						</view>
					</view>
				</uv-swipe-action-item>
			</li>
		</uv-swipe-action>
	</ul>
</template>

<script>
	import {
		formatDate
	} from '@/utils/formatDate';
	export default {
		name: 'my-activitylist',
		props: {
			planFirstDate: {
				type: Number,
				required: true,
				default () {
					return new Date().getDate()
				}
			},
			activityList: {
				type: Array,
				required: false,
				default () {
					return [{
						title: 'ssssssss',
						planB: false,
						price: '11',
						other: '',
						startDateTime: '',
						endDateTime: '',
						// traffic
						outset: '', // 始发站
						destination: '', // 终点站
						order: '', // 班次
						// hotel === common
						// event
						address: '', // 具体地址
					}]
				}
			}
		},
		data() {
			return {
				options: [{
					text: '删除',
					value: 'delete',
					style: {
						padding: '0 38.46rpx',
						boxSizing: 'border-box',
						marginLeft: '38.46rpx',
						fontSize: '26.92rpx',
						height: '100%',
						backgroundColor: '#F44336',
						borderRadius: '19.23rpx',
					}
				}]
			}
		},
		computed: {
			// 计算每个活动的第几天
			// activityDays() {
			// 	const totalPlanList = new Date(this.planFirstDate).setHours(0,0,0,0)
			// 	return this.a
			// }
			activityList1() {
				return this.activityList.sort((a, b) => a.startDateTime - b.startDateTime)
			}
		},
		methods: {
			getDayOfSmallPlan(totalPlanTimestamp, smallPlanTimestamp) {
				// 将时间戳转换为日期对象
				const totalPlanDate = new Date(totalPlanTimestamp);
				const smallPlanDate = new Date(smallPlanTimestamp);
				// 获取总计划的开始日期（设置为午夜 0 点）
				const totalPlanStart = new Date(totalPlanDate.setHours(0, 0, 0, 0));

				// 获取小计划的开始日期（设置为午夜 0 点）
				const smallPlanStart = new Date(smallPlanDate.setHours(0, 0, 0, 0));

				// 计算日期差，得到小计划相对于总计划的天数
				const timeDifference = smallPlanStart - totalPlanStart;
				const dayDifference = timeDifference / (1000 * 60 * 60 * 24); // 转换为天数

				// 返回第几天（加1以适应人类习惯）
				return dayDifference + 1; // 第一天为 1

			},
			formatDate,
			toEditEvent(item) {
				this.$emit('onEdit', {
					id: item.id,
					listKey: item.eventType
				})
			},
			handleClick(args) {
				const action = this.options[args.index].value;
				const eventId = args.name;
				// delete
				console.log(action);
				this.$emit('on-delete', {
					id: eventId,
					listKey: ''
				})

			},
		}
	}
</script>

<style scoped lang="scss">
	ul {
		li {
			position: relative;

			.bgNum {
				position: absolute;
				font-size: 100rpx;
				// font-weight: bold;
				font-style: italic;
				color: #3B0E7B;
				opacity: 0.15;
				right: 30.77rpx;
				bottom: 30.77rpx;
				z-index: 11;
			}
		}

		li .activity {
			position: relative;
			border: 1px solid rgba(59, 14, 123, 0.07);
			border-radius: 7.69rpx;
			padding: 30.77rpx;

			.editBtn {
				position: absolute;
				top: 30.77rpx;
				right: 30.77rpx;
				font-size: 26.92rpx;
				font-weight: 300;
			}

			.listItem {
				font-size: 26.92rpx;
				font-weight: 300;

				.label {
					margin-right: 19.23rpx;
				}

				.label,
				.contentText {
					display: inline-block;
					word-break: break-word;
				}
			}
		}
	}
</style>