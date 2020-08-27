<template>
	<view class="warp flex-column">
		<view class="">
			<!-- 待付款 未支付   -->
			<view class="tip-warp flex-row" v-if="orderInfo.order_type == 1 && orderInfo.pay_status==0">
				<view class="left flex-row">
					<view class="iconfont icon-dengdai6"></view>
					<view class="text">等待付款</view>
				</view>
				<view class="right">剩余: {{countDownList}}</view>
			</view>
			<!--代发货   -->
			<view class="tip-warp flex-row" v-else-if="orderInfo.order_type == 2">
				<view class="left flex-row">
					<view class="iconfont icon-fahuo"></view>
					<view class="text">等待发货</view>
				</view>
				<view class="right">普通快递</view>
			</view>
			<!-- 已完成   -->
			<view class="tip-warp flex-row" v-else-if="orderInfo.order_type == 5">
				<view class="left flex-row">
					<view class="iconfont icon-check-mark"></view>
					<view class="text">交易完成</view>
				</view>
				<view class="right">
					普通快递
				</view>
			</view>
			<!-- 已取消  -->
			<view class="tip-warp flex-row" v-else-if="orderInfo.order_type == 6">
				<view class="left flex-row">
					<view class="iconfont icon-error"></view>
					<view class="text">交易关闭</view>
				</view>
				<view class="right">
					
				</view>
			</view>
			
		</view>
		
		
		
		
		
		<view class="concant flex-row" >
		  <u-icon name="map" color="#999" size="40"></u-icon>
		  <view class="left">
			  <view class="top">{{orderInfo.name}}   {{orderInfo.mobile}}</view>
			  <view class="bottom">{{orderInfo.address_name}}</view>
		  </view>
		  
		</view>
		<view class="goods-info mt20">
			<view class="title">商品信息</view>
			<view class="list flex-column">
				<view class="list-item flex-row" v-for="item in orderInfo.goodsList" :key="item.goods_id">
					<image class="goods-img" :src="item.goods_img" mode=""></image>
					<view class="list-content flex-column">
						<view class="list-content-top flex-row">
							<view class="goods-name">{{item.goods_name}}</view>
							<view class="goods-count">x{{item.goods_count}}</view>
						</view>
						<view class="goods-specs">{{item.goods_weight}}g</view>
						<view class="goods-pirce">￥{{item.goods_total_balance}}</view>
					</view>
				</view>	
			</view>
		</view>
		
		<view class="goods-info mt20">
			<view class="title">订单信息</view>
			<view class="order flex-column">
				<view class="item flex-row">
					<view class="key">商品合计(含运费)：</view>
					<view class="val">¥{{orderInfo.total_balance}}</view>
				</view>
				<view class="item flex-row">
					<view class="key">运费：</view>
					<view class="val">¥10.00</view>
				</view>
				<!-- <view class="item flex-row">
					<view class="key">运费：</view>
					<view class="val">¥198.00</view>
				</view>
				<view class="item flex-row">
					<view class="key">优币抵扣：</view>
					<view class="val">¥198.00</view>
				</view>
				<view class="item flex-row">
					<view class="key">活动优惠：</view>
					<view class="val">¥{{188.5 | money}}</view>
				</view> -->
			</view>
		</view>
		
		<!-- 待付款 -->
		<view class="bottom-bar flex-row" v-if="orderInfo.order_type == 1 && orderInfo.pay_status==0">
			<view class="totalMoney flex-row">
				<view class="">应付金额</view>
				<view class="money flex-row">
					<view class="symbol">￥</view>
					<view class="">{{orderInfo.total_balance}}</view>
				</view>
			</view>
			<view class="submit" @click="gopay">立即支付</view>
		</view>
		<!-- 未评价 -->
		<view class="bottom-bar flex-row" v-else-if="orderInfo.order_type == 4 ">
			<view class="totalMoney flex-row"></view>
			<view class="submit" style="background-color: #E3D197;width: 220rpx;" @click="rating">评价商品</view>
			<view class="submit" style="width: 220rpx;" @click="againBuy">再次购买</view>
		</view>
		<!-- 已发货 -->
		<view class="bottom-bar flex-row" v-else-if="orderInfo.order_type == 3 ">
			<view class="totalMoney flex-row"></view>
			<view class="submit" style="width: 220rpx;" @click="confirmReceipt">确认收货</view>
		</view>
		<!-- 已发货 -->
		<view class="bottom-bar flex-row" v-else-if="orderInfo.order_type == 5 ||  orderInfo.order_type == 6">
			<view class="totalMoney flex-row"></view>
			<view class="submit" style="width: 220rpx;" @click="againBuy">再次购买</view>
		</view>
		
	</view>
</template>

