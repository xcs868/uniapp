<template>
	<view v-if="show">
		<graceDialog :title="title" :titleSize="titleSize + 'rpx'" :isCloseBtn="isCloseBtn" :show="show" :borderRadius="borderRadius+ 'rpx'" :titleHeight="titleHeight" :width="width">
			<view slot="content">
				<view class="grace-columns grace-flex-vcenter">
					<view class="">
						<image src="https://img.kags.cn/static/kagsmp/login/dialog-bg.png" 
						style="width: 350rpx;" mode="widthFix" class="grace-padding-top05"></image>
					</view>
					<view class="grace-margin-top grace-columns grace-center">
						<text class="grace-h5">您的体质</text>
						<text class="grace-h3 grace-padding-top grace-green ">{{ contionValue }}</text>
					</view>
				</view>
				<view style="padding-bottom: 20rpx;">
					<view class="grace-flex grace-flex-center" style="justify-content: center;">
						<!-- <view @tap="closeDialog" class="grace-green grace-flex-center grace-flex-vcenter grace-border-green loginDialogBtn grace-border-radius grace-h5 btn-left">
							我在想想</view> -->
						<view 
						@tap="confirmEvent"
						class="grace-green grace-flex-center grace-flex-vcenter grace-border-green loginDialogBtnSnswer grace-border-radius grace-h5 btn-right">
							确定
						</view>
					</view>
				</view>
			</view>
			
		</graceDialog>
	</view>
</template>

<script>
	import graceDialog from '@/components/mybox/graceUI/graceDialog.vue';
	
	export default {
		data() {
			return {
				
			};
		},
		components: {
			graceDialog
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			contionValue:{
				type:String,
				default:''
			},
			width: {
				type: String,
				default: '500rpx'
			},
			title: {
				type: String,
				default: ''
			},
			titleSize: {
				type: Number,
				default: 32
			},
			titleHeight: {
				type: Number,
				default: 80
			},
			isCloseBtn: {
				type: Boolean,
				default: false
			},
			borderRadius: {
				type: Number,
				default: 20
			},
			isBtns: {
				type: Boolean,
				default: false
			},
			closeBtnContent: {
				type: String,
				default: '取消'
			},
			closeBtnContentSize: {
				type: Number,
				default: 30
			},
			confirmBtnContent: {
				type: String,
				default: '确认'
			},
			confirmBtnContentSize: {
				type: Number,
				default: 30
			}
		},
		methods: {
			// 左边按钮事件
			closeDialog() {
				this.$emit('close');
			},
			// 右边按钮事件
			confirmEvent() {
				this.$emit('confirm');
			}
		}
	}
</script>

<style>
	.grace-dialog-title{height: 80rpx !important;}
	.loginDialogBtnSnswer{
		width: 80%;
		height: 33px;
		margin-top: 20px;
		margin-bottom: 10px;
	}
</style>
