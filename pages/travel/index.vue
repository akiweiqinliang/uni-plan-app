<template>
	<view>
		<uv-toast ref="toast"></uv-toast>
		<uv-popup ref="eventPopup" mode="center" round="38.46rpx" :customStyle="{
			padding: '38.46rpx'
		}">
			<view v-if="popEvent !== null">
				<view v-if="popEvent.order" class="order warpper-micro">
					<text>班次：{{popEvent.order}}</text>
				</view>
				<view class="title warpper-micro">
					<uv-text :text="popEvent.title" bold="true" align="center" size="20"></uv-text>
				</view>
				<view v-if="popEvent.address" class="address warpper-micro">
					<text>地址：{{popEvent.address}}</text>
					<uv-button text="复制地址"></uv-button>
				</view>
				<view class="warpper-micro">
					<uv-row justify="space-between">
						<uv-text
							:text="`开始：${formatDateNoSecond(popEvent.startDateTime)} ${formatDateOnlySecond(popEvent.startDateTime)}`"
							align="left"></uv-text>
						<uv-text
							:text="`结束：${formatDateNoSecond(popEvent.endDateTime)} ${formatDateOnlySecond(popEvent.endDateTime)}`"
							align="right"></uv-text>
					</uv-row>
				</view>
			</view>
		</uv-popup>
		<view class="content">
			<view v-if="onGoingPlan !== undefined">
				<view class="top">
					<text v-if="onGoingEvent && !showTomorrow" class="title">当前行程进行中...</text>
					<text v-if="!onGoingEvent" class="title">今日的行程已结束!</text>
					<text v-if="showTomorrow" class="title">明日行程</text>
					<text class="title">{{onGoingPlan.title}}</text>
				</view>
				<view v-if="onGoingEvent && !showTomorrow" class="plan-card-warpper warpper-mini"
					:class="onGoingEvent.order ? 'traffic-card-travel-style': 'plan-card-travel-style'">
					<view class="times">
						<uv-row justify="space-between">
							<uv-text :text="formatDateNoSecond(today)" align="left"></uv-text>
							<uv-text :text="formatToWeekday(today)" align="right"></uv-text>
						</uv-row>
					</view>
					<view v-if="onGoingEvent.order" class="order warpper-micro">
						<uv-text :text="`班次：${onGoingEvent.order}`"></uv-text>
					</view>
					<view class="title warpper-micro">
						<uv-text :text="onGoingEvent.title" bold="true" align="center" size="20"></uv-text>
					</view>
					<view v-if="onGoingEvent.outset || onGoingEvent.destination" class="warpper-micro">
						<uv-row justify="space-between">
							<uv-text :text="onGoingEvent.outset" align="left"></uv-text>
							<uv-text text="-" align="center"></uv-text>
							<uv-text :text="onGoingEvent.destination" align="right"></uv-text>
						</uv-row>
					</view>
					<view v-if="onGoingEvent.address" class="address warpper-micro">
						<text>地址：{{onGoingEvent.address}}</text>
						<uv-button text="复制地址"></uv-button>
					</view>
					<view class="warpper-micro">
						<uv-row justify="space-between">
							<uv-text
								:text="`开始：${formatDateNoSecond(onGoingEvent.startDateTime)} ${formatDateOnlySecond(onGoingEvent.startDateTime)}`"
								align="left"></uv-text>
							<uv-text
								:text="`结束：${formatDateNoSecond(onGoingEvent.endDateTime)} ${formatDateOnlySecond(onGoingEvent.endDateTime)}`"
								align="right"></uv-text>
						</uv-row>
					</view>
				</view>
				<view v-if="onGoingEvent && !showTomorrow" class="warpper">
					<view class="warpper-mini">
						<uv-button type="primary" text="打卡" @click="checkCurrentEvent()" :disabled="onGoingIndex === currentDayList.length"></uv-button>
					</view>
					<view class="warpper-mini">
						<uv-button text="跳过" color="#F8F8FA" customTextStyle="color: #000000"
							@click="skipCurrentEvent()"></uv-button>
					</view>
				</view>
				<view class="warpper plan-list">
					<ul>
						<li v-for="(item, index) in currentDayList" :key="item.id" @click="openEventPop(index)">
							<uv-row justify="space-between">
								<text>{{item.title}}</text>
								<view v-if="item.checkFlag === 'done'" class="done">
									<uv-icon name="checkbox-mark"></uv-icon>
								</view>
								<view v-if="item.checkFlag === 'doing' && !showTomorrow" class="doing">
									<text>进行中</text>
								</view>
								<view v-if="item.checkFlag === 'skip'" class="skip">
									<text>跳过</text>
								</view>
								<view v-if="item.checkFlag === 'undo' || showTomorrow" class="undo">
									<text>{{formatDateOnlySecond(item.startDateTime)}}</text>
									-
									<text>{{formatDateOnlySecond(item.endDateTime)}}</text>
								</view>
							</uv-row>
						</li>
					</ul>
				</view>
				<view class="warpper">
					<view v-if="!onGoingEvent" class="warpper-mini" @click="tomorrow()">
						<uv-text text="去看明天行程?"></uv-text>
					</view>
					<view v-show="showTomorrow" class="warpper-mini">
						<uv-button type="primary" text="返回" @click="backToday()"></uv-button>
					</view>
					<view v-show="!showTomorrow" class="warpper-mini">
						<uv-button type="primary" text="结束行程" @click="endPlan()"></uv-button>
					</view>
					<view v-show="!showTomorrow" class="warpper-mini">
						<uv-button text="取消行程" color="#F8F8FA" customTextStyle="color: #000000"
							@click="cancelPlan()"></uv-button>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="warpper img-warpper">
					<image mode="widthFix" src="../../static/image/travel/travel-empty.png" />
				</view>
				<view class="warpper-large">
					<uv-text text="当前还没有开启行程哦" align="center"></uv-text>
				</view>
				<view class="warpper">
					<uv-button type="primary" text="开启行程" @click="checkPlans()"></uv-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate,
		formatToWeekday,
		formatDateNoSecond,
		formatDateOnlySecond
	} from '@/utils/formatDate';
	import {
		mapState,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				traveling: false,
				// today: new Date('2024-11-1').getTime(),
				today: null,
				onGoingIndex: 0,
				popEvent: null,
				showTomorrow: false
			}
		},
		watch: {
			onGoingPlan: {
			      immediate: true, // 立即触发一次回调
			      handler(newPlan, oldPlan) {
			        if (newPlan && newPlan.startDate) {
			          this.today = new Date(newPlan.startDate).getTime();
			        }
					if(oldPlan && (newPlan.id !== oldPlan.id)) {
						this.onGoingIndex = 0
					}
			      }
			    }
		},
		created() {
			// 在生命周期钩子中设置 today
			    if (this.onGoingPlan && this.onGoingPlan.startDate) {
			      this.today = new Date(this.onGoingPlan.startDate).getTime();
			    }
		},
		computed: {
			...mapGetters('plan', [
				'undoPlanList',
				'onGoingPlan'
				// 'donePlanList',
			]),
			currentDayList() {
				if (this.onGoingPlan === undefined) return []

				const arrs = [...(this.onGoingPlan.trafficList || []), ...(this.onGoingPlan.hotelList || []), ...(this
					.onGoingPlan.activityList || [])]
				// 数据模拟
				const todayList = arrs.filter(item => this.formatDateNoSecond(item.startDateTime) === this
					.formatDateNoSecond(this.today))
				let a = todayList.sort((a, b) => a.startDateTime - b.startDateTime)
				a.forEach((item, index) => {
					if (index === this.onGoingIndex) {
						item.checkFlag = 'doing'
					} else if (index > this.onGoingIndex) {
						item.checkFlag = 'undo'
					}
				})
				return a
			},
			onGoingEvent() {
				if(this.currentDayList[this.onGoingIndex]) {
					return this.currentDayList[this.onGoingIndex]
				}else {
					return null
				}
				
			}
		},
		methods: {
			formatDate,
			formatDateNoSecond,
			formatToWeekday,
			formatDateOnlySecond,
			checkPlans() {
				if (this.undoPlanList.length > 0) {
					uni.switchTab({
						url: "/pages/home/index"
					})
				}
			},
			checkCurrentEvent() {
				this.currentDayList[this.onGoingIndex].checkFlag = 'done'
				this.onGoingIndex++
			},
			skipCurrentEvent(id) {
				this.currentDayList[this.onGoingIndex].checkFlag = 'skip'
				this.onGoingIndex++
			},
			isFutureDay(timestamp) {
				return new Date(timestamp).setHours(0,0,0,0) > this.today;
			},
			tomorrow() {
				this.showTomorrow = true
				const oneDayInMs = 24 * 60 * 60 * 1000; 
				this.today += oneDayInMs;
				this.onGoingIndex = 0
			},
			backToday() {
				this.showTomorrow = false
				const oneDayInMs = 24 * 60 * 60 * 1000; 
				this.today -= oneDayInMs;
				this.onGoingIndex = this.currentDayList.length
			},
			endPlan() {

			},
			cancelPlan() {},
			openEventPop(index) {
				this.popEvent = this.currentDayList[index];
				this.$refs.eventPopup.open()
			}
		}
	}
</script>

<style scoped lang="scss">
	.plan-card-travel-style {
		border: 1px dashed #3B0E7B;
		background-color: #F9F9FD;
	}

	.traffic-card-travel-style {
		border: 1px dashed #3B0E7B;
	}

	.order {
		font-size: 26.92rpx;
		font-weight: bold;
		color: #3B0E7B;
		margin: 0 auto;
		padding: 19.23rpx;
		background-color: #F0EFF5;
	}
	.future{
		background-color: #F0EFF5;
	}
	.plan-list {
		ul {
			border: 1px solid rgba(59, 14, 123, 0.07);

			li {
				padding: 30.77rpx;
				font-size: 26.92rpx;
				border-bottom: 1px solid rgba(59, 14, 123, 0.07);
			}
		}
	}
</style>