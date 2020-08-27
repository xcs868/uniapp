<template>
	<view>
		<view class="grace-space-between grace-h5 message-tips grace-margin-top" :style="{'background-color':bgColor, 'color':contentColor, 'height':height + 'rpx', 'line-height':height + 'rpx'}" :class="otherClass" @tap="handlerNavigate()">
			<text>{{content}}</text>
			<text class="grace-icons icon-arrow-right grace-h4" v-if="linkStatus"></text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'message-box',
		data() {
			return {
				
			}
		},
		props: {
			// 提示内容
			content: {
				type: String,
				default: '您尚未绑定微信，无法及时获取通知'
			},
			// 背景颜色
			bgColor: {
				type: String,
				default: '#FFF2E4'
			},
			// 文字颜色
			contentColor: {
				type: String,
				default: '#FF7F00'
			},
			// 附加样式
			otherClass: {
				type: String,
				default: 'grace-bg-light-orange2 grace-orange2'
			},
			// 是否展示链接
			linkStatus: {
				type: Boolean,
				default: true
			},
			// 消息框高度
			height: {
				type: Number,
				default: 80
			}
		},
		methods: {
			// 自定义事件处理
			handlerNavigate() {
				this.$emit('handlerEvent');
			}
		}
	}
</script>

<style>
	.message-tips{padding: 0 30rpx;border-radius: 8rpx;}
</style>
