<template>
		
				<view class="warpper">
					<view class="warp flex-row">
						<view class="nav">
							<view class="nav-item"  
								@click="onNav(item,index)"
								:class="{active : currentIndex == index}" 
								v-for="(item, index) in nav" :key="item.id">{{item.goods_categroy_name }}</view>
						</view>
						<view class="right">
							<view class="search">
								<u-search placeholder="请输入商品名称/关键词" bg-color="#fff" 
									:show-action="false"
									 clearabled
									v-model="keyword" 
									@search="search"></u-search>
							</view>
							<view class="familys flex-row" v-if="family.length">
								<view class="family-item flex-row" 
								style="align-items: center;"
								v-for="(item, index) in family" :key="index" 
								@click="familyType(item,index)"
								:class="{'active' : currentFamilyIndex === index }">
									<view class="bodyType" :style="{backgroundColor:item.bgcolor}"></view>
									<view class="" style="margin-left: 5px;">{{item.realname}}</view>
										
								</view>
							</view>
							<view class="scoll-h" v-if="goodsList.length > 0">
								<scroll-view scroll-y  class="scroll-Y" @scrolltolower="loadMore">
									<view class="flex-column">
										<view class="list-item flex-row" 
										v-for="item in goodsList" :key="item.goods_id" @tap="goodsItemClick(item.goods_id)">
											<image class="list-img" :src="item.goods_img"></image>
											<view class="list-contian flex-column">
												<view class="goods-name text-overflow">{{item.goods_name}}</view>
												<view class="describe text-overflow">{{item.goods_brief}}~</view>
												<view class="bianqian-content flex-row">
													<view class="bian-item" v-for="(subItem,index) in item.goodsContion" :key="index" :style="{backgroundColor:subItem.bgcolor}"></view>
												</view>
												<view class="grace-red price">￥{{item.shop_price}}元</view>
											</view>
										</view>
										<v-no-data v-if="isHasData"></v-no-data>
									</view>
								</scroll-view>
							</view>
							
							<view v-if="goodsList.length == 0">
								<graceEmpty >
									<view slot="img" class="empty-view">
										<image class="empty-img" mode="widthFix" src="http://imgsg.qichuanqing.cn/v1/home/goodsCartEmpty.png"></image>
									</view>
									<text slot="text" class="grace-text-small grace-gray">该类别下暂无商品</text>
								</graceEmpty>
							</view>
						</view>
					</view>
					<!-- 登录提示弹窗 -->
					<dialog-box :show="loginDialogShow"  :titleHeight="60" @close="close" @confirm="confirm"></dialog-box>	
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
import dialogBox from "@/components/mybox/dialog-box/dialog-box.vue";
import gracePage from "@/graceUI/components/gracePage.vue";
import graceEmpty from "@/graceUI/components/graceEmptyNew.vue";
import vNoData from '@/components/vNoData.vue'
export default {
	
	components:{
		vNoData,
		dialogBox,
		gracePage,
		graceEmpty,
	},
	
	data(){
		return {
			user_id:uni.getStorageSync('USER_ID') || 0 ,
			addAvatrr:'http://imgsg.qichuanqing.cn/v1/family/add.png',
			menuShow:false,
			family: [],
			currentFamilyIndex:'',
			cid:'', //体质ID
			currentType:'',
			loginDialogShow:false,
			typeList:[],
			loadingType:3,
			keyword:'',
			currentIndex:0,
			nav:[],            //左侧分类
			isLoding:false,   //是否可以加载
			page:1,
			goodsList:[], //goods列表
			cate_id:'',  //左侧分类当前选择类型
			isHasData:false, //没有数据了
		}
	},
    onLoad(){
		if(this.user_id){
			this.getUserInfo()
		}
	},
	onShow(){
		this.page = 1;
		this.keyword = '';
		this.isHasData = false;
		this.goodsList = [];
		this.cid = '';
		//左侧分类
		this.getNavType()
	},
	methods:{
		familyType(item,index){
			if(this.currentFamilyIndex === index)return;
			this.currentFamilyIndex = index;
			this.page = 1;
			this.isHasData = false;
			this.goodsList = [];
			this.cid = item.constion_id;
			this.getGoodsList()
		},
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
							constion_id:item.constion_id
						})
					})
					this.family = family;
					console.log(this.family)
					
				}
			})
		},
		search(e){
			if(!this.keyword){
				this.myToast('请输入商品名称/关键词')
				return
			}
			this.page = 1;
			this.isHasData = false;
			if(this.cate_id != 6){
				this.typeList = [];
			}
			this.goodsList = [];
			this.getGoodsList()
		},
		confirm(){
			this.loginDialogShow = false
			return this.navigateToAction('/pages/login/login')
		},
		close(){
			this.loginDialogShow = false
		},
		goodsItemClick:function(goods_id){
			if(!uni.getStorageSync('USER_ID')){
				this.loginDialogShow = true
			}else{
				return this.navigateToAction('/pages/goods/goods_detail?goods_id='+goods_id)
			}
		},
		loadMore(){
			this.page++;
			this.getGoodsList()
		},
		//体质类型
		onType(e){
			this.currentType = e.type_id;
			//切换类型 重置默认
			
			this.page = 1;
			this.keyword = '';
			this.isHasData = false;
			this.goodsList = [];
			this.cid = '';
			this.getGoodsList()
		},
		//左侧栏分类
		onNav(item,index){
			if(this.currentIndex == index) return;
			this.currentIndex = index;
			console.log(item,index)
			//切换类型 重置默认
			this.currentFamilyIndex= '';
			this.currentType = '';
			this.keyword = '';
			this.cate_id = item.id;
			this.page = 1;
			this.isHasData = false;
			this.goodsList = [];
			this.typeList = [];
			this.cid = '';
			this.getGoodsList()
		},
		//获取左侧栏类型
		async getNavType(){
		   let res = await this.$api.apiGorp()
		   this.nav= res.groupList || [];
		   this.nav.push({id: 9, goods_categroy_name: "其他"})
		   
		   let typeId = uni.getStorageSync('typeId');
		   
		   this.nav.forEach((item, index) => {
			   if(typeId == item.id){
				   this.currentIndex = index
			   }
		   })
		   let cate_id = typeId ||  res.groupList[0].id;
		   this.cate_id = cate_id;
		   this.getGoodsList(typeId)
		},
		//获取右侧内容
		getGoodsList(typeId){
			if(this.isHasData)return
			if(this.isLoding)return
			this.isLoding = true
			this.$api.apiGoods({
				page:this.page,
				cate_id:this.cate_id,
				goods_name:this.keyword,
				cid:this.cid
			}).then(res => {
				if(typeId){
					uni.removeStorageSync('typeId');
				}
				console.log(res)
				if(res.consitionList.length){
					this.typeList = res.consitionList || []
				}
				this.isLoding = false
				let list = res.goodsList || [];
				if(!list.length){
					this.isHasData = true;
				}
				this.goodsList = this.goodsList.concat(list);
				
			})
		}
		
	}
}
</script>
<style lang="scss" scoped>
	.animate1{animation:rotateIn 0.5s linear;}
	.grace-pop-menu{width:100%; font-size:0;}
	.grace-pop-item{width:80rpx; height:80rpx; line-height:80rpx; text-align:center; 
	font-size:60rpx; color:#FFFFFF; border-radius:50%; margin:20rpx 0; overflow:hidden; display: block;}
	.grace-pop-image{width:80rpx; height:80rpx; border-radius:50%;margin-top: 16rpx;font-size: 28rpx;color: #fff;text-align: center;line-height: 80rpx;overflow: hidden;}
	
	
	// @import "@/uview-ui/index.scss";
	// 文本溢出
	.bian-item{
		margin-right: 10rpx;
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.text-overflow{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 360rpx
	}
	
	.nodata{
		justify-content: center;
		align-items: center;
		font-size: 12px;
		color: #aaa;

	}
	
	.familys{
		margin: 10px 0;
	}
	.family-item{
		border: 1px solid;
		color: #CAC8C8;
		font-size: 24rpx;
		padding: 2px 10px;
		border-radius: 10px;
		margin-left: 10px;
		&.active{
			color: #fff;
			border-color: #CFA972;
			background-color: #CFA972;
		}
	}
	.warpper{
		height: 100%;
	}
	.warp{
		height: 100vh;
		.nav{
			width: 140rpx;
			background-color: #162A2B;
			.nav-item{
				font-size: 26rpx;
				color: #CFA972;
				height: 55rpx;
				line-height: 55rpx;
				box-sizing: border-box;
				padding-left: 20rpx;
				border-left: 6rpx solid #162A2B;
				&.active{
					border-left: 6rpx solid;
				}
			}
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			
			.search{
				height:65rpx;
				border:1px solid #eee;
				background:rgba(255,255,255,1);
				box-shadow:3px 4px 8px 0px rgba(188,197,195,0.36);
				border-radius:65rpx;
				margin: 0 10rpx;
			}
			.typewarp{
				box-sizing: border-box;
				padding: 0 35rpx;
				flex-wrap: wrap;
				box-shadow: 1px 1px 1px #eee;
				height: 330rpx;
				.type{
					
					width: 90rpx;
					height: 90rpx;
					box-sizing: border-box;
					border-radius: 50%;
					box-shadow:3px 4px 8px 0px rgba(176,192,196,0.36); 
					font-size: 24rpx;
					text-align: center;
					line-height: 90rpx;
					margin: 10rpx 0;
					margin-right: 145rpx;
					&.on{
						box-shadow:1px 1px 15px 0px rgba(255,215,0,0.7);
						transform: scale(1.2);
						transition: all 0.3;
					}
					&:nth-child(3n){
						margin-right: 0;
						//background-color: #007AFF;
					}
				}
			}
			.scoll-h{
				flex: 1;
				box-sizing: border-box;
				overflow: hidden;
				.scroll-Y{
					height: 100%;
					.list-item{
						justify-content: space-between;
						padding: 10rpx 0;
						border-bottom: 1px solid #E5E5E5;
						.list-img{
							width: 180rpx;
							height: 180rpx;
							margin-left: 25rpx;
							border-radius:10rpx;
							// border: 1px solid #CFA972;
						}
						.list-contian{
							flex: 1;
							box-sizing: border-box;
							padding-left: 22rpx;
							justify-content: space-between;
							
							.goods-name{
								font-size: 26rpx;
								color: #414041;
							}
							.describe{
								font-size: 22rpx;
								color: #949494;
							}
							.send-time{
								width: 126rpx;
								//width:fit-content;
								text-align: center;
								font-size: 18rpx;
								color: #CFA972;
								border: 1px solid;
								border-radius: 12rpx;
							}
							.price{
								color: #162A2B;
								font-size: 26rpx;
							}
						}
					}
					
					
				}
			}
		}
	
	}
	
.empty-view{width:280rpx; height:280rpx; border-radius:280rpx; background-color:#F6F7F8; margin-top:100rpx;}
.empty-img{width:220rpx; height:200rpx; margin:40rpx; border-radius:200rpx;}
.grace-text-small{margin-top:10px;}
</style>
