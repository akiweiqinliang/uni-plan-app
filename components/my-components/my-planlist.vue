<template>
	<view>
		<uv-modal ref="changePlanModal" title="更换行程" content='当前有正在进行中的行程,确定更改为新的行程吗' confirmColor="#3B0E7B" :showCancelButton="true" @confirm="changePlan()"></uv-modal>
		<uv-modal ref="modal" title="删除行程" content='确定删除该行程吗？' @confirm="confirm()" confirmColor="#3B0E7B"></uv-modal>
		<view class="list">
			<uv-swipe-action>
				<view v-for="(item,index) in currentPlanList" :key="item.id" class="item">
					<uv-swipe-action-item :options="options" :name="item.id" :index="item.id" @click="deletePlan()">
						<view class="plan">
							<uv-row custom-style="width: 100%">
								<uv-col span="6">
									<view class="title">
										<text>{{item.title}}</text>
									</view>
									<view class="times">
										<text>{{item.startDate}}</text>
									</view>
									<view class="times">
										<text>{{item.endDate}}</text>
									</view>
								</uv-col>
								<uv-col span="6">
									<view v-if="planType === 'done'" class="checkedIcon">
										<uv-icon name="checkbox-mark" size="20"></uv-icon>
									</view>
									<uv-button v-if="planType === 'done'" shape="circle" text="写游记" color="#F0EFF5"
										customTextStyle="color: #333333" customStyle="border: none;"></uv-button>
									<uv-button v-if="planType === 'undo'" shape="circle" text="开启"
										@click="startPlan(item.id)" color="#F0EFF5" customTextStyle="color: #333333"
										customStyle="border: none;"></uv-button>
									<uv-button v-if="planType === 'draft'" shape="circle" text="继续编辑" color="#F0EFF5"
										customTextStyle="color: #333333" customStyle="border: none;"></uv-button>
								</uv-col>
							</uv-row>
						</view>
					</uv-swipe-action-item>
				</view>
			</uv-swipe-action>
		</view>
	</view>
</template>

<script>
	import {
		guid
	} from '@/uni_modules/uv-ui-tools/libs/function';
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex';
	export default {
		name: "my-planlist",
		props: {
			planType: {
				type: String,
				required: false,
				default () {
					return ''
				}
			}
		},
		data() {
			return {
				tempChangeId: '',
				selectedDeleteId: null,
				options: [{
					text: '删除',
					value: 'delete',
					style: {
						padding: '0 38.46rpx',
						boxSizing: 'border-box',
						marginLeft: '38.46rpx',
						height: '100%',
						backgroundColor: '#FF5E5E',
						borderRadius: '19.23rpx',
					}
				}]
			};
		},
		computed: {
			...mapState({
				planList: state => state.plan.planList,
				onGoingPlanId: state => state.plan.onGoingPlanId
			}),
			...mapGetters('plan', [
				'undoPlanList',
				'donePlanList',
			]),
			currentPlanList() {
				let plan = this.planList.filter(item => item.status === this.planType)
				return plan
			}
		},
		methods: {
			...mapActions('plan', ['setOngoPlanId']),
			startPlan(planId) {
				this.tempChangeId = planId;
				console.log(222, this.onGoingPlanId);
				if(this.onGoingPlanId !== "") {
					console.log(111);
					this.$refs.changePlanModal.open()
				}else{
				this.setOngoPlanId({
					planId
				})	
				}
			},
			changePlan() {
				this.setOngoPlanId({
					planId: this.tempChangeId
				})	
			},
			deletePlan(args) {
				this.$refs.modal.open()
				this.selectedDeleteId = args.name;
				console.log('delete plan name', args.name);
			},
			confirm() {
				this.$store.dispatch('plan/setPlanStatus', {planId: this.selectedDeleteId, newStatus: 'delete'})
			}
		}
	}
</script>

<style scoped lang="scss">
	.list {
		.item {
			margin-bottom: 46.15rpx;

			.plan {
				display: flex;
				width: 100%;
				padding: 57.69rpx 38.46rpx;
				box-sizing: border-box;
				border: 1px solid #F0EFF5;
				border-radius: 38.46rpx;

				.title {
					font-weight: 400;
					margin-bottom: 38.46rpx;
				}

				.times {
					font-size: 26.92rpx;
					font-weight: 300;

					&:nth-child(1) {
						margin-bottom: 7.69rpx;
					}
				}

				.checkedIcon {
					margin-bottom: 38.46rpx;
					display: flex;
					justify-content: flex-end;
				}
			}
		}
	}
</style>