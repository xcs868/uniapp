<template>
	
		<view class="warp flex-column">
			<view class="typewarp flex-row" >
				<view class="type" :class="{'on':currentTypeId == item.type_id}"  v-for="(item, index) in typeList" 
				@click="onType(item)"
				:key="item.name" 
				:style="{backgroundColor:item.bgcolor, color:item.color}" >
					{{item.name}}
				</view>
	
			</view>
			<view class="scoll-h">
				<scroll-view scroll-y  class="scroll-Y" @scrolltolower="loadMore">
					<view class="flex-column list-item-warp" v-if="goodsList.length">
						<view class="list-item " v-for="item in goodsList" :key="item.goods_id">
							<view class="list-item-top" @tap="showGoodsDeatils(item.goods_id)">
								<view class="list-item-img"  :style="{background:'url('+item.goods_img+')'}">
									<!-- <view class="dot" v-if="item.list.length">{{item.list[0].name}}</view> -->
								</view>
								<view class="recom flex-row">
									<view class="recom-icon"></view>
									<view class="">最佳推荐</view>
								</view>
								<view class="recommend">
									{{item.goods_desc}}
								</view>
								<view class="bianqian flex-row">
									<view class="iconfont icon-bianqian"></view>
									<view class="bianqian-content flex-row">
										<view class="bian-item" v-for="(subItem,index) in item.list" :key="index" :style="{backgroundColor:subItem.bgcolor}"></view>
									</view>
								</view>
							</view>
							
							<view class="list-item-bottom flex-row">
								<view class="time">{{item.created_time}}</view>
								<view class="news-warp flex-row">
									<!-- <view class="rating flex-row">
										<view class="iconfont icon-chakantiezihuifu"></view>
										<view class="">1000</view>
									</view> -->
									<view class="showcang flex-row">
										<view class="iconfont icon-shoucang1"></view>
										<view class="">{{item.click_count}}</view>
									</view>
								</view>
							</view>
							
							
						</view>
						<v-no-data v-if="isHasData"></v-no-data>
					</view>
					<view v-else>
						<graceEmpty >
							<view slot="img" class="empty-view">
								<image class="empty-img" mode="widthFix" src="http://imgsg.qichuanqing.cn/v1/home/goodsCartEmpty.png"></image>
							</view>
							<text slot="text" class="grace-text-small grace-gray">该类别暂无推荐商品</text>
						</graceEmpty>
					</view>
				</scroll-view>
			</view>
		</view>
		
	
</template>

<script>
	import vNoData from '@/components/vNoData.vue'
	import graceEmpty from "@/graceUI/components/graceEmptyNew.vue";
	export default {
		components:{
			vNoData,
			graceEmpty
		},
		data(){
			return{
				currentTypeId:0,
				typeList:[],
				type_id:0,
				isLoding:false,   //是否可以加载
				page:1,
				goodsList:[], //goods列表
				isHasData:false, //没有数据了
			}
		},
		onLoad(){
			this.$api.apiConsiton().then(res => {
				console.log(res.data)
				this.typeList = res.data;
			})
		},
		mounted(){
			this.getGoodsList({
				page:this.page,
				type_id:this.currentTypeId
			})
		},
		
		methods:{
			showGoodsDeatils:function(goods_id){
				let url = '/pages/goods/goods_detail?goods_id='+goods_id
				this.navigateToAction(url)
			},
			loadMore(){
				this.getGoodsList({
					page:this.page,
					type_id:this.currentTypeId
				})
			},	
			//体质类型
			onType(e){
				this.currentTypeId = e.type_id;
				//切换类型 重置默认
				this.page = 1;
				this.isHasData = false;
				this.goodsList = [];
				this.getGoodsList({
					page:this.page,
					type_id:this.currentTypeId
				})
			},
			getGoodsList(data){
				if(this.isHasData)return
				if(this.isLoding)return
				this.isLoding = true
				this.$api.apiGoodsRecommend(data).then(res => {
					this.isLoding = false
					this.page++;
					let list = res.data || [];
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
	.warp{
		height: 100vh;
		background-color: #F9F9F9;
		
		.typewarp{
			box-sizing: border-box;
			padding: 0 35rpx;
			flex-wrap: wrap;
			box-shadow: 1px 1px 1px #eee;
			height: 330rpx;
			background-color: #fff;
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
				margin-right: 206rpx;
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
				.list-item-warp{
					padding: 0 20rpx;
					.list-item{
						background-color: #fff;
						margin-top: 30rpx;
						border-radius: 10px;
						.list-item-top{
							padding: 20rpx 20rpx 0 20rpx;
							.list-item-img{
								width: 100%;
								height: 300rpx;
								position: relative;
								background-size:100% 100% !important;
								background-repeat:no-repeat !important;
								.dot{
									position: absolute;
									width:145rpx;
									height:44rpx;
									background:#83BB57;
									color: #fff;
									text-align: center;
									line-height: 44rpx;
									left: 20rpx;
									top: 5rpx;
								}
							}
							.recom{
								color: #5B5B5B;
								font-size: 26rpx;
								align-items: center;
								margin: 20rpx 0;
								.recom-icon{
									width: 32rpx;
									height: 32rpx;
									background: url('http://imgsg.qichuanqing.cn/v1/userPersonal/803730aae43eaf4a2fddd4512c1342b.png') no-repeat;
									background-size: 100% 100%;
									margin-right: 6rpx;
								}
								
							}
							.recommend{
								color: #5B5B5B;
								font-size: 24rpx;
								word-break: break-all;
								text-overflow: ellipsis;
								display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
								-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
								-webkit-line-clamp: 3; /** 显示的行数 **/
								overflow: hidden;  /** 隐藏超出的内容 **/
							}
							.bianqian{
								align-items: center;
								font-size: 24rpx;
								margin: 30rpx 0;
								.bianqian-content{
									color: #83BB57;
									.bian-item{
										margin-right: 10rpx;
										width: 10px;
										height: 10px;
										border-radius: 50%;
									}
									
								}
							}	
						}
						
						.list-item-bottom{
							border-top: 1px solid #EEEEEE;
							color: #AFAFAF;
							justify-content: space-between;
							align-items: center;
							font-size: 24rpx;
							padding: 20rpx;
							.rating{
								align-items: center;
								margin-right: 10px;
							}
							.showcang{
								align-items: center;
							}
							.iconfont{
								font-size: 36rpx;
								margin: 0;
							}
						}
					}
				}
				
				
				
			}
		}
	}
	
	.empty-view{width:280rpx; height:280rpx; border-radius:280rpx; background-color:#eee; margin-top:100rpx;}
	.empty-img{width:220rpx; height:200rpx; margin:40rpx; border-radius:200rpx;}
	.grace-text-small{margin-top:10px;}	
</style>
