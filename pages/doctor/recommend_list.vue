<template>
	<gracePage headerBG="#FFFFFF" :customHeader="false">
		<view slot="gBody">
			<view class="warp flex-column">
				<view class="fans flex-row" v-for="(item,index) in list" :key="index">
					<view class="left flex-row">
						<image class="avatar" :src="item.weixinface || avatar" mode=""></image>
						<view class="nickName">{{ item.weixinname }}</view>
					</view>
					<view class="area">{{ item.created_time }}</view>
				</view>
			</view>
			
			<graceLoading :loadingType="loadingType" :textColor="textColor" v-if="!empty"></graceLoading>
			<graceEmpty  v-if="empty">
				<view slot="img" class="empty-view">
					<image class="empty-img" style="width:400rpx;" mode="widthFix" 
					src="http://imgsg.qichuanqing.cn/v1/home/goodsCartEmpty.png"></image>
				</view>
				<text slot="text" class="grace-text-small grace-gray">暂无内容</text>
			</graceEmpty>
			
		</view>
	</gracePage>
	
</template>

<script>
	import gracePage from "@/graceUI/components/gracePage.vue";
	import graceLoading from '@/graceUI/components/graceLoading.vue';
	import graceEmpty from "@/graceUI/components/graceEmptyNew.vue";
	export default {
		components:{gracePage,graceLoading,graceEmpty},
		data() {
			return {
				avatar:'http://imgsg.qichuanqing.cn/v1/userPersonal/avatar-doctor.png',
				list:[],
				empty:false,
				textColor:'#ccc',
				loadingType:3,
				page:1,
				user_id:uni.getStorageSync('USER_ID'),
		    };
		},
		onLoad() {
			this.getRecommendList()
		},
		methods:{
			getRecommendList:function(){
				console.log(111)
				this.loadingType = 1;
				this.$api.apiGetMyRecommendList({
					user_id:this.user_id,
					page:this.page
				}).then(result => {
					if(result.code == 200){
						if(this.page == 1 && result.list.length == 0){
							this.empty = true
							return false
						}
						if(result.list.length == 0){
							this.loadingType = 2;
							return ;
						}else if(result.list.length < 10){
							this.loadingType = 2;
						}else{
							this.loadingType = 0;
						}
						let list = result.list
						for(var i = 0;i < list.length;i++){
							this.list.push(list[i])
						}
					}else{
						this.myToast(result.msg)
					}
					console.log(this.list,'this.list')
				})
			}
		}
	}
</script>

<style lang="scss">
	.warp{
		// height: 100vh;
		background-color: #F9F9F9;
		.fans{
			background-color: #fff;
			margin-top: 30rpx;
			padding: 35rpx 60rpx 35rpx 25rpx;
			font-size: 24rpx;
			color: #333;
			justify-content: space-between;
			align-items: center;
			.left{
				align-items: center;
				.avatar{
					width: 96rpx;
					height: 96rpx;
					margin-right: 20rpx;
				}
				.area{
					color: #808080;
					margin-top: 10rpx;
				}
			}
			.right{
				background-color: #E3CC9C;
				width: 160rpx;
				height: 50rpx;
				border-radius: 50rpx;
				align-items: center;
				justify-content: center;
				.icon-pingbi{
					font-size: 36rpx;
				}
			}
			
		}
	}
</style>
