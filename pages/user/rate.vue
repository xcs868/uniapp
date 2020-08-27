<template>
	<view class="warp flex-column">
		
		<view class="list-item flex-column" >
			<view class="list-item-top flex-row" v-for="(goods,index) in goodsList" :key="index">
				<image class="list-img" mode="" :src="goods.goods_img"></image>
				<view class="list-info flex-column">
					<view class="goods-name">{{goods.goods_name}}</view>
					<view class="tip">{{goods.goods_brief}}</view>
				</view>
				<view class="list-num">{{goods.goods_weight}}g x {{goods.goods_count}}</view>
			</view>
			
			<view class="list-item-bottom flex-column">
				<view class="flex-row star-warp">
					<view class="title">星级评价:</view>
					<view class="star">
						<u-rate :count="5" :size="40" :current="grade" @change="change"></u-rate>
					</view>
				</view>
				<view class="flex-row star-warp">
					<view class="title">评价内容:</view>
					<view class="tex">
						<textarea v-model="content" placeholder="请输入评论内容" />
					</view>
				</view>
			</view>
			
			<view class="btn" @click="submit">提交评价</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				grade:5,
				user_id : uni.getStorageSync('USER_ID'),
				orderId:'',
				content:'',
				goodsList:[]
			}
		},
		onLoad(e){
			console.log(e)
			this.orderId = e.orderId;
			this.goodsList = JSON.parse(e.goodsList) ;
		},
		methods:{
			change(val){
				this.grade = val;
			},
			submit(){
				if(!this.content){
					this.myToast('请输入评价内容');
					return
				}
				this.$api.apiCreatedAssess({
					 order_id:this.orderId,
					 user_id:this.user_id,
					 content:this.content ,
					 grade:this.grade
				}).then(res => {
					this.myToast(res.msg)
					if(res.code == 200){
						uni.navigateBack({
							delta: 1
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.btn{
		width:670rpx;
		height:70rpx;
		background:rgba(208,180,142,1);
		border:1px solid rgba(208,180,142,1);
		border-radius:20rpx;
		font-size: 30rpx;
		color: #fff;
		font-weight:bold;
		text-align: center;
		line-height: 70rpx;
		margin: 40px auto;
	}
	.warp{
		min-height: 100vh;
		.list-item{
			margin-bottom: 15rpx;
			background-color: #fff;
			font-size: 22rpx;
			color: #949494;
			
			.list-item-top{
				padding: 30rpx 40rpx;
				border-bottom: 1px solid #E5E5E5;
				.list-img{
					width: 150rpx;
					height: 150rpx;
					background-color: #007AFF;
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
			
			.list-item-bottom{
				padding: 10px 20px;
				.star-warp{
					align-items: center;
				}
				.title{
					font-size: 30rpx;
					color: #333333;
					width: 180rpx;
					flex-shrink: 0;
				}
				.star{
					margin: 20px 0rpx ;
				}
				.tex{
					flex: 1;
					
					textarea{
						width: 100%;
						height: 150rpx;
						border: 1px solid;
						box-sizing: border-box;
						padding: 10rpx;
						font-size: 20rpx;
						border-radius: 5px;
					}
				}
			}
		}
				
	}
</style>