<script>
	import vOrderTip from '@/components/vOrderTip.vue'
	
	//order_type (1-待支付2-待发货3-待收货4-待评价5-已完成6-取消) 
	//pay_status 1已支付 0未支付
	export default{
		components:{
			vOrderTip,
		},
		data(){
			return {
				user_id:uni.getStorageSync('USER_ID'),
				order_id:'',
				orderInfo:{},
				countDownList:''
			}
		},
		onLoad(e){
			this.order_id = e.order_id || '';
			this.getOrderInfo()
		},
		methods:{
			confirmReceipt(){
				this.$api.apiConfirmReceipt({
					user_id:this.user_id,
					order_id:this.orderInfo.order_id 
				}).then(res => {
					console.log(res)
					this.myToast(res.msg)
					if(res.code == 200){
						this.getOrderInfo()
					}
				})
			},
			rating(){
				this.navigateToAction('/pages/user/rate?orderId='+this.orderInfo.order_id+'&goodsList='+JSON.stringify(this.orderInfo.goodsList))
			},
			againBuy(){
				uni.switchTab({
					url:'/pages/classify/classify'
				})
			},
			// 支付
			gopay(item){
				uni.login({
					success: res => {
						
						this.payOrder(res.code)
					}
				})
			},
			//
			payOrder(code, order_id, money){
				var _this = this
				_this.$api.apiPayCallback({
					code
				}).then(res => {
					// console.log(res,'resPay')
					if(res.code == 200){
						
						let postData  = {
							order_id : _this.orderInfo.goods_order_id,
							openid:res.openid,
							user_id:_this.user_id,
							money:_this.orderInfo.total_balance * 100
						}
						_this.ApiCreatOrder(postData)
					}
					
					
					// console.log(postData,'postData')
					return
				})
			},
			//
			ApiCreatOrder(data){
				this.$api.apiPay(data).then(res => {
					console.log(res)
					if(res.code == 200){
						// #ifdef MP-WEIXIN
						this.wxpay(res.data)
						// #endif
					}else{
						this.myToast(res.msg)
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
						_this.getOrderInfo()
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
			
			getOrderInfo(){
				this.$api.apiOrderDetails({
					user_id:this.user_id,
					order_id:this.order_id
				}).then(res => {
					console.log(res)
					this.orderInfo = res.data;
					if(res.data.order_type == 1){
						this.countDown(res.data.last_time)
					}
					
				})
				
				
			},
			timeFormat(param) {
	　　　　　　return param < 10 ? '0' + param : param;
	　　　　},
	　　　　countDown(endTime) {
	　　　　　　var interval = setInterval(() => {
	　　　　　　　　// 获取当前时间，同时得到活动结束时间数组
	　　　　　　　　let newTime = new Date().getTime() / 1000;
	　　　　　　　　// 对结束时间进行处理渲染到页面
	　　　　　　　　//let endTime = new Date(this.actEndTime).getTime();
	　　　　　　　　let obj = null;
	　　　　　　　　// 如果活动未结束，对时间进行处理
	　　　　　　　　if (endTime - newTime > 0) {
	　　　　　　　　　　let time = (endTime - newTime) ;
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

<style lang="scss" scoped>
	.mt20{
		margin-top: 20rpx;
	}
	.warp{
		width: 100%;
		min-height: 100vh;
		background: #f5f5f5;
		font-size: 24rpx;
		color: #333333;
		box-sizing: border-box;
		padding-bottom: 100rpx;
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
		.concant{
			margin-top: 20rpx;
			background: #fff;
			padding: 26rpx ;
			font-size: 30rpx;
			align-items: center;
			
			.left{
				flex: 1;
				margin-left: 20rpx;
				.top{
				  font-size: 28rpx;
				  line-height: 50rpx;
				}
				.bottom{
				  font-size: 26rpx;
				   line-height: 50rpx;
				}
			}
		}
		
		.goods-info{
			background-color: #fff;
			.title {
				padding: 20rpx 0 20rpx 40rpx;
				border-bottom: 1px solid #EEEEEE;
				color: #7F7F7F;
			}
			.list-item{
				box-sizing: border-box;
				padding: 20rpx 40rpx;
				
				.goods-img{
					width: 160rpx;
					height: 160rpx;
				}
				.list-content{
					flex: 1;
					box-sizing: border-box;
					padding-left: 40rpx;
					justify-content: space-around;
					.list-content-top{
						justify-content: space-between;
						align-items: center;
						font-size: 26rpx;
						.goods-name{
							font-weight: bold;
						}
						.goods-count{
							color: #7F7F7F;
						}
					}
					.goods-specs{
						color: #B3B3B3;
					}
					.goods-pirce{
						color: #DB3204;
					}
				}
			}
			.order{
				.item{
					padding: 10rpx 40rpx;
					.key{
						width: 200rpx;
					}
					.val{
						flex: 1;
						color: #B3B3B3;
					}
				}
			}
		}
		
		.bottom-bar{
				position: fixed;
				width: 100%;
				height: 100rpx;
				bottom: 0;
				background-color: #fff;
				box-shadow:-1px -1px 3px 0px #999;
				.totalMoney{
					flex: 1;
					font-size: 28rpx;
					color: #818183;
					align-items: center;
					box-sizing: border-box;
					padding-left: 40rpx;
					.money{
						color: #DB3204;
						font-size: 32rpx;
						align-items: baseline;
						margin-left: 10rpx;
						.symbol{
							font-size: 20rpx;
						}
					}
				}
				.submit{
					width: 280rpx;
					height: 100rpx;
					text-align: center;
					line-height: 100rpx;
					color: #fff;
					font-size: 28rpx;
					background-color: #BF0000;
				}
			}
		
		
		
	}
	
</style>

