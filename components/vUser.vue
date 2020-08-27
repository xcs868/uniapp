<template>
	<view class="contian-warp">
		<view class="top">
			<view class="avatarWarp flex-row" @click="onAvatar">
				<image class="avatar" :src="userInfo.weixinface || defaultAvatar" mode=""></image>
				<view class="right flex-column" v-if="isLogin">
					<view class="user-name">{{userInfo.weixinname || userInfo.mobile}}</view>
					<view class="flex-row type-wrap">
						<view class="level" v-if="userInfo.is_vip == true">VIP</view>
						<view class="level" style="color: #ccc;" v-else>VIP</view>
						<view class="type flex-row" v-if="userInfo.constion_id > 0"> 
							<view class="bodyType" :style="{backgroundColor:userInfo.user_contion_list.bgcolor}"></view> 
							<view class="" style="margin-left: 5px;">{{ userInfo.user_contion_name }}</view>
							
						</view>
						
						
					</view>
				</view>
				<view class="right flex-column" v-else style="font-size: 16px;color: #D0B38E;">
					请先登录
				</view>
			</view>
		</view>
		<view class="content">
			<!-- <view class="content-top com flex-row mar15">
				<view class="sub flex-column">
					<view class="key">优惠券</view>
					<view class="val">100</view>
				</view>
				<view class="sub flex-column">
					<view class="key">关注</view>
					<view class="val">100</view>
				</view>
			</view> -->
			
			<view class="content-center com flex-column mar15">
				<view class="row flex-row" v-for="item in cList" :key="item.row" >
					<view class="sub flex-column" v-for="subItem in item.data" :key="subItem.text" @click="onCList(subItem)">
						<view class="icon-wrap" v-if="subItem.count">
							<image class="icon" :src="subItem.icon" mode=""></image>
							<u-badge type="error" :count="subItem.count" is-center></u-badge>
						</view> 
						<image v-else class="icon" :src="subItem.icon" mode=""></image>
						<view class="name">{{subItem.text}}</view>
					</view>
				</view>				
			</view>
			
			
			
			<view class="content-bottom com flex-column mar15">
				<view class="content-bottom-item flex-row" v-for="item in bList" :key="item.text" @click="onBList(item)">
					<view class="content-bottom-item-l flex-row">
						<image class="img" :src="item.icon" mode=""></image>
						<view class="title">{{item.text}}</view>
					</view>
					<view class="content-bottom-item-r flex-row">
						<view class="value">{{item.value}}</view>
						<image class="arrow-right" src="http://imgsg.qichuanqing.cn/v1/doctor/箭头拷贝@2x.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isLogin:{
				type:Boolean,
				default:false
			},
			userInfo:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				defaultAvatar:'http://imgsg.qichuanqing.cn/v1/doctor/avatar-user.png',
				cList:[
					{   row:1,
						data:[
							{text:'我的订单',
							icon:'http://imgsg.qichuanqing.cn/v1/order/order.png',
							url:'/pages/order/order_list'},
							{text:'待付款',icon:'http://imgsg.qichuanqing.cn/v1/order/pay.png',url:'/pages/order/order_list?order_type=1'},
							{text:'待收货',icon:'http://imgsg.qichuanqing.cn/v1/order/receipt.png',url:'/pages/order/order_list?order_type=3'},
							{text:'待评价',icon:'http://imgsg.qichuanqing.cn/v1/order/unrating.png',url:'/pages/order/order_list?order_type=4'},
						]
					},
					{
						row:2,
						data:[
							{text:'我的收藏',icon:'http://imgsg.qichuanqing.cn/v1/order/collect.png',url:'/pages/user/user_collection'},
							{text:'优惠劵',icon:'http://imgsg.qichuanqing.cn/v1/order/goods.png',url:''},
							// {text:'充值',icon:'http://imgsg.qichuanqing.cn/v1/order/footprint1.png',url:'/pages/user/vip'},
							{text:'会员中心',icon:'http://imgsg.qichuanqing.cn/v1/order/footprint1.png',url:'/pages/user/vip'},
							{text:'常见问题',icon:'http://imgsg.qichuanqing.cn/v1/order/why.png',url:'/pages/setting/problem'},
							
						]
						
					}
					
				],
				bList:[
					{text:'我的体质',icon:'http://imgsg.qichuanqing.cn/v1/order/body.png',value:'详情',url:'/pages/user/body'},
					{text:'家人朋友',icon:'http://imgsg.qichuanqing.cn/v1/order/tip1.png',value:'详情',url:'/pages/user/family'},				
					{text:'我的信息',icon:'http://imgsg.qichuanqing.cn/v1/order/tip1.png',value:'',url:'/pages/user/user_msg'},
					{text:'我的评价',icon:'http://imgsg.qichuanqing.cn/v1/order/rating.png',value:'',url:'/pages/user/rating'},
					{text:'地址管理',icon:'http://imgsg.qichuanqing.cn/v1/order/address.png',value:'',url:'/pages/user/address'},
					{text:'我的设置',icon:'http://imgsg.qichuanqing.cn/v1/order/chilun.png',url:'/pages/setting/exit',}
				]
				
			};
		},
		methods:{
			onAvatar(){
				if(!this.isLogin){
					this.showLoginDialog();
					return
				}
				console.log('点击头像')
			},
			onCList(item){
				if(item.text == "优惠劵"){
					this.myToast('暂未开放优惠券,敬请期待!');
					return
				}
				if(!this.isLogin){
					this.showLoginDialog();
					return
				}
				
				console.log(item.url)
				this.navigateToAction(item.url)
			},
			onBList(item){
				if(!this.isLogin){
					this.showLoginDialog();
					return
				}
				
				
				console.log(item.url)
				this.navigateToAction(item.url)
			},
			showLoginDialog(){
				this.$emit('showLoginDialog');
				
			}
		}
	}
