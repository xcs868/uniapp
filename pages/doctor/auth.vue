<template>
	<gracePage headerBG="#FFFFFF" :customHeader="false">
		<view slot="gBody" class="grace-body">
			
			<view class="" v-if="auth_status == false">
				<view class="grace-title grace-margin-top">医生工作证 ( 工作证正面 )</view>
				<view class="grace-idcard-items grace-img-in grace-rows grace-flex-center">
					<image class="grace-idcard-items-image" :src="idCard1"  @tap="selectImg1" mode="widthFix"></image>
				</view>
				<view class="grace-title grace-margin-top">医生工作证 ( 工作证反面 )</view>
				<view class="grace-idcard-items grace-img-in grace-rows grace-flex-center">
					<image class="grace-idcard-items-image" :src="idCard2"  @tap="selectImg2" mode="widthFix"></image>
				</view>
				<view style="margin-top:50rpx;">
					<button type="primary" class="grace-button grace-border-radius" @tap="uploadCards">上传</button>
				</view>
			</view>
			
			<view class="top flex-column"  v-if="auth_status">
				<view class="iconfont icon-zhifuchenggong success"></view>
				<view class="title">您已成功通过认证</view>
			</view>
			
			<!-- 登录提示弹窗 -->
			<dialog-box :show="loginDialogShow"  :titleHeight="60" @close="close" @confirm="confirm"></dialog-box>	
			
		</view>
	</gracePage>
</template>
<script>
import gracePage from "@/graceUI/components/gracePage.vue";
import graceShade from "@/graceUI/components/graceShade.vue";
import dialogBox from "@/components/mybox/dialog-box/dialog-box.vue";
export default {
    data() {
		return {
			show : true,
			loginDialogShow:false,
			user_id:uni.getStorageSync('USER_ID'),
            idCard1 : 'http://imgsg.qichuanqing.cn/v1/doctor/auth/auth1.png',
            idCard2 : 'http://imgsg.qichuanqing.cn/v1/doctor/auth/auth2.png',
			idcArr:[],
			auth_status:false,
			url:''
        };
    },
	onLoad() {
		this.getUserInfo()
	},
	methods:{
		closeShade : function () {
			this.show = false;
		},
		close() {
			this.loginDialogShow = false;
		},
		confirm(){
			//去登录页面
			this.close()
			return this.navigateToAction('/pages/login/login')
		},
		getUserInfo:function(){
			this.$api.apiUserInfo({
				user_id:uni.getStorageSync('USER_ID')
			}).then(res => {
				if(res.code == 200){
					if(res.user.auth_doctor == 1){
						this.auth_status = true
					}
				}
			})
		},
		chooseImageType(state,idCardType){
			
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					if(res.errMsg == 'chooseImage:ok'){
						if(state == 1){
							this.idCard1 = res.tempFilePaths[0];
							this.upload(this.idCard1,1)
						}else{
							this.idCard2 = res.tempFilePaths[0];
							this.upload(this.idCard2,2)
						}
					}
				}
			})
		},
		selectImg1 : function() {
			this.chooseImageType(1)
		},
		selectImg2 : function() {
			this.chooseImageType(2)
		},
		uploadCards : function(){
			let user_id = this.user_id
			if(!user_id){
				this.loginDialogShow = true
				return false
			}
			
			if(
			this.idCard1 == 'http://imgsg.qichuanqing.cn/v1/doctor/auth/auth1.png' || 
			this.idCard2 == 'http://imgsg.qichuanqing.cn/v1/doctor/auth/auth2.png'
			){
				uni.showToast({title:"请上传工作证照片", icon:"none"});
				return;
			}else{
				// console.log(this.idcArr,'this.idcArr')
				if(this.idcArr.length != 2){
					uni.showToast({title:"请上传工作证照片", icon:"none"});
					return;
				}
				//调api接口上传工作证
				this.$api.apiDoctorAuthImg({
					data:JSON.stringify(this.idcArr),
					user_id
				}).then(res => {
					console.log(res,'res')
				})
			}
		},
		upload:function(url,state){
			uni.uploadFile({
			    url: this.$baseURL+'/v1/home/admin_upload',
			    filePath: url,
			    name: 'image',
			    success:res => {
			        if(res.errMsg == "uploadFile:ok"){
						this.idcArr.push({
							state:state,
							url:JSON.parse(res.data).url
						})
					}
			    }
			})
		}
	},
	components:{gracePage,graceShade,dialogBox}
}
</script>
<style lang="scss" scoped>
page{background:#fff;}
.grace-idcard-main{margin:25rpx;}
.grace-idcard-desc{background-color:#FFFFFF; color:#666666; line-height:56rpx; font-size:26rpx; padding:20rpx; border-radius:10rpx;}
.grace-idcard-text{line-height:1.8em; margin-top:30rpx; color:#666666;}
.grace-idcard-items{background-color:#FFFFFF; padding:50rpx; border-radius:10rpx; margin-top:15rpx;}
.grace-idcard-items-image{width:398rpx;}

.top{
	background-color: #fff;
	align-items: center;
	.success{
		font-size: 100px;
		color: #1afa29;
		margin: 30px;
	}
	.title{
		color: #333333;
		font-size: 36rpx;
	}
	.btn{
		margin: 50rpx;
		font-size: 26rpx;
		color: #D4B790;
		border: 1px solid;
		padding: 10rpx 50rpx;
		border-radius: 20rpx;
	}
}
</style>
