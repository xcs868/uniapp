<template>
	<view class="warp flex-column">
		<view class="item flex-row">
			<view class="key">头像</view>
			<image class="avatar" :src="userInfo.weixinface || defaultAvatar" mode=""></image>
		</view>
		<view class="item flex-row">
			<view class="key">性别</view>
			<view class="val">{{userInfo.sex == 1 ? '男' : '女'}}</view>
		</view>
		<view class="item flex-row">
			<view class="key">昵称</view>
			<view class="val">{{ userInfo.realname }}</view>
		</view>
		<view class="item flex-row">
			<view class="key">登录号</view>
			<view class="val">ID:{{ userInfo.id }}</view>
		</view>
		<view class="item flex-row">
			<view class="key">工作单位</view>
			<view class="val">{{ userInfo.doctor_work_unit }}</view>
		</view>
		<view class="item flex-row">
			<view class="key">科室</view>
			<view class="val">{{ userInfo.specialty }}</view>
		</view>
		<view class="item flex-row">
			<view class="key">介绍</view>
			<view class="val">{{ userInfo.member_sign }}</view>
		</view>
		<view class="code flex-column">
			<image class="qrcode" :src="userInfo.qr_code" @click="previewImage(userInfo.qr_code)"></image>
			<view class="tip">我的二维码</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				userInfo:{},
				user_id:uni.getStorageSync('USER_ID'),
				defaultAvatar:'http://imgsg.qichuanqing.cn/v1/userPersonal/avatar-doctor.png',
			}
		},
		onLoad(){
			this.getUserInfo()
		},
		methods:{
			previewImage(current){
				uni.previewImage({
					indicator:'number',
					loop: true,
					current, // 当前显示图片的http链接
					urls: [current] ,// 需要预览的图片http链接列表
					
				})
			},
			getUserInfo:function(){
				this.$api.apiUserInfo({
					user_id:this.user_id
				}).then(res => {
					if(res.code == 200){
						if(res.user.is_doctor != 0){
							this.is_doctor = 1 //医生
						}else{
							this.is_doctor = 0
						}
						this.userInfo = res.user
					}
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
		background-color: #F9F9F9;
		
		.item{
			background-color: #fff;
			padding: 30rpx 40rpx;
			justify-content: space-between;
			align-items: center;
			font-size: 26rpx;
			color: #333;
			border-bottom: 1px solid #eee;
			&:first-child{
				padding: 10rpx 40rpx;
			}
			.key{
				width: 120rpx;
			}
			.val{
				flex: 1;
				text-align: right;
				color: #808080;
			}
			.avatar{
				width: 70rpx;
				height: 70rpx;
			}
		}
		
		.code{
			align-items: center;
			.qrcode{
				width: 220rpx;
				height: 220rpx;
				margin-top: 100rpx;
				margin-bottom: 10rpx;
				
			}
			.tip{
				font-size: 26rpx;
				color: #B3B3B3;
			}
		}
		
	
	}
</style>
