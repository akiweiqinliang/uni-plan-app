<template>
	<view>
		<my-authpop ref="authpop"></my-authpop>
		<view class="content">
			<view class="top" v-if="!traveling">
				<text class="title">快开启新的行程吧！</text>
				<uv-icon name="search" color="#3B0E7B" size="28"></uv-icon>
			</view>
			<view v-else>
				<view class="top">
					<text class="title">行程进行中...</text>
					<uv-icon name="car" color="#3B0E7B" size="28"></uv-icon>
				</view>
				<view class="plan-card-warpper warpper-mini plan-card-home-style">
					<view class="times">
						<uv-row justify="space-between">
							<uv-text :text="onGoingPlan.startDate" align="left"></uv-text>
							<uv-text text="-" align="center"></uv-text>
							<uv-text :text="onGoingPlan.endDate" align="right"></uv-text>
						</uv-row>
						<view class="warpper-micro">
							<uv-row justify="space-between">
								<uv-text text="星期一" align="left"></uv-text>
								<uv-text text="星期五" align="right"></uv-text>
							</uv-row>
						</view>
					</view>
					<view class="title warpper-micro">
						<uv-text :text="onGoingPlan.title" bold="true" align="center" size="20"></uv-text>
					</view>
					<view class="detailBtn warpper-mini">
						<uv-button @click="toDetail()" text="查看详情" shape="circle"
							custom-style="border: 1px dashed #3B0E7B; color: #3B0E7B"></uv-button>
					</view>
				</view>
			</view>
			<view class="warpper-mini">
				<uv-row justify="center">
					<uv-tabs :current="currentTabIndex" :scrollable="false" :list="list1" lineColor="#3B0E7B"
						line-width="30" itemStyle="padding: 15.38rpx 140rpx;" :activeStyle="{
								color: '#3B0E7B',
								fontWeight: 'bold'
					    	}" @click="changeTabs"></uv-tabs>
				</uv-row>
			</view>
			<view v-if="userLogin || planList.length === 0">
				<view class="warpper img-warpper">
					<image mode="widthFix" src="../../static/image/home/home-empty.png" />
				</view>
				<view class="warpper-large">
					<uv-text text="当前待开启行程列表为空" align="center"></uv-text>
				</view>
				<view class="warpper">
					<uv-button type="primary" text="新建行程" @click="toCreatePlanPage"></uv-button>
				</view>
			</view>
			<view v-else class="plan-list">
				<my-planlist v-if="currentTabIndex === 0" plan-type="undo"></my-planlist>
				<my-planlist v-else-if="currentTabIndex === 1" plan-type="done"></my-planlist>
			</view>
			<view class="warpper">
				<uv-row justify="space-between">
					<uv-text text="游记" :bold="true"></uv-text>
					<uv-input :custom-style="{background: '#F8F8FA', padding: '10rpx'}" border="none" shape="circle"
						placeholder="请输入" suffixIcon="search" suffixIconStyle="color: #3B0E7B"></uv-input>
				</uv-row>
			</view>
			<view class="warpper">
				<!-- 瀑布流游记 -->
				<my-diarylist></my-diarylist>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {
				userPlanNum: 0,
				currentTabIndex: 0,
				list1: [{
					name: '未开启',
				}, {
					name: '已完成',
				}],
			}
		},
		computed: {
			...mapState({
				planList: state => state.plan.planList,
				userLogin: state => state.user.loginFlag
			}),
			...mapGetters('plan', ['onGoingPlan']),
			traveling() {
				if (this.onGoingPlan === undefined) {
					return false
				} else {
					return true
				}
			}
		},
		mounted() {
			console.log(this.onGoingPlan);
		},
		methods: {
			changeTabs(item) {
				this.currentTabIndex = item.index;
			},
			toDetail() {
				uni.switchTab({
					url: '/pages/travel/index'
				})
			},
			toCreatePlanPage() {
				if (this.userLogin) {
					uni.navigateTo({
						url: '/pages/draftBox/create'
					})
				} else {
					uni.getUserProfile({
						desc: '用于完善会员资料',
						success: (res) => {
							this.$refs.authpop.open(res.userInfo)
						},
						fail: (err) => {
							console.log('获取用户信息失败', err);
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.plan-list {
		margin-top: 38.46rpx;
	}
	.plan-card-home-style {
		border: 1px dashed #3B0E7B;
		background-color: #F9F9FD;
	}
</style>