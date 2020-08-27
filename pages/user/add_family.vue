<template>
	<view class='containner'>
	    
	        <view class='flex-row itemwarp'>
	            <view class='left'>头像</view>
				<view class="right" @click="onImg">
					<image class="avatar"  :src='avatar'></image>
				</view>
	            
	        </view>
			<view class='flex-row itemwarp'>
			    <view class='left'>昵称</view>
			    <input type="text" v-model="nickName" class="name" placeholder="请输入昵称" />
			</view>
			<view class='flex-column body'>
			    <view class='left' style="margin-bottom: 40rpx;">体质</view>
			    <view class="bodylist flex-row">
			    	<view class="body-item" :style="{backgroundColor:item.bgcolor}"  :class="{on:currentIndex === index}" 
						@click="selectBody(item, index)"
						v-for="(item,index) in bodylist" :key="item.id">{{item.name}}</view>
					
			    </view>
			</view>
			
			<view class="btn" @click="submit">确定</view>
	        
	</view>
</template>

<script>
	export default {
		data(){
			return{
				user_id:uni.getStorageSync('USER_ID'),
				nickName:'',
				avatar:'http://imgsg.qichuanqing.cn/v1/doctor/avatar-user.png',
				bodylist:[],
				currentIndex:'',
				currentBodyId:'',
				avatarUrl:'http://imgsg.qichuanqing.cn/v1/doctor/avatar-user.png'
			}
		},
		onLoad(){
			this.getUserConsition()
			console.log()
		},
		methods:{
			submit(){
				var _this = this
				if(!_this.nickName){
					_this.myToast('请输入昵称')
					return
				}
				if(!_this.currentBodyId){
					_this.myToast('请选择体质')
					return
				}
				
				_this.$api.apiAddFamily({
					user_id :_this.user_id,
					name:_this.nickName,
					url:_this.avatarUrl,
					cid:_this.currentBodyId
				}).then(res => {
					_this.myToast(res.msg)
					if(res.code){
						setTimeout(function(){
							uni.navigateBack({
								delta:1
							})
						},1800)
					}
				})
			},
			selectBody(item, index){
				this.currentIndex = index;
				this.currentBodyId = item.id;
			},
			//获取体质数据
			getUserConsition:function(){
				this.$api.apiUserConsition({}).then(res => {
					if(res.code == 200){
						console.log(res)
						this.bodylist = res.list;
					}
				})
			},
			//头像
			onImg(){
				wx.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						// tempFilePath可以作为img标签的src属性显示图片
						if(res.errMsg == 'chooseImage:ok'){
							const tempFilePaths = res.tempFilePaths[0];
							this.avatar= tempFilePaths;
							this.upload()
						}
					}
				})
			},
			upload(){
				uni.uploadFile({
				    url: this.$baseURL+'/v1/home/upload',
				    filePath: this.avatar,
				    name: 'image',
				    success:res => {
				        if(res.errMsg == "uploadFile:ok"){
							this.avatarUrl = JSON.parse(res.data).url;
						}
				    }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>


.containner{
    width: 100%;
    height: 100vh;
    color: #333;
    font-size: 30rpx;
	// background-color: #F9F9F9;
	.body{
		background-color: #fff;
		padding: 10rpx 50rpx;
		.bodylist{
			flex-wrap: wrap;
		}
		.body-item{
			text-align: center;
			width: 200rpx;
			height: 66rpx;
			font-size: 22rpx;
			line-height: 66rpx;
			border-radius: 3px;
			margin-right: 24rpx;
			margin-bottom: 10rpx;
			background-color: #EAF0EC;
			color: #507352;
			&:nth-child(3n){
				margin-right: 0;
			}
			&.on{
				color: #fff;
				box-shadow:3px 4px 8px 0px rgba(0,0,0,0.5);
			}
		}
	}
	.itemwarp{
		background-color: #fff;
		border-bottom: 1px solid #eee;
		padding: 10rpx 50rpx;
		align-items: center;
		.left{
			width: 120rpx;
		}
		.name{
			flex: 1;
			height: 100rpx;
		}
		.right{
			flex: 1;
			font-size: 0;
		}
	}
	.avatar{
	    width: 100rpx;
	    height: 100rpx;
	    border-radius: 50%;
	}
	.btn{
		width: 600rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 80rpx;
		margin: 100px auto;
		color: #83B497;
		border: 1px solid;
	}
	
	
}




</style>