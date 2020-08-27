<template>
	<view class="warp">
		<view class="article">
			<view class="banner">
				<image :src="article.thumbs" mode=""></image>
			</view>
			<view class="title">{{article.title}}</view>
			<view class="flex-row authorwarp">
				<view class="avatar flex-row">
					<image class="avatar-img" :src="article.weixinface || avatar" mode=""></image>
					<view class="flex-column">
						<view class="name">{{article.author}}</view>
						<view class="time">{{article.created_time}}</view>
					</view>
				</view>
				<view class="flex-row">
					<view class="iconfont icon_like " :class="article.is_follow ? 'icon-shoucang':'icon-unshoucang' " @click="follow"></view>
					<!-- <view class="flex-row follow" style="align-items: center;">
						<view class="iconfont icon-eye"></view>
						<view class="val">{{article.click_count}}</view>
					</view> -->
				</view>
				
			</view>
			
			<view class="content">
				<rich-text :nodes="article.content"></rich-text>
			</view>
		</view>
		<!-- 
		<view class="rating">
			<view class="head">评论（120）</view>
			<view class="rating-list flex-column">
				<view class="rating-item flex-column" >
					<view class="avatar flex-row">
						<image class="avatar-img" src="http://imgsg.qichuanqing.cn/v1/doctor/avatar-user.png" mode=""></image>
						<view class="flex-column">
							<view class="name">Diana</view>
							<view class="time">2020/07/03 17:39</view>
						</view>
					</view>
					<view class="rating-text">
						  而中国进入全球市值百强公司中，高科技和互联网公司只有3家（分别为阿里巴巴、腾讯、台积电），金融公司高达8家。
					</view>
					<view class="flex-row bottom">
						<view class="flex-row follow">
							<view class="iconfont icon-good"></view>
							<view class="val">23</view>
						</view>
						<view class="flex-row follow">
							<view class="iconfont icon-code"></view>
							<view class="val">23</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	 -->
	</view>
</template>

<script>
	export default {
		data(){
			return {
				avatar:'http://imgsg.qichuanqing.cn/v1/userPersonal/avatar-doctor.png',
				id:'',
				article:{},
				user_id:uni.getStorageSync('USER_ID'),
			}
		},
		onLoad(e){
			console.log(e)
			this.id = e.id;
			this.getRead()
		},
		methods:{
			follow(){
				var _this = this
				this.$api.apiNewsFollow({
					user_id:this.user_id ,
					doctor_uid:this.article.doctor_uid , 
					article_id:this.id
				}).then(res => {
					this.myToast(res.msg)
					if(res.code == 200){
						setTimeout(function(){
							_this.getRead()
						},1800)
					}
				})
			},
			getRead(){
				this.$api.apiGetRead({
					id:this.id,
					user_id:this.user_id
				}).then(res => {
					console.log(res)
					this.article = res.data;
					// 替换无法解析的标签
					this.article.content = this.article.content.replace(/target="_blank"/g, 'target=""');
					this.article.content = this.article.content.replace(/<img/g, '<img mode="widthFix" class="publicity-img" style="width: 100%;"')
					this.article.content = this.article.content.replace(/width="605"/g, 'width="100%"')
					this.article.content = this.article.content.replace(/height="466"/g, ' ')
					this.article.content = this.article.content.replace(/font-size:13px;/g, 'font-size:14px;')
					this.article.content = this.article.content.replace(/font-size:12px;/g, 'font-size:14px;')
				})
			}
		}
	}
</script>
<style>
.publicity-img {
  width: 100%;
  height: 100%;
}
.weui-cells {
	/* margin-top: 1.17647059em; */
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 17px;
    overflow: hidden;
    position: relative;
}

.dialog {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10000;
	background: rgba(0,0,0,.5);
}
</style>
<style lang="scss">
	.warp{
		color: #333333;
		padding: 0 30rpx;
		.banner{
			width: 100%;
			image{
				width: 100%;
			}
		}
		.article{
			padding-bottom: 20rpx;
			border-bottom: 1px solid #eee;
			.title{
				font-size: 36rpx;
				margin-top: 20rpx;
			}
			
			
			.authorwarp{
				margin: 60rpx 0;
				align-items: center;
				justify-content: space-between;
				.icon-shoucang{
					color: #ff5959;
				}
				.icon_like{
					font-size: 20px;
				}
				.icon-eye{
					font-size: 18px;
					margin: 0;
				}
				.val{
					font-size: 28rpx;
				}
				.avatar{
					align-items: center;
					.name{
						font-size: 26rpx;
						margin-bottom: 10rpx;
					}
					.time{
						font-size: 22rpx;
						color: #808080;
					}
					.avatar-img{
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
				}
			}
			.content{
				font-size: 28rpx;
				
				
				img{
					width: 100%!important;
				}
			}
			
		}
		
		.rating{
			margin-top: 30rpx;
			font-size: 24rpx;
			color: #333;
			.rating-list{
				.rating-item{
					border-bottom: 1px solid #eee;
					padding: 15rpx 0;
					.avatar{
						align-items: center;
						.name{
							font-size: 26rpx;
							margin-bottom: 10rpx;
						}
						.time{
							font-size: 22rpx;
							color: #808080;
						}
						.avatar-img{
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin-right: 20rpx;
						}
					}
					.rating-text{
						color: #808080;
						font-size: 24rpx;
						margin: 15rpx 0;
					}
					// .bottom{
					// 	color: #B3B3B3;
					// 	font-size: 22rpx;
					// 	justify-content: flex-end;
					// 	.follow{
					// 		align-items: baseline;
					// 		margin-left: 20rpx;
					// 		.iconfont{
					// 			font-size: 18px;
					// 			margin-right: 5rpx;
					// 		}
					// 	}
					// }
				}
						
			}
			
		}
	}
</style>
