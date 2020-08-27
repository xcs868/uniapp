<template>
	<view class="warp flex-column">
		<view class="hot flex-column" v-if="hotList.length">
			<view class="title flex-row">
				<view class="diamond"></view>
				<view class="text">热门文章</view>
			</view>
			<view class="scroll-H-warp">
				<scroll-view class="scroll-view_H"  scroll-x="true">
					<view class="flex-row">
						<view class="scroll-H-item flex-column" v-for="item in hotList" :key="item.id" @click="goDetail(item.id)">
							<image :src="item.thumbs" ></image>
							<view class="tips  two ">{{item.title}}</view>
						</view>
					</view>
				</scroll-view>
				
			</view>
			
		</view>
		<view class="latest flex-column">
			<view class="title flex-row">
				<view class="diamond"></view>
				<view class="text">我的文章</view>
			</view>
			<view class="scoll-h">
				<scroll-view scroll-y  class="scroll-Y"  @scrolltolower="loadMore"	>
					<view class="flex-column" v-if="list.length">
						<view class="article flex-row" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
							<view class="">
								<image class="article-img" :src="item.thumbs" ></image>
							</view>
							<view class="details flex-column">
								<view class="head two">{{item.title}}</view>
								<view class="content two">{{item.key_words}}</view>
								<view class="flex-row bottom">
									<view class="flex-row author">
										<view class="iconfont icon-zuozhe"></view>
										<view class="author-name">{{item.author}}</view>
									</view>
									<view class="flex-row right">
										<view class="follow flex-row">
											<view class="iconfont icon-eye"></view><view class="">{{item.click_count}}</view>
										</view>
										<view class="report-time">{{item.created_time}}</view>
									</view>
								</view>
							</view>
						</view>
						<v-no-data v-if="isHasData"></v-no-data>
					</view>
					<view class="nodata" v-else>
						<u-empty text="暂无最新文章"></u-empty>
					</view>
				</scroll-view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import vNoData from '@/components/vNoData.vue'
	export default {
		components:{
			vNoData
		},
		data(){
			return{
				user_id:uni.getStorageSync('USER_ID'),
				list:[],
				hotList:[],
				page:1,
				isLoading:false,		 
				isHasData:false, //没有数据了
			}
		},
		onLoad(){
			this.getList();
			this.getHotList()
		},
		methods:{
			goDetail(id){
				this.navigateToAction('/pages/doctor/article_detail?id='+id)
			},
			loadMore(){
				this.page++;
				this.getList()
			},	
			getList(){
				if(this.isHasData)return
				if(this.isLoding)return
				
				this.$api.apiGetList({
					user_id:this.user_id,
					page:this.page
				}).then(res => {
					console.log(res)
					this.isLoding = false;
					let list = res.list || [];
					if(!list.length){
						this.isHasData = true;
						return
					}
					this.list = this.list.concat(list);
				})
			},
			getHotList(){
				this.$api.apiHotList({
					user_id:this.user_id
				}).then(res => {
					console.log(res)
					this.hotList = res.list;
				})
			}
		}
	}
</script>

<style lang="scss">
	.two{
		overflow: hidden;  /** 隐藏超出的内容 **/
		text-overflow: ellipsis; /** 多行 **/
	   display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	   -webkit-line-clamp: 2; /** 显示的行数 **/
		
	}
	.title{
		color: #fff;
		font-size: 30rpx;
		align-items: center;
		.diamond{
			width: 20rpx;
			height: 20rpx;
			background-color: #fff;
			transform: rotate(45deg);
			margin-right: 15rpx;
		}
	}
	.warp{
		height: 100vh;
		.hot{
			background-color: #162A2B;
			padding: 20rpx 30rpx;
			height: 360rpx;
			box-sizing: border-box;
			.scroll-H-warp{
				margin: 30rpx 0;
				box-sizing: border-box;
				
				.scroll-view_H{
					width: 100%;
					white-space: nowrap;
					.scroll-H-item{
						margin-right: 10rpx;
						width: 260rpx;
						image{
							width: 260rpx;
							height: 150rpx;
							border-radius: 15rpx;
						}
						.tips{
							width: 100%;
							box-sizing: border-box;
							padding: 0 10rpx;
							color: #F6F6F6;
							font-size: 22rpx;
							white-space:normal;
							margin-top: 10rpx;
						}	
					}
						
					
				}
			}
		}
		.latest{
			flex: 1;
			padding: 20rpx 30rpx;
			padding-bottom: 0;
			box-sizing: border-box;
			overflow: hidden;
			.title{
				color: #242F37;
				padding-bottom: 20rpx;
				.diamond{
					background-color: #242F37;
				}
			
			}
			.scoll-h{
				flex: 1;
				box-sizing: border-box;
				overflow: hidden;
				.scroll-Y{
					height: 100%;
					.article{
						font-size: 24rpx;
						color: #242F37;
						border-bottom: 1px solid #DCDCDC;
						padding: 20rpx 0;
						&:first-child{
							padding-top: 0;
						}
						.article-img{ 
							width: 270rpx;
							height: 190rpx;
							border-radius: 5px;
							margin-right: 20rpx;
						}
						.details{
							flex: 1;
							justify-content: space-between;
							.content{
								color: #828282;
								font-size: 20rpx;
								line-height: 32rpx;
							}
							
							
							.bottom{
								justify-content: space-between;
								align-items: center;
								color: #B3B3B3;
								.author{
									font-size: 20rpx;
									align-items: baseline;
									
								}
								.right{
									align-items: center;
									.follow{
										align-items: center;
										.icon-eye{
											margin-right: 5rpx;
										}
									}
									.report-time{
										margin-left: 10rpx;
									}
								}
								
							}
						}
					}

				}
			}
			
			
			
		}
	}
</style>

