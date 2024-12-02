<template>
	<view class="content">
		<uv-button type="primary" text="新建行程" @click="createPlan()"></uv-button>
		<view class="warpper-mini">
			<uv-input placeholder="搜索行程" suffix-icon="search"></uv-input>
		</view>
		<view class="warpper">
			<my-planlist plan-type="draft"></my-planlist>
		</view>
		<view class="warpper">
			<uv-text align="center" text="左滑卡片可删除行程" color="#666666" size="14"></uv-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			createPlan() {
				uni.navigateTo({
					url:'/pages/draftBox/create'
				})
			}
		}
	}
</script>

<style>

</style>
