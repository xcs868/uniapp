<template>
	<gracePage headerBG="#FFFFFF" :customHeader="false">
		<view slot="gBody" class="page">
			<view class="grace-flex grace-flex-end recommend-list" @tap="goToRecommendList">
				我的邀请记录
			</view>
			<!-- #ifdef MP-WEIXIN || H5 -->
			<view class="test" @tap="activityRuleShow = true" style="height: 100rpx;"></view>
			<!-- #endif -->
			
			<view class="grace-padding">
				<view class="share_count grace-flex">
					<view class="list" v-for="(item, index) in inviteRes" :key="index">
						<view class="share-number"><text class="">{{item.number}}</text>{{item.tips}}</view>
						<view class="share-title">{{item.title}}</view>
					</view>
				</view>
			</view>
			
			
			<view class="card-box">
				<div class="title">邀请好友获得积分</div>
				<view class="yqlc-img-content">
					<view class="grace-flex grace-flex-center grace-flex-vcenter">
						<image :src="imgUrl('/v1/recommend/click_invite.png')" @tap="shareSuccess" mode="widthFix" class="yqlc-img"></image>
						<view class="yqlc-img-devide"></view>
						<image :src="imgUrl('/v1/recommend/friends_click.png')" mode="widthFix" class="yqlc-img"></image>
						<view class="yqlc-img-devide"></view>
						<image :src="imgUrl('/v1/recommend/hzj_100.png')" mode="widthFix" class="yqlc-img"></image>
					</view>
				</view>
				<view class="grace-center grace-flex grace-margin-top05">
					<view class="yqlc-item grace-h5 grace-black6 grace-columns grace-line-height">
						<text class="grace-h6">点击按钮</text>
						<text class="grace-padding-top05 grace-h6">分享给好友</text>
					</view>
					<view class="yqlc-item grace-h5 grace-black6 grace-columns grace-line-height">
						<text class="grace-h6">好友点开链接</text>
						<text class="grace-padding-top05 grace-h6">注册成为会员</text>
					</view>
					<view class="yqlc-item grace-h5 grace-black6 grace-columns grace-line-height">
						<text class="grace-h6">您将获得</text>
						<text class="grace-padding-top05 grace-h6"><text class="grace-green grace-h6">100</text> 积分</text></text>
					</view>
				</view>
			</view>
			
			
			<view class="card-box" style="padding-bottom:110rpx;margin-bottom: 0!important;">
				<view class="title">邀请排行榜</view>
				<view class="grace-margin-top2 grace-flex grace-flex-bottom">
					<view class="phb-item-content grace-flex-bottom">
						<view class="grace-columns grace-center grace-flex-vcenter grace-line-height">
							<image
							 :src="userTop2.weixinface || avatar" 
							mode="widthFix" 
							class="phb-between-img phb-2 grace-border-radius"></image>
							<text class="phb-number-2 grace-border-radius grace-bold grace-black6">2</text>
							<view class="grace-margin-top05 grace-h5 grace-columns grace-line-height">
								<text>{{ userTop2.weixinname }}</text>
								<text class="grace-black6 grace-padding-top05">邀请{{ userTop2.invitednum }}人</text>
							</view>
						</view>
					</view>
					
				
					<view class="phb-item-content grace-flex-bottom">
						<view class="grace-columns grace-center grace-flex-vcenter grace-line-height">
							<image src="https://img.kags.cn/static/kagsmp/invite/icon-crown.png" mode="widthFix" class="phb-crown-img"></image>
							<image
							 :src="userTop1.weixinface || avatar" 
							mode="widthFix" 
							class="phb-between-img phb-1 grace-border-radius" style="margin-top:6px;"></image>
							<text class="phb-number-1 grace-border-radius grace-bold grace-black6" style="margin-top: -2px;">1</text>
							<view class="grace-margin-top05 grace-h5 grace-columns grace-line-height">
								<text>{{ userTop1.weixinname }}</text>
								<text class="grace-black6 grace-padding-top05">邀请 {{ userTop1.invitednum }} 人</text>
							</view>
						</view>
					</view>
					
					<view class="phb-item-content grace-flex-bottom">
						<view class="grace-columns grace-center grace-flex-vcenter grace-line-height">
							<image
							 :src="userTop3.weixinface || avatar" 
							mode="widthFix" 
							class="phb-between-img phb-3 grace-border-radius"></image>
							<text class="phb-number-3 grace-border-radius grace-bold grace-black6">3</text>
							<view class="grace-margin-top05 grace-h5 grace-columns grace-line-height">
								<text>{{ userTop3.weixinname }}</text>
								<text class="grace-black6 grace-padding-top05">邀请{{ userTop3.invitednum }}人</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			</view>
			<!-- 登录提示弹窗 -->
			<dialog-box :show="loginDialogShow"  :titleHeight="60" @close="close" @confirm="confirm"></dialog-box>	
			
		</view>
		<view slot="gFooter">
			<view class="grace-flex grace-flex-vcenter grace-border-t">
				<!-- #ifdef MP-WEIXIN -->
				<button class="grace-bg-green footer-right grace-flex grace-flex-center grace-flex grace-flex-vcenter yqhy-btn"
				 id="weixin-share-btn" open-type="share">
					<text class="grace-title-18">邀请好友加入</text>
				</button>
				<!-- #endif -->
				<!-- #ifdef  H5 -->
				<button @tap="shareSuccess"  class="grace-bg-green footer-right grace-flex grace-flex-center grace-flex grace-flex-vcenter yqhy-btn">
					<text class="grace-title-18">邀请好友加入</text>
				</button>
				<!-- #endif -->
			</view>
			
			<view class="share_point" v-show="share_point" @tap="dialogHide">
				<image :src="imgUrl('/v1/recommend/share.png')"  mode=""></image>
			</view>
			
						
		</view>	
	</gracePage>
