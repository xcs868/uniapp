<template>
	<view class="warp">
		<view class="my-body flex-column" v-if="userInfo.id">
			<image class="avatar" :src="userInfo.weixinface || avatar " mode=""></image>
			<view class="name flex-row" style="align-items: center;">
				<view class="" style="font-weight: 600;">
					{{userInfo.realname}}
				</view><view class="">
					倾向体质
				</view></view>
			<view class="constitution flex-row" style="align-items: center;">
				<view class="bodyType" :style="{backgroundColor:userInfo.user_contion_list.bgcolor}"></view>
				<text  style="margin-left: 5px;">
					{{userInfo.user_contion_list.name}}
				</text>
			</view>
			
			<view class="text" v-if="userInfo.user_contion_list != 0 ">
				<view class="grace-margin-top05">体质描述：{{ userInfo.user_contion_list.desc }} </view>
				<view class="grace-margin-top05">主要特征：{{ userInfo.user_contion_list.features }} </view>
				<view class="grace-margin-top05">饮食需求：{{ userInfo.user_contion_list.dietary_needs }} </view>
				<view class="grace-margin-top05">推荐食物：{{ userInfo.user_contion_list.recommended_food }} </view>
			</view>
			
			<view class="text">
				<view class="">1.上方展示了你的体质详情 </view>
				<view class="">2.本测试来自《中医体质分类与判定》，这是中华中医药学会于2009年4月9日颁布的国家标准。</view>
				<view class="">3.体质并不是永不更改的，不必过于担心，调整生活方式是有改变的可能的。</view>
			</view>
			<view class="mb40">
				<!-- <navigator url="/pages/login/user_contion?from=body"> -->
					<view class="btn" @tap="userTestContion(user_id)">重新测评</view>
				<!-- </navigator> -->
			</view>
		</view>
		
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				color:'',
				userInfo:{}	,
				familyData:[],
				user_id : 0,
				member_id:uni.getStorageSync('USER_ID'),
				avatar:'http://imgsg.qichuanqing.cn/v1/family/father.png',
			}
		},
		onShow(){
			
		},
		onLoad(e) {
			let user_id = e.user_id ? e.user_id :uni.getStorageSync('USER_ID')
			this.user_id = user_id
			this.getUserInfo(user_id)
		},
		// onBackPress() {
		// 	// console.log('离开了')
		// 	uni.switchTab({
		// 		url:'/pages/personal/personal'
		// 	})
		// 	return true
		// },
		methods:{
			
			userTestContion(user_id){
				// console.log(user_id,'user_id')
				let url = '/pages/login/user_contion?from=body&user_id='+user_id
				return this.navigateToAction(url)
			},
			
			getUserInfo(user_id){
				this.$api.apiUserInfo({
					user_id
				}).then(res => {
					if(res.code == 200){
						this.userInfo = res.user
						if(res.user.user_contion_list !=0 ){
							this.color = res.user.user_contion_list.bgcolor
						}
						console.log(this.userInfo)
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
		.my-body{
			align-items: center;
			background-color: #fff;
			.avatar{
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
			}
			.name{
				font-size: 28rpx;
				color: #595959;
				margin: 30rpx 0;
			}
			.constitution{
				color: #cfa972;
				font-size: 36rpx;
			}
			.text{
				margin-top: 30rpx;
				font-size: 20rpx;
				color: #808080;
				padding: 50rpx 70rpx;
				border-top: 1px solid #EEEEEE;
				view{
					line-height: 36rpx;
				}
			}
		}
		
		.other{
			background-color: #fff;
			padding: 0 40rpx;
			margin-top: 25rpx;
			padding-bottom: 40rpx;
			.family{
				font-size: 28rpx;
				color: #595959;
				margin: 25rpx 0;
			}
			.family-list{
				flex-wrap: wrap;
				.family-item{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					margin-right: 60rpx;
					margin-bottom: 20rpx;
					position: relative;
					&:nth-child(4n){
						margin-right: 0;
					}
					.family-img{
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
					}
					.del{
						position: absolute;
						right: 0;
						top: 0;
						width: 25rpx;
						height: 25rpx;
					}
					.nickName{
						text-align: center;
						font-size: 28rpx;
					}
				}
			}
			.btn-wap{
				align-items: center;
				margin: 40rpx 0;
			}
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
