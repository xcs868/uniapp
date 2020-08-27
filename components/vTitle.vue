<template>
	<view class="title">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		font-size: 28rpx;
		color: #DB3204;
		font-weight:bold;
		position: relative;
		width:fit-content;
		z-index: 999;
		&::after{
			content: '';
			position: absolute;
			width: 100%;
			height: 6rpx;
			background:linear-gradient(-49deg,rgba(241,222,192,0.88),rgba(231,191,148,0.88));
			opacity:0.7;
			border-radius:2rpx;
			left: 2rpx;
			bottom: 2rpx;
			z-index: -1;
		}
	}
</style>
