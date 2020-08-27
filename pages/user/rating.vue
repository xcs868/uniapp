<template>
	<view class="warp flex-column">
		<view class="nav flex-row">
			<view class="nav-item" @click="onNav(item,index)" v-for="(item, index) in navlist" :key="item.id"><view :class="{active:currentIndex == index}">{{item.name}}</view></view>
		</view>
		<scroll-view scroll-y class="list-scroll" @scrolltolower="loadMore"	>
			<view class="list-scroll-warp flex-column">
				<view class=""  v-if="list.length">
					<view class="order-item" v-for="item in list" :key="item.order_id">
						<view class="list-item flex-column" v-for="(subItem, index) in item.goodsList" :key="index">
							<view class="list-item-top flex-row">
								<image class="list-img" mode="" :src="subItem.goods_img"></image>
								<view class="list-info flex-column">
									<view class="goods-name">{{subItem.goods_name}}</view>
									<view class="tip">{{subItem.goods_brief}}</view>
								</view>
								<view class="list-num">{{subItem.goods_weight}}g x {{subItem.goods_count}}</view>
							</view>
						</view>
						<view class="list-item-bottom flex-row">
							<view class="btn" @tap="showOrder(item)">查看订单</view>
							<view class="btn" v-if="item.state">查看评价</view>
							<view class="btn rating"  v-else  @click="goRating(item.order_id,item.goodsList)">立即评价</view>
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
	export default{
		components:{
			vNoData
		},
		data(){
			return{
				currentIndex:0,
				state:'all',
				page:1,
				user_id : uni.getStorageSync('USER_ID'),
				isLoading:false,
				isHasData:false, //没有数据了
				navlist:[{name:'全部',id:0,state:'all'},
						{name:'待评价',id:1,state:'accept'}],
				list:[]		
			}
		},
		onShow(){
			this.list = [];
			this.isHasData = false;
			this.isLoading = false;
			this.page = 1;
			this.getList()
		},
		methods:{
			showOrder:function(item){
				let url = '/pages/order/order_detail?order_id='+item.order_id
				this.navigateToAction(url)
			},
			goRating(orderId, goodsList){
				this.navigateToAction('/pages/user/rate?orderId='+orderId+'&goodsList='+JSON.stringify(goodsList))
			},
			loadMore(){
				this.getList()
			},
			onNav(item, index){
				if(this.currentIndex == index)return;
				this.currentIndex = index;
				this.state = item.state;
				this.list = [];
				this.isHasData = false;
				this.isLoading = false;
				this.page = 1;
				this.getList()
			},
			getList(){
				if(this.isHasData)return
						
				if(this.isLoding)return
				this.isLoding = true
				this.$api.apiGetAssess({
					user_id:this.user_id ,
					page:this.page, 
					state:this.state
				}).then(res => {
					console.log(res)
					this.isLoding = false
					this.page++;
					let list = res.list || [];
					if(!list.length){
						this.isHasData = true;
					}
					this.list = this.list.concat(list);
				})
				

			}
		}
	}
</script>

<style lang="scss" scoped>
	.ordernull{
		margin-top: 60px;
	}
	.warp{
		height: 100vh;
		background-color: #F9F9F9;
		.nav{
			height: 70rpx;
			background-color: #fff;
			margin: 10rpx 0;
			color: #1C1C1C;
			font-size: 26rpx;
			.nav-item{
				width: 50%;
				text-align: center;
				line-height: 70rpx;
				view{
					display: inline-block;
					padding: 0 30rpx;
					box-sizing: border-box;
					&.active{
						border-bottom: 2px solid;
					}
				}
			}
		}
		.list-scroll{
			flex: 1;
			box-sizing: border-box;
			overflow: hidden;
			.order-item{
				margin-bottom: 15rpx;
			}
			.list-item{
				background-color: #fff;
				font-size: 22rpx;
				color: #949494;
				
				.list-item-top{
					padding: 30rpx 40rpx;
					border-bottom: 1px solid #E5E5E5;
					.list-img{
						width: 150rpx;
						height: 150rpx;
					}
					.list-info{
						flex: 1;
						padding-left: 30rpx;

						.goods-name{
							color: #414041;
							font-size: 26rpx;
						}
					}
					.list-num{
						width: 120rpx;
						text-align: right;
					}
				}
				
			}
			.list-item-bottom{
				background-color: #fff;
				font-size: 22rpx;
				color: #949494;
				padding: 20rpx 40rpx;
				justify-content: flex-end;
				.btn{
					padding: 5rpx 10rpx;
					border-radius: 5px;
					background-color: #DBB48E;
					color: #fff;
					margin-left: 10rpx;
				}
				.rating{
					background-color: #DB3204;
					
				}
			}
		
		}
			
	}
</style>
