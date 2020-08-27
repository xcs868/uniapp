<template>
	<view>
		<div class="banner">
			<image :src="thumbs" mode="widthFix" style="width: 100%;"></image>
			<h3>{{ title }}</h3> 
			<p>{{ author }} : {{ addTime }}</p>
		</div>
		<div>  
			<div class="weui-cells vux-no-group-title"> 
				<div class="weui-panel weui-panel_access">  
					<div class="weui-panel__bd">
						<div class="vux-card-content">
							<div class="data">
								<p class="data-content">
									<rich-text :nodes="content"></rich-text>
									<!-- <u-parse :html="content" :tag-style="style"></u-parse> -->
								</p>
							</div>
						</div>
					</div> 
					<div class="weui-panel__ft"></div> 
				</div>
			</div> 
		</div>
		
		<!-- <div class="dialog" style="" v-if="share_mask" @tap="clickShareMask">
			<div class="img-content">
				<img src="https://img.kags.cn/static/imgv4/share.png" width="100%" height="100%">
			</div>
		</div> -->
	</view>
</template>

<script>
	
	export default {
		data () {
			return {
				style: {
					// 字符串的形式
					p: 'color: red;font-size:32rpx',
					span: 'font-size: 30rpx'
				},
				title: '测试',
				author: 'Mr.lei',
				info: {},
				content: '',
				thumbs: 'http://imgsg.qichuanqing.cn/v1/userPersonal/userBanner.jpg',
				addTime: '2020-07-07',
				id:0,
				mp_share: {},// 小程序分享设置初始化
				share_mask: false
			}
		},
		onLoad(obj) {
			this.id = obj.id;
			
			//加载数据
			this.getReadNews(this.id);
		
		},
		onNavigationBarButtonTap(e) {
			
		},
		// 小程序分享
		onShareAppMessage() {
			return {
				title: this.mp_share.title,
				path: this.mp_share.path
			}
		},
		onPullDownRefresh() {
			// this.getReadNews(this.id, this.community_id)
		},
		methods: {
			clickShareMask () {
				this.share_mask = false
			},
			getReadNews(id) {
				let _this = this;
				
				this.$api.apiGetNewsRead({
					id
				}).then(response => {
					if(response.code !== 200) {
						this.myToast(response.msg);
						//关闭下拉刷新
						uni.stopPullDownRefresh();
						return true;
					} else {
						let data = response.data
						// console.log(data,'data')
						// return
						//关闭下拉刷新d
						uni.stopPullDownRefresh();
						
						_this.info = data
						_this.content = data.content
						_this.title = data.title
						_this.author = '膳贡平台'
						_this.thumbs = data.thumbs
						_this.addTime = data.created_time.substr(0, 10)
						
						// 替换无法解析的标签
						_this.content = _this.content.replace(/target="_blank"/g, 'target=""');
						// _this.content = _this.content.replace(/https/g, 'http');
						// _this.content = _this.content.replace(/<a/g, '<navigator');
						// _this.content = _this.content.replace(/<navigator>/g, '<\/navigator>');
				
						
						_this.content = _this.content.replace(/<img/g, '<img mode="widthFix" class="publicity-img" style="width: 100%;"')
						_this.content = _this.content.replace(/width="605"/g, 'width="100%"')
						_this.content = _this.content.replace(/height="466"/g, ' ')
						_this.content = _this.content.replace(/font-size:13px;/g, 'font-size:14px;')
						_this.content = _this.content.replace(/font-size:12px;/g, 'font-size:14px;')
						
									
						//动态设置导航栏标题
						// uni.setNavigationBarTitle({
						// 	title: _this.title
						// })
						if (_this.thumbs === '' || _this.thumbs === null) {
							_this.thumbs = 'http://img.kags.cn/static/imgv4/index.jpg'
						}
					
						// 将所有的img加上class以便于操作
						_this.content = _this.content.replace(/<img/g, '<img class="publicity-img" ')
						// #ifdef MP-WEIXIN
							this.mp_share.title = _this.title
							this.mp_share.path = '/pages/news/detail?id=' + this.id
						// #endif
					}
				})
			}
		},
	}
</script>

<style lang="less">
	.kags-info {
	  padding: 20px 10px;
	  font-size: 14px;
	}
	.banner {
	  margin-top: 0;
	  background-color: #fff;
	
	  img {
	    width: 100%;
	  }
	
	  h3 {
	    font-weight: normal;
	    color: #00B26A;
	    letter-spacing: 0.5px;
	    padding:5px  20px;
		font-size: 35rpx;
	  }
	  p {
	    color: #bbb;
	    font-size: 14px;
	    padding:7px  20px;
	  }
	  span {
	    font-size: 13px;
	  }
	}
	.kags-info-img {
	  text-align: center;
	  padding-top: 5px;
	}
	.kags-visit {
	  padding: 20px 15px;
	  p {
	    padding-bottom: 10px;
	    text-align: left;
	  }
	}
	.kags-timeline-item {
	  p {
	    margin-left: 4px;
	  }
	  .content {
	    margin-top: 3px;
	    color: #444;
	  }
	}
	.kags-keynode {
	  font-weight: normal;
	}
	.kags-timeline-card {
	  padding: 0;
	}
	.kags-timeline {
	  padding: 25px 15px 0 25px;
	  font-size: 14px;
	}
	.data {
	  padding: 15px 20px;
	  h3 {
	    font-weight: normal;
	    margin-top: 10px;
	    margin-bottom: 10px;
	  }
	  p {
	    margin-top: 5px;
	    color: #555;
	    font-size: 15px;
	    word-wrap:break-word;
	    word-break:normal;
	    .am-alert{
	      ul{
	        li{
	          list-style: none !important;
	        }
	      }
	    }
	    .am-alert-secondary{
	      ul{
	        list-style: none !important;
	        li {
	          list-style: none !important;
	        }
	      }
	    }
	  }
	}
	.kags-btns {
	  position: fixed;
	  z-index: 10000;
	  bottom: 0;
	  background-color: #fff;
	  padding: 10px 0;
	  box-shadow: 0 1px 6px rgba(0,0,0,.3);
	  .kags-btn {
	    width: 95%;
	  }
	}
	.vux-flexbox-item {
	  padding-right: 0!important;
	}
	.has-back-btn {
	  padding-bottom: 70px;
	}
</style>
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
