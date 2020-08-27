<template>
	<view class="">
		<div class="box rules">
			<p class="title">热门问题</p>
			<div class="cells">
				<div class="cell" v-for="(item, index) in list" :key="index">
					<div class="list" :class="{'active': item.show}" @tap="showRule(item)">
						<!-- <div class="name">
							<span v-for="(name, index_title) in item.title" :key="name">{{name}}</span>
						</div> -->
						<div class="text">
							{{item.desc}}
							<uniIcon type="forward" size="20" class="icon" :color="item.show ? '#1aad19' : '' " v-if="item.text"></uniIcon>
						</div>
					</div>
					<div class="descs" v-if="item.show && item.text">
						<span class="triangle"></span>
						<div class="desc">{{item.text}}</div>
						<!-- <div class="desc" v-for="(text, index_text) in item.text" :key="text" v-else>
							<span class="num">（{{index_text+1}}）</span> 
							<p>{{text}}</p> 
						</div> -->
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniIcon,
		},
		data(){
			return{
				list:[{
						title: '',
						desc: '交易过程中不能付款？',
						text: '1.订单被关闭,可能是触发了某种规则,或者商家库存不足等等!',
						show: false,
					},{
						title: '',
						desc: '会员名无法修改',
						text: '膳贡平台暂未开放会员名称修改功能，给您带来的不便请您谅解!',
						show: false,
					},{
						title: '',
						desc: '无法使用微信支付？',
						text:'无法使用微信支付，可能是因为网络问题，请您退出膳贡小程序再次进入点击下单支付哦！',
						show: false,
					},{
						title: '',
						desc: '如何修改会员体质？',
						text:'修改会员头像请您登录膳贡小程序后点击个人中心->我的体质->点击重新评测',
						show: false,
					},{
						title: '',
						desc: '如何代管家人朋友？',
						text:'1.可在首页点击浮层选择+号添加。2.在个人中心->我的体质->点击加号新增成员哦！',
						show: false,
					},{
						title: '',
						// desc: `膳贡平台将在后续推出医生端以及优惠券等功能，让医生购物的同时还能享受补贴优惠!`,
						desc: ``,
					}]
			}
		},
		methods:{
			showRule(item){
				if ( item.text ) {
					item.show = !item.show
				} else{
					
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.box{
		background: #fff;
		margin: 20px 7px;
		border-radius: 10px;
		padding: 11px 16px;
		.title{
			font-size: 18px;
			color: #333;
			font-weight: bold;
			margin-bottom: 5px;
		}
		.cells{
			.cell{
				border-top: 1px solid #d6d6d6;
				.list{
					padding: 8px 0;
					display: flex;
					align-items: center;
					font-size: 13px;
					.name{
						margin-right: 20px;
						color: #333;
					}
					.text{
						line-height: 1.3;
						color: #707070;
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: space-between;
						p{
							flex: 1;
						}
						.icon{
							color: #333;
							transform: translateY(1px);
						}
					}
				}
				.active{
					.text{
						color:'#ccc';
						.icon{
							color: '#ccc';
							transform: rotate(90deg);
						}
					}
				}
				.descs{
					margin-bottom: 10px;
					position: relative;
					background: #e6e6e6;
					border-radius:5px;
					font-size: 12px;
					line-height: 1.6;
					color: #333;
					padding: 8px 17px 8px 6px;
					.triangle{
						border-width: 8px;
						border-style: dashed dashed solid;
						border-color: transparent transparent #e6e6e6;
						position: absolute;
						top: -16px;
						left: 15px;
					}
					.desc{
						display: flex;
						margin: 4px 0;
					}
				}
			}
		}
	}
	.rules{
		.name{
			width: 4.4em;
			display: flex;
			align-items: center;
			justify-content: space-between;
			span{
				line-height: 1.3;
			}
		}
	}
</style>
