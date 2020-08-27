<template>
	<gracePage headerBG="#FFFFFF"  :customHeader="false" :isSwitchPage="true">
		<!-- <view slot="gHeader" style="padding-top: 240rpx;">
				<graceNavBar :items="tabs" :currentIndex="currentIndex" @change="navChange"></graceNavBar>
		</view> -->
		<view slot="gBody" id="gBody">
			<view class="">
				<graceNavBar :items="tabs" :isCenter="true"  :currentIndex="currentIndex" @change="navChange"></graceNavBar>
			</view>
			<swiper :style="{height:mainHeight+'px'}" :current="currentIndex" @change="swiperChange">
				<swiper-item v-for="(news, newsIndex) in newsAll" :key="newsIndex">
					<scroll-view scroll-y="true" :style="{height:mainHeight+'px'}" :scroll-top="scrollTops[currentIndex]" 
					@scrolltolower="scrollend" @scroll="scroll" 
					@touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
						<graceReload ref="graceReload" width="700rpx" marginLeft="25rpx" @reload="reload"></graceReload>
						<graceEmpty v-if="news == 'empty'">
							<view slot="img" class="empty-view">
								<image class="empty-img" mode="widthFix" src="http://imgsg.qichuanqing.cn/v1/home/goodsCartEmpty.png"></image>
							</view>
							<text slot="text" class="grace-text-small grace-gray">暂无内容</text>
						</graceEmpty>
						<view style="padding:0 25rpx;">
							<block v-for="(item, index) in news" :key="index" v-if="news != 'empty'">
								<view class="grace-news-list grace-border-b"  @tap="newsinfo(item.goods_id)">
									<view class="grace-news-item">
										<view class="grace-news-img grace-news-img-l" style="height:180rpx;">
											<image :src="item.goods_img" mode="widthFix" class="grace-news-img-in"></image>
										</view>
										<view class="grace-news-body">
											<text class="grace-news-title grace-ellipsi">{{item.goods_name}}</text>
											<text class="grace-news-desc grace-margin-top05 grace-ellipsi2">{{item.goods_brief}}</text>
											<view class="grace-h4 grace-red grace-padding-top">
												￥{{ item.shop_price }}元
											</view>
										</view>
									</view>
									<view class="grace-news-info">
										<view style="width:500rpx;" class="grace-nowrap">
											<text class="grace-icons grace-news-info-text">&#xe609; {{item.click_count}}</text>
											<text class="grace-icons grace-news-info-text" 
											style="margin-left:30rpx;">&#xe69e;{{item.user_contion}}</text>
										</view>
										<text class="grace-icons grace-news-info-text">&#xe6b8; {{ item.goods_assess }}</text>
									</view>
								</view>
								
							</block>
						</view>
						<graceLoading :loadingType="loadingTypes[newsIndex]"></graceLoading>
					</scroll-view>
				</swiper-item>
			</swiper>
			<!-- 登录提示弹窗 -->
			<dialog-box :show="loginDialogShow"  :titleHeight="60" @close="close" @confirm="confirm"></dialog-box>	
		</view>
		
		<view slot="gRTArea">
			<text class="to-top grace-icons" :class="[scrollTops[currentIndex] >= 100 ? 'to-top-show' : '']" @tap="totop">&#xe637;</text>
		</view>
		
	</gracePage>
