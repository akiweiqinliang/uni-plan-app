<template>
	<view class="warpper-mini">
		<uv-modal ref="modal" title="删除行程" content='确定删除该行程吗？' @confirm="confirm()"></uv-modal>
		<view class="list">
			<uv-swipe-action>
				<view v-for="(item,index) in currentList" :key="item.id" class="item">
					<uv-swipe-action-item :options="options" :name="item.id" :index="item.id" @click="handleClick()">
						<view class="plan" @click="changePlanBStatus(item.id)">
							<view class="checkFlag" v-show="!item.planB">
								<view class="box"></view>
								<view class="icon">
									<uv-icon name="checkbox-mark"></uv-icon>
								</view>
							</view>
							
							<uv-form class="form" labelWidth="190rpx" labelPosition="left">
								<uv-form-item :label="pageTypeLabel[listKey].titleLabel">
									<text>{{item.title}}</text>
								</uv-form-item>
								<uv-form-item :label="pageTypeLabel[listKey].startDateTimeLabel">
									<text>{{formatDate(item.startDateTime)}}</text>
								</uv-form-item>
								<uv-form-item :label="pageTypeLabel[listKey].endDateTimeLabel">
									<text>{{formatDate(item.endDateTime)}}</text>
								</uv-form-item>
								<uv-form-item v-if="listKey === 'traffic'" label="班次">
									<text>{{item.order}}</text>
								</uv-form-item>
								<uv-form-item label="价格">
									<text>{{item.price}}</text>
								</uv-form-item>
								<uv-form-item v-if="item.other" label="备注">
									<text>{{item.other}}</text>
								</uv-form-item>
							</uv-form>
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
	import { formatDate } from '@/utils/formatDate';
	export default {
		name: "my-swipelist",
		props: {
			currentList: {
				type: Array,
				required: true,
				default () {
					return []
				}
			},
			listKey: {
				type: String,
				required: true,
				default () {
					return 'traffic'
				}
			}
		},
		data() {
			return {
				selectedDeleteId: null,
				pageTypeLabel: {
					traffic: {
						titleLabel: '交通工具',
						titlePlaceholder: '请输入出行工具',
						startDateTimeLabel: '出发时间',
						startDateTimePlaceholder: '请选择出发时间',
						endDateTimeLabel: '到达时间',
						endDateTimePlaceholder: '请选择到达时间'
					},
					hotel: {
						titleLabel: '酒店',
						titlePlaceholder: '请输入酒店名称',
						startDateTimeLabel: '入住时间',
						startDateTimePlaceholder: '请选择入住时间',
						endDateTimeLabel: '离店时间',
						endDateTimePlaceholder: '请选择离店时间'
					},
				},
				options: [{
						text: '编辑',
						value: 'edit',
						style: {
							padding: '0 38.46rpx',
							boxSizing: 'border-box',
							marginLeft: '38.46rpx',
							height: '100%',
							// fontSize: '26.92rpx',
							backgroundColor: '#3B0E7B',
							borderRadius: '19.23rpx',
						},
					},
					{
						text: '删除',
						value: 'delete',
						style: {
							padding: '0 38.46rpx',
							boxSizing: 'border-box',
							marginLeft: '38.46rpx',
							// fontSize: '26.92rpx',
							height: '100%',
							backgroundColor: '#F44336',
							borderRadius: '19.23rpx',
						}
					}
				]
			};
		},
		methods: {
			formatDate,
			changePlanBStatus(eventId) {
				this.$emit('changePlanB', {
						id: eventId,
						listKey: this.listKey
					})
			},
			handleClick(args) {
				console.log(args);
				const action = this.options[args.index].value;
				const eventId = args.name;
				if (action === 'edit') {
					// edit
					console.log(action);
					this.$emit('on-edit', {
						id: eventId,
						listKey: this.listKey
					})
				} else if (action === 'delete') {
					// delete
					console.log(action);
					this.$emit('on-delete', {
						id: eventId,
						listKey: this.listKey
					})
				}
				// this.$refs.modal.open()
				// this.selectedDeleteId = args.name;
				// console.log('delete plan name', args.name);
			},
			confirm() {
				this.$store.dispatch('plan/setPlanStatus', {
					planId: this.selectedDeleteId,
					newStatus: 'delete'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.list {
		.item {
			margin-bottom: 46.15rpx;
			position: relative;

			.checkFlag {
				position: absolute;
				right: 0;
				top: 0;
				z-index: 11;
				border-radius: 0 38.46rpx 0 0;
				overflow: hidden;

				.box {
					width: 0;
					height: 0;
					border-left: 96.15rpx solid transparent;
					border-top: 96.15rpx solid #F9F9FD;
				}

				.icon {
					position: absolute;
					z-index: 12;
					top: 19.23rpx;
					right: 19.23rpx;
				}
			}

			.plan {
				display: flex;
				width: 100%;
				padding: 30.77rpx;
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