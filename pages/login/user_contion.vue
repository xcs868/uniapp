<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody" >
			<view class="" style="background-color: #83B497;">
				<view class="grace-flex grace-flex-center grace-header" >
					<view class="grace-flex-vcenter grace-margin-top">
						<!-- <image src="http://imgsg.qichuanqing.cn/logo/shangong.png" style="width: 120rpx;" mode="widthFix"></image> -->
						<text class="iconfont" style="color: #FFFFFF;font-size: 100rpx;">&#xe64c;</text>
					</view>
				</view>
				
				<view class="grace-flex grace-flex-center grace-space-between grace-padding-top" style="width: 70%;margin: auto;" >
					<text class="grace-h5 grace-bold user-contion-title">
						了解自己的体质 | 了解体质与疾病的关系 | 获得个性化调理体质的方案
					</text>
				</view>
				
				<view class="grace-padding grace-margin-top">
					<view class="user-contion-dished"></view>
				</view>
				
				<view class="grace-flex grace-flex-center grace-space-between grace-padding">
					<view class="grace-h6 user-contion-desc">
						此“体质测试”是依据中医国家标准开发，虽测试过程复杂，但却能帮助您知晓身体情况，洞悉疾病隐患，当常常自检。
					</view>
				</view>
				
			</view>
			
			
			
			<view class="grace-padding grace-margin-top">
				<view class="grace-title grace-margin-top">
					<view class="grace-title-border" style="background-color:rgb(131, 180, 151)"></view>
					<text class="grace-title-text">超准中医体质测试</text>
					<text class="grace-title-text grace-gray grace-h6" style="text-align: right;font-size:20rpx;">耗时5分钟/共60道题</text>
				</view>
				<view class="flex-row item-warp">
					<view class="item flex-column">
						<view class="round">
							<view class="iconfont icon-good1"></view>
						</view>
						<view class="text">国家标准</view>
					</view>
					<view class="item flex-column">
						<view class="round">93%</view>
						<view class="text">准确率93%</view>
					</view>
					<view class="item flex-column">
						<view class="round">
							<view class="iconfont icon-jijiu"></view>
						</view>
						<view class="text">完整全面</view>
					</view>
					<view class="item flex-column">
						<view class="round">2千万</view>
						<view class="text">2千万人测过</view>
					</view>
				</view>
				<view class="">
					<view @tap="goToContionSelf" style="width: 100%;" class="grace-green grace-flex-center grace-flex-vcenter grace-border-green loginDialogBtn grace-border-radius grace-h5">
						开始测试
					</view>
				</view>
			</view>
			
			
			
			
			
			<view class="grace-padding grace-margin-top">
				<view class="grace-title grace-margin-top">
					<view class="grace-title-border" style="background-color:rgb(131, 180, 151)"></view>
					<text class="grace-title-text">已知体质选择</text>
				</view>
				
				<view class="grace-wrap grace-margin-top">
					<text class="color-btn" 
					v-for="(item,index) in userConsitionList"
					@tap="selectBtn(item.id,index)"
					:style="item.active ==  true ? 'background-color:rgb(131, 180, 151);color:#ffffff' : ''"
					 :key="index">
					 {{ item.name }}
					 </text>
				</view>
				
				<view class="" @tap="submit">
					<!-- <button type="primary" 
					 class="grace-button grace-margin-top grace-border-radius consiton-btn" plain="true">确定</button> -->
					 <view style="width: 100%;" class="grace-green grace-flex-center grace-flex-vcenter grace-border-green loginDialogBtn grace-border-radius grace-h5">
					 	确定
					 </view>
				</view>
			</view>
			<u-select v-model="show" :title="'请选择性别测试更准确'" style="font-size: 14px;" mode="single-column" :list="sexList" @confirm="confirm"></u-select>
		</view>
	</gracePage>
</template>
<script>

import gracePage from "../../graceUI/components/gracePage.vue";

export default {
	data() {
		return {
			show:false,
			sexList:[{label:'男',value:1},{label:'女',value:2}],
			currentSex:'',
			userConsitionList:[],
			selectId:0,
			user_id:0,
			from:''
		}
	},
	onLoad(e){
		console.log(e)
		let uid = uni.getStorageSync('USER_ID') ? uni.getStorageSync('USER_ID') : 0
		this.user_id = e.user_id ? e.user_id : uid;
		this.from = e.from || '';
		this.getUserConsition()
	},
	methods:{
		confirm(e){
			let currentSex = e[0].value;
			if(currentSex){
				let user_id = this.user_id
				this.navigateToAction('/pages/authorize/answer?user_id='+user_id+'&sex='+currentSex)
			}
		},
		goToContionSelf:function(){
			this.show = true;
			
			
			
		},
		//获取体质数据
		getUserConsition:function(){
			this.$api.apiUserConsition({}).then(res => {
				if(res.code == 200){
					this.userConsitionList = res.list.map(item => {
						item.active = false
						return item
					})
				}
			})
		},
		selectBtn(id,index){
			this.selectId = id
			this.userConsitionList.filter(item => {
				 item.id == id ? item.active = true : item.active = false
				 return item
			})
		},
		submit:function(){
			var _this = this
			let id = _this.selectId
			if(id == 0){
				_this.myToast('请您选择属于哪种体质！')
				return 
			}
			// if(!uni.getStorageSync('USER_ID')){
			// 	_this.myToast('请您登录后再进行操作！')
			// 	setTimeout(function(){
			// 		_this.navigateToAction('/pages/login/login');
			// 	},2000)
			// 	return 
			// }
			
			this.$api.apiSubConsition({
				cid:id,
				user_id:this.user_id,
			}).then(res => {
				console.log(res,'res')
				if(res.code == 200){
					_this.myToast('操作成功')
					if(this.from == 'body'){
						// uni.navigateBack({
						//     delta: 1
						// });
						this.navigateToAction('/pages/user/body?user_id='+this.user_id)
						return
					}
					setTimeout(function(){
						uni.switchTab({
							url: '/pages/index/index'
						});
					},2000)
					return true
				}else{
					_this.myToast(res.msg)
				}
			})
			
		}
	},
	components:{
		gracePage
	}
}
</script>

<style lang="scss">
	.u-select__header__title{
		font-size: 22rpx;
		color: #333;
	}
	.item-warp{
		justify-content: space-around;
		.item{
			align-items: center;
		}
		.round{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background-color: #8cb08a;
			color: #fff;
			text-align: center;
			line-height: 100rpx;
			.iconfont{
				margin-right: 0;
				font-size: 26px;
			}
		}
		.text{
			font-size: 26rpx;
			color: #333;
			margin-top: 20rpx;
			text-align: center;
		}
	}
	
	
	.user-contion-title{color: #FFFFFF;text-align: center;}
	.user-contion-desc{text-align: left;color: #FFFFFF;font-size: 25rpx;padding-bottom: 20rpx;}
	.user-contion-dished{border-top: 1px dashed #ccc;padding-bottom: 20rpx;}
	
	.color-btn{
		text-align:center; width:212rpx; height:66rpx;
		font-size:22rpx; line-height:66rpx; border-radius:6rpx; margin:10rpx;
		background-color: #EAF0EC;color: #507352;
	}
	.consiton-btn{border-radius:66rpx!important;border-color: #83B497!important;color: #83B497!important;}
</style>