</script>

<style lang="scss" scoped>
		
	.mar15{
		margin: 15rpx 0;
	}
	.com{
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow:4px 6px 5px 0px rgba(222,228,240,0.36);
	}
	.top{
		width: 100%;
		height: 340rpx;
		background: url('http://imgsg.qichuanqing.cn/v1/userPersonal/userBanner.jpg') no-repeat;
		background-size: 100% 100%;
		position: relative;
		.avatarWarp{
			align-items: center;
			position: absolute;
			left: 70rpx;
			bottom: 10rpx;
			.avatar{
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
			.right{
				margin-left: 25rpx;
				.level{
					color: #CFA972;
				}
				.user-name{
					font-size: 28rpx;
					color: #2B2B2B;
				}
				.type-wrap{
					align-items: center;
					.type{
						height:25rpx;
						color: #CFA972;
						font-size: 18rpx;
						background-color: #162B28;
						border-radius:12rpx;
						text-align: center;
						line-height: 24rpx;
						margin-left: 10px;
						border: 1px solid;
						padding: 2px 10px;
						border-radius:10px;
					}
				}
			}
		}	
	}
	.content{
		padding: 0 25rpx;
		font-size: 24rpx;
		color: #333333;
		.content-top{
			padding: 25rpx 50rpx;
			.sub{
				align-items: center;
				margin-right: 100rpx;
				
				.key{
					margin-bottom: 10rpx;
				}
			}
		}
		.content-center{
			padding: 40rpx 0;
			.row{
				margin-bottom: 50rpx;
				&:last-child{margin-bottom: 0;}
				.sub{
					align-items: center;
					flex: 1;
				}
				.icon-wrap{
					position: relative;
					font-size: 0;
					.badge{
						position: absolute;
						width: 20rpx;
						height: 20rpx;
						border-radius: 50%;
						background-color: red;
						color: #fff;
						top: 0;
						right: 0;
					}
				}
				.icon{
					width: 50rpx;
					height: 50rpx;
					margin-bottom: 10rpx;
					
				}
			}
			
		}
		
		.content-bottom{
			.content-bottom-item{
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 40rpx;
				border-bottom: 1px solid #EDEDED;
				.content-bottom-item-l{
					justify-content: space-between;
					align-items: center;
					.img{
						width: 25rpx;
						height: 25rpx;
						margin-right: 10rpx;
					}
					.title{
						color: #333333;
					}
					
					
				}
				.content-bottom-item-r{
					justify-content: space-between;
					align-items: center;
					.arrow-right{
						width: 10rpx;
						height: 20rpx;
					}
					.value{
						color: #9F9B9D;
						margin-right: 10rpx;
					}
					
					
				}
			}
		}
	}
</style>
