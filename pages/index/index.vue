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
							<image class="swiper-item" :src="item.img_url" @tap="goToGoods(item.url)"></image>
						</swiper-item>
					</swiper>
				</view>
				<!-- <button @click="clear">测试清除本地缓存</button> -->
				<view class="contian-top flex-column">
					<!-- 公告模块 -->
					<view class="tip">
						<view class="tip-item">
							<view class="tip-item-l">
								<!-- <image class="tip-item-img"  mode=""></image> -->
								<text class="iconfont" style="font-size:45rpx;">&#xe725;</text>
								<text class="tip-item-text">{{ newList.title }}</text>
							</view>
							<view class="tip-item-r"   @tap="showNewsDetail">
								详情
							</view>
						</view>
					</view>
					<!-- 滑动 -->
					<view class="scroll-warp">
						<scroll-view class="scroll-view_H" scroll-x="true" >
							<image :src="item.goods_img"
							 v-for="item in hotGoodsList" 
							:key="item.goods_id" 
							@click="showGoods(item.goods_id)"></image>
						</scroll-view>
					</view>
					
			
					
					<view class="food flex-column">
						<v-title>膳食</v-title>
						<view class="food-item-warp flex-row">
							<view class="food-item flex-column" @tap="NextGropGoods(item)" v-for="(item,index) in gropList" :key="index">
								<image class="food-img" :src="item.img_url"></image>
								<text class="grace-margin-top05 food-text">{{ item.goods_categroy_name }}</text>
							</view>
						</view>
						
					</view>
					
					
				</view>
				<view class="contian-bottom" style="padding-bottom: 20rpx;">
					<view class="recommend flex-column">
						<view class="top flex-row">
							<view class="flex-row" style="color: #333;font-size: 13px;align-items: center;">
								<v-title>健康推荐</v-title>
							</view>
							
							<view class="more flex-row" @click="goRecom">
								<text>全部体质推荐</text>
								<view class="arrow"></view>
							</view>
						</view>
						<view class="flex-row" v-if="family.length" style="align-items: center;font-size: 28rpx;color: #666;margin-bottom: 10px;">
							<view class="" style="">专属</view>
							<view class="flex-row" style="border: 1px solid;border-radius: 10px;padding: 0 5px;margin: 0 5px;" @click="familyShow = true">
								<view class="flex-row" style="align-items: center;margin-right: 5px;" v-for="item in selectList" :key="item.user_id">
									<view style="width: 12px;height: 12px;border-radius: 50%;" :style="{backgroundColor:item.bgcolor}"></view>
									<view class="">{{item.realname}}</view>
								</view>
								<u-icon name="arrow-down-fill" style="margin-left: 5px;margin-top: 2px;"></u-icon>
							</view>
							<!-- 
								<view class="flex-row" style="align-items: center;border: 1px solid;border-radius: 10px;padding: 0 5px;margin: 0 5px;">
								<view style="width: 12px;height: 12px;border-radius: 50%;" :style="{backgroundColor:family[index].bgcolor}"></view>
								<picker mode="selector" @change="bindPickerChange" :value="index"  :range="family" :range-key="'realname'">
									<view class="flex-row">
										<view class="uni-input">{{ family[index].realname }}</view>
										<u-icon name="arrow-down-fill" style="margin-left: 5px;margin-top: 2px;"></u-icon>
									</view>
								</picker>
							</view> 
							 -->
							<view class="" style="">推荐</view>
						</view>
						<view class="grace-flex grace-wrap grace-space-between ">
							<view v-for="(item,index) in recommList" :key="index" @tap="showGoods(item.goods_id)"
							class="grace-padding grace-border grace-border-radius-small grace-box-shadow grace-margin-bottom" 
							style="width: 41%;padding-bottom:8rpx;">
								<view class="" style="padding-top: 6px;" >
									<image
									:src="item.goods_img" 
									class="grace-img-card-img" style="width: 100%;height: 300rpx!important;"></image>
								</view>
								<view class="grace-img-card-title grace-ellipsi">{{ item.goods_name }}</view>
								<view class="flex-row dotwarp">
									<view class="dot" v-for="(subItem ,index) in item.goodsContion" :key="index" :style="{backgroundColor:subItem.bgcolor}"></view>
								</view>
								<view class="" style="height: 50rpx;">
									<text class="grace-tags grace-border-radius grace-bg-white grace-border tags-color" v-if="item.is_hot == 1">热卖</text>
									<text class="grace-tags grace-border-radius grace-bg-white grace-border tags-color" v-else-if="item.is_new == 1">新品</text>
									
								</view>
								<view class="grace-img-card-more">
									<text class="grace-h6 grace-bold grace-red" style="font-size: 27rpx;">￥{{ item.shop_price }}元</text>
									<text class="grace-money-size">￥{{ item.market_price }}</text>
									<image mode="widthFix" @click.stop="addCartGoods(item.goods_id)" class="cart-img" src="http://imgsg.qichuanqing.cn/v1/home/购物车(2)拷贝2@2x.png" ></image>
								</view>
							</view>
							
						</view>
						<!-- grace-flex End -->
					</view>
					
					
					
					
					
					<!-- 家人体质选择 -->
					<u-popup v-model="familyShow" mode="bottom">
						<view class="family-popup" style="padding: 10px;">
							<view class="flex-row" style="justify-content: space-between;font-size: 28rpx;margin-bottom: 10px;">
								<view class="" @click="familyShow = false">取消</view>
								<view class="" style="flex: 1;"></view>
								<view class="" style="color: #007AFF;" @click="confirmFamily">确定</view>
							</view>
							<view class="flex-column">
								<view class="items flex-row"  
									v-for="item in family" :key="item.user_id"
									@click="selectFamily(item)"
									style="align-items: center;;padding: 5px 0;padding-left: 280rpx;">
									<view class="iconfont icon-xuanze" :class="{ 'icon-xuanzhong':item.isOn }"></view>
									<view class="" style="font-size: 26rpx;color: #333;">{{item.realname}}</view>
								</view>
								
							</view>
						</view>
					</u-popup>
					
				</view>
				
			</view>
			<!-- 登录提示弹窗 -->
			<dialog-box :show="loginDialogShow"  :titleHeight="60" @close="close" @confirm="confirm"></dialog-box>	
			<!--  右侧挂件实现菜单-->
			<view style="position: fixed; right: 10px; bottom: 50px;">
				<view class="grace-pop-v animate1" v-if="menuShow" @tap="menuShow = false">
					<image  class="grace-pop-image" @click="adduser" :src="addAvatrr" mode=""></image>
					<view class="" v-for="(item,index) in family" :key="index">
						<view  @tap="userContion(item)" class="grace-pop-image" :style="{backgroundColor:item.bgcolor}">{{item.realname}}</view>
					</view>
				</view>
				<text class="grace-pop-item grace-icons icon-menu grace-bg-gray" @tap="showmenu"></text>
			</view>
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
			vTitle,
		},
		data() {
			return {
				familyShow:false,
				family: [],
				index: 0, //当前家人
				user_id: 0,
				avater:'http://imgsg.qichuanqing.cn/v1/family/father.png',
				addAvatrr:'http://imgsg.qichuanqing.cn/v1/family/add.png',
				loginDialogShow : false,
				newList:{},
				gropList:[], //首页分组
				bannerList:[],//轮播图
				recommList:[], //推荐栏目
				menuShow : false,
				NewsList:[],
				hotGoodsList:[],
				selectList:[]
			};
		},
		onLoad(e) {
			//分享人的id
			let referee_id = e.referee_id || 0;
			uni.setStorageSync('REFEREE_ID',referee_id );
			
			
			Promise.all([this.getBannerList(), this.getHomeGorp(),this.hotGoods()]).then(([bannerInfo, gorpInfo,hotGoodsList])=>{
				
				console.log(hotGoodsList,'hotGoodsList')
				this.hotGoodsList = hotGoodsList.list
				this.gropList = gorpInfo.groupList
				this.bannerList = bannerInfo.bannerList	
				this.newList = bannerInfo.newList
				
			})
			
			// this.GetNewsList() 时令好文隐藏
			// console.log(this.$Tools.isLogin(),'是否登录')
		},
		onShow(){
			let user_id = uni.getStorageSync('USER_ID') || 0;
			if(user_id){
				this.getUserInfo()
			}
			
			this.getRecommend()
		},
		onShareAppMessage() {
			let user_id = uni.getStorageSync('USER_ID') || 0
			console.log('share：'+user_id);
			
			
		    return {
		      title: '膳贡平台健康饮食!',
		      path: '/pages/index/index?referee_id='+ user_id
		    }
		},
		methods: {
			confirmFamily(){
				let selectListStr = [], selectList = [];
				this.family.forEach(item => {
					if(item.isOn){
						selectListStr.push(item.user_id)
						selectList.push(item)
					}
				})
				selectListStr = selectListStr.join();
				this.selectList = selectList;
				this.getRecommend(selectListStr)
				this.familyShow = false;
			},
			selectFamily(item){
				item.isOn = !item.isOn;
					
			},
			bindPickerChange: function(e) {
				if(this.index == e.target.value)return
				this.index = e.target.value;
				let familyId = this.family[this.index].user_id;
				this.getRecommend(familyId)
				this.familyShow = false;
			},
			clear(){
				uni.clearStorageSync();
				
			},
			hotGoods(){
			  return this.$api.apiHotGoods()
			},
			goToNewsDetails:function(item){
				let url = "/pages/news/index?id="+item.id
				return this.navigateToAction(url)
			},
			// 获取时令好文
			GetNewsList(){
				this.$api.apiGetNews({}).then(res=>{
					if(res.code == 200){
						this.NewsList = res.list
					}
				})
			},
			goToGoods:function(url){
				let webUrl = '/pages/goods/goods_cate_list'
				return this.navigateToAction(webUrl)
			},
			adduser(){
				this.family = []
				return this.navigateToAction('/pages/user/add_family')
			},
			userContion:function(item){
				return this.navigateToAction('/pages/user/body?user_id='+item.user_id)
				
			},
			getUserInfo:function(){
				this.$api.apiUserInfo({
					user_id:uni.getStorageSync('USER_ID')
				}).then(res => {
					if(res.code == 200){
						let  family = [];
						res.user.familyData.forEach(item => {
							family.push({
								user_id:item.id,
								realname:item.realname,
								bgcolor:item.constionList.bgcolor,
								name:item.constionList.name,
								isOn:false
							})
						})
						
						this.family = family;
						this.family[0].isOn = true;
						this.selectList[0] = this.family[0];
						console.log(this.selectList)
						console.log(this.family)	
					}
				})
			},
			showmenu : function () {
				
				if(!uni.getStorageSync('USER_ID')){
					this.loginDialogShow = true
				}else{
					if(this.family.length == 0){
						this.getUserInfo()
					}
					this.menuShow = !this.menuShow;
				}
				
			},
			goRecom(){
				this.navigateToAction('/pages/recom/recom')
			},
			showNewsDetail:function(){
				
				return this.navigateToAction('/pages/news/index?id='+this.newList.id)
			},
			showScroll:function(){
				return this.navigateToAction('/pages/authorize/answer')
				this.myToast('暂未开放，敬请期待!')
			},
			NextGropGoods(item){
				console.log(item)
				uni.setStorageSync('typeId',item.id)
				uni.switchTab({
					url:'/pages/classify/classify'
				})
				//return this.navigateToAction('/pages/goods/goods_cate_list?cat_id='+value.id)
			},
			showGoods(goods_id){
				if(!uni.getStorageSync('USER_ID')){
					this.loginDialogShow = true
				}else{
					return this.navigateToAction('/pages/goods/goods_detail?goods_id='+goods_id)
				}
			},
			//加入购物车
			addCartGoods:function(goods_id){
				// console.log(goods_id,11)
				if(!uni.getStorageSync('USER_ID')){
					this.loginDialogShow = true
				}else{
					this.$api.apiAddCart({
						user_id:uni.getStorageSync('USER_ID'),
						goods_id
					}).then(res => {
						console.log(res)
						if(res.code == 200){
							this.myToast(res.msg)
						}else{
							this.myToast(res.msg)
						}
					})
				}
			},
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
			getRecommend(familyId){
				let user_id = uni.getStorageSync('USER_ID') || 0;
				this.$api.apiRecommend({
					user_id: familyId || user_id+''
				}).then(res => {
					this.recommList = res.recommendList
				})
				
			},
			close() {
				this.loginDialogShow = false;
			},
			confirm(){
				//去登录页面
				this.close()
				return this.navigateToAction('/pages/login/login')
			}
		}
	};
