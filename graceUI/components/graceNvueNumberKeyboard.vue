<template>
	<view>
		<view class="grace-mask" @tap.stop="masktap" @touchmove.stop="" v-if="show"></view>
		<view class="grace-keyboard" v-if="show">
			<text class="grace-keyboard-res" v-if="showInputRes" 
			:style="{color:resultColor, fontSize:resultSize}">{{resVal}}</text>
			<view class="grace-keyboard-body">
				<view class="grace-keyboard-left">
					<text v-for="(item, index) in [1,2,3,4,5,6,7,8,9]" :key="index" 
					class="grace-keyboard-keys" :class="[tapIndex == item ? 'keydown' : '']" :data-keynumber="item" @tap.stop="inputNow">{{item}}</text>
					<text class="grace-keyboard-keys" :class="[tapIndex == 0 ? 'keydown' : '']" 
					:style="{width: isPoint ? '259rpx':'538rpx'}" data-keynumber="0" @tap.stop="inputNow">0</text>
					<text v-if="isPoint" class="grace-keyboard-keys" style="width:259rpx;" 
					:class="[tapIndex == '.' ? 'keydown' : '']" data-keynumber="." @tap.stop="inputNow">.</text>
				</view>
				<view class="grace-keyboard-right">
					<text class="grace-keyboard-keys grace-icons" 
					:class="[tapIndex == -3 ? 'keydown' : '']" :data-keynumber="-3" @tap.stop="deleteNow">&#xe623;</text>
					<text class="grace-keyboard-keys grace-keyboard-done" 
					:style="{backgroundColor:confirmBtnColor}" @tap.stop="done">{{doneBtnName}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		show         : { type : Boolean, default : false },
		doneBtnName  : { type : String, default : "完成" },
		isPoint      : { type : Boolean, default : true },
		showInputRes : {type : Boolean, default : true},
		value        : {type:String, default:''},
		confirmBtnColor : {type:String, default:'#3688FF'},
		resultColor  : {type:String, default:'#323232'},
		resultSize   : {type:String, default:'32rpx'},
		closeByShade  : {type:Boolean, default:true}
	},
	data() {
		return {
			resVal: '',
			tapIndex : -1
		}
	},
	created:function(){
		this.resVal = this.value;
	},
	methods: {
		inputNow : function (e){
			var k = e.currentTarget.dataset.keynumber;
			this.resVal += k+'';
			this.tapIndex = k;
			this.$emit('keyboardInput', k);
			this.removeClass();
		},
		deleteNow : function (e){
			var k = e.currentTarget.dataset.keynumber;
			this.tapIndex = k;
			this.resVal = this.resVal.substring(0, this.resVal.length - 1);
			this.$emit('keyboardDelete');
			this.removeClass();
		},
		done : function(){
			this.tapIndex = -3;
			this.$emit('keyboardDone');
			this.removeClass();
		},
		setVal : function (val) {
			this.resVal = val;
		},
		removeClass : function () {
			setTimeout(()=>{this.tapIndex = -1;}, 200);
		},
		masktap : function(){
			if(!this.closeByShade){return ;}
			this.done();
		}
	}
}
</script>
<style scoped>
.grace-mask{background-color:rgba(255, 255, 255, 0); position:fixed; width:750rpx; flex:1; left:0; top:0; bottom:0;}
.grace-keyboard{background-color:#F4F5F6; position:fixed; width:750rpx; left:0; bottom:0;}
.grace-keyboard-body{flex-direction:row; justify-content:space-between; padding:10px 0;}
.grace-keyboard-left{width:560rpx; flex-direction:row; flex-wrap:wrap; justify-content:space-between;}
.grace-keyboard-right{width:188rpx; flex-direction:column; justify-content:space-between;}
.grace-keyboard-keys{width:166rpx; height:100rpx; margin:10rpx; background-color:#FFFFFF; text-align:center; line-height:100rpx; border-radius:8rpx; font-weight:700; font-size:50rpx;}
.grace-keyboard-done{height:340rpx; line-height:340rpx; font-size:36rpx; font-weight:400; color:#FFFFFF;}
.grace-keyboard-res{line-height:60rpx; text-align:center; font-size:32rpx; font-weight:bold; padding-top:20rpx;}
.keydown{background-color:#3688FF; color:#FFFFFF;}
</style>