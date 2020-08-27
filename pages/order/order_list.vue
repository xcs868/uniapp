<template>
	<view class="order-warp flex-column">
		<view class="tabs flex-row">
			<view class="tabs-item" 
				@click="clickTabs(item,index)"
				:class="{'active':currentTabIndex === index}" 
				v-for="(item,index) in tabs" :key="item.order_type">{{item.name}}</view>
				<view class="tab-bar" :style="{'transform':'translateX('+ (40 + 125 * currentTabIndex) +'rpx)'}"></view>
		</view>
		<scroll-view scroll-y class="list-scroll" @scrolltolower="loadMore"	>
			<view class="list-scroll-warp flex-column">
				<view class="" v-if="orderList.length" >
					<view class="list-scroll-item" v-for="item in orderList" :key="item.id" >
						<view class="goods-info mt20" >
							<view class="title flex-row">
								<view class="created-time">订单编号:{{item.goods_order_id}}</view>
								<view class="order-status">{{item.order_type | orderType}}</view>
							</view>
							<view class="list flex-column" @click="orderDetail(item)">
								<view class="list-item flex-row" v-for="subItem in item.goodsData" :key="subItem.goods_id">
									<image class="goods-img" :src="subItem.goods_img" mode=""></image>
									<view class="list-content flex-column">
										<view class="list-content-top flex-row">
											<view class="goods-name">{{subItem.goods_name}}</view>
											<view class="goods-count">x{{subItem.RedisCount}}</view>
										</view>
										<view class="goods-specs">{{subItem.goods_weight}}g</view>
										<view class="goods-pirce">￥{{subItem.shop_price}}</view>
										<!-- <view class="goods-pirce">￥10 (运费)</view> -->
									</view>
								</view>
								
								<view class="pay-money flex-row" v-if="item.order_type == 1">
									<view class="">应付金额:</view>
									<view class="money">￥{{item.total_balance}}元</view>
								</view>
							</view>
							<view class="order-tab flex-row">
									<!--1未支付 5删除订单   -->
									<view class="order-btn" style="background-color:#D0B48E;color: #FFFFFF ;"
									v-if="item.order_type == 1 " 
									@click="removeOrder(item.goods_order_id,1)">取消订单</view>
									<!-- <view class="order-btn" v-if="item.order_type == 5">删除订单</view> -->
									<view class="order-btn pay" 
									style="background-color: #DB3204;color: #FFFFFF;"
									v-if="item.pay_status == 0 && item.order_type == 1" 
									@click="gopay(item)">立即付款</view>
									
									<view class="order-btn"
									 style="background-color:#D0B48E;color: #FFFFFF;"
									 v-if="item.order_type == 4" @tap="goRating(item.order_id,item.goodsData)">立即评价</view>
								
							</view>
						</view>
					</view>
					<v-no-data v-if="isHasData"></v-no-data>
				</view>
				
				<view class="ordernull" v-else>
					<u-empty mode="order"></u-empty>
				</view>
				
			</view>
		</scroll-view>
	</view>
</template>
<script>
	import vNoData from '@/components/vNoData.vue'
