<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody" class="grace-box-shadow ">

			<view class="grace-news-list grace-padding" 
			v-for="(item ,index ) in newList"
			:key="index"
			style="background-color: #FFFFFF;"
			 @tap="clickNews">
				<view class="grace-margin-top">
					<view class="grace-flex">
						<image class="grace-border-radius grace-grids-icon-img"
						 src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" mode="widthFix">
						 </image>			
						<text 
						class="grace-flex-center grace-flex-vcenter grace-news-title" 
						style="padding-left:30rpx;display: flex;">{{ item.title }}</text>
					</view>
					
					<view class="big-img">
						<image src="http://imgsg.qichuanqing.cn/v1/special/1239.jpeg" class="big-image"></image>
					</view>
					
					<view class="grace-flex">
						<view class="grace-space-between" style="width: 100%;">
							<text class="grace-black grace-h4">{{ item.desc }}</text>
							<text class="grace-red grace-h6">{{ item.price }}</text>
						</view>
					</view>
					
					<view class="grace-flex grace-margin-top05">
						<view class="grace-space-between" style="width: 100%;">
							<text class="grace-gray grace-h6">{{ item.key_word }}</text>
						</view>
					</view>
					
					<view class="grace-news-info">
						<view style="width:500rpx;" class="grace-nowrap">
							<text class="grace-icons grace-news-info-text">&#xe609; {{ item.view_count }}</text>
							<text class="grace-icons grace-news-info-text" style="margin-left:30rpx;">&#xe69e; {{ item.sc }}</text>
						</view>
						<text class="grace-icons grace-news-info-text">&#xe6b8; {{ item.pl }}</text>
					</view>
				</view>
				
			</view>
			
			<graceLoading :loadingType="loadingType"></graceLoading>
		</view>
	</gracePage>
</template>
<script>
	import gracePage from "@/graceUI/components/gracePage.vue";
	import graceLoading from '@/graceUI/components/graceLoading.vue';
	
	export default {
		components:{
			gracePage,
			graceLoading,
		},
		data() {
			return {
				scrollTop : 0,
				scrollHeight : 600,
				page:1,
				loadingType : 3,
				newList:[
					{
						id:1,
						title:'餐厨主题',
						desc:'5个给春天的生活新提案',
						key_word:'餐厨起居洗护好物',
						price:'$19.9元起',
						view_count:1104,
						pl:151,
						sc:1123
					},
					{
						id:2,
						title:'餐厨主题',
						desc:'5个给春天的生活新提案',
						key_word:'餐厨起居洗护好物',
						price:'$33.9元起',
						view_count:331,
						pl:271,
						sc:95
					},
					{
						id:3,
						title:'餐厨主题',
						desc:'5个给春天的生活新提案',
						key_word:'餐厨起居洗护好物',
						price:'$53.9元起',
						view_count:1354,
						pl:145,
						sc:66
					}
				]
			}
		},
		onLoad() {
	
		},
		onReachBottom : function(){
			//避免多次触发
			if (this.loadingType == 1 || this.loadingType == 2){return ;}
			this.loadMoreFunc();
		},
		// 下拉刷新事件
		onPullDownRefresh: function (){
			this.refreshFunc();
		},
		methods:{
			refreshFunc:function(){
				// 调api接口
				uni.showToast({title: "下拉刷新结束", icon:"none"});
				// 结束下拉刷新
				uni.stopPullDownRefresh();
			},
			//加载更多时执行的函数
			loadMoreFunc: function (){
				//假设 page > 3 代表加载了全部数据
				if (this.page > 3){
					this.loadingType = 2;
					return ;
				}
				//展示loading
				this.loadingType = 1;
				//追加数据(延迟1秒 模拟网络请求)
				setTimeout(() => {
					let data = {
						id:4,
						title:'餐厨主题',
						desc:'87个给春天的生活新提案',
						key_word:'餐厨起居洗护好物',
						price:'$2222.9元起',
						view_count:444,
						pl:44,
						sc:11423
					}
					this.newList.push(data)
					// this.newList.push(data)
					//累加页码
					this.page++;
					this.loadingType = 0;
				}, 1000);
			},
			clickNews:function(){
				this.myToast('专题内容开发中....')
			}
		},
	}
</script>

<style>
	page{background-color:#F9F9F9;}
	.grace-news-img{width:220rpx; height:150rpx;}
	.big-img{width:700rpx; height:388rpx;  overflow:hidden; margin:15rpx 0;}
	.big-image{width:700rpx; height:388rpx; border-radius:6rpx;}
	.grace-news-imgs-img{width:225rpx; height:380rpx;}
</style>