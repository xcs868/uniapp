<template>
	<view class="mask ">
		<view class="" v-if="isLogin">
			<view class="empty-car" v-if="shoppingCar.length < 1 ">
				<u-empty   text="您的购物车空空如也~" mode="car"></u-empty>
			</view>
			<uni-swipe-action class="flex-column">
			    <uni-swipe-action-item :options="options" @click="del(item, $event)" class="mb10" v-for="item in shoppingCar" :key="item.goods_id">
					<view class="goods-warp flex-row">
						<u-checkbox v-model="item.checked"  icon-size="30" shape="circle" active-color="#E8C593"></u-checkbox>
						<image class="goodsimg" :src="item.goods_img" mode=""></image>
						<view class="text">
							<view class="goods-name">{{item.goods_name}}</view>
							<view class="goods-weight grace-ellipsi" style="width: 400rpx;">{{item.goods_brief}}</view>
							<view class="goods-price-warp flex-row">
								<view class="goods-price">￥{{item.shop_price}}</view>
								<u-number-box 
								:min="1" disabled-input 
								v-model="item.RedisCount" @change="changeCount(item,$event)" 
								size="22"></u-number-box>
							</view>
						</view>
					</view>
			    </uni-swipe-action-item>
			    
				
			</uni-swipe-action>
			<view class="submit-bar" v-if="shoppingCar.length > 0">
				<view class="flex-row submit">
					<label ><u-checkbox  v-model="checkAllFlag"  icon-size="30" shape="circle" active-color="#E8C593">全选</u-checkbox> </label>
					<view class="flex-column pricewarp">
						<view class="totalPrice flex-row">商品总价  <view class="price flex-row"><view class="rnb">￥</view>{{totalPrice}}</view></view>
						<view class="express">已免配送费</view>
					</view>
					<view class="goPay" @click="gopay">去结算</view>
				</view>
			</view>
				
		</view>
		<v-login @gologin="login" v-else></v-login>
	</view>
</template>
<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import vLogin from '@/components/vLogin.vue'
	export default {
		components:{
			uniSwipeAction,
			uniSwipeActionItem,
			vLogin
		},
		data() {
			return {
				show:true,
				isLogin:true,
				total:0,
				options: [{
				            text: '删除',
				            style: {
				                backgroundColor: '#dd524d'
				            }
				        }],
				// 总价
				totalprice : '',
				// 购物车数据 可以来自 api 请求或本地数据
				shoppingCar : []
			}
		},
		onLoad : function(){
			// 初始化时候计算总价，如果使用api 获取购物车项目在 api 请求完成后执行此函数

		},
		onShow:function(){
			//是否登录
			if(!uni.getStorageSync('USER_ID')){
				this.isLogin = false
			}else{
				this.isLogin = true
				//获取购物车列表
				this.getCartList()
			}
		},
		computed:{
			//是否全选
			checkAllFlag:{
				set(val){
					this.shoppingCar.forEach((item)=>{
					  item.checked = val ;
					})
				},
				get(){
					return this.checkedCount == this.shoppingCar.length;
				}
				
			},
		    checkedCount(){
				var i = 0;
				this.shoppingCar.forEach(item =>{
				  if(item.checked)i++;
				})
				return i;
			},
			//总金额
			totalPrice(){
				let total = 0;
				this.shoppingCar.forEach(item => {
					if(item.checked){
						total += ( item.shop_price * 100) * item.RedisCount
					}
				})
				return total / 100
			},
		},
		methods:{
			gopay(){
				if(!this.checkedCount){
					this.myToast('请选择商品!');
					return
				}
				let selectShoppingCar = this.shoppingCar.filter(item => item.checked);
				
				this.navigateToAction('/pages/goods/submit_order?goods='+JSON.stringify(selectShoppingCar)+'&type=2')
			},
			//获取购物车数据
			getCartList:function(){
				this.$api.apiCartList({
					user_id:uni.getStorageSync('USER_ID')
				}).then(res => {
					if(res.code == 200){
						this.shoppingCar = res.list
					}
				})
			},
			//加减
			changeCount(item,e){
				item.RedisCount = e.value;
			},
			//删除
			del(obj){
			  console.log(obj)
			  let goods_id = obj.goods_id
			  uni.showModal({
			      title: '确认提示',
			      content: '确定删除该商品吗？',
			      success:(res) => {
			          if (res.confirm) {
			              // console.log('用户点击确定');
						  this.shoppingCar = this.shoppingCar.filter(item => item.goods_id != goods_id)
						  this.$api.apiDelCart({
							  goods_id:goods_id,
							  user_id:uni.getStorageSync('USER_ID')
						  }).then(res =>{
							 if(res.code == 200){
								 this.myToast(res.msg)
							 }else{
								this.myToast(res.msg)
							 }
						  })
			          } else if (res.cancel) {
			              console.log('用户点击取消删除购物车操作');
			          }
			      }
			  });
			},
		}
	}
</script>
<style lang="scss" scoped>
	.uni-swipe{
		width: 100%;
	}
	.mb10{
		margin-bottom: 10rpx;
		display: block;
	}
	.mask{
		display: flex;
		flex-direction: column;
		background: #EDEDED;
		min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 100rpx;
	}
	.empty-car{
		margin-top: 300rpx;
	}
	.goods-warp{
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx 30rpx;
		.goodsimg{
			width: 160rpx;
			height: 160rpx;
			margin-left: 30rpx;
		}
		.text{
			flex: 1;
			box-sizing: border-box;
			padding-left: 30rpx;
			justify-content: space-between;
			display: flex;
			flex-direction: column;
			height: 100%;

			.goods-name{
				color: #858789;
				font-size: 24rpx;
				font-weight: bold;
			}
			.goods-weight{
				font-size: 24rpx;
				color: #B3B3B3;
				
			}
			.goods-price-warp{
				justify-content: space-between;
				align-items: center;
				.goods-price{
					color: #DB3204;
					font-size: 22rpx;
					font-weight: bold;
				}
			}
			
		}
	}
	.submit-bar{
		position: fixed;
		width: 100%;
		height: 100rpx;
		bottom: 0;
		/* #ifndef MP-WEIXIN */
		bottom: 49px;
		/* #endif */
		
		box-sizing: border-box;
		background-color: #fff;
		padding-left:40rpx ;
		.submit{
			align-items: center;
			.pricewarp{
				flex: 1;
				margin-right: 15rpx;
				.totalPrice{
					font-size: 28rpx;
					color: #818183;
					justify-content: flex-end;
					.price{
						color: #DB3204;
						align-items: baseline;
						.rnb{
							font-size: 20rpx;
						}
					}
				}
			}
			.express{
				font-size: 20rpx;
				color: #818183;
				text-align: right;
			}
			.goPay{
				width: 200rpx;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				background-color: #15292B;
				color: #fff;
				font-size: 24rpx;
			}
		}
		
	}
</style>

 
 
