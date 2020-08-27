<template>
	<view class="warp flex-column">
		<view class="nav flex-row" >
			<view class="nav-item " :class="{active:currentNavIndex == index}"  @click="onNav(item.id,index)" v-for="(item, index) in navList" :key="index">{{item.name}}</view>
		</view>
		<swiper class="content-swiper" :current="currentNavIndex" @change="swiperChange">
			<swiper-item class="content-swiper-item">
				<!-- 商品介绍 -->
				<scroll-view scroll-y="true" class="scoll-h" >
					<view class="goods" id="goods">
					<view class="banner">
						<swiper class="swiper" 
						indicator-dots="true" 
						autoplay="true"  
						interval="5000"
						indicator-active-color="#ffffff">
							<swiper-item  v-for="(item,index) in bannerList" :key="index">
								<image class="goods-swiper-item" :src="item.goods_thumb_url" @click="previewImage(item.goods_thumb_url)"></image>
							</swiper-item>
						</swiper>
					</view>
					<view class="goods">
						<view class="goods-name">{{ goodsData.goods_name }}</view>
						<view class="" style="color: #666;">{{goodsData.goods_subtitle}}</view>
						<view class="goods-area" style="text-align: left;">{{ goodsData.goods_brief }}</view>
						<view class="flex-row dotwarp" style="justify-content: center;">
							<view class="dot" v-for="(subItem ,index) in goodsData.consitonList" :key="index" :style="{backgroundColor:subItem.bgcolor}"></view>
						</view>
						
						<view class="goods-pirce flex-row grace-margin-top05 grace-gray">
							<!-- <view class="price grace-gray">规格：{{ goodsData.goods_weight }}g / {{ goodsData.shop_price }}元</view> -->
							<view class="price grace-gray">规格：重量</view>
						</view>
						
						<view class="goods-pirce flex-row">
							<view class="price grace-h4 grace-bold">￥{{ goodsData.shop_price }}元</view>
							<view class="old-price grace-h4">￥{{ goodsData.market_price }}</view>
						</view>
					</view>
					
					<view class="detail-warp">
						<view class="goods-info">
							<view class="line"></view>
							<view class="title">商品介绍</view>
							<text class="text">
								{{ goodsData.goods_desc }}                            
							</text>
							<image class="img" :src="goodsData.goods_img" mode="widthFix"></image>
						</view>
					</view>
				</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="content-swiper-item">
				<!-- 用户评价 -->
				<scroll-view scroll-y="true" class="scoll-h" @scrolltolower="loadMore">
					<view class="rating flex-column" v-if="assessList.length">
						<view class="rating-item flex-column" v-for="(item, index) in assessList" :key="index">
							<view class="flex-row top">
								<image class="avatar" :src="item.weixinface" mode=""></image>
								<view class="nickName">{{item.weixinname}}</view>
								<view class="vip iconfont icon-VIP" v-if="item.is_vip"></view>
							</view>
							<view class="flex-row star-warp">
								<view class="star">
									<u-rate :count="5" :size="30" :current="item.assess_star" disabled></u-rate>
								</view>
								<view class="time">{{item.created_time}}</view>
							</view>
							<view class="rating-text">{{item.content}}</view>
						</view>
					</view>
					 <view class="" v-else>
					 	<u-empty text="暂无用户评论" mode="list"></u-empty>
					 </view>
				</scroll-view>
			</swiper-item>
		</swiper>

		<view class="bottom-bar flex-row">
			<view class="left flex-row">
				<view class="flex-column icon-warp" @tap="addGoodsCollection">
					<view class="iconfont  icon-fz " :class="{'icon-shoucang':isShowcang,'icon-unshoucang':!isShowcang}"></view>
					<view class="icon-text">收藏</view>
				</view>
			</view>
			<view class="right flex-row">
				<view class="addcar" @tap="addCartGoods(goodsData.goods_id)">加入购物车</view>
				<view class="buy" @tap="goodsCharg">立即购买</view>
			</view>
		</view>
		
		<!-- 弹出层 -->
		<u-popup v-model="show" 
			mode="bottom" 
			border-radius="14"
			closeable
			close-icon="close-circle" 
			close-icon-size="40" >
			<view class="popup-content flex-column">
				<view class="popup-content-top">
					<view class="flex-row">
						<image mode="" :src="goodsData.goods_img"></image>
						<view class="popup-content-right flex-column">
							<view class="goods_name">商品名称:{{goodsData.goods_name}}</view>
							<view class="goods_pirce" style="margin-top:20rpx;">￥{{goodsData.shop_price}} 元</view>
							<!-- <view class="goods_stock">库存：{{goodsData.goods_number}}g</view> -->
							<view class="goods_specs" style="margin-top:20rpx;">规格：{{goodsData.goods_weight}}g</view>
						</view>
					</view>
					<view class="flex-row count-warp">
						<view class="">购买数量:</view>
						<view class="">

							<u-number-box
							:min="1" disabled-input 
							v-model="count" @change="changCount" 
							size="22"></u-number-box>
							
						</view>
					</view>
				</view>
				
				<view  class="sure" @click="submitOrder">
					确定
				</view>
			</view>
		</u-popup>
		<!-- 右侧挂件实现菜单 -->
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
</template>

