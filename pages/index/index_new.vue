<template>
	<gracePage :customHeader="false" :isSwitchPage="true">
		<view slot="gBody">
			<view class="content">
				<view class="banner">
					<swiper class="swiper" 
					indicator-dots="true" 
					autoplay="true"  
					interval="2000"
					duration="500" 
					indicator-active-color="#ffffff">
						<swiper-item v-for="(item,index) in bannerList" :key="index">
							<image class="swiper-item" :src="item.img_url" ></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="contian-top flex-column">
					<!-- 公告模块 -->
					<view class="tip">
						<view class="tip-item">
							<view class="tip-item-l">
								<!-- <image class="tip-item-img"  mode=""></image> -->
								<text class="iconfont" style="font-size:45rpx;">&#xe725;</text>
								<text class="tip-item-text">优品汇自营家电清洗服务上线</text>
							</view>
							<view class="tip-item-r"   @tap="test">
								详情
							</view>
						</view>
					</view>
					<!-- 滑动 -->
					<view class="scroll-warp">
						<scroll-view class="scroll-view_H" scroll-x="true"  >
							<image src="http://imgsg.qichuanqing.cn/v1/home/1.png" mode=""></image>
							<image src="http://imgsg.qichuanqing.cn/v1/home/1.png" mode=""></image>
							<image src="http://imgsg.qichuanqing.cn/v1/home/1.png" mode=""></image>
						</scroll-view>
					</view>
					
					<view class="food flex-column">
						<v-title>玺食</v-title>
						<view class="food-item-warp flex-row">
							<view class="food-item flex-column" v-for="(item,index) in gropList" :key="index">
								<image class="food-img" :src="item.img_url"></image>
								<text class="grace-margin-top05 food-text">{{ item.goods_categroy_name }}</text>
							</view>
						</view>
						
					</view>
					
				</view>
				<view class="contian-bottom">
					<view class="recommend flex-column">
						<view class="top flex-row">
							<v-title>推荐</v-title>
							<view class="more flex-row" >
								<text>更多推荐</text>
								<view class="arrow"></view>
							</view>
						</view>
						<view class="content flex-row">
							<view class="item" v-for="(item,index) in recommList" :key="index">
								<view class="name " style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ item.goods_name }}</view>
								<image class="item-img" :src="item.goods_img" mode=""></image>
								<image class="cart" src="http://imgsg.qichuanqing.cn/v1/home/购物车(2)拷贝2@2x.png" mode=""></image>
							</view>
							
						</view>
					</view>
				</view>
				
			</view>
			
			
			<!-- 登录提示弹窗 -->
			<dialog-box :show="loginDialogShow"  :titleHeight="60" @close="close" @confirm="confirm"></dialog-box>
		</view>
	</gracePage>
</template>

<script>
	import vTitle from '@/components/vTitle.vue'
	import gracePage from "@/graceUI/components/gracePage.vue";
	import graceSwiper from "@/graceUI/components/graceSwiper.vue";
	import graceScroll from '@/graceUI/components/graceScroll.vue';
	import dialogBox from "@/components/mybox/dialog-box/dialog-box.vue";

	export default {
		components:{
			gracePage,
			graceSwiper,
			graceScroll,
			dialogBox,
			vTitle
		},
		data() {
			return {
				loginDialogShow : false,
				gropList:[], //首页分组
				bannerList:[],//轮播图
				recommList:[], //推荐栏目
			};
		},
		onLoad() {
			Promise.all([this.getBannerList(), this.getHomeGorp(),this.getRecommend()]).then(([bannerInfo, gorpInfo,RecommendInfo])=>{
				this.gropList = gorpInfo.groupList
				this.bannerList = bannerInfo.bannerList
				this.recommList = RecommendInfo.recommendList
			})
		},
		onPullDownRefresh() {
			console.log('refresh');
		},
		methods: {
			// 获取首页轮播图
			getBannerList:function(){
				let bannerInfo = this.$api.apiBannar()
				return bannerInfo
			},
			//首页分组
			getHomeGorp:function(){
				let gorpInfo = this.$api.apiGorp()
				return gorpInfo
			},
			//首页推荐商品
			getRecommend(){
				let RecommendInfo = this.$api.apiRecommend()
				return RecommendInfo
			},
			close() {
				this.loginDialogShow = false;
			},
			confirm(){
				//去登录页面
				return this.navigateToAction('/pages/login/login')
			}
		}
	};
