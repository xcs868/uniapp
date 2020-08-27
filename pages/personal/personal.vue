<template>
	<view class="warp">
		<!--  -->
		<v-doctor v-if="is_doctor == 1"
			:isLogin="isLogin"
			:userInfo="userInfo"
			@showLoginDialog="loginDialogShow = true"></v-doctor>
		<v-user v-else-if="is_doctor == 0" 
				:isLogin="isLogin" 
				:userInfo="userInfo"
				@showLoginDialog="loginDialogShow = true"></v-user>

		<!-- 登录提示弹窗 -->
		<dialog-box :show="loginDialogShow"  :titleHeight="60" @close="loginDialogShow = false" @confirm="confirm"></dialog-box>
	</view>
	
</template>
<script>
	import vUser from '@/components/vUser'
	import vDoctor from '@/components/vDoctor'
	import dialogBox from "@/components/mybox/dialog-box/dialog-box.vue";
	export default {
		data(){
			return{
				is_doctor:'' ,// [0-会员1-医生]
				userInfo:{},
				user_id:'',
				isLogin:false,
				loginDialogShow:false
				
				
			}
		},
		onLoad(){
			
		},
		onShow(){
			let user_id = uni.getStorageSync('USER_ID');
			this.userInfo = {};
			if(user_id){
				this.isLogin = true;
				this.user_id = user_id;
				this.getUserInfo()
				
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
			},
			// getDoctorInfo(){
				
			// 	this.$api.apiDoctorInfo({
			// 		user_id:this.user_id
			// 	}).then(res => {
			// 		if(res.code == 200){
			// 			this.userInfo = res.user
			// 		}
			// 	})
			// }
		},
		components:{
			vUser,
			vDoctor,
			dialogBox
		}
	}
</script>
	
<style>
	.warp{
		height: 100vh;
		background-color: #F9F9F9;
	}
</style>