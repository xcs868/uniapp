<template>
	<view class="warp flex-column">
		
		<view class="grace-h6 grace-margin-top05" style="padding-left: 15rpx;margin: 10rpx 0rpx;color: #C1C1C1;font-size: 25rpx;">
			登录信息
		</view>
		<view class="mobile grace-flex grace-space-between" style="margin-top: 0rpx;">
			<text>
				手机号码
			</text>
			<text class="grace-padding " style="font-size:27rpx;color: #C0C0C0;">
				{{ userInfo.mobile }}
				<text class="grace-icons icon-arrow-right"></text>
			</text>
		</view>
		
		<view class="grace-h6 grace-margin-top05" style="padding-left: 15rpx;margin: 10rpx 0rpx;color: #C1C1C1;font-size: 25rpx;">
			社交平台账号绑定
		</view>
		<view class="mobile grace-flex grace-space-between" style="margin-top: 0rpx;">
			<view>
				绑定微信
				<text v-if="userInfo.weixinname">
					({{userInfo.weixinname}})
				</text>
			</view>
			<view class="grace-padding " style="font-size:27rpx;color: #C0C0C0;">
				<switch 
				 @change="weixinBind" :class="isWeixinBind?'checked':''" :checked="isWeixinBind" :disabled="isWeixinBind"
				 color="#00BC79" style="transform: scale(0.9);"/>
			</view>
		</view>
		
		<view class="mobile grace-flex grace-space-between" @tap="setting">
			<text>
				关于膳贡平台
			</text>
			<text class="grace-padding " style="font-size:27rpx;color: #C0C0C0;">
				<text class="grace-icons icon-arrow-right"></text>
			</text>
		</view>
		
		<view class="exit" @click="exit">
			退出登录
		</view>
		
		
		<graceDialog  title="微信绑定提示" :show="getUserInfoStatus" v-on:closeDialog="rejectGetuserinfo">
			<view slot="content">
				<view class="grace-center grace-h6 grace-gray">是否同意获取您的微信信息用来绑定操作？</view>
			</view>
			<view slot="btns">
				<view class="grace-dialog-btns grace-margin-top">
					<view style="border-bottom: 4px solid #E9E9E9;border-top: 1px solid #E9E9E9;">
					<button type="primary" open-type="getUserInfo" plain="true" @getuserinfo="agreeGetUserinfo"
					 style="color: #00BC79;border: none;font-size:31rpx;">我同意</button></view>
					<view><button type="primary" @tap="rejectGetuserinfo" plain="true" 
					style="color: #999999;border: none;font-size:31rpx;">取消</button></view>
				</view>
			</view>
		</graceDialog>
	
		
	</view>
	
</template>

<script>
	// import graceDialog from '@/graceUI/components/graceDialog.vue'
	import graceDialog from '@/components/mybox/graceUI/graceDialogExit.vue'
	export default {
		components:{
			graceDialog
		},
		data() {
			return {
				isWeixinBind:false,
				getUserInfoStatus:false,
				user_id:uni.getStorageSync('USER_ID'),
				userInfo:{}
			};
		},
		onShow() {
			this.getUserInfo()
		},
		methods:{
			agreeGetUserinfo:function(e){
				console.log(e,'e')
				if(e.detail.errMsg == "getUserInfo:ok"){
					let userInfo = e.detail.userInfo;
					//uni登录获取code
					this.getWeixinInfo(userInfo)
				}
			},
			rejectGetuserinfo () {
				this.getUserInfoStatus = false;
				this.isWeixinBind = false
			},
			weixinBind:function(e){
				console.log(e,'e1')
				if(this.isWeixinBind && e.detail.value == false){
					this.myToast('您已绑定过微信！')
					return false
				}else{
					this.isWeixinBind = e.detail.value;
					this.getUserInfoStatus = true;
				}
				
			},
			getWeixinInfo(userInfo){
				var _this = this
				uni.login({
					success: res => {
						console.log(res,'res')
						let code = res.code
						_this.UserWeixinBind(code,userInfo)
					}
				})
			},
			UserWeixinBind(code,userInfo){
				var _this = this
				_this.$api.apiWeixinBind({
					user_id:this.user_id,
					code,
					...userInfo
				}).then(res =>{
					console.log(res,'res')
					let result = res
					_this.myToast(result.msg)
					setTimeout(function(){
						if(result.code == 200){
							_this.getUserInfo()
							_this.getUserInfoStatus = false;
							_this.isWeixinBind = true
						}else{
							_this.rejectGetuserinfo()
						}
					},1800)
					
				})
			},
			getUserInfo(){
				this.$api.apiUserInfo({
					user_id:this.user_id
				}).then(res => {
					if(res.code == 200){
						let userInfo = res.user
						this.userInfo = userInfo
						if(userInfo.weixinopenid != 0){
							this.isWeixinBind = true
						}
					}
				})
			},
			setting(){
				return this.navigateToAction('/pages/setting/user_policy')
			},
			exit(){
				uni.showModal({
				    title: '提示',
				    content: '是否确定退出登录？',
				    success: function (res) {
				        if (res.confirm) {
				            uni.clearStorageSync()
							uni.navigateBack({
								delta:1
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.warp{
		height: 100vh;
		background-color: #f5f5f5;
		
		.exit{
			text-align: center;
			line-height: 40px;
			background-color: #fff;
			margin-top: 20px;
			font-size: 30rpx;
			color: #EE0A25;
			font-weight: bold;
		}
		.mobile{
			line-height: 40px;
			padding-left: 15rpx;
			background-color: #fff;
			margin-top: 20px;
			font-size: 27rpx;
		}
	}
</style>
