<template>
	<view class="text-view">
		<text :style="{'font-size':size + 'rpx', 'color':color, 'width':width, 'height':height, 'font-weight':weight, 'font-family':family}" :class="otherClass">{{content}}</text>
	</view>
</template>

<script>
	export default {
		name: 'text-box',
		data() {
			return {
				
			}
		},
		props: {
			// 文本大小
			size: {
				type: Number,
				default: 28
			},
			// 文本颜色
			color: {
				type: String,
				default: '#333333'
			},
			// 文本框宽度
			width: {
				type: String,
				default: '100%'
			},
			// 文本框高度
			height: {
				type: String,
				default: '100%'
			},
			// 文本粗细
			weight: {
				type: String,
				default: 'normal'
			},
			// 文本样式
			family: {
				type: String,
				default: ''
			},
			// 文本内容
			content: {
				type: String,
				default: ''
			},
			// 附加样式
			otherClass: {
				type: String,
				default: ''
			}
		}
	}
</script>
	
<style>
	/* .card-box{margin-bottom: 30rpx;} */
	.text-view{line-height: 1;}
</style>