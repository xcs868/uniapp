<template>
	<view class="warp flex-column">
		<!-- <view class="default item flex-row mt20">
			<view class="default-l flex-column">
				<view class="default-l-t flex-row mb15">
					<u-icon name="account-fill" :size="iconSize" :color="iconColor"></u-icon>
					<view class="name">大宝</view>
					<view class="iphone">18888888888</view>
					<view class="default-icon">默认</view>
				</view>
				<view class="default-l-b flex-row">
					<u-icon name="map-fill" :size="iconSize" :color="iconColor"></u-icon>
					<view class="address">上海市浦东新区陆家嘴十楼</view>
				</view>
			</view>
			<u-icon name="edit-pen" color="#666" size="46"></u-icon>
		</view> -->
		<view class="list flex-column" v-if="list.length">
			<view class="item flex-row mt20" v-for="(item,index) in list" :key="item.id" >
				<view class="default-l flex-row" @click="select(item,index)">
					<view class="iconfont icon-xuanze " :class="{'icon-xuanzhong':currentIndex == index}" style="font-size: 18px;" ></view>
					<view class="default-l-b flex-column">
						<view class="name flex-row">{{item.name}}   {{item.mobile}} <view class="default-icon" v-if="item.send_status">默认</view></view>
						<view class="address">{{item.address_name}}</view>
						
					</view>
				</view>
				<u-icon name="edit-pen" color="#666" size="46" @click="updata(item)"></u-icon>
			</view>
		</view>
		<view class="" v-else>
			<u-empty text="暂无联系人,赶快添加吧" mode="list"></u-empty>
		</view>
		<view class="fiex-footer">
			<view class="add" @click="add">
				<u-icon name="plus-circle" size="40" color="#fff"></u-icon>
				添加新收货人
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default(){
					return []
				}	
			},
			currentIndex:{
				type: [String, Number],
				default:''
			}
		},
		data(){
			return{
				iconColor:'#888',
				iconSize:32,
				
				
				
				
			}
		},
		methods:{
			add(){
				this.$emit('addContact')
			},
			select(item, index){
				this.current = index;
				this.$emit('select',item)
			},
			updata(item){
				this.$emit('edit',item.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	@import url("../common/iconfont.css");
	.mb15{
		margin-bottom: 15rpx;
	}
	.mt20{
		margin-top: 20rpx;
	}
	.icon-xuanzhong{
		color: #E8C593;
	}
	
	.warp{
		min-height: 100vh;
		box-sizing: border-box;
		background-color: #F8F8F8;
		position: relative;
		padding-bottom: 100rpx;
		// &::after{
		// 	position: absolute;
		// 	right: 0;
		// 	top: 0;
		// 	left: 0;
		// 	height: 2px;
		// 	background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
		// 	background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
		// 	background-size: 100px;
		// 	content: '';
		// }
		.list{
			.default-l{
				align-items: center;
				.name,.address{margin-left: 0;}
				.default-l-b{
					align-items: flex-start;
					margin-left: 15rpx;
				}
			}
		}
		.fiex-footer{
			width:100%;
			height:100rpx;
			background:#fff;
			box-shadow:0px 2px 21px 0px rgba(0, 0, 0, 0.15);
			position: fixed;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;


			.add{
				width:480rpx;
				height:55rpx;
				background:#E8C593;
				border-radius:20rpx;
				font-size: 30rpx;
				color: #fff;
				text-align: center;
				line-height: 55rpx;

			}
		}
		.item{
			box-sizing: border-box;
			padding: 30rpx 40rpx;
			background-color: #fff;
			align-items: center;
			justify-content: space-between;
			font-size: 26rpx;
			.default-l-t,.default-l-b{
				align-items: center;
			}
			.name,.iphone{
				font-size: 30rpx;
				color: #858789;
				margin-left: 10rpx;
			} 
			.default-icon{
				color: #D4B790;
				font-size: 26rpx;
				border: 1px solid;
				margin-left: 15rpx;
				padding: 2rpx 15rpx;
				border-radius: 10rpx;
			}
			.address{
				margin-left: 10rpx;
				color: #333333;
			}
		}
	}
</style>