export default {
	components:{
		vNoData
	},
    data() {
    	return {
			user_id:uni.getStorageSync('USER_ID'),
			currentTabIndex:0,  //order_type (1-待支付2-待发货3-待收货4-待评价5-已完成) 
			tabs :[{name:'全部',order_type:0},
					 {name:'待支付',order_type:1	},
					 {name:'待发货',order_type:2},
					 {name:'待收货',order_type:3},
					 {name:'待评价',order_type:4},
					 {name:'已完成',order_type:5}],
			orderList:[],
			page:1,
			isLoading:false,		 
			isHasData:false, //没有数据了
			
    	}
    },
	
	onLoad:function (e) {
		this.currentTabIndex = e.order_type || 0;
		
	},
	onShow(){
		this.isHasData = false;
		this.isLoading =false;
		this.page = 1;
		this.orderList = [];
		this.getOrderList()
	},
	methods:{
		goRating:function(orderId,goodsList){
			this.navigateToAction('/pages/user/rate?orderId='+orderId+'&goodsList='+JSON.stringify(goodsList))
		},
		orderDetail(order){
			this.navigateToAction('/pages/order/order_detail?order_id='+order.order_id)
		},
		clickTabs(item,index){
			if(this.currentTabIndex == index)return
			this.currentTabIndex = index;
			this.isHasData = false;
			this.isLoading=false;	
			this.page = 1;
			this.orderList = [];
			this.getOrderList(index)
		},
		//上拉加载
		loadMore(){
			
			this.getOrderList()
			
		},
		//取消或删除订单
		removeOrder(order_id,state){
			//state [1-取消订单2-删除订单]
			this.$api.apiRemoveOrder({
				user_id:this.user_id,
				order_id,
				state 
			}).then(res => {
				if(res.code == 200){
					this.myToast(res.msg)
					this.orderList = [];
					this.page = 1;
					this.isLoading = false;
					this.isHasData=false;
					this.getOrderList()
				}
				
			})
		},
		// 支付
		gopay(item){
			console.log(item)
			let money = item.total_balance * 100;
			uni.login({
				success: res => {
					
					this.payOrder(res.code, item.goods_order_id, money)
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
						order_id : order_id,
						openid:res.openid,
						user_id:_this.user_id,
						money:money
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
					//支付成功刷新页面
					_this.orderList = [];
					_this.page = 1;
					_this.isLoading = false;
					_this.isHasData=false;
					_this.getOrderList()
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
		
		
		getOrderList(){
			if(this.isHasData)return
		
			if(this.isLoding)return
			this.isLoding = true
			this.$api.apiOrderList({
				user_id:this.user_id,
				order_type:this.currentTabIndex,
				page:this.page
			}).then(res => {
				console.log(res)
				this.isLoding = false
				this.page++;
				let list = res.list || [];
				if(!list.length){
					this.isHasData = true;
				}
				this.orderList = this.orderList.concat(list);
				
			})
		}
	},
	filters:{
		orderType(orderType){
			switch(orderType){
				case 1:
					return '待支付'
				case 2:
					return '待发货'
				case 3:
					return '待收货'
				case 4:
					return '待评价'
				case 5:
					return '已完成'	
				case 6:
					return '已取消'				 
			}
		}
	}
	
}
</script>
<style lang="scss" scoped>
	.ordernull{
		margin-top: 200rpx;
	}
	.mt20{
		margin-top: 20rpx;
	}
	.order-warp{
		background-color: #F9F9F9;
		color: #333;
		font-size: 28rpx;
		height: 100vh;
		.tabs{
			background-color: #fff;
			height: 60rpx;
			position: relative;
			.tabs-item{
				flex: 1;
				text-align: center;
				line-height: 60rpx;
				box-sizing: border-box;
				&.active{
					color: #fa3534;
				}
			}
			.tab-bar{
				width: 20px;
				position: absolute;
				bottom: 0;
				transition:all 0.3s;
				background-color: #fa3534;
				height: 2px;
				border-radius: 3px;
					
			}
		}
		.list-scroll{
			flex: 1;
			box-sizing: border-box;
			overflow: hidden;
			.goods-info{
				background-color: #fff;
				.title {
					padding: 20rpx 20rpx 20rpx 40rpx;
					border-bottom: 1px solid #EEEEEE;
					color: #7F7F7F;
					font-size: 26rpx;
					justify-content: space-between;
					align-items: center;
					.order-status{
						color: #fa3534;
					}
				}
				.list{
					border-bottom: 1px solid #EEEEEE;
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
					.pay-money{
						padding-left: 40rpx;
						font-size: 26rpx;
						color: #808080;
						.money{
							color: #DC3305;
						}
					}
					.money{
						color: #DC3305;
					}
				}
				.order-tab{
					justify-content: flex-end;
					.order-btn{
						font-size: 23.5rpx;
						color: #666;
						border: 1px solid;
						border-radius: 10rpx;
						padding: 0 15rpx;
						margin: 10px 10px 10px 0;
						&.pay{
							color: #fa3534;
						}
					}
				}
				
			}
			
		}
	}
</style>
