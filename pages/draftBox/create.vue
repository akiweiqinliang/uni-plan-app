<template>
	<view>
		<uv-toast ref="toast"></uv-toast>
		<view class="content">
			<view class="warpper">
				<uv-row justify="center">
					<uv-tabs :current="currentTabIndex" :scrollable="false" :list="list1" lineColor="#3B0E7B"
						lineWidth="30" itemStyle="padding: 15.38rpx 70rpx; whiteSpace: nowrap" :activeStyle="{
								color: '#3B0E7B',
								fontWeight: 'bold'
					    	}" @click="changeTabs"></uv-tabs>
				</uv-row>
			</view>
			<view class="warpper">
				<view class="form" v-show="currentTabIndex === 0">
					<!-- 主题 -->
					<uv-form :borderBottom="false" labelWidth="190rpx" labelPosition="left" :model="planInfo"
						:rules="rules" ref="form">
						<uv-form-item label="主题" prop="title">
							<uv-input v-model="planInfo.title" border="none" placeholder="输入目的地">
							</uv-input>
						</uv-form-item>
						<uv-form-item label="出发日期" prop="startDate" @click="openCalendar('startCalendar')">
							<uv-calendar ref="startCalendar" color="#3B0E7B" mode="single"
								@confirm="confirmStart"></uv-calendar>
							<uv-input v-model="planInfo.startDate" disabled disabledColor="#ffffff" placeholder="请选择日期"
								border="none">
							</uv-input>
						</uv-form-item>
						<uv-form-item label="回程日期" prop="endDate" @click="openCalendar('endCalendar')">
							<uv-calendar ref="endCalendar" color="#3B0E7B" mode="single"
								@confirm="confirmEnd"></uv-calendar>
							<uv-input v-model="planInfo.endDate" disabled disabledColor="#ffffff" placeholder="请选择日期"
								border="none">
							</uv-input>
						</uv-form-item>
					</uv-form>
				</view>
				<view class="traffic" v-show="currentTabIndex === 1">
					<!-- 交通 -->
					<my-swipelist :current-list="planInfo.trafficList" list-key="traffic"
						@changePlanB="handleChangePlanB()" @on-edit="handleEditById()"
						@on-delete="handleDeleteById()"></my-swipelist>
					<view class="addBtn">
						<uv-text align="center" prefixIcon="plus-circle" icon-style="color: #3B0E7B;" type="primary"
							text="新增出行方式" @click="toCreate('traffic')"></uv-text>
					</view>
				</view>
				<view class="hotel" v-show="currentTabIndex === 2">
					<!-- 住宿 -->
					<my-swipelist :current-list="planInfo.hotelList" list-key="hotel" @changePlanB="handleChangePlanB()"
						@on-edit="handleEditById()" @on-delete="handleDeleteById()"></my-swipelist>
					<view class="addBtn">
						<uv-text align="center" prefixIcon="plus-circle" icon-style="color: #3B0E7B;" type="primary"
							text="新增住宿方式" @click="toCreate('hotel')"></uv-text>
					</view>
				</view>
			</view>
			<view class="warpper-large">
				<uv-row justify="space-between">
					<uv-text text="景点"></uv-text>
					<uv-icon name="plus-circle" size="24" color="primary" @click="toCreate('place')"></uv-icon>
				</uv-row>
				<my-activitylist :planFirstDate="startDateProp" :activity-list="placeList" @on-delete="handleDeleteById()"
					@on-edit="handleEditById()"></my-activitylist>
				<!-- <my-activitylist></my-activitylist> -->
			</view>
			<view class="warpper-large">
				<uv-row justify="space-between">
					<uv-text text="吃饭"></uv-text>
					<uv-icon name="plus-circle" size="24" color="primary" @click="toCreate('eat')"></uv-icon>
				</uv-row>
				<my-activitylist :planFirstDate="startDateProp" :activity-list="eatList" @on-delete="handleDeleteById()"
					@on-edit="handleEditById()"></my-activitylist>
			</view>
			<view class="warpper-large">
				<uv-row justify="space-between">
					<uv-text text="心愿"></uv-text>
					<uv-icon name="plus-circle" size="24" color="primary" @click="toCreate('wish')"></uv-icon>
				</uv-row>
				<my-activitylist :planFirstDate="startDateProp" :activity-list="wishList" @on-delete="handleDeleteById()"
					@on-edit="handleEditById()"></my-activitylist>
			</view>
		</view>
		<view class="bottom-sticky">
			<uv-row>
				<image src="/static/icons/total-price.svg"></image>
				<span>累计预算:</span>
				<span class="price">{{planInfo.totalPrice}}</span>
			</uv-row>
			<view class="warpper-micro btns">
				<view class="tempBtn">
					<uv-button text="暂存草稿箱" color="#F0EFF5" customTextStyle="color: #333333" customStyle="border: none;"
						@click="saveToDraftBox()"></uv-button>
				</view>
				<uv-button text="新建行程" type="primary" @click="saveToPlanList()"></uv-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		guid
	} from '@/uni_modules/uv-ui-tools/libs/function/index.js'
	export default {
		data() {
			return {
				currentTabIndex: 0,
				currentEditId: '',
				receivedData: {},
				listMap: {
					traffic: 'trafficList',
					hotel: 'hotelList',
					default: 'activityList',
				},
				list1: [{
					name: '行程',
				}, {
					name: '交通',
				}, {
					name: '住宿'
				}],
				planInfo: {
					id: guid(),
					title: '',
					startDate: '',
					endDate: '',
					totalPrice: 0,
					status: 'draft',
					trafficList: [],
					hotelList: [],
					activityList: [],
				},
				rules: {
					title: {
						type: 'string',
						required: true,
						message: '请输入目的地',
						trigger: ['blur', 'change']
					},
					startDate: {
						type: 'string',
						required: true,
						message: '请输入出发日期',
						trigger: ['blur', 'change']
					},
					endDate: {
						type: 'string',
						required: false,
						message: '请输入回程日期',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		onShow() {
			if (this.receivedData && Object.keys(this.receivedData).length > 0) {
				console.log('Received Data:', this.receivedData)
				const {
					oldPrice,
					type,
					data: result
				} = {
					...this.receivedData
				}
				// 确定要操作的列表
				const list = this.listMap[type] || this.listMap.default;
				// 如果是编辑模式，删除旧的 item
				if (result.id === this.currentEditId) {
					this.planInfo[list] = this.planInfo[list].filter(item => item.id !== this.currentEditId);
					this.planInfo.totalPrice -= Number(oldPrice) || 0
				}
				this.planInfo[list].push(result)
				// 更新总价
				this.planInfo.totalPrice += Number(result.price) || 0
				// 清空 receivedData 以防重复处理
				this.receivedData = {};
				// 强制更新视图
				this.$forceUpdate();
			}
		},
		computed: {
			startDateProp() {
				return new Date(this.planInfo.startDate).getTime()
			},
			placeList() {
				return this.planInfo.activityList.filter(item => item.eventType === 'place')
			},
			eatList() {
				return this.planInfo.activityList.filter(item => item.eventType === 'eat')
			},
			wishList() {
				return this.planInfo.activityList.filter(item => item.eventType === 'wish')
			},
		},
		methods: {
			changeTabs(item) {
				this.currentTabIndex = item.index
			},
			openCalendar(ref) {
				this.$refs[ref].open()
			},
			confirmStart(e) {
				console.log(e)
				this.planInfo.startDate = e[0]
			},
			confirmEnd(e) {
				console.log(e)
				this.planInfo.endDate = e[0]
			},
			toCreate(type) {
				uni.navigateTo({
					url: `/pages/draftBox/new/event?type=${type}&mode=add`,
				})
			},
			handleEditById(args) {
				const {
					id,
					listKey
				} = {
					...args
				}
				this.currentEditId = id
				const list = this.listMap[listKey] || this.listMap['default'];
				const editObj = this.planInfo[list].find(item => item.id === id)
				const tempInfo = JSON.stringify(editObj)

				uni.navigateTo({
					url: `/pages/draftBox/new/event?type=${listKey}&mode=edit&tempInfo=${tempInfo}`,
				})
			},
			handleDeleteById(args) {
				const {
					id,
					listKey
				} = {
					...args
				}
				const list = this.listMap[listKey] || this.listMap['default'];
				const delObj = this.planInfo[list].find(item => item.id === id);
				this.planInfo.totalPrice -= Number(delObj.price);
				this.planInfo[list] = this.planInfo[list].filter(item => item.id !== id)
			},
			handleChangePlanB(args) {
				const {
					id,
					listKey
				} = {
					...args
				}
				const list = this.listMap[listKey] || this.listMap['default'];
				const changeObj = this.planInfo[list].find(item => item.id === id);
				changeObj.planB = !changeObj.planB
				if (!changeObj.planB) {
					this.$refs.toast.show({
						type: 'default',
						message: '已将当前设定为主要方案'
					})
				} else {
					this.$refs.toast.show({
						type: 'default',
						message: '已将当前设定为备用方案'
					})
				}
				// const planB = this.planInfo[listKey].find(item => item.id === id).planB;

			},
			saveToDraftBox() {
				this.$store.dispatch('plan/addPlan', this.planInfo)
				const pages = getCurrentPages(); // 获取当前页面栈
				if (pages.length > 1) {
					uni.navigateBack(); // 只有在页面栈大于1时才返回
				} else {
					// 可能是返回首页或者其他逻辑
					uni.redirectTo({
						url: '/pages/draftBox/index' // 替换为首页路径
					});
				}


			},
			saveToPlanList() {
				this.planInfo.status = 'undo'
				this.$store.dispatch('plan/addPlan', this.planInfo)
				const pages = getCurrentPages(); // 获取当前页面栈
				if (pages.length > 1) {
					uni.navigateBack(); // 只有在页面栈大于1时才返回
				} else {
					// 可能是返回首页或者其他逻辑
					uni.redirectTo({
						url: '/pages/home/index' // 替换为首页路径
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.addBtn {
		display: flex;
		justify-content: center;
	}

	.form {
		border: 1px solid #F0EFF5;
		padding: 30.77rpx;
		border-radius: 38.46rpx;
	}

	.bottom-sticky {
		background-color: #FFFFFF;
		padding: 38.46rpx 57.69rpx 57.69rpx;
		border-top: 1px solid rgba(59, 14, 123, 0.07);
		position: sticky;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 20;

		image {
			width: 46.15rpx;
			height: 46.15rpx;
			margin-right: 15.38rpx;
		}

		span {
			margin-right: 15.38rpx;
		}

		.price {
			font-weight: bold;
			font-size: 34.62rpx;
		}

		.btns {
			display: flex;
			justify-content: flex-end;

			.tempBtn {
				margin-right: 19.23rpx;
			}
		}
	}
</style>