<template>
	<view class="warp flex-column">
		<view class="nav-bar">
			支付订单
		</view>
		<view class="top flex-column">
			<view class="iconfont icon-zhifuchenggong success"></view>
			<view class="title">订单支付成功</view>
			<view class="flex-row">
				
				<navigator url="/pages/order/order_list" >
					<view class="btn" >查看订单</view>
				</navigator>
				<navigator url="/pages/index/index" open-type="switchTab" >
					<view class="btn" >回到首页</view>
				</navigator>
			</view>
		</view>
		<view class="bottom">
			<view class="flex-row" style="align-items: center;">
				<text class="iconfont">&#xe725;</text>
				<view class="">温馨提示</view>
			</view>
			<view class="" style="margin-top: 40rpx;">
				玺廷膳贡不会以订单异常，系统升级为由要求您点击任何网址链接进行退款操作
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>
	
<style lang="scss" scoped>
	
	.warp{
		background-color: #F9F9F9;
		min-height: 100vh;
		.nav-bar{
			height: 160rpx;
			line-height: 160rpx;
			font-size: 32rpx;
			text-align: center;
			background-color: #fff;
		}	
		.top{
			background-color: #fff;
			align-items: center;
			.success{
				font-size: 100px;
				color: #1afa29;
				margin: 30px;
			}
			.title{
				color: #333333;
				font-size: 36rpx;
			}
			.btn{
				margin: 50rpx;
				font-size: 26rpx;
				color: #D4B790;
				border: 1px solid;
				padding: 10rpx 50rpx;
				border-radius: 20rpx;
			}
		}
		.bottom{
			padding: 50rpx;
			color: #B3B3B3;
			font-size: 24rpx;
		}
	}
	
</style>
