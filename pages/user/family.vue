<template>
	<view class="warp">
		<view class="list-warp flex-column">
			<!-- <view class="family-list flex-row">
				<view class="family-item" v-for="(item,index) in familyData" :key="index">
					<image class="family-img" :src="item.weixinface || avatar" mode="" @tap="userAvatarInfo(item)"></image>

					<image class="del"  v-if="item.id > 0 && member_id != item.id" @click="del(item.id)"　src="http://imgsg.qichuanqing.cn/v1/family/del.png" 
					 mode=""></image>
					<view class="nickName" v-if="item.id > 0 && member_id != item.id">{{item.realname}}</view>

				

				</view>
			</view> -->
			<view class="list flex-column">
				<view class="list-item flex-row" v-for="(item,index) in familyData" :key="index" @click="godetail(item.id)">
					<view class="flex-row" style="align-items: center;">
						<image class="family-img"  :src="item.weixinface || avatar"  mode=""></image>
						
						<view class="flex-row" style="align-items: center;margin-left: 10px;">
							
							<view class="body-type">{{item.constionList.name}}</view>
							<view class="bodyType"  style="margin: 0 10px 0 5px;" :style="{backgroundColor:item.constionList.bgcolor}"></view>
						</view>
						<view class="" style="margin-left: 10px;">{{item.realname}}</view>
					</view>
					<view class="del"  @click.stop="del(item.id)" v-if="user_id != item.id">删除</view>
					
				</view>
			</view>
			
		</view>
		<view class="btn-wap flex-column" @click="add">添加家人和朋友</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				color:'',
				userInfo:{}	,
				familyData:[],
				user_id :uni.getStorageSync('USER_ID') || 0, //主账号ID
				avatar:'http://imgsg.qichuanqing.cn/v1/family/father.png',
			}
		},
		onShow(){
			this.getUserInfo()
		},
		
		methods:{
			godetail(id){
				this.navigateToAction('/pages/user/body?user_id='+id)
			},
			add(){
				this.navigateToAction('/pages/user/add_family')
			},
			del(id){
				uni.showModal({
				    title: '确认提示',
				    content: '确定删除该家庭成员吗？',
				    success:(res) => {
				        if (res.confirm) {
							this.$api.apiUserDelFamily({
								user_id:this.user_id,
								member_id:id
							}).then(res => {
								this.myToast(res.msg)
								if(res.code == 200){
									setTimeout(()=>{
										this.getUserInfo()
									},1000)
									
								}
							
									
								
							})
				        }
				    }
				});

			},
			
			getUserInfo:function(){
				this.$api.apiUserInfo({
					user_id:this.user_id
				}).then(res => {
					if(res.code == 200){
						this.userInfo = res.user;
						this.familyData = res.user.familyData;
						console.log(this.familyData)
						
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.mb40{
		margin-bottom: 40rpx;
	}
	.warp{
		background-color: #F9F9F9;
		min-height: 100vh;
		.list-warp{
			background-color: #fff;
			padding: 0 20rpx;
		}
		.list{
			.list-item{
				justify-content: space-between;
				align-items: center;
				color: #333;
				font-size: 26rpx;
				padding: 10px 0;
				border-bottom: 1px solid #eee;
				.family-img{
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
				.del{
					background-color: #fa3534;
					color: #fff;
					padding: 3px 10px;
					border-radius: 6px;
				}
			}	
			
		}
		
		
		
		.btn-wap{
			color: #cfa972;
			font-size: 32rpx;
			background-color: #FFFFFF;
			margin-top: 10px;
			text-align: center;
			line-height: 40px;
		}
		.btn{
			width: 230rpx;
			height: 56rpx;
			background-color: #cfa972;
			text-align: center;
			line-height: 56rpx;
			border-radius: 5px;
			color: #fff;
			font-size: 32rpx;
		}
	}
</style>
