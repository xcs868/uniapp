<template>
	<view v-if="show">
		<view class="content">
			<view class="grace-flex grace-padding" style="justify-content: flex-end;">
				<view class="grace-flex-end grace-padding-top">
					<view>X</view>
				</view>
			</view>
			<view class="grace-padding grace-flex">
				<view class="">
					<image  style="width: 250rpx;height: 250rpx;" :src="goodsData.goods_img" mode="widthFix"></image>
				</view>
				<view class="grace-padding">
					<view class="grace-h5 grace-bold grace-red">
						${{ goodsData.shop_price }}元
					</view>
					<view class="grace-margin-top grace-gray">
						库存
						<text style="color: red;padding:8rpx;">{{ goodsData.goods_number }}</text>g
					</view>
				</view>
			</view>
			
			<view class="grace-padding grace-flex grace-margin-top">
				<view class="grace-flex grace-flex-vcenter grace-space-between" style="width: 100%;">
					<view >购买数量</view>
					<view>
						<graceNumberBox :minNum="1" :maxNum="99999" :value="1" :disabled="true"></graceNumberBox>
					</view>
				</view>
			</view>
			
			<view class="grace-flex btn">
				<button type="primary" class="grace-button grace-border-radius btn-item">
					购买
				</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	import graceDialog from '@/components/mybox/graceUI/graceDialog.vue';
	import graceNumberBox from "@/graceUI/components/graceNumberBox.vue";
	export default {
		data() {
			return {
				goodsData:{}
			};
		},
		components: {
			graceDialog,
			graceNumberBox
		},
		onLoad() {
			console.log(this.data,'商品数据')
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			data: {
				type: Object,
			}
		},
		methods: {
			// 左边按钮事件
			closeDialog() {
				this.$emit('close');
			}
		},
		watch: {
			data(val,newVal){
				this.goodsData = val
			}
        }
	}
</script>

<style lang="scss">
	.grace-dialog-title{height: 80rpx !important;}
	.content{
		position: fixed;bottom: 0px;width: 100%;height:45%;background-color: white;z-index: 999!important;
		border-top-right-radius:25px ;
		border-top-left-radius:25rpx ;
	}
	.btn{
		position: fixed;bottom: 4rpx; width: 100%;padding-bottom:20rpx;
		.btn-item{
			width: 95%;border-radius:40rpx;background-color:#ff6700!important;
		}
	}
	/* background: rgba(0, 0, 0, 0.1); */
</style>
