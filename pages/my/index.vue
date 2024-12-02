<template>
	<view class="content">
		<uv-toast ref="toast"></uv-toast>
		<my-authpop ref="authpop"></my-authpop>
		<view class="warpper topInfo">
			<view class="leftBox">
				<uv-avatar :src="userLogin ? userInfo.avatarUrl : ''" size="150rpx"></uv-avatar>
				<view class="rightText">
					<uv-text :text="userLogin ? userInfo.nickName : '游客AKIluang'" size="18" :bold="true"></uv-text>
					<view class="warpper-micro">
						<uv-text text="上班就是白干加白干" color="#666666"></uv-text>
					</view>
				</view>
			</view>
			<view v-if="!userLogin" class="rightBox">
				<uv-button text="点击登录" shape="circle" @click="login()"></uv-button>
			</view>
		</view>
		<view class="warpper">
			<uv-grid :border="false" align="center">
				<uv-grid-item>
					<uv-text size="28" align="center" text="5"></uv-text>
					<uv-text size="14" align="center" text="游记发表数"></uv-text>
				</uv-grid-item>
				<uv-grid-item>
					<uv-text size="28" align="center" text="8"></uv-text>
					<uv-text size="14" align="center" text="计划发表数"></uv-text>
				</uv-grid-item>
				<uv-grid-item>
					<uv-text size="28" align="center" text="5"></uv-text>
					<uv-text size="14" align="center" text="行程完成数"></uv-text>
				</uv-grid-item>
			</uv-grid>
		</view>
		<view class="warpper">
			<uv-text text="更多工具"></uv-text>
			<view class="warpper-micro">
				<uv-grid :col="4">
					<uv-grid-item v-for="(item,index) in baseList" :key="index" @click="clickTool(item)">
						<view class="gridItem">
							<uv-icon :name="item.icon" size="24"></uv-icon>
							<view class="warpper-micro">
								<uv-text :text="item.title" align="center" size="14"></uv-text>
							</view>
						</view>
					</uv-grid-item>
				</uv-grid>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				baseList: [
					{
						id: 0,
						title: '打卡城市',
						icon: 'map'
					},
					{
						id: 1,
						title: '游记草稿',
						icon: 'edit-pen'
					},
					{
						id: 2,
						title: '历史行程',
						icon: 'clock'
					},
					{
						id: 3,
						title: '记账',
						icon: 'red-packet'
					},
					{
						id: 4,
						title: '使用帮助',
						icon: 'info-circle'
					},
					{
						id: 5,
						title: '邀请好友',
						icon: 'share'
					},
					{
						id: 6,
						title: '联系客服',
						icon: 'kefu-ermai'
					},
					{
						id: 7,
						title: '设置',
						icon: 'setting'
					},
				]
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
				userLogin: state => state.user.loginFlag
			})
		},
		methods: {
			clickTool(tool) {
				if(tool.id === 7) {
					// 设置页
				}
				this.$refs.toast.show({
					message: '点击了' + tool.title
				})
			},
			login() {
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
</script>

<style scoped lang="scss">
	.topInfo {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.leftBox {
			display: flex;
			align-items: center;

			.rightText {
				margin-left: 38.46rpx;
			}
		}

		.rightBox {}
	}

	.gridItem {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 19.23rpx;
	}
</style>