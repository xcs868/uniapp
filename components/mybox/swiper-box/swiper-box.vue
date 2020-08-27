<template>
	<view>
		<view class="grace-padding-top" :style="{'border-radius': borderRadius}">
			<swiper :style="{'width':width,'height': height + 'rpx', 'border-radius': borderRadius}" :indicator-dots="indicatorDots" :autoplay="autoPlay" :interval="interval" :duration="duration" :circular="true" :indicator-active-color="indicatorActiveColor" :previous-margin="spacing" :next-margin="spacing" @change="swiperchange">
				<swiper-item v-if="slotStatus">
					<slot name="content"></slot>
				</swiper-item>
				<swiper-item v-for="(item, index) in swiperItems" :key="index" class="grace-swiper-card-item">
					<navigator :url="item.url" :open-type="item.opentype" :style="{padding :padding}">
						<image :src="item.img" :style="{'border-radius': borderRadius, 'height':height + 'rpx'}" class="grace-swiper-card-image"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'swiper-box',
		props: {
			// 自定义宽度
			width : {
				type : String,
				default : '100%'
			},
			// 自定义高度
			height : {
				type : Number,
				default : 300
			},
			// 自定义圆角
			borderRadius : {
				type : String,
				default : '30rpx'
			},
			// 指示点显示状态
			indicatorDots : {
				type : Boolean,
				default : true
			},
			// 选中的指示点颜色
			indicatorActiveColor : {
				type : String,
				default : '#00BC79'
			},
			// 是否自动轮播
			autoPlay : {
				type : Boolean,
				default : true
			},
			// 自动切换时间间隔
			interval : {
				type : Number,
				default : 5000
			},
			// 滑动动画时长
			duration : {
				type : Number,
				default : 500
			},
			// 是否采用衔接滑动
			circular : {
				type : Boolean,
				default : true
			},
			// 轮播项目内间距
			padding:{
				type : String,
				default : '0 0rpx'
			},
			// 轮播项目间距
			spacing : {
				type : String,
				default : "0rpx"
			},
			// 非当前项目是否缩放
			scale : {
				type : Boolean,
				default : true
			},
			swiperItems : {
				type : Array,
				default : function(){return new Array();}
			},
			// 自定义插槽内容状态
			slotStatus : {
				type : Boolean,
				default : false
			}
		},
		created() {
			if(this.swiperItems.length == 1) {
				this.indicatorDots = false
			}
		},
		updated() {
			if(this.swiperItems.length == 1) {
				this.indicatorDots = false
			}
		},
		methods: {
			swiperchange : function (e) {
				this.current = e.detail.current;	
			}
		}
	}
</script>

<style>
	.grace-swiper-card-item{box-sizing: border-box; font-size:0; overflow:hidden;}
	
	.grace-swiper-card-image{width:100%;}
	
	.grace-swiper-card-img-small{transform:scaleY(0.92); opacity:0.85; transform-origin:center center;}
</style>
