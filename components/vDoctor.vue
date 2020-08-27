<template>
	<view class="contian-warp">
		<view class="top">
			<view class="avatarWarp flex-row" @click="onAvatar">
				<view class="avatar-warp">
					<image class="avatar" :src="userInfo.weixinface || defaultAvatar" mode=""></image>
					<image class="check" 
					src="http://imgsg.qichuanqing.cn/v1/doctor/认证@2x.png" 
					v-if="userInfo.auth_doctor==1" mode=""></image>
				</view>
				<view class="right flex-column" v-if="isLogin">
					<view class="user-name">{{ userInfo.realname }}</view>
					<view class="type">{{ userInfo.specialty }}</view>
				</view>
				<view class="right flex-column" v-else style="font-size: 16px;color: #D0B38E;">
					请先登录
				</view>
			</view>
			<!-- <view class="bottom flex-row">
				<view class="bottom-item flex-column">
					<view class="bottom-item-key">粉丝</view>
					<view class="">100</view>
				</view>
				<view class="bottom-item flex-column">
					<view class="bottom-item-key">文章</view>
					<view class="">100</view>
				</view>
				<view class="bottom-item flex-column">
					<view class="bottom-item-key">收藏</view>
					<view class="">100</view>
				</view>
			</view> -->
		</view>
		<view class="content my">
			<view class="content-center com flex-row ">
					<view class="sub flex-column " v-for="subItem in cList" :key="subItem.text" @click="onCList(subItem)">
						<image class="icon" :src="subItem.icon" mode=""></image>
						<view class="name">{{subItem.text}}</view>
					</view>		
			</view>
		</view>
		<view class="content">
			<view class="content-bottom com flex-column mar15">
				<view class="content-bottom-item flex-row" v-for="item in bList" :key="item.text" @click="onBList(item)">
					<view class="content-bottom-item-l flex-row">
						<image class="img" :src="item.icon" mode=""></image>
						<view class="title">{{item.text}}</view>
					</view>
					<image class="arrow-right" src="http://imgsg.qichuanqing.cn/v1/doctor/箭头拷贝@2x.png" mode=""></image>
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
		created() {
			console.log(this.userInfo,'userInfo')
		},
		data() {
			return {
				defaultAvatar:'http://imgsg.qichuanqing.cn/v1/userPersonal/avatar-doctor.png',
				cList:[				
					{text:'我的订单',icon:'http://imgsg.qichuanqing.cn/v1/order/order.png',url:'/pages/order/order_list'},
					{text:'医生认证',icon:'http://imgsg.qichuanqing.cn/v1/doctor/renzheng.png',url:'/pages/doctor/auth'},
					{text:'我的推荐',icon:'http://imgsg.qichuanqing.cn/v1/doctor/tuijian.png',url:'/pages/doctor/recommend/recommend'},
					{text:'我的信息',icon:'http://imgsg.qichuanqing.cn/v1/doctor/customer.png',url:'/pages/doctor/info'}
				],
				bList:[
					{text:'我的余额',icon:'http://imgsg.qichuanqing.cn/v1/doctor/yue.png',url:'/pages/doctor/balance'},
					{text:'我的体质',icon:'http://imgsg.qichuanqing.cn/v1/order/body.png',value:'详情',url:'/pages/user/body'},
					// {text:'我的收入',icon:'http://imgsg.qichuanqing.cn/v1/doctor/shouru.png',url:'/pages/doctor/balance'},
					{text:'我的积分',icon:'http://imgsg.qichuanqing.cn/v1/doctor/jifen.png',url:'/pages/doctor/integral'},
					{text:'我的粉丝',icon:'http://imgsg.qichuanqing.cn/v1/order/tip1.png',url:'/pages/doctor/fans'},
					{text:'我的文章',icon:'http://imgsg.qichuanqing.cn/v1/order/body.png',url:'/pages/doctor/article'},
					{text:'我的设置',icon:'http://imgsg.qichuanqing.cn/v1/order/chilun.png',url:'/pages/setting/exit',},
					// {text:'银行卡',icon:'http://imgsg.qichuanqing.cn/v1/doctor/card.png',url:''},
					// {text:'修改密码',icon:'http://imgsg.qichuanqing.cn/v1/doctor/xiugai.png',url:'/pages/doctor/password'}
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
				if(!this.isLogin){
					this.showLoginDialog();
					return
				}
				
				console.log(item.url,'1111')
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

<style lang="scss"  scoped>
	.arrow-right{
		width: 10rpx;
		height: 20rpx;
	}	
	.mar15{
		margin-top: 40rpx;
	}
	.com{
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow:4px 6px 5px 0px rgba(222,228,240,0.36);
	}
	.top{
		width: 100%;
		height: 400rpx;
		background: url('http://imgsg.qichuanqing.cn/v1/userPersonal/docker.jpg') no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		.avatarWarp{
			align-items: center;
			margin-left: 70rpx;
			margin-top: 90rpx;
			.avatar-warp{
				position: relative;
				.avatar{
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}
				.check{
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					bottom: 10rpx;
					right: 0;
				}
				
			}
			.right{
				margin-left: 25rpx;
				
				.user-name{
					font-size: 28rpx;
					color: #2B2B2B;
				}
				
				.type{
					width:100rpx;
					height:25rpx;
					color: #CFA972;
					background-color: #FFFFFF;
					border: 1px solid;
					font-size: 18rpx;
					border-radius:12rpx;
					text-align: center;
					line-height: 25rpx;
					margin-top: 15rpx;
				}
				
			}
		}
		.bottom{
			margin-top: 25rpx;
			.bottom-item{
				flex: 1;
				text-align: center;
				font-size: 26rpx;
				color: #2B2B2B;
				.bottom-item-key{
					margin-bottom: 10rpx;
				}
			}
		}
	}
	
	.content{
		padding: 0 25rpx;
		font-size: 24rpx;
		color: #333333;
		&.my{
			margin-top: -65rpx;
		}
		.content-center{
			padding: 20rpx 0;
				.sub{
					align-items: center;
					flex: 1;
				}
				
				.icon{
					width: 50rpx;
					height: 50rpx;
					margin-bottom: 10rpx;
					
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
					.value{
						color: #9F9B9D;
						margin-right: 10rpx;
					}
					
					
				}
			}
		}
	}
</style>
