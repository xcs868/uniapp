<template>
	<view class="grace-shade" :style="{zIndex:zIndex, background:background}" v-if="showInReal" @tap.stop="closeShade" @touchmove.stop="">
		<view :class="[show ? 'grace-shade-in' : 'grace-shade-out']"><slot></slot></view>
	</view>
</template>
<script>
export default{
	props:{
		background : {type:String, default:"rgba(0, 0, 0, 0.1)"},
		zIndex : {type:Number, default:1},
		show : {type:Boolean, default:true}
	},
	data() {
		return {
			showInReal : false
		}
	},
	created:function(){
		this.showInReal = this.show;
	},
	watch:{
		show:function(val){
			if(val){this.showInReal = val;}else{
				setTimeout(()=>{this.showInReal = false}, 200);
			}
		}
	},
	methods:{
		closeShade : function(){
			this.$emit('closeShade');
		}
	}
}
</script>
<style scoped>
.grace-shade{position:fixed; width:100%; height:100%; left:0; top:0; bottom:0; z-index:1; background:rgba(255, 255, 255, 1); display:flex; justify-content:center; align-items:center;}
.grace-shade-in{animation:grace-shade-in-a 200ms ease-in forwards;}
@keyframes grace-shade-in-a{0%{transform: scale(0.1); opacity:0;} 100%{transform: scale(1); opacity:1;}}
.grace-shade-out{animation:grace-shade-out-a 200ms ease-in forwards;}
@keyframes grace-shade-out-a{0%{transform: scale(1); opacity:1;} 100%{transform: scale(0.1); opacity:0;}}
</style>