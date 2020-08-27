
<script>
	export default {
		onLaunch: function() {
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
	
	@import "./graceUI/animate.css";
	@import './graceUI/graceUI.css';
	@import "./graceUI/graceIcons.css";
	
	/*每个页面公共css */
	@import url("./common/icon.css");
	
	uni-page-body{
		height: 100% !important;
	}	
	 /* 提示未登录弹框样式 */
	.grace-green{color: #00BC79 !important;}
	.grace-border-green{border: 1rpx solid #00BC79 !important;}
	.grace-border-white{border: 1rpx solid #FFFFFF;}
	.grace-borer-gray{border: 1rpx solid rgba(215, 215, 215, 1);}
	.grace-borer-b-light-gray{border-bottom: 1rpx solid rgba(215, 215, 215, 0.3);}
	.loginDialogBtn {width: 185rpx; height: 66rpx;margin-top: 40rpx;margin-bottom: 20rpx;}
	.grace-margin-top05{margin-top: 15rpx!important;}
	.btn-right{margin-left: 15rpx;background-color:#00B26A;color: #FFFFFF!important;}
	.btn-left{margin-right: 15rpx;}
	 
	.grace-ellipsi{overflow: hidden!important;white-space: nowrap!important;text-overflow: ellipsis!important;}
	.grace-ellipsi2{display: -webkit-box!important;-webkit-box-orient: vertical!important;-webkit-line-clamp: 3!important;overflow: hidden!important;}
	.grace-margin-bottom{margin-bottom: 20rpx!important;}
	
	.animate1{animation:bounce 1s linear;}
	
	.bodyType{
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}
	.dotwarp{
		margin: 5px 0;
		.dot{
			width: 10px;
			height: 10px;
			border-radius: 50%;
			margin-right: 5px;
		}
	}
</style>

