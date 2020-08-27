<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody" class="grace-body">
			<!-- <view class="grace-flex grace-flex-center marginTop">
				<image src="http://imgsg.qichuanqing.cn/logo/shangong.png" mode="widthFix" class="logo"></image>
			</view> -->
			<view  class="grace-form" style="margin-top:80rpx;">
				<view class="grace-form-item grace-border-b">

					<view class="grace-form-body">
						<input type="number" maxlength="11" v-model="phoneno" class="grace-form-input" name="pn" placeholder="请输入手机号码" />
					</view>
				</view>
				<view class="grace-form-item  grace-border-b">
					<view class="grace-form-body">
						<input type="number" maxlength="4" v-model="smscode" class="grace-form-input" name="yzm" placeholder="请输入验证码" />
					</view>
					<view class="login-sendmsg-btn grace-bg-blue grace-border-radius" style="background-color: #D0B48E!important;" @tap="getVCode">{{vcodeBtnName}}</view>
				</view>
				<view class="grace-margin-top">
					<button @click="loginNow" style="background-color: #D0B48E;" type="primary" class="submit">登 录</button>
				</view>
			</view>

		</view>
	</gracePage>
</template>
<script>
import gracePage from "@/graceUI/components/gracePage.vue";
var md5 = require("@/GraceJS/md5.js");
export default {
	data() {
		return {
			vcodeBtnName: "获取验证码",
			countNum : 120,
			countDownTimer : null,
			phoneno : '',
			referee_id:0,
			smscode:'',
			weixinInfo:'',
			system:'sg-shangong'
		}
	},
	onLoad(e){
		//邀请人id
		this.referee_id = e.referee_id || uni.getStorageSync('REFEREE_ID') || 0;
		
		if(uni.getStorageSync('userWeixinInfo')){
			this.weixinInfo = JSON.parse(uni.getStorageSync('userWeixinInfo'))
		}
	},
	methods:{
		loginNow(){
			if(!(/^1[3456789]\d{9}$/.test(this.phoneno))){
				this.myToast('请输入合法的手机号')
				return
			}
			if(!this.smscode){
				this.myToast('请输入验证码')
				return
			}
			// 验证通过
			console.log('手机：' + this.phoneno+',验证码：' + this.smscode)
			this.$api.apiRegister({
				...this.weixinInfo,
				mobile:this.phoneno,
				referee_id:this.referee_id,
				smscode:this.smscode
			}).then(res => {
				// console.log(res,'返回注册信息')
				if(res.code == 200){
					uni.removeStorageSync('REFEREE_ID') //清除邀请人id
					uni.setStorageSync('USER_ID',res.user_id);
					uni.setStorageSync('token',res.token)
					this.myToast('登录成功')
					if(res.constion_id == 0){
						var _this = this
						setTimeout(function(){
							_this.navigateToAction('/pages/login/user_contion?user_id='+res.user_id)
						},1000)
					}else{
						setTimeout(function(){
							uni.switchTab({
								url: '/pages/index/index'
							});
						},1000)
					}
					return true
				}else{
					this.myToast(res.msg)
				}
			})
			
		},
		getVCode : function(){
			var myreg=/^[1][0-9]{10}$/;
			if (!myreg.test(this.phoneno)){
				uni.showToast({ title: '请正确填写手机号码', icon : "none"});
				return false;
			}
			// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
			if (this.vcodeBtnName != '获取验证码' && this.vcodeBtnName != '重新发送'){return ;}
			
			
			let signName = this.phoneno + this.system;
			let sign = md5(signName)
			
			this.$api.apiCode({
				mobile:this.phoneno,
				sign
			}).then(res => {
				if(res.code == 200){
					this.vcodeBtnName =  "发送中...";
					// 发送成功，给用户提示
					uni.showToast({ title: res.msg, icon : "none"});
					this.smscode = res.token //验证码
					// 倒计时
					this.countNum = 60;
					this.countDownTimer = setInterval(function(){
						this.countDown();
					}.bind(this), 1000);
				}else{
					this.myToast(res.msg)
				}
			})
		},
		countDown : function(){
			if (this.countNum < 1){
			  clearInterval(this.countDownTimer);
			  this.vcodeBtnName = "重新发送";
			  return ;
			}
			this.countNum--;
			this.vcodeBtnName =  this.countNum + '秒重发';
		}
	},
	components:{
		gracePage
	}
}
</script>
<style>
.login-icon{
	width: 64rpx;
	height: 64rpx;
}
.marginTop{margin-top:100rpx;}
.logo{width:200rpx; height:68rpx}
.login-sendmsg-btn{height:60rpx; width:200rpx; flex-shrink:0; margin-left:30rpx; text-align:center; background-color:#3688FF; line-height:60rpx; font-size:26rpx;}
.grace-pnper{width:168rpx; flex-shrink:0;}
.grace-form-label{width:168rpx;}
.grace-form-input{text-align:left;}
.grace-form-item{padding:10rpx 0;}
.grace-login-three-items{display:block; width:88rpx; height:88rpx; line-height:88rpx; font-size:60rpx; color:#3688FF; text-align:center; margin:10rpx;}
</style>