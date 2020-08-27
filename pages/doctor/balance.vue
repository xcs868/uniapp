<template>
	<view class="warp flex-column">
		<view class="balance flex-column">
			<view class="title">账户余额（元）</view>
			<view class="money">{{balance | money}} </view>
			<view class="tixian" @tap="launchBalance">余额提现</view>
		</view>
		<view class="income">
			<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="loadMore">
				<view class="list flex-column" v-if="list.length">
					<view class="list-item flex-row" v-for=" item in list" :key="item.id">
						<view class="left flex-column" >
							<view class="name">{{item.desc}}</view>
							<view class="time">{{item.created_time}}</view>
						</view>
						<view class="right flex-column">
							<view class="add">+{{item.exchange_balance}}</view>
							<view class="remain">余额: {{item.current_balance}}</view>
						</view>
					</view>
				</view>
				<view class="ordernull" v-else>
					<u-empty  text="暂无记录"></u-empty>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				balance:0,
				user_id:uni.getStorageSync('USER_ID'),
				list:[],
				page:1,
				isLoading:false,		 
				isHasData:false, //没有数据了
			}
		},
		onLoad(){
			this.getBalanceList()
		},
		methods:{
			launchBalance:function(){
				this.myToast('暂未开放余额提现功能，敬请期待!')
			},
			loadMore(){
				this.page++;
				this.getBalanceList()
			},
			getBalanceList(){
				if(this.isHasData)return
				if(this.isLoding)return
				this.$api.apiGetBalanceList({
					user_id:this.user_id,
					page:this.page
				}).then(res => {
					this.isLoding = false;
					this.balance = res.balance;
					let list = res.list || [];
					if(!list.length){
						this.isHasData = true;
						return
					}
					this.list = this.list.concat(list);
				})
			}
		}
	}
</script>

<style lang="scss">
	.warp{
		
		height: 100vh;
		/*  #ifdef H5 */ 
		height: 100%;
		/*  #endif  */
		.balance{
			height: 360rpx;
			background-color: #135658;
			align-items: center;
			justify-content: center;
			.title{
				color: #B9A786;
				font-size: 30rpx;
			}
			.money{
				color: #fff;
				font-size: 80rpx;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
			}
			.tixian{
				border: 1px solid;
				width: 145rpx;
				height: 40rpx;
				text-align: center;
				line-height: 40rpx;
				border-radius: 40rpx;
				font-size: 26rpx;
				color: #fff;
				
			}
		}
		
		.income{
			flex: 1;
			box-sizing: border-box;
			overflow: hidden;
			.scroll-Y{
				height: 100%;
				.list-item{
					justify-content: space-between;
					padding: 20rpx 30rpx;
					border-bottom: 1px solid #E5E5E5;
					font-size: 24rpx;
					color: #333333;
					background-color: #fff;
					.name{
						font-size: 26rpx;
						color: #808080;
						line-height: 50rpx;
					}
					.time, .remain{
						color: #B3B3B3;
					}
					.add{
						font-size: 30rpx;
						line-height: 50rpx;
						color: #D0B48E;
					}
					.reduce{
						color: #333333;
					}
				}
				
				
			}
		}
		.ordernull{
			margin-top: 30px;
		}	
	}
</style>
