<template>
	<gracePage :customHeader="false">
		<view slot="gBody">
			<view class="grace-flex contian-warp">
				<view class="top">
					<view class="grace-wrap avatarWarp grace-flex-vcenter">
						<view class="grace-flex grace-flex-center user-avatar" @click="onAvatar(userInfo.id)">
							<image class="avatar" :src="userInfo.weixinface || defaultAvatar" mode=""></image>
						</view>
						<view class="grace-flex grace-flex-center grace-flex-vcenter user-name" style="width: 100%;">
							{{ userInfo.weixinname || userInfo.realname }}
						</view>
					</view>
				</view>
			</view>
			
			<view class="grace-margin-top" style="background-color: #FFFFFF;margin-bottom: 40rpx;">
				<view class="grace-list">
					
					<view class="grace-list-items">
						<view class="grace-list-body grace-border-b">
							<view class="grace-list-title">
								<text class="grace-list-title-text">用户ID</text>
								<text class="grace-list-title-desc" style="padding-right:30rpx;">{{ user_id }}</text>
							</view>
						</view>
						<!-- <text class="grace-list-arrow-right grace-icons icon-arrow-right"></text> -->
					</view>
					
					<view class="grace-list-items">
						<view class="grace-list-body grace-border-b">
							<view class="grace-list-title">
								<text class="grace-list-title-text">手机号码</text>
								<text class="grace-list-title-desc" style="padding-right:30rpx;">{{ userInfo.mobile }}</text>
							</view>
						</view>
					</view>
					
					<view class="grace-list-items">
						<view class="grace-list-body grace-border-b">
							<view class="grace-list-title">
								<text class="grace-list-title-text">邀请人数</text>
								<text class="grace-list-title-desc" style="padding-right:30rpx;">{{ userInfo.invitednum }}人</text>
							</view>
						</view>
					</view>
					
					<view class="grace-list-items">
						<view class="grace-list-body grace-border-b">
							<view class="grace-list-title">
								<text class="grace-list-title-text">vip到期时间</text>
								<text class="grace-list-title-desc" style="padding-right:30rpx;">剩余{{ userInfo.vip_day }}天</text>
							</view>
						</view>
					</view>
					
					<view class="grace-list-items">
						<view class="grace-list-body grace-border-b">
							<view class="grace-list-title">
								<text class="grace-list-title-text">个性签名</text>
								<input class="grace-list-title-desc" 
								style="padding-right:30rpx;text-align: right;" type="text"  v-model="userInfo.member_sign" value="" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- list End -->
			<view  class="grace-margin-top sure" @click="submit">
				保存
			</view>
			
			<!-- 登录提示弹窗 -->
			<dialog-box :show="loginDialogShow"  :titleHeight="60" @close="loginDialogShow = false" @confirm="confirm"></dialog-box>
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "@/graceUI/components/gracePage.vue";
	import dialogBox from "@/components/mybox/dialog-box/dialog-box.vue";
	export default {
		components:{
			gracePage,
			dialogBox
		},
		data() {
			return {
				defaultAvatar:'http://imgsg.qichuanqing.cn/v1/doctor/avatar-user.png',
				isLogin:false,
				user_id:0,
				loginDialogShow:false,
				userInfo:{}
			};
		},
		onLoad() {
			let user_id = uni.getStorageSync('USER_ID');
			
			if(user_id){
				this.isLogin = true;
				this.user_id = user_id;
				this.getUserInfo(this.user_id)
			}else{
				this.isLogin = false;  
			}
			
		},
		methods:{
			confirm(){
				//去登录页面
				this.loginDialogShow = false;
				return this.navigateToAction('/pages/login/login')
			},
			onAvatar:function(user_id){
				console.log(user_id,'点击头像')
			},
			submit:function(){
				if(this.isLogin == false){
					this.loginDialogShow = true
					return
				}
				let postData = {
					user_id:this.user_id,
					sign:this.userInfo.member_sign
				}
				this.$api.apiUserEdit(postData).then(res => {
				    this.myToast(res.msg)
					setTimeout(function(){
						uni.switchTab({
						    url: '/pages/personal/personal'
						});
					},2000);
				})
				console.log('提交')
			},
			//获取用户信息
			getUserInfo:function(user_id){
				this.$api.apiUserInfo({
					user_id
				}).then(res => {
					if(res.code == 200){
						this.userInfo = res.user
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{background-color: #F9F9F9!important;}
	.contian-warp{background-color: #F9F9F9;}
	.top{
		width: 100%;
		height: 340rpx;
		background: url('http://imgsg.qichuanqing.cn/v1/userPersonal/userBanner.jpg') no-repeat;
		background-size: 100% 100%;
		position: relative;
		.avatarWarp{
			height: 100%;
			.avatar{
				width: 150rpx;
				height: 150rpx;	
				border-radius: 50%;
			}
		}	
	}
	.user-avatar{width: 100%;position:relative;top:45rpx;}
	.user-name{color: #000000;font-size:32rpx;}
	.sure{
		margin-top: 30rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 30rpx;
		width: 95%;
		margin: auto;
		color: #fff;
		border-radius: 22rpx;
		background-color: #CCCCCC!important;
	}
</style>
