<template>
	<view class="warp flex-column">
		<view class="card-warp flex-column" v-for="item in cardlist" :key="item.price" @click="select(item)">
			<view class="card flex-row">
				<view class="iconfont icon-xuanze select" :class="{'icon-xuanzhong':item.active}"></view>
				<view class="card-img" :style="{background:'url('+item.bgurl+')'}">
					<view class="card-price">{{item.price}}</view>
					<view class="card-bottom">{{item.text}}</view>
				</view>
			</view>
			<view class="card-power">
				<view class="card-power-title">{{item.powerTitle}}</view>
				<view class="card-power-list flex-row">
					<view class="card-power-item flex-row" v-for="subItem in item.powerList" :key="subItem.name">
						<image class="vip-icon" :src="subItem.icon" mode=""></image>
						<view class="">{{subItem.name}}</view>
					</view>
					
				</view>
			</view>
		</view>
		
	
		<view class="btn" @click="buyVip">优惠开通</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				cardlist:[
					{   
						id:0,
						active:false,
						bgurl:'http://imgsg.qichuanqing.cn/v1/vip/season.png',
						price:'季付会员199',
						money:199,
						text:'用户消费计算 一年预计省¥1250',
						powerTitle:'季卡会员特权',
						powerList:[
							{icon:'http://imgsg.qichuanqing.cn/v1/vip/vip_1.png',name:'超值低价'},
							{icon:'http://imgsg.qichuanqing.cn/v1/vip/vip_2.png',name:'专享折扣'},
							{icon:'http://imgsg.qichuanqing.cn/v1/vip/vip_3.png',name:'运费券'},
							{icon:'http://imgsg.qichuanqing.cn/v1/vip/vip_4.png',name:'极速退款'}
						]
					},
					{
						id:1,
						active:false,
						bgurl:'http://imgsg.qichuanqing.cn/v1/vip/year.png',
						price:'年付会员299',
						money:299,
						text:'用户消费计算 一年预计省¥1250',
						powerTitle:'年卡会员特权',
						powerList:[
							{icon:'http://imgsg.qichuanqing.cn/v1/vip/vip_1.png',name:'超值低价'},
							{icon:'http://imgsg.qichuanqing.cn/v1/vip/vip_2.png',name:'专享折扣'},
							{icon:'http://imgsg.qichuanqing.cn/v1/vip/vip_3.png',name:'运费券'},
							{icon:'http://imgsg.qichuanqing.cn/v1/vip/vip_4.png',name:'极速退款'},
							{icon:'http://imgsg.qichuanqing.cn/v1/vip/vip_5.png',name:'尖货5折'},
							{icon:'http://imgsg.qichuanqing.cn/v1/vip/vip_6.png',name:'新品提前'},
							{icon:'http://imgsg.qichuanqing.cn/v1/vip/vip_7.png',name:'金牌服务'}
						]
					}
				],
				money:0,
				user_id:uni.getStorageSync('USER_ID')
			}
		},
		methods:{
			select(obj){
				this.money = obj.money;
				this.cardlist.forEach(item => {
					item.id == obj.id ? item.active = true : item.active = false;
					
				})
			},
			buyVip(){
				if(!this.money){
					this.myToast('请选择会员卡')
					return
				}
				uni.login({
					success: res => {
						this.getOpenid(res.code)
					}
				})
			},
			getOpenid(code){
				this.$api.apiPayCallback({
					code
				}).then(res => {
					// console.log(res,'resPay')
					if(res.code == 200){
						
						let postData  = {
							openid:res.openid,
							user_id:this.user_id,
							money:this.money * 100
						}
						this.pay(postData)
					}
					return
				})
			},
			pay(data){
				this.$api.apiChargeVip(data).then(res => {
					console.log(res.data.data)
					if(res.code == 200){
						this.wxpay(res.data.data)
						
					}
				})	
			},
			// 小程序支付
			wxpay (data) {
				let _this = this;
				// #ifdef MP-WEIXIN
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: data.data,
					timeStamp: data.timeStamp,
					nonceStr: data.nonceStr,
					package: data.package,
					signType: data.signType,
					paySign: data.paySign,
					_debug: 1,
					success(res) {
						//支付成功刷新页面
						
					},
					fail(err) {
						console.log(err, 'errres');
						let msg = '';
						if(err.errMsg == 'requestPayment:fail cancel') {
							msg = '支付失败，原因为：用户取消支付'
						}else{
							msg = '支付失败，原因为：' + err.errMsg
						}
						_this.myToast(msg)
						// _this.confirmAlert('', msg, false, function(){
						// 	//跳转订单页面 待支付
						// 	//_this.navigateToAction('/pages/order/order_list')
						// });
					}
				})
				// #endif
			},
		}
	}
</script>

<style scoped lang="scss">
	
	.warp{
		width: 100%;
		min-height:100vh ;
		background: url("http://imgsg.qichuanqing.cn/v1/vip/vip-bg.png") no-repeat;
		background-size: 100% 100%;
		.card-warp{
			margin: 20rpx 0;
			padding: 0 15rpx;
			align-items: flex-end;
			.card{
				align-items: center;
				justify-content: space-between;
				.select{
					font-size: 20px;
					color: #9D9D9D;
				}
				.icon-xuanzhong{
					color: #D0B48E;
				}
				.card-img{
					width: 670rpx;
					height: 245rpx;
					background-repeat:no-repeat !important;
					background-size: 100% 100% !important;
					border-radius: 10px;
					overflow: hidden;
					position: relative;
					.card-price{
						position: absolute;
						bottom: 40rpx;
						width: 100%;
						text-align: right;
						color: #B9B8B8;
						font-size: 28rpx;
						box-sizing: border-box;
						padding-right: 10px;
					}
					.card-bottom{
						position: absolute;
						bottom: 0;
						width: 100%;
						box-sizing: border-box;
						height: 40rpx;
						line-height: 40rpx;
						color: #EAE5BF;
						font-size: 20rpx;
						padding-left: 30rpx;
						background-color: rgba($color: #000000, $alpha: 1.0);
					}
				}
				
				
			}
			.card-power{
				font-size: 24rpx;
				width: 670rpx;
				.card-power-title{
					color: #C1B9A4;
					margin: 15rpx 0;
				}
				.card-power-list{
					flex-wrap: wrap;
					
					.card-power-item{
						width: 25%;
						align-items: center;
						color: #B5A077;
						margin-bottom: 6rpx;
						.vip-icon{
							width: 30rpx;
							height: 30rpx;
						}
					}
				}
			}
				
		}
		
		.btn{
			width:670rpx;
			height:70rpx;
			background:rgba(208,180,142,1);
			border:1px solid rgba(208,180,142,1);
			border-radius:20rpx;
			font-size: 30rpx;
			color: #fff;
			font-weight:bold;
			text-align: center;
			line-height: 70rpx;
			margin: 40px auto;
		}
		
	}
</style>
