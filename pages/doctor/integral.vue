<template>
	<view class="warp flex-column">
		<view class="integral flex-column">
			<view class="num">{{integral}}</view>
			<view class="duihuan" @click="exchageBalacne">兑换余额</view>
		</view>
		<view class="nav flex-row">
			<view class="nav-item-warp" v-for="(item, index) in nav" :key="index" @click="onNav(item,index)">
				<view class="nav-item" :class="{active:currentIndex == index}">{{item.name}}</view>
			</view>
		</view>
		<view class="scroll-warp">
			<scroll-view scroll-y="true" class="scroll-Y"  @scrolltolower="loadMore">
				<!-- <view class="flex-column list" v-if="currentIndex == 0">
					<view class="item exchange flex-row" >
						<view class="left flex-column">
							<view class="name">每日签到</view>
							<view class="tip">连续签到得更多积分</view>
							<view class="detail">已连续签到1天+5分</view>
						</view>
						<view class="right">签到</view>
					</view>
					<view class="item exchange flex-row" >
						<view class="left flex-column">
							<view class="name">每日签到</view>
							<view class="tip">连续签到得更多积分</view>
							<view class="detail">已连续签到1天+5分</view>
						</view>
						<view class="right">领取</view>
					</view>		
				</view> -->
				<view class="flex-column" v-if="list.length">
					<view class="flex-column list" v-for="item in list" :key="item.id">
						<view class="item record flex-row">
							<view class="left flex-column">
								<view class="name">{{item.desc}}</view>
								<view class="tip">10积分兑换1元</view>
								<!-- <view class="detail">已抵扣30积分</view> -->
							</view>
							<view class="right flex-column">
								<view class="jifen" v-if="state == 1">+{{item.integral}}</view>
								<view class="jifen" v-if="state == 2">-{{item.integral}}</view>
								<view class="time">{{item.created_time}}</view>
							</view>
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
			return{
				currentIndex:0,
				nav:[{name:'积分记录',state:1},{name:'兑换记录',state:2}],
				user_id:uni.getStorageSync('USER_ID'),
				integral:0,
				list:[],
				page:1,
				state:1,
				isLoading:false,		 
				isHasData:false, //没有数据了
			}
		},
		onLoad(){
			this.getRecoed()
		},
		methods:{
			exchageBalacne(){
				this.$api.apiExchageBalacne({
					user_id:this.user_id, 
					integral:this.integral
				}).then(res => {
					this.myToast(res.msg)
					console.log(res)
					if(res.code == 200){
						this.list = [];
						this.page = 1;
						this.isLoading = false;		 
						this.isHasData = false; //没有数据了
						this.getRecoed()
					}
					
				})
			},	
			onNav(item,index){
				if(this.currentIndex == index)return;
				this.currentIndex = index;
				this.state = item.state;
				
				this.list = [];
				this.page = 1;
				this.isLoading = false;		 
				this.isHasData = false; //没有数据了
				this.getRecoed()
			},
			loadMore(){
				this.page++;
				this.getRecoed()
			},
			getRecoed(){
				//user_id , page , state[1-积分获取记录2-积分兑换记录]
				if(this.isHasData)return
				if(this.isLoding)return
				this.$api.apiGetRecoed({
					user_id:this.user_id,
					page:this.page,
					state:this.state
				}).then(res => {
					console.log(res)
					this.isLoding = false;
					
					this.integral = res.integral;
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
		font-size: 26rpx;
		color: #333;
		.integral{
			background:url('http://imgsg.qichuanqing.cn/v1/doctor/0871a00a13d19a37f0ef18f8e826075.png') no-repeat;
			background-size: 100% 100%;
			height: 300rpx;
			align-items: center;
			color: #fff;
			.num{
				font-size: 100rpx;
				line-height: 180rpx;
			}
			.duihuan{
				border: 1px solid;
				width: 145rpx;
				height: 40rpx;
				text-align: center;
				line-height: 40rpx;
				border-radius: 40rpx;
			}
		}
		.nav{
			border-bottom: 1px solid #eee;
			height: 80rpx;
			.nav-item-warp{
				flex: 1;
				display: flex;
				justify-content: center;
				.nav-item{
					height: 100%;
					line-height: 80rpx;
					
					padding: 0 10px;
					box-sizing: border-box;
					&.active{
						border-bottom: 3px solid #FF6353;
					}
				}
			}
		}
		.scroll-warp{
			flex: 1;
			box-sizing: border-box;
			overflow: hidden;
			.scroll-Y{
				height: 100%;
				.ordernull{
					margin-top: 30px;
				}	
				.list{
					padding: 0 30rpx;
				}
				.item{
					padding: 20rpx 0rpx;
					border-bottom: 1px solid #eee;
					&.exchange{
						justify-content: space-between;
						align-items: center;
						.right{
							width: 100rpx;
							height: 36rpx;
							text-align: center;
							line-height: 36rpx;
							border-radius: 36rpx;
							color: #FF6353;
							border: 1px solid;
						}
					}
					&.record{
						justify-content: space-between;
						align-items: flex-end;
						.jifen{
							font-size: 30rpx;
							color: #808080;
							text-align: right;
						}
						.time{
							font-size: 22rpx;
							color: #B3B3B3;
						}
					}
					.name{
						font-size: 28rpx;
						color: #1C1C1C;
					}
					.tip{
						font-size: 24rpx;
						color: #808080;
					}
					.detail{
						font-size: 22rpx;
						color: #B3B3B3;
					}
				}
			}
		}
	}
</style>
