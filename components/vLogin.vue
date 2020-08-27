<template>
	<view class="empty-login" >
		<u-empty   text="暂无权限,请先登录" mode="permission"></u-empty>
		<u-button type="warning" size="medium" @click="gologin">去登录</u-button>
	</view>
</template>

<script>
	export default {
		methods:{
			gologin(){
				this.navigateToAction('/pages/login/login')
			}
		}
	}
</script>

<style>
	.empty-login{
		margin-top: 200rpx;
		text-align: center;
	}
</style>
