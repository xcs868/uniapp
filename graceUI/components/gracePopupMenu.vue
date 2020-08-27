<template name="gracePopupMenu">
	<view>
		<view class="grace-popup-mask" v-if="show" @tap.stop="hideMenu" @touchmove.stop="" :style="{background:background, zIndex:zIndex}"></view>
		<view class="grace-popup-menu" v-if="show" :style="{top:top+'px', width:menuWidth, zIndex:zIndex+1}">
			<view :class="['grace-rows', 'arrow-d-'+arrowDirection]" v-if="isArrow">
				<view class="arrow-up" :style="{borderBottomColor:bgColor, margin:arrowMargin}"></view>
			</view>
			<view :style="{background:bgColor, width:menuWidth, borderRadius:borderRadius}"><slot></slot></view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "gracePopupMenu",
		props: {
			show:{
				type : Boolean,
				default : false
			},
			top:{
				type : Number,
				default : 0
			},
			bgColor:{
				type : String,
				default :'#FFFFFF'
			},
			menuWidth :{
				type : String,
				default : '258rpx'
			},
			background : {
				type : String,
				default : 'rgba(0,0,0, 0.3)'
			},
			borderRadius:{
				type : String,
				default:'0rpx'
			},
			zIndex : {type:Number, default:3},
			isArrow:{type:Boolean, default:true},
			arrowDirection:{type:String, default:"right"},
			arrowMargin:{type:String, default:"0 12rpx"}
		},
		methods: {
			hideMenu : function() {
				this.$emit('hideMenu');
			}
		},
	}
</script>
<style scoped>
.grace-popup-menu{width:258rpx; padding:10rpx; right:0px; top:0px; position:absolute; z-index:3;}
.grace-popup-mask{background:rgba(0,0,0, 0.3); width:100%; height:100%; position:fixed; left:0; top:0; z-index:4;}
.arrow-up {
    width:0; 
    height:0; 
    border-left:18rpx solid transparent;
    border-right:18rpx solid transparent;
    border-bottom:18rpx solid #FFFFFF;
}
.arrow-d-right{justify-content:flex-end;}
.arrow-d-center{justify-content:center;}
.arrow-d-left{justify-content:flex-start;}
</style>