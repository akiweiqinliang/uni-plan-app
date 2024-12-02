<template>
	<view class="content">
		<uv-toast ref="toast"></uv-toast>
		<view class="warpper">
			<uv-row justify="space-between">
				<uv-text v-for="item in pageItems" :key="item.type" v-if="pageType === item.type" :text="item.text"
					type="primary" :bold="true"></uv-text>
				<view v-if="pageType === 'traffic' || pageType === 'hotel'" class="checkPlanB">
					<uv-text text="设为备选方案"></uv-text>
					<uv-checkbox-group v-model="checkPlanBArr" activeColor="#3B0E7B" icon-placement="right">
						<uv-checkbox label=" " name="planB"></uv-checkbox>
					</uv-checkbox-group>
				</view>
			</uv-row>
		</view>
		<view class="warpper-mini">
			<uv-form labelWidth="190rpx" labelPosition="left" :model="info" ref="commonForm">
				<uv-form-item required borderBottom :label="pageTypeLabel[pageType].titleLabel" prop="title">
					<uv-input v-model="info.title" border="none"
						:placeholder="pageTypeLabel[pageType].titlePlaceholder">
					</uv-input>
				</uv-form-item>
				<template v-if="pageType === 'traffic'">
					<uv-form-item borderBottom label="始发站" prop="outset">
						<uv-input v-model="info.outset" border="none" placeholder="请输入始发站">
						</uv-input>
					</uv-form-item>
					<uv-form-item borderBottom label="终点站" prop="destination">
						<uv-input v-model="info.destination" border="none" placeholder="请输入终点站">
						</uv-input>
					</uv-form-item>
					<uv-form-item borderBottom label="班次" prop="order">
						<uv-input v-model="info.order" border="none" placeholder="请输入班次号">
						</uv-input>
					</uv-form-item>
				</template>
				<template v-if="pageType !== 'traffic'">
					<uv-form-item borderBottom label="地点" prop="address">
						<uv-input v-model="info.address" border="none" placeholder="目的地地址">
						</uv-input>
					</uv-form-item>
				</template>
				<!-- 时间 价格 -->
				<uv-form-item required borderBottom :label="pageTypeLabel[pageType].startDateTimeLabel"
					prop="startDateTime" @click="openTimePicker('startDatetimePicker')">
					<uv-datetime-picker ref="startDatetimePicker" :formatter="formatter" v-model="today"
						confirmColor="#3B0E7B" mode="datetime" @confirm="confirmStartDateTime()">
					</uv-datetime-picker>
					<uv-input v-model="formattedStartDateTime" disabled disabledColor="#ffffff"
						:placeholder="pageTypeLabel[pageType].startDateTimePlaceholder" border="none">
					</uv-input>
				</uv-form-item>
				<uv-form-item borderBottom :label="pageTypeLabel[pageType].endDateTimeLabel" prop="endDateTime"
					@click="openTimePicker('endDatetimePicker')">
					<uv-datetime-picker ref="endDatetimePicker" :formatter="formatter" v-model="today"
						confirmColor="#3B0E7B" mode="datetime" @confirm="confirmEndDateTime()">
					</uv-datetime-picker>
					<uv-input v-model="formattedEndDateTime" disabled disabledColor="#ffffff"
						:placeholder="pageTypeLabel[pageType].endDateTimePlaceholder" border="none">
					</uv-input>
				</uv-form-item>
				<uv-form-item borderBottom label="价格" prop="price">
					<uv-input v-model="info.price" type="digit" placeholder="预期花费" border="none">
					</uv-input>
				</uv-form-item>
			</uv-form>
			<view class="warpper-mini">
				<uv-text text="备注" type="primary" :bold="true"></uv-text>
			</view>
			<view class="warpper-mini">
				<uv-textarea v-model="info.other" placeholder="请输入内容"></uv-textarea>
			</view>
			<view class="warpper-mini">
				<uv-button type="primary" text="完成" @click="submit()"></uv-button>
			</view>
			<view class="warpper-mini">
				<uv-button text="取消" color="#F8F8FA" customTextStyle="color: #000000" @click="cancel()"></uv-button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		Hotel,
		Traffic,
		Activity
	} from '@/enums/type';
	import {
		formatDate
	} from '@/utils/formatDate.js'
	export default {
		data() {
			const commonConfig = {
				titleLabel: '目的地',
				titlePlaceholder: '请输入目的地',
				startDateTimeLabel: '开始时间',
				startDateTimePlaceholder: '请选择开始时间',
				endDateTimeLabel: '结束时间',
				endDateTimePlaceholder: '请选择结束时间',
			};
			return {
				today: new Date().getTime(),
				isEdit: false,
				pageType: '',
				pageItems: [{
						type: 'hotel',
						text: '住宿'
					},
					{
						type: 'traffic',
						text: '交通'
					},
					{
						type: 'place',
						text: '景点'
					},
					{
						type: 'eat',
						text: '吃饭'
					},
					{
						type: 'wish',
						text: '心愿'
					}
				],
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
					place: commonConfig,
					eat: commonConfig,
					wish: commonConfig
				},
				oldPrice: null,
				checkPlanBArr: [],
				info: {
					// common
					title: '',
					price: '',
					other: '',
					startDateTime: '',
					endDateTime: '',
					// traffic
					// planB: false,
					outset: '', // 始发站
					destination: '', // 终点站
					order: '', // 班次
					// hotel 
					address: '', // 具体地址
					// event
					eventType: '', // 类型
					// address: '', // 具体地址

				},
				rules: {
					title: {
						type: 'string',
						required: true,
						message: '请输入标题',
						trigger: ['blur', 'change']
					},
					startDateTime: {
						type: 'string',
						required: true,
						message: '请输入出发日期',
						trigger: ['blur', 'change']
					},
					endDateTime: {
						type: 'string',
						required: false,
						message: '请输入回程日期',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		onLoad(params) {
			this.pageType = params.type || 'traffic';
			this.isEdit = params.mode === 'edit';
			if (this.isEdit) {
				const tempInfo = JSON.parse(params.tempInfo);
				this.oldPrice = tempInfo.price;
				this.info = Object.assign(this.info, {
					...tempInfo
				})
			}
		},
		computed: {
			planB() {
				return this.checkPlanBArr.includes('planB')
			},
			formattedStartDateTime() {
				return this.info.startDateTime ? formatDate(this.info.startDateTime) : '';
			},
			formattedEndDateTime() {
				return this.info.endDateTime ? formatDate(this.info.endDateTime) : '';
			}
		},
		methods: {
			openTimePicker(ref) {
				this.$refs[ref].open()
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
			confirmStartDateTime(e) {
				// this.info.startDateTime = formatDate(e.value)
				this.info.startDateTime = e.value
			},
			confirmEndDateTime(e) {
				// this.info.endDateTime = formatDate(e.value)
				this.info.endDateTime = e.value
			},
			submit() {
				if (!this.info.title || !this.info.startDateTime) {
					this.$refs.toast.show({
						type: 'default',
						message: '请输入必填项'
					})
					return
				}
				const pages = getCurrentPages()
				const prevPage = pages[pages.length - 2]
				if (!prevPage) return
				let infoToSend = null // 用于存储要传回的数据
				switch (this.pageType) {
					case 'traffic':
						const {
							outset, destination, order
						} = {
							...this.info
						}
						infoToSend = new Traffic(outset, destination, order, this.planB, {
							...this.info
						})
						break
					case 'hotel':
						infoToSend = new Hotel(this.info.address, this.planB, {
							...this.info
						})
						break
					default:
						// place eat wish
						const {
							address
						} = {
							...this.info
						}
						const eventType = this.pageType
						infoToSend = new Activity(eventType, address, {
							...this.info
						})
						break;
				}
				// 把数据传回上个页面
				prevPage.$vm.receivedData = {
					oldPrice: this.oldPrice,
					type: this.pageType,
					data: infoToSend
				}
				uni.navigateBack()
			},
			cancel() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
	.checkPlanB {
		display: flex;
		white-space: nowrap;
		align-items: center;
	}
</style>