</script>

<style lang="scss">
	page{
		font-family:PingFang SC;
		background-color: #F5F5F5;
	}
	.swiper{
		width: 100%;
		height: 330rpx;
		.swiper-item{
			width: 100%;
			height: 330rpx;
		}	
	}
	.contian-top{
		background-color: #18403B;
		.tip{
			margin-top: 20rpx;
			.tip-item{
				height: 74rpx;
				box-sizing: border-box;
				padding:0 42rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background:linear-gradient(100deg,rgba(163,140,118,1),rgba(241,222,192,1));
				border-radius:20rpx;
				.tip-item-l{
					display: flex;
					align-items: center;
					.tip-item-img{
						width: 40rpx;
						height: 40rpx;
						background: #007AFF;
					}
					.tip-item-text{
						font-size: 24rpx;
						color: #414040;
						margin-left: 10rpx;
					}
				}
				.tip-item-r{
					width:85rpx;
					height:38rpx;
					background:linear-gradient(0deg,rgba(24,24,24,1),rgba(49,49,49,1));
					border-radius:20rpx;
					font-size: 24rpx;
					color: #fff;
					text-align: center;
					line-height: 38rpx;
				}
				
			}	
		}
		
		.scroll-warp{
			padding-left: 42rpx;
			height: 114rpx;
			margin: 34rpx 0;
			box-sizing: border-box;
			.scroll-view_H{
				width: 100%;
				white-space: nowrap;
				image{
					width: 336rpx;
					height: 114rpx;
					border-radius: 15rpx;
					margin-right: 10rpx;
				}
			}
		}
	
		.food{
			box-sizing: border-box;
			padding: 0 42rpx;
			
			.food-item-warp{
				justify-content: space-between;
				margin: 32rpx 0;
			}
			.food-item{
				width: 90rpx;
				align-items: center;
				.food-img{
					width: 90rpx;
					height: 90rpx;
					border-radius: 20rpx;
				}
				.food-text{
					color: #FFF7E6;
					font-size: 22rpx;
				}
			}
			
		}	
	
	}
	.contian-bottom{
		background-color: #FFFFFF;
		margin-top: 15rpx;
		box-sizing: border-box;
		padding: 0 42rpx;
		.top{
			justify-content: space-between;
			align-items: center;
			margin-top: 36rpx;
			margin-bottom: 20rpx;
			.more{
				font-size: 24rpx;
				color: #DB3204;
				align-items: center;
				font-weight:bold;
				.arrow{
					width: 12rpx;
					height: 12rpx;
					border-right: 1px solid #db3204;
					border-top: 1px solid #db3204;
					transform:rotate(45deg);
					margin-left: 6rpx;
				}
			}
		}
		
		.content{
			flex-wrap: wrap;
			.item{
				width: 330rpx;
				height: 320rpx;
				position: relative;
				border:1px solid rgba(221,212,196,1);
				border-radius:30px;
				box-sizing: border-box;
				padding-left: 20rpx;
				padding-right: 10rpx;
				padding-bottom: 24rpx;
				margin-bottom: 40rpx;
				&:nth-child(2n){
					margin-left: 6rpx;
				}
				.name{
					color: #7A7A7A;
					font-size: 30rpx;
					margin-top: 30rpx;
					margin-bottom: 15rpx;
				}
				.item-img{
					width: 300rpx;
					height: 200rpx;
				}
				.cart{
					position: absolute;
					right: 30rpx;
					bottom: -10rpx;
					width: 40rpx;
					height: 40rpx;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