<script>
	import graceNumberBox from "@/graceUI/components/graceNumberBox.vue";
	
	export default{
		components:{
		  graceNumberBox

		},
		data(){
			return{
				addAvatrr:'http://imgsg.qichuanqing.cn/v1/family/add.png',
				menuShow:false,
				family: [],
				currentNavIndex:0,
				navList:[{name:'商品介绍',id:'goods'},{name:'用户评价',id:'rating'}],
				//{name:'食材功效',id:'effect'},{name:'相关专题',id:'topics'}
				maxCount:0,
				count:1,    //购买数量
				show:false, 
				goods_id:0,
				isShowcang:false,
				bannerList: [],
				goodsData:{},
				assessList:[],
				isLoding:false,   //是否可以加载
				page:1,
				isHasData:false, //没有数据了
			}
		},
		computed:{
			urls(){
				let arr = []
				this.bannerList.forEach(item => arr.push(item.goods_thumb_url))
				return arr
			}
		},
		onLoad(e) {
			//分享人的id
			let referee_id = e.referee_id || 0;
			uni.setStorageSync('REFEREE_ID',referee_id );
			
			this.goods_id = e.goods_id ? e.goods_id :0
			this.getGoods(this.goods_id)
			this.getAssessList()
		},
		onShareAppMessage() {
		    return {
		      title: '膳贡平台健康饮食!',
		      path: '/pages/goods/goods_detail?referee_id='+this.user_id+'&goods_id='+this.goods_id
		    }
		},
		methods:{
			adduser(){
				this.family = []
				return this.navigateToAction('/pages/user/add_family')
			},
			userContion(item){
				return this.navigateToAction('/pages/user/body?user_id='+item.user_id)
				
			},
			showmenu() {
				if(!uni.getStorageSync('USER_ID')){
					this.loginDialogShow = true
				}else{
					if(this.family.length == 0){
						this.getUserInfo()
					}
					this.menuShow = !this.menuShow;
				}
				
			},
			getUserInfo(){
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
							})
						})
						this.family = family;
						console.log(this.family)
						
					}
				})
			},
			loadMore(){
				this.getAssessList()
			},
			getAssessList(goods_id){
				if(this.isHasData)return
				if(this.isLoding)return
				this.isLoding = true
				this.$api.apiGetAssessList({
					goods_id:this.goods_id,
					page:this.page
				}).then(res => {
					this.isLoding = false
					this.page++;
					let list = res.list || [];
					if(!list.length){
						this.isHasData = true;
					}
					this.assessList = this.assessList.concat(list);
				})
			},
			swiperChange(e){
				this.currentNavIndex = e.detail.current;
			},
			onNav(id, index){
				this.currentNavIndex = index;
				
			},
			changCount(e){
				if(this.count == e.value)return	
				console.log(e.value)
				this.count = e.value || 1;
			},
			goodsCharg(){
				//是否是会员才允许购买
				this.$api.apiIsVip({
					user_id:uni.getStorageSync('USER_ID')
				}).then(res => {
					if(res.code == 200){
						if(res.is_vip){
							this.show = true
						}else{
							this.myToast('您还不是会员，不允许购买商品，请充值成为会员后购买商品！')
						}
					}
				})
				return true
			},
			//下单立即购买
			submitOrder(){
				var _this = this
				//查看是否token过期，是否登录，是否是会员才能购买
				if(!uni.getStorageSync('USER_ID')){
					_this.myToast('请登录后进行购买')
					setTimeout(function(){
						_this.navigateToAction('/pages/login/login')
					},2000);
					return true
				}else{
					let {goods_id, goods_weight, goods_name, shop_price,goods_img} = this.goodsData;
					let goods = {
						goods_id, goods_weight, goods_name, shop_price,goods_img, RedisCount:this.count
					}
					this.navigateToAction('/pages/goods/submit_order?goods='+JSON.stringify(goods))
				}
			},
			previewImage(current){
				uni.previewImage({
					indicator:'number',
					loop: true,
					current, // 当前显示图片的http链接
					urls: this.urls // 需要预览的图片http链接列表
				})
			},
			getGoods:function(goods_id){
				this.$api.apiGetGoodsDetail({
					goods_id,
					user_id:uni.getStorageSync('USER_ID')
				}).then(res=>{
					// console.log(res)
					if(res.code == 200){
						this.bannerList = res.data.thumbImgList
						this.goodsData = res.data
						this.maxCount = res.data.max
						this.isShowcang = res.data.goods_collection_status == 0 ? false : true
					}else{
						this.myToast(res.msg)
					}
				})
			},
			addGoodsCollection:function(){
				let goods_id = this.goods_id
				this.$api.apiAddGoodsCollection({
					goods_id,
					user_id:uni.getStorageSync('USER_ID')
				}).then(res => {
					// console.log(res,11)
					if(res.code == 200){
						this.myToast(res.msg)
						this.isShowcang = !this.isShowcang
					}
				})
			},
			//加入购物车
			addCartGoods(goods_id){
				console.log(goods_id,123)
				this.$api.apiAddCart({
					goods_id,
					user_id:uni.getStorageSync('USER_ID')
				}).then(res => {
					this.myToast(res.msg)
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	@import  "@/common/iconfont.css";
	.animate1{animation:rotateIn 0.5s linear;}
	.grace-pop-menu{width:100%; font-size:0;}
	.grace-pop-item{width:80rpx; height:80rpx; line-height:80rpx; text-align:center; 
	font-size:60rpx; color:#FFFFFF; border-radius:50%; margin:20rpx 0; overflow:hidden; display: block;}
	.grace-pop-image{width:80rpx; height:80rpx; border-radius:50%;margin-top: 16rpx;font-size: 28rpx;color: #fff;text-align: center;line-height: 80rpx;overflow: hidden;}
	
	
	.bgColor{ background: rgba(0, 0, 0, 0.1)!important;}
	.warp{
		font-size: 26rpx;
		color: #7F7F7F;
		box-sizing: border-box;
		height: 100vh;
		// padding-bottom: 100rpx;
		.nav{
			background-color: #fff;
			font-size: 24rpx;
			color: #B3B3B3;
			.nav-item{
				padding: 20rpx 40rpx;
				&.active{
					border-bottom: 2px solid #162B28;
					color: #E1BD5B;
				}
			}
			
		}
		.content-swiper{
			flex: 1;
			box-sizing: border-box;
		}
		.scoll-h{
			height: 100%;
			overflow: hidden;
			
			.goods{
				
				.line{
					height: 1px;
					background-color: #EEEEEE;
				}
				.title{
					color: #333333;
					margin: 30rpx 0;
					text-align: center;
				}
				.swiper{
					width: 100%;
					height: 400rpx;
					.goods-swiper-item{
						width: 100%;
						height: 400rpx;
					}	
				}
				.goods{
					text-align: center;
					padding: 30rpx ;
					.goods-name{
						font-size:30rpx;
						font-weight:bold;
						color: #333333;
					}
					.goods-area{
						color: #B3B3B3;
						margin: 15rpx 0;
					}
					.goods-pirce{
						justify-content: center;
						.price{
							color: #DB3204;
						}
						.old-price{
							margin-left: 5rpx;
							text-decoration-line: line-through;
						}
					}
					
				}
				.detail-warp{
					padding: 0 25rpx;
					.text{
						line-height: 44rpx;
					}
					.img{
						width: 100%;
					}
				}	
				
			}
		
			.rating {
				padding: 0 30rpx;
				.rating-item{
					border-bottom: 1px solid #eee;
					padding: 20rpx 0;
					.top{
						align-items: center;
						margin-bottom: 10rpx;
						.avatar{
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin-right: 20rpx;
						}
						.nickName{
							font-size: 28rpx;
							color: #333333;
						}
						.vip{
							color: #ef837b;
							font-size: 40rpx;
							margin-left: 10rpx;
						}
					}
					.star-warp{
						justify-content: space-between;
						align-items: center;
						margin-bottom: 10rpx;
					}
					
				}
				
			}
			.effect{
				height: 600rpx;
				text-align: center;
				font-size: 50px;
				color: #fff;
				background-color: #00B26A;
			}
			 
			.topics{
				height: 1900rpx;
				text-align: center;
				font-size: 50px;
				color: #fff;
				background-color: #B100FF;
			}
		
		}
		
		
		.bottom-bar{
			// position: fixed;
			// bottom: 0;
			width: 100%;
			height: 100rpx;
			
			background-color: #fff;
			box-shadow:-1px -1px 3px 0px #999,;
			.left{
				flex: 1;
				justify-content: center;
				align-items: center;
				.icon-warp{
					align-items: center;
				}
				.icon-fz{
					font-size: 40rpx;
					margin: 0;
				}
				.icon-shoucang{
					color: #BF0000;
				}
				.icon-text{
					font-size: 28rpx;
					color: #333333;
				}
			}
			.addcar{
				background-color: #E4D197;
			}
			.buy{
				background-color: #BF0000;
			}
			.addcar, .buy{
				width: 280rpx;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				color: #fff;
				font-size: 28rpx;
			}
		}
		
	}
	
	.popup-content{
		.popup-content-top{
			padding: 30rpx;
			image{
				width: 200rpx;
				height: 200rpx;
				border-radius: 5px;
			}
			.popup-content-right{
				padding-left: 30rpx;
				view{
					margin-bottom: 16rpx;
					&:last-child{
						margin-bottom: 0;
					}
				}
				.goods_pirce{
					font-size: 30rpx;
					color: #FF0000;
				}	
				.goods_name{
					font-size: 30rpx;
					color: #333;
				}	
			}
			.count-warp{
				margin: 50rpx 0 60rpx;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
			}
		}
		
		.sure{
			// height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 34rpx;
			width: 95%;
			margin: auto;
			color: #fff;
			border-radius: 22rpx;
			margin-bottom: 10rpx;
			// padding-bottom: 16rpx;
			background-color: #FF6700!important;
		}	
	}
</style>
