<template>
	<view class="warp">
		<u-cell-group>
			<u-field
				:field-style="{width:'530rpx'}"
				v-model="oldPassWord"
				label="旧密码"
				placeholder="请输入旧密码"
			>
			</u-field>
			<u-field
				:field-style="{width:'530rpx'}"
				v-model="newPassWord"
				label="新密码"
				placeholder="请输入新密码"
			>
			</u-field>
			<u-field
				:field-style="{width:'530rpx'}"
				v-model="againNewPassWord"
				label="确认密码"
				placeholder="请再次输入新密码"
			>
			</u-field>
			
		</u-cell-group>
		<view class="btn" @click="confirm">
			确认修改
		</view>
				
	</view>
</template>

<script>
	export default {
		data(){
			return {
				oldPassWord:'',
				newPassWord:'',
				againNewPassWord:''
			}
		},
		methods:{
			confirm(){
				let {oldPassWord, newPassWord, againNewPassWord} = this;
				if(!oldPassWord){
					this.myToast('请输入旧密码')
					return
				}
				if(!newPassWord){
					this.myToast('请输入新密码')
					return
				}
				if(!againNewPassWord){
					this.myToast('请再次输入新密码')
					return
				}
				if(newPassWord != againNewPassWord){
					this.myToast('两次输入的新密码不一致')
					return
				}
				
				
			}
		}
	}
</script>

<style lang="scss">
	.warp{
		height: 100vh;
		background-color: #F9F9F9;
		.btn{
			width:670rpx;
			height:70rpx;
			background:rgba(208,180,142,1);
			border:1px solid rgba(208,180,142,1);
			border-radius:20rpx;
			font-size: 30rpx;
			color: #fff;
			font-weight:bold;
			text-align: center;
			line-height: 70rpx;
			margin: 40px auto;
		}
	}
</style>
