<template>
	<view>
		<view class='header'>
			<image class="logo" src="http://imgsg.qichuanqing.cn/logo/shangong.png"></image>
		</view>
		
		<view class='content'>
			<view>申请获取以下权限</view>
			<text>获得你的公开信息(昵称，头像等)</text>
		</view>
	
		<button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="getuserinfo">
			一键登录
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			wx.getSetting({
				success: res => {
					if (res.authSetting['scope.userInfo']) {
						uni.getUserInfo({
							success: e => {
								console.log(e)
								let userInfo = e.userInfo;
								this.uniLogin(userInfo)
							}
						})
					} 
				}
			})
		},
		methods: {
			getuserinfo(e){
				if(e.detail.errMsg == "getUserInfo:ok"){
					let userInfo = e.detail.userInfo;
					console.log(userInfo)
					
					//uni登录获取code
					this.uniLogin(userInfo)
				}
			},
			uniLogin(userInfo){
				uni.login({
					success: res => {
						let {errMsg, code} = res;
						let obj = Object.assign(userInfo,{'code':code})
						console.log(obj,111)
						this._login(obj)
					}
				})
			},
			_login(obj){
				//obj 用户信息和code
				this.$api.apiLogin(obj).then(res => {
					if(res.code == 200){
						let userInfo = {
							
						}
						uni.setStorageSync('userInfo', JSON.stringify(res));
						// {"code":200,
						// "msg":"未绑定手机号码",
						// "bind_mobile":false,
						// "weixinunionid":"og08G1ow1eTGVXzLDG_C3rRQ7SJs",
						// "weixinopenid":"oIZHk5Db1q6uFZqX4p0nuexYvjWI",
						// "weixinnickname":"流星",
						// "weixinface":"https://wx.qlogo.cn/mmopen/vi_32/w4WA3LMMDUzwqxNRhyX11fPMd4Xd4HD1kStriarRibmgae9bqeLkpUYgibricpe3iaDBOyzQYm2dZt6F1KfXu9HWeng/132"}
						// 
						if(res.bind_mobile){
							uni.switchTab({
								url:'/pages/index/index'
							})
							return
						}else{
							this.navigateToAction('/pages/login/login')
							return
						}
						
					}
					
				})
			}	
		}
	}
</script>

<style scoped>
	.header {
	    margin: 90rpx 0 90rpx 50rpx;
	    text-align: center;
	    width: 650rpx;
	    height: 300rpx;
	    line-height: 450rpx;
	}
	
	.logo {
	    width: 200rpx;
	    height: 200rpx;
	}
	
	.content {
	    margin-left: 50rpx;
	    margin-bottom: 90rpx;
	}
	
	.content text {
	    display: block;
	    color: #9d9d9d;
	    margin-top: 40rpx;
	}
	
	.bottom {
	    border-radius: 80rpx;
	    margin: 70rpx 200rpx;
	    font-size: 30rpx;
	}
</style>
