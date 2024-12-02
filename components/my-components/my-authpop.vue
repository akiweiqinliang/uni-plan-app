<template>
	<uv-popup ref="popup" mode="bottom" round="10">
		<view class="content">
			<view class="warpper userInfo">
				<uv-avatar :src="userInfo.avatarUrl"></uv-avatar>
				<view class="username">
					<uv-text :text="userInfo.nickName"></uv-text>
				</view>
			</view>
			<view class="warpper">
				<uv-row justify="space-between" gutter="10">
					<uv-col span="6">
						<uv-button text="取消" @click="close()"></uv-button>
					</uv-col>
					<uv-col span="6">
						<uv-button type="primary" text="授权登录" @click="login()"></uv-button>
					</uv-col>
				</uv-row>
			</view>
		</view>
	</uv-popup>

</template>

<script>
	import {mapMutation} from 'vuex'
	export default {
		name: 'my-authpop',
		data() {
			return{
				userInfo: {}
			}
		},
		methods: {
			open(info) {
				if(info) {
					this.userInfo = info
				}
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			login() {
				// 确认授权
				this.$store.dispatch('user/setLogin', {info: this.userInfo})
				this.close()
			}
		}
	}
</script>

<style scoped lang="scss">
	.userInfo{
		display: flex;
		align-items: center;
		.username {
			margin-left: 38.46rpx;
		}
	}
</style>