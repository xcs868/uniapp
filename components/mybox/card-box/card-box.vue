<template>
	<view>
		<view class="card-box" :style="{'width':width, 'min-height':height + 'rpx', 'border-radius':borderRadius + 'rpx', 'background':bgColor, 'padding':padding, 'margin-bottom':marginBottom + 'rpx'}" :class="otherClass">
			<slot name="content"></slot>
		</view>
		<!-- <view v-else class="card-box" :style="{'width':width + 'rpx', 'min-height':height + 'rpx', 'border-radius':borderRadius + 'rpx', 'background':bgColor, 'margin-bottom':marginBottom + 'rpx'}" :class="otherClass">
			<slot name="content"></slot>
		</view> -->
	</view>
</template>

<script>
	export default {
		name: 'card-box',
		data() {
			return {
				
			}
		},
		props: {
			// 卡片宽度
			width: {
				type: String,
				default: '100%'
			},
			// 卡片高度
			height: {
				type: Number,
				default: 300
			},
			// 卡片圆角
			borderRadius: {
				type: Number,
				default: 30
			},
			// 卡片背景色
			bgColor: {
				type: String,
				default: '#FFFFFF'
			},
			// 卡片padding
			padding: {
				type: String,
				default: '30rpx'
			},
			// 是否开启padding
			paddingStatus: {
				type: Boolean,
				default: true
			},
			// margin-bottom值
			marginBottom: {
				type: Number,
				default: 30
			},
			// 附加样式
			otherClass: {
				type: String,
				default: 'mycard'
			}
		},
		methods: {
			
		},
		created() {
			// if(!this.paddingStatus) {
			// 	this.padding = '0'
			// }
		}
	}
</script>

<style>
	/* .card-box{margin-bottom: 30rpx;} */
</style>
