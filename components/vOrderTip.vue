<template>
	<view class="tipwarp">
		<view class="tip-warp flex-row">
			<view class="left flex-row">
				<view class="iconfont icon-check-mark"></view>
				<view class="text">交易完成</view>
			</view>
			<view class="right">
				普通快递
			</view>
		</view>
		
		<view class="tip-warp flex-row">
			<view class="left flex-row">
				<view class="iconfont icon-error"></view>
				<view class="text">交易关闭</view>
			</view>
			<view class="right">
				
			</view>
		</view>
		
		<view class="tip-warp flex-row" v-if="orderType == 1 && pay_status==0">
			<view class="left flex-row">
				<view class="iconfont icon-dengdai6"></view>
				<view class="text">等待付款</view>
			</view>
			<view class="right">
				剩余： {{countDownList}}
				
			</view>
		</view>
		
		<view class="tip-warp flex-row">
			<view class="left flex-row">
				<view class="iconfont icon-fahuo"></view>
				<view class="text">等待发货</view>
			</view>
			<view class="right">
				普通快递
			</view>
		</view>
	</view>
	
</template>

<script>
	//order_type (1-待支付2-待发货3-待收货4-待评价5-已完成6-取消)
	//pay_status 1已支付 0未支付
	export default{
		props:{
			orderType:{
				type:Number
			},
			pay_status:{
				type:Number
			}
		},
		watch:{
			orderType:{
				handler(newVal){
					this.orderType = newVal;
				},
				immediate: true
			},
			pay_status:{
				handler(newVal){
					this.pay_status = pay_status;
				},
				immediate: true
			}
		},
		data(){
			return{
				countDownList: '00天00时00分00秒',
				actEndTime: '2020-7-19 18:50:00'
			}
		},
		mounted(){
			console.log(this.orderType)
			//this.countDown()
		},	
		methods:{
			timeFormat(param) {
	　　　　　　return param < 10 ? '0' + param : param;
	　　　　},
	　　　　countDown(it) {
	　　　　　　var interval = setInterval(() => {
	　　　　　　　　// 获取当前时间，同时得到活动结束时间数组
	　　　　　　　　let newTime = new Date().getTime();
	　　　　　　　　// 对结束时间进行处理渲染到页面
	　　　　　　　　let endTime = new Date(this.actEndTime).getTime();
	　　　　　　　　let obj = null;
	　　　　　　　　// 如果活动未结束，对时间进行处理
	　　　　　　　　if (endTime - newTime > 0) {
	　　　　　　　　　　let time = (endTime - newTime) / 1000;
	　　　　　　　　　　// 获取天、时、分、秒
	　　　　　　　　　　let day = parseInt(time / (60 * 60 * 24));
	　　　　　　　　　　let hou = parseInt(time % (60 * 60 * 24) / 3600);
	　　　　　　　　　　let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
	　　　　　　　　　　let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
	　　　　　　　　　　obj = {
	　　　　　　　　　　　　day: this.timeFormat(day),
	　　　　　　　　　　　　hou: this.timeFormat(hou),
	　　　　　　　　　　　　min: this.timeFormat(min),
	　　　　　　　　　　　　sec: this.timeFormat(sec)
	　　　　　　　　　　};
	　　　　　　　　} else { // 活动已结束，全部设置为'00'
	　　　　　　　　　　obj = {
	　　　　　　　　　　　　day: '00',
	　　　　　　　　　　　　hou: '00',
	　　　　　　　　　　　　min: '00',
	　　　　　　　　　　　　sec: '00'
	　　　　　　　　　　};
	　　　　　　　　　　clearInterval(interval);
	　　　　　　　　}
	　　　　　　　　this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒';
	　　　　　　}, 1000);
	　　　　}
		}
	}
</script>

<style  lang="scss" >
	@import '@/common/iconfont.css';
	.tip-warp{
		width: 100%;
		height: 150rpx;
		background-color: #15292B;
		font-size: 30rpx;
		box-sizing: border-box;
		padding: 0 50rpx;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		.text{
			margin-left: 10rpx;}
		.left{
			
			align-items: center;
		}
		
	}
</style>
