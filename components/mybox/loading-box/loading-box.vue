<template>
	<view class="spinner-box">
		<view class="pulse-container">  
			<view class="pulse-bubble pulse-bubble-1" :style="{'background-color': bgColor}" :class="otherClass"></view>
			<view class="pulse-bubble pulse-bubble-2" :style="{'background-color': bgColor}" :class="otherClass"></view>
			<view class="pulse-bubble pulse-bubble-3" :style="{'background-color': bgColor}" :class="otherClass"></view>
		</view>
	</view>
</template>

<script>
export default {
	name: "loading-box",
	data() {
		return {};
	},
	props: {
		bgColor: {
			type: String,
			default: '#00BC79'
		},
		otherClass:{
			type: String,
			default: ''
		}
	}
	
};
</script>

<style scoped="true">


@keyframes pulse {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: .25;
    transform: scale(.75);
  }
}

.spinner-box {
  width: 100upx;
  height: 100upx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}

/* PULSE BUBBLES */

.pulse-container {
  width: 120upx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pulse-bubble {
  width: 20upx;
  height: 20upx;
  border-radius: 50%;
  /* background-color: #3ff9dc; */
}

.pulse-bubble-1 {
    animation: pulse .4s ease 0s infinite alternate;
}
.pulse-bubble-2 {
    animation: pulse .4s ease .2s infinite alternate;
}
.pulse-bubble-3 {
    animation: pulse .4s ease .4s infinite alternate;
}


</style>