</template>
<script>
import gracePage from "@/graceUI/components/gracePage.vue";
import graceNavBar from "@/components/mybox/graceUI/graceNavBar.vue";
import graceLoading from "@/graceUI/components/graceLoading.vue";
import graceEmpty from '@/graceUI/components/graceEmptyNew.vue';
import graceReload from '@/graceUI/components/graceReload.vue';
import dialogBox from "@/components/mybox/dialog-box/dialog-box.vue";
export default {
    data() {
    	return {
			currentIndex: 0,
			mainHeight : 800,
			//分类数据
			tabsAll : [],
			tabs : [],
			// 新闻信息保存数组
			newsAll : [],
			// 每个选项卡对应的分页
			pages : [],
			// 加载状态
			loadingTypes : [],
			// 每个滚动区域的滚动值
			scrollTops : [],
			scrollTimer : null,
			cat_id:0,
			loginDialogShow:false
    	}
    },
	onReady:function(){
		// setTimeout(()=>{
		// 	uni.createSelectorQuery().select('#gBody').fields(
		// 		{size: true}, (res) => {
		// 			this.mainHeight = res.height;
		// 		}
		// 	).exec();
		// },1000);
		//加载分类信息 初始化数据
	},
	onLoad(e) {
		this.getCate();
		let cat_id = e.cat_id ? e.cat_id : this.cat_id;
		if(cat_id > 0){
			if(cat_id == 9){
				cat_id = 0
			}
			this.cat_id = cat_id
			this.currentIndex = parseInt(cat_id)
		}
	},
	watch:{
		currentIndex : function (nVal, oldVal) {
			if((this.loadingTypes[this.currentIndex] != 2 || this.loadingTypes[this.currentIndex] != 4) && this.pages[this.currentIndex] < 2){ 
				this.getNews(); 
			}
		}
	},
	methods:{
		close() {
			this.loginDialogShow = false;
		},
		confirm(){
			//去登录页面
			this.close()
			return this.navigateToAction('/pages/login/login')
		},
		navChange: function (e) {
			this.currentIndex = e;
		},
		swiperChange: function (e) {
			var index = e.detail.current;
			this.currentIndex = index;	
		},
		//加载分类信息 初始化数据
		getCate : function () {
			this.$api.apiGorp({
				state:2
			}).then(res=> {
				this.tabsAll = res.groupList;
				for(var i = 0; i < this.tabsAll.length; i++){
					this.newsAll.push([]);
					this.pages.push(1);
					this.loadingTypes.push(3);
					this.scrollTops.push(0);
					this.tabs.push(this.tabsAll[i].goods_categroy_name)
				}
				this.getNews();
			})
		},
		// 加载新闻
		getNews : function(isReload){
			// 使用内部变量记录 当前索引，避免加载时用户切换引起的变量变化
			var currentIndex = this.currentIndex;
			if(!isReload){this.loadingTypes.splice(currentIndex, 1, 1);}

			// let url ='http://grace.hcoder.net/api/news/index/'+this.tabsAll[this.currentIndex].id+'/'+this.pages[this.currentIndex]
			let url = 'https://xiaoxiao-api.qichuanqing.cn/v1/goods/get_cate_list/'+this.tabsAll[this.currentIndex].id+'/'+this.pages[this.currentIndex];
			uni.request({
				url      : url,
				method   : 'GET',
				data     : {},
				success  : res => {
					// console.log(res,'res')
					if(res.data.status == 'ok'){
						// 第一页
						if(this.pages[currentIndex] == 1){
							this.newsAll.splice(currentIndex, 1 , res.data.data);
						}else{
							this.newsAll[currentIndex] = this.newsAll[currentIndex].concat(res.data.data);
						}
						// 页码增加
						this.pages[currentIndex]++;
						setTimeout(()=>{
							this.loadingTypes.splice(currentIndex, 1, 3);
						},300)
					}else if(res.data.status == 'empty' && this.pages[this.currentIndex] == 1 ){
						console.log('empty');
						this.newsAll[currentIndex] = 'empty';
						this.loadingTypes.splice(currentIndex, 1, 4);
					}else if(res.data.status == 'nomore'){
						console.log('nomore');
						this.loadingTypes.splice(currentIndex, 1, 2);
					}else if(res.data.status == 'empty' && this.pages[this.currentIndex] > 1){
						this.loadingTypes[this.currentIndex] = 2
					}
			
					// console.log(this.newsAll,'newsAll')
				},
				complete: () => {
					if(isReload){
						setTimeout(()=>{
							this.$refs.graceReload[currentIndex].endReload();
						},300)
					}
				}
			});
			
		},
		// 点击新闻列表
		newsinfo : function (goods_id) {
			if(!uni.getStorageSync('USER_ID')){
				this.loginDialogShow = true
			}else{
				return this.navigateToAction('/pages/goods/goods_detail?goods_id='+goods_id)
			}
		},
		// 加载更多
		scrollend:function(e){
			// 判断加载状态避免多次滚动时有加载尚未完成
			if( this.loadingTypes[this.currentIndex] == 2 || this.loadingTypes[this.currentIndex] == 4){ return false; }
			// console.log('loadmore.....');
			this.getNews();
		},
		scroll:function(e){
			if(this.scrollTimer != null){clearTimeout(this.scrollTimer);}
			this.scrollTimer = setTimeout(()=>{this.scrollTops.splice(this.currentIndex, 1, e.detail.scrollTop);}, 100);
		},
		touchstart : function (e){
			var touchObj = {scrollTop : this.scrollTops[this.currentIndex], moveY : e.changedTouches[0].pageY};
			this.$refs.graceReload[this.currentIndex].touchstart(touchObj);
		},
		touchmove : function (e) {
			// console.log(11)
			var touchObj = {scrollTop : this.scrollTops[this.currentIndex], moveY : e.changedTouches[0].pageY};
			this.$refs.graceReload[this.currentIndex].touchmove(touchObj);
		},
		touchend : function (e) {
			// console.log(22)
			var touchObj = {scrollTop : this.scrollTops[this.currentIndex], moveY : e.changedTouches[0].pageY};
			this.$refs.graceReload[this.currentIndex].touchend(touchObj);
		},
		// 下拉刷新
		reload:function(){
			this.pages[this.currentIndex] = 1;
			this.loadingTypes.splice(this.currentIndex, 1, 3);
			this.getNews(1);
		},
		totop : function () {
			this.scrollTops.splice(this.currentIndex, 1, 0);
		}
	},
	components:{gracePage, graceNavBar, graceEmpty, graceLoading, graceReload,dialogBox}
}
</script>

<style lang="scss" scoped>
.grace-news-img{width:220rpx; height:150rpx; overflow:hidden; font-size:0;}
.grace-news-img-in{width:100%;}
.grace-news-imgs-img{width:225rpx; height:380rpx;}
.empty-view{width:280rpx; height:280rpx; border-radius:280rpx; background-color:#F6F7F8; margin-top:300rpx;}
.empty-img{width:220rpx; height:200rpx; margin:40rpx; border-radius:200rpx;}
.grace-text-small{margin-top:10px;}
.to-top{width:80rpx; line-height:80rpx; height:80rpx; font-size:44rpx; text-align:center; display:block; background:#F5F6F8; border-radius:10rpx; color:#3688FF; opacity:0;}
.to-top-show{opacity:1;}
</style>