</template>
<script>
import gracePage from "@/graceUI/components/gracePage.vue";
import graceShade from "@/graceUI/components/graceShade.vue";
import dialogBox from "@/components/mybox/dialog-box/dialog-box.vue";
import cardBox from '@/components/mybox/card-box/card-box.vue';
// import graceRightMessage from "@/graceUI/components/graceRightMessage.vue";
export default {
    data() {
		return {
			msgAimate : true,
			msgAimateId : null,
			share_point:false,
			userTop1:{
				weixinface:'https://img.kags.cn/static/kagsmp/invite/icon-crown.png',
				weixinname:'',
				invitednum:0
			},
			userTop2:{
				weixinface:'https://img.kags.cn/static/kagsmp/invite/icon-crown.png',
				weixinname:'',
				invitednum:0
			},
			userTop3:{
				weixinface:'https://img.kags.cn/static/kagsmp/invite/icon-crown.png',
				weixinname:'',
				invitednum:0
			},
			avatar:'https://img.kags.cn/static/kagsmp/invite/icon-crown.png',
			list:[],
			inviteRes: [
				{number:0, tips:'人', title:'我已邀请', borderRight:true},
				{number:0, tips:'分', title:'获得积分', borderRight:false}
			],
			activityRuleShow:false,
			loginDialogShow:false,
			user_id:uni.getStorageSync('USER_ID'),
        };
    },
	onLoad() {
		this.getUserInfo()
	},
	onShareAppMessage() {
		let user_id = uni.getStorageSync('USER_ID') || 0
		console.log('share：'+user_id);
	    return {
	      title: '膳贡平台健康饮食!',
		  imageUrl:'http://imgsg.qichuanqing.cn/v1/recommend/page_bg.png',
	      path: '/pages/index/index?referee_id='+ user_id
	    }
	},
	methods:{
		goToRecommendList:function(){
			return this.navigateToAction('/pages/doctor/recommend_list')
		},
		shareSuccess(){
			this.share_point = true
		},
		dialogHide(){this.share_point = false},
		
		imgUrl(url) {
			return 'http://imgsg.qichuanqing.cn' + url
		},
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
			this.$api.apiGetRecommendList({
				user_id:this.user_id
			}).then(res => {
				
				if(res.code == 200){
					this.inviteRes.map(item => {
						if(item.borderRight){
							item.number = res.data.invitednum
						}else{
							item.number = res.data.invitednum * 100
						}
					})
					if(res.data.list.length == 3 ){
						res.data.list.map((item,index) => {
							if(index == 0){
								this.userTop1 = item
							}else if(index == 1){
								this.userTop2 = item
							}else if(index == 2){
								this.userTop3 = item
							}
						})
					}
				}
			})
		},
	
	},
	components:{gracePage,graceShade,dialogBox,cardBox}
}
</script>
<style lang="less" scoped>
	// page{background:#fff;}
	// page {
	// 	background:url(http://imgsg.qichuanqing.cn/v1/recommend/page_bg.png) no-repeat #F6F6F6 !important; background-size:100% auto !important;
	// 	padding-top: 185rpx;
	// }
	
	.page {
		background:url(http://imgsg.qichuanqing.cn/v1/recommend/page_bg.png) no-repeat #F6F6F6 !important; background-size:100% auto !important;
		padding-top: 185rpx;
	}
	
	.recommend-list{
		position:fixed!important;font-size: 20rpx;color:#00BC79;top: 200rpx;
		right:0;background-color:#FFFFFF;border-radius: 20px 0 0 20px;line-height:40rpx;padding: 0 6px 0 10px;
	}
	/* 邀请流程内容样式 */
	.yqlc-img-content{margin-top: 60rpx;height: 120rpx;}
	
	.yqlc-item{width: 33.3%;}
	
	.yqlc-img{width: 120rpx;height: 120rpx;}
	
	.yqlc-img-devide{width: 109rpx;height: 2rpx;background-color: #D7D7D7;}
	.title{
		border-left:solid 8rpx #00BC79;
		padding-left: 16rpx;
		font-size: 32rpx;
		font-weight: bold;
		line-height: 1;
	}
	.card-box{
		padding: 40rpx 20rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
	}
	.share_count{
		// width: 710rpx;
		margin: 0 auto;
		// height: 196rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 40rpx;
		margin-bottom: 20rpx;
		view{
			line-height: 1;
		}
		.list{
			flex: 1;
			.share-number{
				text-align: center;
				font-size: 30rpx;
				text{
					font-size: 56rpx;
					font-weight: bold;
					color: #00BC79;
					font-family:"font_family"
				}
			}
			.share-title{
				text-align: center;
				color: #666666;
				font-size: 28rpx;
				margin-top: 20rpx;
				line-height:40rpx;
			}
		}
		.list:first-child{
			border-right: 1rpx solid #D7D7D7;
		}
	}


	/* 排行榜样式 */
	.phb-item-content{width: 33.3%;}
	.phb-between-img{width: 122rpx;height: 122rpx;margin-top: 60rpx;}
	.phb-2{border:4rpx solid rgba(227,227,227,1);}
	.phb-number-2{width: 44rpx;height: 44rpx;background:rgba(227,227,227,1);line-height: 44rpx;margin-top: -22rpx;z-index: 1;font-size: 26rpx;}
	
	.phb-middle-img{width: 152rpx;height: 154rpx;}
	
	.phb-crown-img{width: 36rpx;height: 36rpx;}
	.phb-1{border: 4rpx solid rgba(255,160,0,1);}
	.phb-number-1{width: 44rpx;height: 44rpx;background:rgba(255,160,0,1);line-height: 44rpx;margin-top: -22rpx;z-index: 1;font-size: 26rpx;}
	
	.phb-3{border: 4rpx solid rgba(255,225,195,1);}
	.phb-number-3{width: 44rpx;height: 44rpx;background:rgba(255,225,195,1);line-height: 44rpx;margin-top: -22rpx;z-index: 1;font-size: 26rpx;}
	
	.yqhy-btn{border: none;border-radius: 0;width: 100%;background-color: #00BC79!important;}
	
	.share_point {
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
