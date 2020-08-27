<template>
	<gracePage class='login-bg' :customHeader="false">
		
		<!-- 页面主体 -->
		<view slot="gBody" >
			<view class="login-top flex-column">
				<image class="logo" src="http://imgsg.qichuanqing.cn/logo/shangong.png" mode=""></image>
			</view>
			<view class="hello">HELLO</view>
			<form @submit="loginNow" class="grace-form" style="margin-top:80rpx;">
				<view class="grace-form-item flex-row">
					<image class="login-icon" src="http://imgsg.qichuanqing.cn/v1/login/iPhone.png" mode=""></image>
					<view class="grace-form-body grace-border-b">
						<input type="number" v-model="phoneno" maxlength="11" class="grace-form-input" name="pn" placeholder="请输入手机号码" />
					</view>
				</view>
				<view class="grace-form-item flex-row">
					<image class="login-icon" src="http://imgsg.qichuanqing.cn/v1/login/vcode.png" mode=""></image>
					<view class="grace-form-body grace-border-b">
						<input type="number" class="grace-form-input" name="yzm" v-model="smscode" placeholder="请输入验证码" />
					</view>
					<view class="login-sendmsg-btn  grace-border-radius" @tap="getVCode">{{vcodeBtnName}}</view>
				</view>
				<view class="grace-margin-top">
					<button form-type="submit" type="primary" class="submit">登 录</button>
				</view>
			</form>
			<!-- 第三方登录 -->
			<view style="position:fixed; bottom:0; width:100%;">
				<!-- #ifdef MP-WEIXIN -->
					<view class="grace-flex-column">
						<button class="btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getuserinfo">
							<image class="ico-wx" src="http://imgsg.qichuanqing.cn/v1/login/wx.png" mode=""></image>
						</button>
						<text style="font-size: 20rpx;margin-top:10rpx;color: #1C1C1C;">一键绑定</text>
					</view>
				<!-- #endif -->
				<view class="xieyiwarp">
					<text class="xieyi" @tap="userSettingPro">《用户协议》</text>和
					<text class="xieyi" @tap="userSetting">《隐私协议》</text>
				</view>
			</view>
		</view>
	</gracePage>
</template>
<script>

import gracePage from "@/graceUI/components/gracePage.vue";
var graceChecker = require("../../graceUI/jsTools/graceChecker.js");
var md5 = require("@/GraceJS/md5.js");

