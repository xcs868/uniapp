<template>
	<gracePage :customHeader="false">
		<view slot="gBody">
			
			<view class="grace-padding" style="background-color: white;padding-top: 10rpx;">
				<view class="">
					<view class="grace-news-item grace-border-b margin-bottom" v-for="(item,index) in list" :key="index">
						<image :src="item.goods_img" class="grace-news-img grace-news-img-l"></image>
						<view class="grace-news-body">
							<text class="grace-news-title grace-ellipsi grace-margin-bottom">
								{{ item.goods_name }}
							</text>
							<text class="grace-news-desc grace-ellipsi-two">
								{{ item.goods_brief }}
							</text>
							<view class="grace-flex grace-flex-end grace-flex-center" style="margin-top:60rpx;">
								<text class="grace-news-desc money-width grace-red">￥{{ item.shop_price }}元</text>
								<button type="warn" class="grace-button btn grace-margin-right05" plain="true" @tap="removeGoodsCeltion(item,index)">
									移除收藏
								</button>
								<button type="primary" class="grace-button btn" plain="true" @tap="shopGoods(item.gid)">立即购买</button>
							</view>
						</view>
					</view>

				</view>
			</view>
			<!-- list End -->
			<graceLoading :loadingType="loadingType" :textColor="textColor" v-if="!empty"></graceLoading>
			<graceEmpty  v-if="empty">
				<view slot="img" class="empty-view">
					<image class="empty-img" style="width:400rpx;" mode="widthFix" src="http://imgsg.qichuanqing.cn/v1/home/goodsCartEmpty.png"></image>
				</view>
				<text slot="text" class="grace-text-small grace-gray">暂无收藏</text>
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
		data() {
			return {
				empty:false,
				page:1,
				textColor:'#ccc',
				loadingType:3,
				user_id:0,
				list:[]
			};
		},
		onLoad() {
			let user_id = uni.getStorageSync('USER_ID');
			this.user_id = user_id
			this.getGoodsLsit()
		},
		onReachBottom : function(){
			//避免多次触发
			if (this.loadingType == 1 || this.loadingType == 2){return ;}
			this.page++;
			this.getGoodsLsit();
		},
		methods:{
			removeGoodsCeltion:function(item,index){
				var _this = this
				_this.confirmAlert('温馨提示', '确定要移除该商品吗？', true, function(){
					let params = {
						id:item.id,
						user_id:_this.user_id
					}
					_this.$api.apiRemoveUserColection(params).then(res => {
						if(res.code == 200){
							_this.myToast(res.msg)
							_this.page = 1
							_this.list.splice(index, 1); 
						}
					})
				});
				
			},
			shopGoods:function(goods_id){
				let url = '/pages/goods/goods_detail?goods_id='+goods_id
				return 	this.navigateToAction(url)
			},
			//获取用户信息
			getGoodsLsit:function(){
				this.loadingType = 1;
				this.$api.apiGetUserColection({
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
						}else if(result.list.length < 5){
							this.loadingType = 2;
						}else{
							this.loadingType = 0;
						}
						let list = result.list
						for(var i = 0;i < list.length;i++){
							this.list.push(list[i])
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{background-color: #F9F9F9!important;}
	.grace-ellipsi-two{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2; }
	.btn{width: 30%!important;font-size: 12px!important;line-height:50rpx!important;height: 50rpx!important;}
	.grace-margin-right05{margin-right: 15rpx!important;}
	.margin-bottom{margin-bottom:20rpx}
	.money-width{width: 50%;}
</style>
