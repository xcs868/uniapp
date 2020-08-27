<template>
	<gracePage :customHeader="false">
		<view slot="gBody">
			<view class="warp flex-column">
				<view class="fans flex-row" v-for="(item,index) in list" :key="index">
					<view class="left flex-row">
						<image class="avatar" :src="item.weixinface || avatar" mode=""></image>
						<view class="flex-column">
							<view class="nickName">{{ item.weixinname || item.realname}}</view>
							<!-- <view class="area">上海 | 付费会员</view> -->
							<view class="area">{{ item.vip_grade != 0 ? '付费会员' : '普通会员' }}</view>
						</view>
					</view>
					<view class="right flex-row" @tap="remove(item,index)">
						<view class="iconfont icon-pingbi"></view><view class="">移除粉丝</view>
					</view>
				</view>
			</view>
			
			<graceLoading :loadingType="loadingType" :textColor="textColor" v-if="!empty"></graceLoading>
			<graceEmpty  v-if="empty">
				<view slot="img" class="empty-view">
					<image class="empty-img" style="width:400rpx;" mode="widthFix" 
					src="http://imgsg.qichuanqing.cn/v1/home/goodsCartEmpty.png"></image>
				</view>
				<text slot="text" class="grace-text-small grace-gray">暂无粉丝</text>
			</graceEmpty>
			
		</view>
	</gracePage>
</template>

<script>
	import gracePage from "@/graceUI/components/gracePage.vue";
	import graceLoading from '@/graceUI/components/graceLoading.vue';
	import graceEmpty from "@/graceUI/components/graceEmptyNew.vue";
	export default {
		components:{
			gracePage,
			graceLoading,
			graceEmpty
		},
		onReachBottom : function(){
			//避免多次触发
			if (this.loadingType == 1 || this.loadingType == 2){return ;}
			this.page++;
			this.getFansList();
		},
		data(){
			return{
				empty:false,
				textColor:'#ccc',
				loadingType:3,
				avatar:'http://imgsg.qichuanqing.cn/v1/doctor/avatar-user.png',
				user_id:uni.getStorageSync('USER_ID'),
				list:[],
				hotList:[],
				page:1,
				isLoading:false,		 
				isHasData:false, //没有数据了
			}
		},
		onLoad() {
			this.getFansList()
		},
		methods:{
			getFansList:function(){
				this.loadingType = 1;
				this.$api.apiDoctorFansList({
					page:this.page,
					user_id:this.user_id
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
				})
			},
			remove(item,index){
				console.log(item,'item')
				var _this = this
				_this.confirmAlert('温馨提示', '您确定要移除这位粉丝吗？', true, function(){
					let params = {
						fans_id:item.user_id,
						user_id:_this.user_id
					}
					_this.$api.apiDoctorRemoveFans(params).then(res => {
						if(res.code == 200){
							// _this.page = 1
							_this.list.splice(index, 1); 
						}
						_this.myToast(res.msg)
					})
				});
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
