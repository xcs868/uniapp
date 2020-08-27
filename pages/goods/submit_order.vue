<template>
	<view class="warp flex-column">
		<view class="concant flex-row" v-if="contactList.length" @click="show=true">
		  <u-icon name="map" color="#999" size="40"></u-icon>
		  <view class="left">
			  <view class="top">{{currentContact.name}}   {{currentContact.mobile}}</view>
			  <view class="bottom">{{currentContact.address_name}}</view>
		  </view>
		  <u-icon name="arrow-right" color="#999" size="30"></u-icon>
	    </view>
		<view class="concant flex-row" v-else @click="show=true">
			<u-icon name="plus-square-fill" color="#1989fa" size="80"></u-icon>
			<view class="left">请添加收获地址</view>
			<u-icon name="arrow-right" color="#999" size="30"></u-icon>
		</view>
		
		<view class="goods-info mt20">
			<view class="title">商品信息</view>
			<view class="list flex-column">
				<view class="list-item flex-row" v-for="item in goodsList" :key="item.goods_id">
					<image class="goods-img" :src="item.goods_img" mode=""></image>
					<view class="list-content flex-column">
						<view class="list-content-top flex-row">
							<view class="goods-name">{{item.goods_name}}</view>
							<view class="goods-count">x{{item.RedisCount}}</view>
						</view>
						<view class="goods-specs">500g/盒</view>
						<view class="goods-pirce">￥{{item.shop_price}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="goods-info mt20">
			<view class="title">订单信息</view>
			<view class="order flex-column">
				<view class="item flex-row">
					<view class="key">商品合计：</view>
					<view class="val">¥{{heji | money}}</view>
				</view>
				 <view class="item flex-row">
					<view class="key">运费：</view>
					<view class="val">¥{{postMoney | money}}</view>
				</view>
				<!--
				<view class="item flex-row">
					<view class="key">优币抵扣：</view>
					<view class="val">¥198.00</view>
				</view>
				<view class="item flex-row">
					<view class="key">活动优惠：</view>
					<view class="val">¥{{188.5 | money}}</view>
				</view> -->
			</view>
		</view>
		<view class="jifen mt20 flex-row" v-if="is_doctor == 1">
			<view class="key">积分抵扣：</view>
			<view class="val flex-row" style="align-items: center;">
				<view class="">当前{{integral}}积分,10积分抵扣1元</view>
				<u-switch v-if="integral > 9" v-model="is_deduction" @change="userInt" :size="40"></u-switch>
			</view>
		</view>
	
		<view class="bottom-bar flex-row">
			<view class="totalMoney flex-row">
				<view class="">应付金额</view>
				<view class="money flex-row">
					<view class="symbol">￥</view>
					<view class="" v-if="is_doctor == 1">{{actual_money | money}}</view>
					<view class="" v-else>{{payMoney | money}}</view>
				</view>
			</view>
			<view class="submit" @tap="subimtOrder">提交订单</view>
		</view>
		<u-popup v-model="show" mode="bottom">
			<v-contact-list 
				:list="contactList" 
				:currentIndex="currentIndex" 
				@edit="edit"
				@addContact="addContact" 
				@select="select"></v-contact-list>
		</u-popup>
		<u-popup v-model="showAdd" mode="bottom">
			<v-edit-contact @apiAdd="apiAdd" ></v-edit-contact>
		</u-popup>
		<u-popup v-model="showEdit" mode="bottom">
			<v-edit-contact :editContact="editContact" :isEdit="true" @apiEdit="apiEdit"></v-edit-contact>
		</u-popup>
	</view>
</template>

<script>
	import vContactList from '@/components/vContactList.vue'
	import vEditContact from '@/components/vEditContact.vue'
	
	
	export default{
		
		components: {
			vContactList,
			vEditContact
		},
		data(){
			return{
				is_deduction:false, //是否用积分抵扣
				is_doctor:0,
				integral:0, //积分
				integralMoney:0, //积分兑换10积分1元
				type:1, //默认为1立即下单  2购物车下单	
				openid:'',
				user_id : uni.getStorageSync('USER_ID'),
				showEdit:false,
				showAdd:false,
				show:false,
				currentIndex:'',  //当前联系人下标
				currentContact:{}, //当前联系人
				editContact:{}, //修改的联系人

				goodsList:[],
				postMoney:10  ,//运费
				contactList:[] 
			}
		},
		created(){
			this.getContactList()
			this.getUserNews()
		},
		watch:{
			currentContact(newVal, old){
				this.contactList.forEach((item,index) => {
					if(item.id == newVal.id){
						this.currentIndex = index
					}
				})
			}
		},
		computed:{
			//合计
			heji(){
				let _heji = 0;
				this.goodsList.forEach(item => {
					_heji += ((item.shop_price * 100 ) * item.RedisCount) /100
				})
				return _heji
			},
			//支付
			payMoney(){
				return this.heji + this.postMoney 
			},
			//医生实付金额
			actual_money(){
				// this.integralMoney
				// this.payMoney 
				//当兑换金额 >= 支付金额时   实付金额0
				if(this.integralMoney >= this.payMoney){
					 return  0
				}else {
					//当兑换金额不够  微信支付剩余金额
					// console.log(this.payMoney,'a:this.payMoney')
					// console.log(this.integralMoney,'a:this.integralMoney')

					let a=  ((this.payMoney * 100) - (this.integralMoney * 100)) / 100  
					// console.log(a,'aaa')
					return  a
				}
			}
			
		},
		onLoad(e){
			let goods = JSON.parse(e.goods);
			Array.isArray(goods) ?
				this.goodsList = goods :
				this.goodsList.push(goods);
			this.type = e.type || 1;  
		},
		methods:{
			//使用积分
			userInt(){
				if(this.is_deduction){
					this.integralMoney = Math.floor(this.integral / 10); //积分兑换金额
					
				}else{
					this.integralMoney = 0
				}
			},
			apiEdit(item){
				this.$api.apiEditAddress({
					user_id:this.user_id,
					...item
				}).then(res => {
					if(res.code == 200){
						this.myToast(res.msg)
						this.show = true;
						this.showEdit = false;
						this.getContactList()
					}
				})
			},
			edit(id){
				//获取单个联系人详情
				this.$api.apiOneAddress({
					user_id:this.user_id, 
					id
				}).then(res => {
					if(res.code == 200){
						this.editContact = res.data;
						this.show = false
						this.showEdit = true
					}
				})
			},
			select(currentContact){
				this.currentContact = currentContact;
				this.show = false;
			},
			apiAdd(contact){
				let _this = this;
				this.$api.apiAddAddress({
					user_id:this.user_id,
					...contact
				}).then(res => {
					if(res.code == 200){
						this.myToast(res.msg);
						this.getContactList(function(){
							_this.currentContact = _this.contactList.filter(item => item.id == res.id)[0];
							_this.showAdd = false;
						})
					}
				})
			},
			addContact(){
				this.show = false;
				this.showAdd = true;
			},
			// 提交订单
			subimtOrder:function(){
				console.log('支付'+this.payMoney)
				console.log('实付'+this.actual_money)
				var _this = this
				// console.log(this.currentContact,'data')
				let address_id = this.currentContact.id;
				if(!address_id){
					this.myToast('请选择收获地址!')
					return
				}
				uni.requestSubscribeMessage({
				  tmplIds: ['EYDutTsxHRrP_f5v-TBwROGs-eWnMlMHf6kmm1bqPkI'],
				  success (res) {
					  let send_type = 0
					  if(res.errMsg == 'requestSubscribeMessage:ok' && res['EYDutTsxHRrP_f5v-TBwROGs-eWnMlMHf6kmm1bqPkI'] == 'accept' ){
						  //同意订阅
						  console.log(res.errMsg,'同意')
						  send_type = 1
					  }else{
						  console.log(res.errMsg,'不同意')
						  send_type = 0
					  }
					  uni.login({
						success: result => {
							_this.payOrder(result.code,address_id,send_type)
						}
					  })
				  }
				})
			},
			//
			payOrder:function(code,address_id,send_type){
				var _this = this
				_this.$api.apiPayCallback({
					code
				}).then(res => {
					if(res.code == 200){
						_this.openid = res.openid
					}
				
					// console.log(_this.goodsList,'goodList')
					// console.log(_this.openid,'openid')
					let money  = (_this.payMoney * 100).toFixed(0)
					let actual_money =  (this.actual_money * 100).toFixed(0)
			
					
					var postData  = {
						type:_this.type,
						goods_data : JSON.stringify(_this.goodsList),
						openid:_this.openid,
						user_id:_this.user_id,
						money:money,
						address_id:address_id,
						send_type:send_type,
						
					}
					//user_id，money，actual_money，openid，goods_data，type，address_id，send_type，is_deduction
					//普通用户
					if(this.is_doctor == 0){
						_this.ApiCreatOrder(postData)
						return
					}
					
					//医生
					if(this.is_doctor == 1){
						//actual_money实际付款 = money付款金额 - 减去积分抵扣
						//是否使用抵扣 1/0
						let doctorPostData = Object.assign(postData,{
							actual_money:actual_money,
							is_deduction:Number(this.is_deduction)
						})
			
						this.ApiDoctorPayOrder(doctorPostData)
					}
					
					
					return
				})
			},
			//普通用户下单
			ApiCreatOrder(data){
				this.$api.apiPayOrder(data).then(res => {
					// console.log(res)
					if(res.code == 200){
						// #ifdef MP-WEIXIN
						this.pay(res.data)
						// #endif
					}else{
						this.myToast(res.msg)
					}
				})
			},
			//医生下单
			ApiDoctorPayOrder(data){
				
				this.$api.apiDoctorPayOrder(data).then(res => {
					
					if(res.code == 200 ){
						//积分抵扣不够 wx支付剩余金额 
						if(res.is_weixin){
							// #ifdef MP-WEIXIN
							this.pay(res.data)
							// #endif
						}else{
							this.navigateToAction('/pages/order/pay_success');
						}
						
					}else{
						this.myToast(res.msg)
					}
				})
			},
			// 小程序支付
			pay (data) {
				let _this = this;
				// #ifdef MP-WEIXIN
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: data.data,
					timeStamp: data.timeStamp,
					nonceStr: data.nonceStr,
					package: data.package,
					signType: data.signType,
					paySign: data.paySign,
					_debug: 1,
					success(res) {
						//跳转到支付成功页面
						_this.navigateToAction('/pages/order/pay_success');
					},
					fail(err) {
						console.log(err, 'errres');
						let msg = '';
						if(err.errMsg == 'requestPayment:fail cancel') {
							msg = '支付失败，原因为：用户取消支付'
						}else{
							msg = '支付失败，原因为：' + err.errMsg
						}
						_this.confirmAlert('', msg, false, function(){
							//跳转订单页面 待支付
							_this.navigateToAction('/pages/order/order_list')
						});
					}
				})
				// #endif
			},
			getContactList(callback){
				this.$api.apiAddress({
					user_id:this.user_id
				}).then(res => {
					this.contactList = res.list;
					if(this.contactList.length){
						let currentContactList = this.contactList.filter(item => item.send_status == 1);
						if(currentContactList.length){
							this.currentContact = currentContactList[0]
						}else{
							this.currentContact = this.contactList[0]
						}
						callback&&callback()
					}
					
				})
			},
			//用户信息
			getUserNews:function(){
				this.$api.apiUserInfo({
					user_id:this.user_id
				}).then(res => {
					
					if(res.code == 200){
						this.is_doctor = res.user.is_doctor ;
						this.integral = res.user.integral;
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mt20{
		margin-top: 20rpx;
	}
	.warp{
		width: 100%;
		min-height: 100vh;
		background: #f5f5f5;
		font-size: 24rpx;
		color: #333333;
		box-sizing: border-box;
		padding-bottom: 100rpx;
		.concant{
			margin-top: 20rpx;
			background: #fff;
			padding: 26rpx ;
			font-size: 30rpx;
			align-items: center;
			position: relative;
			&::before{
			  position: absolute;
			  right: 0;
			  bottom: 0;
			  left: 0;
			  height: 2px;
			  background: -webkit-repeating-linear-gradient(135deg,#ff6c6c 0,#ff6c6c 20%,transparent 0,transparent 25%,#1989fa 0,#1989fa 45%,transparent 0,transparent 50%);
			  background: repeating-linear-gradient(-45deg,#ff6c6c 0,#ff6c6c 20%,transparent 0,transparent 25%,#1989fa 0,#1989fa 45%,transparent 0,transparent 50%);
			  background-size: 100px;
			  content: '';
			}
			.left{
				flex: 1;
				margin-left: 20rpx;
				.top{
				  font-size: 28rpx;
				  line-height: 50rpx;
				}
				.bottom{
				  font-size: 26rpx;
				   line-height: 50rpx;
				}
			}
		}
		
		.goods-info{
			background-color: #fff;
			.title {
				padding: 20rpx 0 20rpx 40rpx;
				border-bottom: 1px solid #EEEEEE;
				color: #7F7F7F;
			}
			.list-item{
				box-sizing: border-box;
				padding: 20rpx 40rpx;
				
				.goods-img{
					width: 160rpx;
					height: 160rpx;
				}
				.list-content{
					flex: 1;
					box-sizing: border-box;
					padding-left: 40rpx;
					justify-content: space-around;
					.list-content-top{
						justify-content: space-between;
						align-items: center;
						font-size: 26rpx;
						.goods-name{
							font-weight: bold;
						}
						.goods-count{
							color: #7F7F7F;
						}
					}
					.goods-specs{
						color: #B3B3B3;
					}
					.goods-pirce{
						color: #DB3204;
					}
				}
			}
			.order{
				.item{
					padding: 10rpx 40rpx;
					.key{
						width: 200rpx;
					}
					.val{
						flex: 1;
						color: #B3B3B3;
					}
				}
			}
		}
		
		.jifen{
			padding: 5px 20px;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
		}
		.bottom-bar{
				position: fixed;
				width: 100%;
				height: 100rpx;
				bottom: 0;
				background-color: #fff;
				box-shadow:-1px -1px 3px 0px #999;
				.totalMoney{
					flex: 1;
					font-size: 28rpx;
					color: #818183;
					align-items: center;
					box-sizing: border-box;
					padding-left: 40rpx;
					.money{
						color: #DB3204;
						font-size: 32rpx;
						align-items: baseline;
						margin-left: 10rpx;
						.symbol{
							font-size: 20rpx;
						}
					}
				}
				.submit{
					width: 280rpx;
					height: 100rpx;
					text-align: center;
					line-height: 100rpx;
					color: #fff;
					font-size: 28rpx;
					background-color: #15292B;
				}
			}
		
		
		
	}
	
</style>