</script>

<style lang="scss">
	
	
	.animate1{animation:rotateIn 0.5s linear;}
	.grace-pop-menu{width:100%; font-size:0;}
	.grace-pop-item{width:80rpx; height:80rpx; line-height:80rpx; text-align:center; 
	font-size:60rpx; color:#FFFFFF; border-radius:50%; margin:20rpx 0; overflow:hidden; display: block;}
	.grace-pop-image{width:80rpx; height:80rpx; border-radius:50%;margin-top: 16rpx;font-size: 28rpx;color: #fff;text-align: center;line-height: 80rpx;overflow: hidden;}
	
	.family-popup{
		.icon-xuanzhong{
			color: #cfa972;
		}
	}
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
		background-color: #02554A;
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
			padding: 0 28rpx;
			
			.food-item-warp{
				justify-content: space-between;
				margin: 32rpx 0;
			}
			.food-item{
				width: 100rpx;
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
		padding: 0 20rpx;
		.top{
			justify-content: space-between;
			align-items: center;
			margin-top: 36rpx;
			margin-bottom: 10rpx;
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
	}
	.grace-money-size{font-size:x-small!important;color:#ccc!important;text-decoration: line-through!important;margin-left:-60rpx;}
	.cart-img{width: 40rpx!important;height: 40rpx!important;}
	.tags-color{border-color:red;color:red!important;}
	
	.box {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 13px 3px rgba(165, 165, 165, 0.25);
		border-radius: 10px;
		margin: 0 15px 20px;
	
		.title {
			padding: 12px 15px;
			border-bottom: 1px #ededed solid;
			font-size: 12px;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			color: #333;
			display: flex;
			text-align: center;
			justify-content: space-between;
	
			span {
				color: #39B55A;
				font-size: 10px;
			}
		}
	
		.content {
			padding: 10px;
		}
	}
</style>
