<template>
	<view class="grace-btdialog-shade" v-if="realShow" @tap.stop="closeDialog" @touchmove.stop="stopFun" 
	:style="{backgroundColor:background, zIndex:zIndex}">
		<view :class="['dialog', 'gdIn', isIpx ? 'grace-ipx-bottom' : '', isOut ? 'gdOut' : '']" 
		:style="{width:width,left:left,borderTopLeftRadius:borderRadius,borderTopRightRadius:borderRadius}" 
		@tap.stop="stopFun">
			<view><slot name="btns"></slot></view>
			<view @tap.stop="stopFun"><slot name="content"></slot></view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		width:{type:String,default:'750rpx'},
		left:{type:String,default:'0rpx'},
		show : {type : Boolean,default : false},
		background:{type : String,default : 'rgba(0, 0, 0, 0.5)'},
		borderRadius : {type : String,default : '0rpx'},
		zIndex:{type : Number,default : 99}
	},
	data() {
		return {
			realShow:false,
			isIpx:false,
			isOut : false
		}
	},
	watch:{
		show : function (vn, vo) {
			if(vn){
				this.realShow = vn;
			}else{
				this.isOut = true;
				setTimeout(()=>{this.realShow = false;}, 120);
				setTimeout(()=>{this.isOut = false;}, 150);
			}
		}
	},
	created : function(){
		this.realShow = this.show;
		// #ifndef APP-PLUS
		try {
		    var res = uni.getSystemInfoSync();
			res.model = res.model.replace(' ', '');
			res.model = res.model.toLowerCase();
			if(res.model.indexOf('iphonex') != -1 || res.model.indexOf('iphone11') != -1){
				this.isIpx = true;
			}
		} catch (e){return null;}
		// #endif
	},
	methods:{
		closeDialog : function(){
			this.$emit('closeDialog');
		},
		stopFun : function(){}
	}
}
</script>
<style scoped>
@keyframes gdIn{ from {bottom:-1000px; } 100% { bottom: 0px; }}
.gdIn {animation:gdIn 200ms ease-in forwards;}
@keyframes gdOut{ from {bottom:0px;} 100% { bottom:-1000px; }}
.gdOut {animation:gdOut 200ms ease-out forwards;}
.grace-btdialog-shade{position:fixed; width:100%; height:100%; left:0; top:0; z-index:9; background:rgba(0, 0, 0, 0.5);}
.grace-btdialog-shade .dialog{width:100%; height:auto; background:#FFFFFF; position:absolute; bottom:0; left:0;}
.grace-ipx-bottom{padding-bottom:50rpx !important;}
</style>