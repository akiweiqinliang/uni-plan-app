<template>
	<view>
		<uv-waterfall ref="waterfall" v-model="list" :add-time="10" :left-gap="leftGap" :right-gap="rightGap"
			:column-gap="columnGap" @changeList="changeList">
			<!-- 第一列数据 -->
			<template v-slot:list1>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<view v-for="(item, index) in list1" :key="item.id" class="waterfall-item">
						<view class="waterfall-item__image" :style="[imageStyle(item)]">
							<image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"></image>
						</view>
						<view class="waterfall-item__ft">
							<view class="waterfall-item__ft__title">
								<text class="value">{{item.title}}</text>
							</view>
							<view class="waterfall-item__ft__desc uv-line-2">
								<text class="value">{{item.desc}}</text>
							</view>
							<view class="waterfall-item__ft__desc uv-line-2">
								<text class="value">BKIluang</text>
							</view>
						</view>
					</view>
				</view>
			</template>
			<!-- 第二列数据 -->
			<template v-slot:list2>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<view v-for="(item, index) in list2" :key="item.id" class="waterfall-item">
						<view class="waterfall-item__image" :style="[imageStyle(item)]">
							<image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"></image>
						</view>
						<view class="waterfall-item__ft">
							<view class="waterfall-item__ft__title">
								<text class="value">{{item.title}}</text>
							</view>
							<view class="waterfall-item__ft__desc uv-line-2">
								<text class="value">{{item.desc}}</text>
							</view>
							<view class="waterfall-item__ft__desc uv-line-2">
								<text class="value">AKIluang</text>
							</view>
						</view>
					</view>
				</view>
			</template>
		</uv-waterfall>
	</view>
</template>

<script>
	import {
		guid
	} from '@/uni_modules/uv-ui-tools/libs/function/index.js'
	export default {
		name: "my-diarylist",
		data() {
			return {
				list: [], // 瀑布流全部数据
				list1: [], // 瀑布流第一列数据
				list2: [], // 瀑布流第二列数据
				leftGap: 0,
				rightGap: 0,
				columnGap: 10
			};
		},
		computed: {
			imageStyle(item) {
				return item => {
					const v = uni.upx2px(750) - this.leftGap - this.rightGap - this.columnGap;
					const w = v / 2 - 30;
					const rate = w / item.w;
					const h = rate * item.h;
					return {
						width: w + 'px',
						height: h + 'px'
					}
				}
			}
		},
		async mounted() {
			const {
				data
			} = await this.getData();
			this.list = data;
		},
		methods: {
			// 这点非常重要：e.name在这里返回是list1或list2，要手动将数据追加到相应列
			changeList(e) {
				this[e.name].push(e.value);
			},
			// 模拟的后端数据
			getData() {
				return new Promise((resolve) => {
					const imgs = [{
							url: 'https://via.placeholder.com/100x110.png/3c9cff/fff',
							width: 100,
							height: 110
						},
						{
							url: 'https://via.placeholder.com/200x220.png/f9ae3d/fff',
							width: 200,
							height: 220
						},
						{
							url: 'https://via.placeholder.com/300x340.png/5ac725/fff',
							width: 300,
							height: 340
						},
						{
							url: 'https://via.placeholder.com/400x400.png/f56c6c/fff',
							width: 400,
							height: 400
						},
						{
							url: 'https://via.placeholder.com/500x510.png/909399/fff',
							width: 500,
							height: 510
						},
						{
							url: 'https://via.placeholder.com/600x606.png/3c9cff/fff',
							width: 600,
							height: 606
						},
						{
							url: 'https://via.placeholder.com/310x422.png/f1a532/fff',
							width: 310,
							height: 422
						},
						{
							url: 'https://via.placeholder.com/320x430.png/3c9cff/fff',
							width: 320,
							height: 430
						},
						{
							url: 'https://via.placeholder.com/330x424.png/f9ae3d/fff',
							width: 330,
							height: 424
						},
						{
							url: 'https://via.placeholder.com/340x435.png/5ac725/fff',
							width: 340,
							height: 435
						},
						{
							url: 'https://via.placeholder.com/350x440.png/f56c6c/fff',
							width: 350,
							height: 440
						},
						{
							url: 'https://via.placeholder.com/380x470.png/909399/fff',
							width: 380,
							height: 470
						}
					];
					let list = [];
					const doFn = (i) => {
						const randomIndex = Math.floor(Math.random() * 10);
						return {
							id: guid(),
							
							allowEdit: i == 0,
							image: imgs[randomIndex].url,
							w: imgs[randomIndex].width,
							h: imgs[randomIndex].height,
							title: i % 2 == 0 ? `(${this.list.length + i + 1})体验uv-ui框架` :
								`(${this.list.length + i +1})uv-ui支持多平台`,
							desc: i % 2 == 0 ? `(${this.list.length + i + 1})欢迎使用uv-ui，uni-app生态专用的UI框架` :
								`(${this.list.length + i})开发者编写一套代码， 可发布到iOS、Android、H5、以及各种小程序`
						}
					};
					// 模拟异步
					setTimeout(() => {
						for (let i = 0; i < 20; i++) {
							list.push(doFn(i));
						}
						resolve({
							data: list
						});
					}, 200)
				})
			}
		}
	}
</script>

<style lang="scss">
$show-lines: 1;
	@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';
	.waterfall-item {
		overflow: hidden;
		margin-top: 10px;
		border-radius: 6px;
	}
	.waterfall-item__ft {
		padding: 20rpx;
		background: #fff;
		&__title {
			margin-bottom: 10rpx;
			line-height: 48rpx;
			font-weight: 700;
			.value {
				font-size: 32rpx;
				color: #303133;
			}
		}
		&__desc .value {
			font-size: 28rpx;
			color: #606266;
		}
		&__btn {
			padding: 10px 0;
		}
	}
</style>