export default {
	data() {
		return {
			vcodeBtnName: "获取验证码",
			countNum : 60,
			countDownTimer : null,
			phoneno : '',
			referee_id:0,
			weixinInfo:{},
			smscode:'',
			system:'sg-shangong'
		}
	},
	onLoad(e){
		this.referee_id = e.referee_id || uni.getStorageSync('REFEREE_ID') || 0;
	},
	onShow() {
		if(uni.getStorageSync('userWeixinInfo')){
			this.weixinInfo = JSON.parse(uni.getStorageSync('userWeixinInfo'))
		}
	},
	methods:{
		userSettingPro(){
			return this.navigateToAction('/pages/setting/user_policy')
		},
		userSetting(){
			return this.navigateToAction('/pages/setting/privacy_policy')
		},
		getuserinfo(e){
			if(e.detail.errMsg == "getUserInfo:ok"){
				let userInfo = e.detail.userInfo;
				//uni登录获取code
				this.uniLogin(userInfo)
			}
		},
		uniLogin(userInfo){
			uni.login({
				success: res => {
					let {errMsg, code} = res;
					let obj = Object.assign(userInfo,{'code':code})
					// console.log(obj,111)
					this._login(obj)
				}
			})
		},
		_login(obj){
			//obj 用户信息和code
			this.$api.apiLogin(obj).then(res => {
				// console.log(res)
				if(res.code == 200){
					let userWeixinInfo = {
						weixinface:res.weixinface,
						weixinnickname:res.weixinnickname,
						weixinopenid:res.weixinopenid,
						weixinunionid:res.weixinunionid
					}
					uni.setStorageSync('userWeixinInfo', JSON.stringify(userWeixinInfo));
					if(res.bind_mobile == false){
						let url = '/pages/login/add_mobile?referee_id='+ this.referee_id
						return this.navigateToAction(url)
					}else{
						uni.removeStorageSync('REFEREE_ID') //清除邀请人id
						uni.setStorageSync('USER_ID',res.user_id);
						uni.setStorageSync('token',res.token)
						this.myToast('登录成功')
						
						if(res.constion_id == 0){
							var _this = this
							setTimeout(function(){
								_this.navigateToAction('/pages/login/user_contion?user_id='+res.user_id)
							},2000)
						}else{
							setTimeout(function(){
								uni.switchTab({
								    url: '/pages/index/index'
								});
							},2000)
						}
						return true
					}
				}else{
					this.myToast('微信登录失败，请您用手机号登录!')
				}
				
			})
		},
		loginNow : function(e){
			// 表单验证
			var rule = [
				{ name: "pn", checkType: "phoneno", errorMsg: "请填写正确的手机号" },
				{ name: "yzm", checkType: "string", checkRule: "4,6", errorMsg: "请正确填写短信验证码" },
			];
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			
			if(uni.getStorageSync('userWeixinInfo')){
				// let weixinInfo = JSON.parse(uni.getStorageSync('userWeixinInfo')) || {}
				this.weixinInfo = JSON.parse(uni.getStorageSync('userWeixinInfo')) || {}
			}
			// 验证通过
			if (checkRes) {
				this.$api.apiRegister({
				mobile:this.phoneno, //手机号
				smscode: this.smscode,//验证码  
				// ...weixinInfo,
				...this.weixinInfo,
				}).then(res => {
					// console.log(res,'res')
					if(res.code == 200){
						uni.setStorageSync('USER_ID',res.user_id);
						uni.setStorageSync('token',res.token)
						this.myToast('登录成功')
						if(res.constion_id == 0){
							var _this = this
							setTimeout(function(){
								_this.navigateToAction('/pages/login/user_contion?user_id='+res.user_id)
							},2000)
						}else{
							setTimeout(function(){
								uni.switchTab({
								    url: '/pages/index/index'
								});
							},2000)
						}
						return true
					}else{
						this.myToast(res.msg)
					}
				})
			} else {
				uni.showToast({ title: graceChecker.error, icon: "none" });
			}
		},
		getVCode : function(){
			var myreg=/^[1][0-9]{10}$/;
			if (!myreg.test(this.phoneno)){
				uni.showToast({ title: '请正确填写手机号码', icon : "none"});
				return false;
			}
			// 手机号码为 :  this.phoneno
			// vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
			if (this.vcodeBtnName != '获取验证码' && this.vcodeBtnName != '重新发送'){return ;}
			this.vcodeBtnName =  "发送中...";
			
			let signName = this.phoneno + this.system;
			let sign = md5(signName)
			
			this.$api.apiCode({
				mobile:this.phoneno,
				sign
			}).then(res => {
				if(res.code == 200){
					// this.smscode = res.token
					// 倒计时
					this.countNum = 60;
					this.countDownTimer = setInterval(function(){
						this.countDown();
						}.bind(this), 1000);
				}
				uni.showToast({ title: res.msg, icon : "none"});
				return true
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
		},

	},
	components:{
		gracePage
	}
}
</script>
<style lang="scss" scoped>
.marginTop{margin-top:100rpx;}

.login-sendmsg-btn{height:40rpx; width:160rpx; flex-shrink:0; margin-left:30rpx; text-align:center;  line-height:40rpx; font-size:24rpx;color: #D0B48E;border: 1px solid #D0B48E;}
.grace-pnper{width:168rpx; flex-shrink:0;color: #888888;}
.grace-form-label{width:168rpx;}
.grace-form-input{text-align:left;}
.grace-form-item{padding:0rpx 60rpx;margin-bottom: 30rpx;}
.grace-login-three-items{display:block; width:88rpx; height:88rpx; line-height:88rpx; font-size:60rpx; color:#3688FF; text-align:center; margin:10rpx;}

.grace-form-body{
	flex: 1;
	margin-left: 20rpx;
}
.login-top{
	width: 100%;
	height: 390rpx;
	background: url("http://imgsg.qichuanqing.cn/v1/login/login-bg-top.png") no-repeat;
	background-size: 100% 100%;
	align-items: center;
	
	.logo{
		width:156rpx;
		height:156rpx;
		margin-top: 200rpx;
		border-radius: 50%;
	 }
}
.hello{
	color: #00736D;
	font-size: 30rpx;
	text-align: center;
	margin-top: 25rpx;
}
.submit{
	width:590rpx;
	height:60rpx;
	background-color:#D0B48E;
	border-radius:60rpx;
	line-height: 60rpx;
	text-align: center;
	color: #fff;
	font-size: 30rpx;
	margin: 0 auto;
}
.login-icon{
	width: 64rpx;
	height: 64rpx;
}
.ico-wx{
	width: 70rpx;
	height: 70rpx;
}
.grace-flex-column{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.btn{
	padding: 0;
	margin: 0;
	font-size: 0;
	line-height: 0;
	width: 70rpx;
	height: 70rpx;
	border-radius: 50%;
	background-color: none;
}
.xieyiwarp{
	display: flex;
	font-size: 20rpx;
	justify-content: center;
	height: 100rpx;
	background: url('http://imgsg.qichuanqing.cn/v1/login/login-bg-bottom.png') no-repeat;
	background-size: 100% 100%;
	line-height: 100rpx;
}
.xieyi{
	
	color: #4C8AFB;
}

</style>

