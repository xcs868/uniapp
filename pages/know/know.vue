<template>
	
		<view class="warpper flex-column">
			<!-- <view class="" style="height: 100rpx;background-color: red;"></view> -->
			<view class="warp flex-row">
				<view class="nav ">
					<view class="nav-item"  
						@click="onNav(item,index)"
						:class="{active : currentIndex == index}" 
						v-for="(item, index) in nav" :key="item.id">{{item.name }}</view>
				</view>
				<view class="right">
					<!-- <view class="search">
						<u-search placeholder="请输入商品名称/关键词" bg-color="#fff" 
							:show-action="false"
							 clearabled
							v-model="keyword" 
							@search="search"></u-search>
					</view> -->
					
					
					<view class="scoll-h" >
						<scroll-view scroll-y  class="scroll-Y" @scrolltolower="loadMore">				
							<!-- 理念 -->
							<view class="flex-column linain" v-if="currentBodyName == '理念'">
								<view class="top flex-column">
									<view class="name grace-bold">您的健康膳食私人顾问</view>
									<image class="logo grace-margin-top05" src="http://imgsg.qichuanqing.cn/v1/logo/shan_gong_logo.png" mode=""></image>
									<view class="name" >膳 贡</view>
								</view>
								<view class="" style="flex: 1;"></view>
								<view class="bottom flex-row">
									<view class="item one">
										<view class="">
											膳贡是以东方养生智慧为核心，基于国医专家团队的健康膳食分享平台
										</view>
										
									</view>
									<view class="item two">
										<text>利用五星酒店</text>
										<text>直采特供体系</text>
										
									</view>
									<view class="item three">
										甄选全球优质天然食材
									</view>
									<view class="item four">
										将中医体质学及四季食养法融入日常膳食，为最珍贵的家人定制高性价比的健康美味
									</view>
								</view>
							</view>
							<!-- 体质 -->		
							<view class="flex-column" v-if="currentBodyName == '体质'">
								<view class="typewarp flex-row" >
									<view class="type"  v-for="(item, index) in dataObj[cate_id]" 
									:key="item.name" 
									:style="{backgroundColor:item.bgcolor, color:item.color}" >
										{{item.name}}
									</view>
								</view>
								<view class="body-list flex-column">
									<view class="flex-column body" style="padding:0 20rpx;" 
									v-for="(item, index) in dataObj[cate_id]" 
									:key="item.name" >
										<view class="body-title flex-row" style="align-items: center;margin: 20rpx 0 10rpx 0;">
											<view class="fang" style="width: 10px;height: 10px;border-radius: 50%;" :style="{backgroundColor:item.bgcolor}"></view>
											<view class="" style="margin-left: 6px;font-size: 30rpx;" >{{item.name}}</view>
										</view>
										<view class="body-content" style="
										box-shadow:3px 3px 21px 0px rgba(34,46,47,0.16);
										border-radius: 5px;
										background-color: #E7F2F3;padding: 30rpx 10rpx;color: #162A2B;font-size: 24rpx;">
											{{item.desc}}
										</view>
									</view>
								</view>
							</view>
							<!-- 食性 -->
							<view class="flex-column food" v-if="currentBodyName == '食性'">
								<view class="food-nav flex-row mb20" >
								 	<view class="nav-item" :class="{active:foodNavIndex == index}"
									@click="foodNavIndex = index" 
									v-for="(item,index) in foodNav" :key="index">{{item}}</view>
								</view>
								<view class="sixing" v-if="foodNavIndex == 0">
									<view class="food-top mb20">
										根据中医理论, 温热为阳, 寒凉为阴。不懂得食物的“性”,就不知道如何养阴敛阳,也就很难明白饮食宜忌的道理。
									</view>
									<view class="food-item mb20">
										<view class="food-title flex-row">
											<view class="fang"></view>
											<view class="">寒凉性的食物</view>
										</view>
										<text class="food-text">
											寒凉性的食物大多具有清热、泻火、消炎、解毒等作用。适用于夏季发热、汗多口渴或平时体质偏热的人, 以及急性热病、发炎、热毒疮疡等症。例如, 西瓜能清热祛暑,除烦解渴,有“天生白虎汤”之美称; 绿豆能清热解毒, 患疮疡热毒者宜多选用; 其他如梨、甘蔗、莲藕等, 都有清热、生津、解渴的作用。
								
										</text>
									</view>
									<view class="food-item mb20" >
										<view class="food-title flex-row" style="color: #CFA972;">
											<view class="fang" style="background-color: #CFA972;"></view>
											<view class="">常见的寒性食物</view>
										</view>
										<text class="food-text" style="color: #CFA972;">
											蔬菜类: 苦菜、苦瓜、西红柿、茭白、蕨菜、冬瓜、黄瓜、慈姑、竹笋等。
											瓜果类: 西瓜、甜瓜、香蕉、柿子、桑葚、荸荠等。
											水产类: 紫菜、海带、田螺、蟹、藕等。
											调味品类: 淡豆豉、酱、盐等。
										</text>
									</view>
									<view class="food-item mb20" >
										<view class="food-title flex-row" style="color: #CFA972;">
											<view class="fang" style="background-color: #CFA972;"></view>
											<view class="">常见的凉性食物</view>
										</view>
										<text class="food-text" style="color: #CFA972;">
											粮豆类: 大麦、小麦、小米、绿豆、豆腐、荞麦、薏米等。
											蔬菜类: 茄子、白萝卜、油菜、菠菜、丝瓜、苋菜、芹菜、蘑菇等。
											瓜果类: 柑、梨、苹果、枇杷、橘、橙子、果、菱角等。
											食畜类: 猪皮、鸭蛋、兔肉等。
										</text>
									</view>
									<view class="food-item mb20">
										<view class="food-title flex-row">
											<view class="fang"></view>
											<view class="">温热性的食物</view>
										</view>
										<text class="food-text">
											温热性的食物大多具有温振阳气、驱散寒邪、驱虫、止痛、抗菌等作用。适用于秋冬寒凉季节肢凉、怕冷或体质偏寒的人, 以及虫积、脘腹冷痛等病症。例如, 生姜、葱白二味煎汤服之, 能发散风寒, 可治疗风寒感冒; 大蒜有强烈的杀菌作用, 对肺结核、肠结核、急慢性肠炎、痢疾等都有很好的补养作用; 韭菜炒猪肾能治肾虚腰痛; 当归生姜羊肉汤能补血调经。
										</text>
									</view>
									<view class="food-item mb20" >
										<view class="food-title flex-row" style="color: #CFA972;">
											<view class="fang" style="background-color: #CFA972;"></view>
											<view class="">常见温性食物</view>
										</view>
										<text class="food-text" style="color: #CFA972;">
											粮豆类: 糯米、高粱、刀豆等。
											蔬菜类: 南瓜、韭菜、生姜、葱、芥菜、香菜、大蒜等。
											瓜果类: 木瓜、佛手、桂圆、杏、桃、樱桃、石榴、乌梅、荔枝、栗、枣、核、桃等。
											水产类: 鳝鱼、鲢鱼、鳙鱼、淡菜、虾、海参等。
											食畜类: 鹿肉、鸡肉、羊肉、雀肉等, 猪肝、猪肚、火腿、羊奶及驴肉等。
										</text>
									</view>
									<view class="food-item mb20" >
										<view class="food-title flex-row" style="color: #CFA972;">
											<view class="fang" style="background-color: #CFA972;"></view>
											<view class="">常见热性食物</view>
										</view>
										<text class="food-text" style="color: #CFA972;">
											蔬菜类: 辣椒、花椒、芥子、胡椒等。
											水产类: 鳟鱼。
										</text>
									</view>
									<view class="food-item mb20">
										<view class="food-title flex-row">
											<view class="fang"></view>
											<view class="">平性的食物</view>
										</view>
										<text class="food-text">
											平性的食物, 无偏盛之弊, 应用很少有禁忌。大多能健脾、和胃, 有调补作用。常用于脾胃不和、体力衰弱者。例如, 黄豆、花生仁均饱含油脂, 煮食能润肠通便, 为慢性便秘者的最佳食补方法。
								
										</text>
									</view>
									<view class="food-item mb20" >
										<view class="food-title flex-row" style="color: #CFA972;">
											<view class="fang" style="background-color: #CFA972;"></view>
											<view class="">常见平性食物</view>
										</view>
										<text class="food-text" style="color: #CFA972;">
											粮豆类: 粳米、玉米、黑豆、赤豆、黄豆、蚕豆、甘薯、扁豆、豌豆、豇豆、黑芝麻等。
											蔬菜类: 洋葱、土豆、黄花菜、荠菜、香椿、大头菜、白菜、芋头、胡萝卜、木耳等。
											瓜果类: 南瓜子、白果、百合、橄榄、榛子、无花果、李子、葡萄、花生等。
											水产类: 莲子、芡实、海蜇、黄鱼、泥鳅、青鱼、鲫鱼、鲤鱼、鳗鱼等。
											食畜类: 猪(肺、心、肉、肾、蹄,牛(肉、奶),鸭、鹅、龟、鳖(肉)及鸡蛋、鸽蛋、鹌鹑蛋、鹌鹑等。
										</text>
									</view>
								
								</view> 
								<view class="wuwei" v-else-if="foodNavIndex == 1">
									<view class="food-top mb20 wuweiimg" >
										五味就是食物的辛、酸、甘、苦、咸五种味道。此外, 还有淡味、涩味。人们习惯上把淡附于甘味, 把涩附于咸味。
									</view>
									<view class="food-item mb20">
										<view class="food-title flex-row">
											<view class="fang"></view>
											<view class="">五味与五脏的关系</view>
										</view>
										<text class="food-text">
											中医学认为, 食物的五色五味皆可以反映出其大致的功效, 并可与五脏相互对应:
											酸味食物, 入肝, 主青色。
											甘味食物, 入脾, 主黄色。
											苦味食物, 入心, 主赤色。
											辛辣食物, 入肺, 主白色。
											咸味食物, 人肾, 主黑色。
											由此可见,五色五味对应人体不同的脏腑。 根据身体的状况, 对应增补很重要, 合理膳食, 同样可以达到健身、防病、祛病的目的。							
										</text>
									</view>
									<view class="food-item mb20" >
										<view class="food-title flex-row" style="color: #CFA972;">
											<view class="fang" style="background-color: #CFA972;"></view>
											<view class="">五味食物功效</view>
										</view>
										<text class="food-text" style="color: #CFA972;">
											酸味食物可以刺激唾液分泌, 生津、养阴、收敛、固涩, 有益于心脏和肌肉, 但过食易引起消化不良和牙齿骨骼的损伤。
											甘味食物能补、能缓、能和, 具有滋养补虚、和拿、止痛镇痛的功效, 内脏下垂、肌肉下垂者尤适宜食用甘味食物。
											苦味食物可以清火去热、醒脑提神, 除烦静心、止痛镇痛, 四季皆可食用, 尤其可作为夏季的消暑祛湿佳品。
											咸味食物的主要特征是软和补, 具有软坚散结、润肠通便、消肿解毒、补肾强身的功效。但过食易导致高血压、高脂血等症。
											辛味食物具有促进新陈代谢、加快血液循环、增强消化液分泌的作用, 可发散、行气、活血。但过食易导致津液损伤、上火。
										</text>
									</view>
									
																	
								</view>
							</view>
							
							<!-- 节气 -->
							<view class="flex-column solarterm" v-if="currentBodyName == '节气'">
								<image class="season-img" :src="solarterm.bg_url" mode=""></image>
								<view class="" style="background-color: #eee;">
									<view class="season-head" style="background-color: #fff;">中丨国丨传丨统丨二丨十丨四丨节丨气</view>
									<view class="season-center flex-row" style="background-color: #fff;">
										<view class="season-left flex-column">
											<image class="season-left-img" :src="solarterm.written_url" mode=""></image>
											<view class="" style="font-size: 72rpx">{{ solarterm.day }}</view>
											<view class="" style="font-size: 36rpx;">IN</view>
											<view class="" style="font-size: 36rpx;">{{ solarterm.month }}</view>
										</view>
										<view class="season-right flex-column">
											<view class="flex-row" style="height: 280rpx;">
												<view class="flex-row season-right-top-warp" style="border-right: 1px solid #5C6C6D;">
													<view class="season-right-top">{{solarterm.title1}}</view>
												</view>
												<view class="flex-row season-right-top-warp" >
													<view class="season-right-top" >{{solarterm.title2}}</view>
												</view>
											</view>
											<view class="flex-row" style="height: 280rpx;">
												<view class="flex-column season-right-bottom-warp" style="border-right: 1px solid #5C6C6D;">
													<view class="t"></view>
													<view class="c">宜</view>
													<view class="b">{{solarterm.matters}}</view>
												</view>
												<view class="flex-column season-right-bottom-warp">
													<view class="t"></view>
													<view class="c">忌</view>
													<view class="b">{{solarterm.taboo}}</view>
												</view>
											</view>
										</view>
									</view>
									
									<view class="article" >
										<view class="title flex-row">
											<view class="fang"></view>
											<view class="">时令好文</view>
										</view>
										<view class="flex-column article-list">
											<view class="article-item flex-row" v-for="item in newsList" :key="item.id" @click="goWenZhang(item.id)">
												<image class="img" :src="item.thumbs" mode=""></image>
												<view class="right flex-column">
													<view class="name">{{item.key_words}}</view>
													<view class="time">{{item.created_time}}</view>
												</view>
											</view>
										</view>
									</view>							
								</view>
								
							</view>
							<!-- 医生 -->
							<view class="flex-column doctor-list" v-if="currentBodyName == '医生'">
								<view class="doctor flex-row" v-for="item in  dataObj[cate_id]" :key="item.id">
									<image class="avatar" :src="item.weixinface || defaultAvatar" mode=""></image>
									<view class="right">
										<view class="flex-row" style="align-items: center;">
											<view class="name" >{{item.realname}}</view>
											<!-- <view class="level" >主任医师</view> -->
										</view>
										<view class="hospital">{{item.doctor_work_unit}}  {{item.specialty}}</view>
										<view class="" style="font-size: 20rpx;color: #A4A1A4;">{{item.member_sign}}</view>
									</view>
								</view>
							</view>
							<!-- 文章 -->
							<view class="flex-column" v-if="currentBodyName == '文章'">
								<view class="list-item flex-row" 
								v-for="item in  dataObj[cate_id]" :key="item.id" @click="goWenZhang(item.id)">
									<image class="list-img" :src="item.thumbs"></image>
									<view class="list-contian flex-column">
										<view class="goods-name text-overflow">{{item.title}}</view>
										<view class="describe text-overflow3">{{item.key_words}}~</view>
										<view class="flex-row authorNews" >
											<view class=""></view>
											<view class="">{{item.created_time}}</view>
										</view>
									</view>
								</view>
							</view>
						
						</scroll-view>
					</view>
					<!-- <v-no-data v-if="isHasData"></v-no-data> -->
					<!-- <view v-if="goodsList.length == 0">
						<graceEmpty >
							<view slot="img" class="empty-view">
								<image class="empty-img" mode="widthFix" src="http://imgsg.qichuanqing.cn/v1/home/goodsCartEmpty.png"></image>
							</view>
							<text slot="text" class="grace-text-small grace-gray">该类别下暂无商品</text>
						</graceEmpty>
					</view> -->
				</view>
			</view>
			<!-- 登录提示弹窗 -->
			<dialog-box :show="loginDialogShow"  :titleHeight="60" @close="close" @confirm="confirm"></dialog-box>	

		</view>
	
</template>
<script>
import dialogBox from "@/components/mybox/dialog-box/dialog-box.vue";
import gracePage from "@/graceUI/components/gracePage.vue";
import graceEmpty from "@/graceUI/components/graceEmptyNew.vue";
import vNoData from '@/components/vNoData.vue'
export default {
	
	components:{
		vNoData,
		dialogBox,
		gracePage,
		graceEmpty,
	},
	data(){
		return {
			foodNav:['四性','五味'],
			foodNavIndex:0,
			dataObj:{
				
			},
			solarterm:{},
			defaultAvatar:'http://imgsg.qichuanqing.cn/v1/userPersonal/avatar-doctor.png',
			currentBodyName:'理念',
			loginDialogShow:false,
			typeList:[
								{bgcolor: "#F6B37F",
				color: "#000000",
				name: "平和",
				type_id: 1}
			],
			newsList:[],
			keyword:'',
			currentIndex:0,
			nav:[],            //左侧分类
			isLoding:false,   //是否可以加载
			page:1,
			goodsList:[], //goods列表
			cate_id:'',  //左侧分类当前选择类型
			isHasData:false, //没有数据了
			monthArr:[
				{
					id : 12,
					name: 'December'
				},
				{
					id : 11,
					name: 'November'
				},
				{
					id : 10,
					name: 'October'
				},
				{
					id : 9,
					name: 'September'
				},
				{
					id : 8,
					name: 'August'
				},
				{
					id : 7,
					name: 'July'
				},
				{
					id : 6,
					name:'June'
				},
				{
					id : 5,
					name:'May'
				},
				{
					id : 4,
					name:'April'
				},
				{
					id : 3,
					name:'March'
				},
				{
					id : 2,
					name:'February'
				},
				{
					id : 1,
					name:'January'
				}
			]
		}
	},

	onLoad(){
		this.getNavType()
		this.getNewsList()
	},
	methods:{
		search(e){
			if(!this.keyword){
				this.myToast('请输入商品名称/关键词')
				return
			}
			this.page = 1;
			this.isHasData = false;
			
			
		},
		goWenZhang(id){
			
			return this.navigateToAction('/pages/news/index?id='+id)
		},
		confirm(){
			this.loginDialogShow = false
			return this.navigateToAction('/pages/login/login')
		},
		close(){
			this.loginDialogShow = false
		},
		checkLogin(goods_id){
			if(!uni.getStorageSync('USER_ID')){
				this.loginDialogShow = true
			}else{
				return this.navigateToAction('/pages/goods/goods_detail?goods_id='+goods_id)
			}
		},
		loadMore(){
			this.page++;
			
		},
		//左侧栏分类
		onNav(item,index){
			if(this.currentIndex == index) return;
			this.currentIndex = index;
			this.currentBodyName = item.name;
			this.cate_id = item.id;
			if(this.currentBodyName == '节气'){
				this.$api.apiSolar({}).then(res => {
					if(res.data.day < 10){
						res.data.day = "0"+res.data.day
					}
					let data = this.monthArr.filter(item => {
						if(item.id == res.data.month){
							return item.name;
						}
					})
					res.data.month = data[0].name
					this.solarterm = res.data;
					
				})
				
				return
			}	
			if(!this.dataObj[this.cate_id]){
				this.getRight()
			}
			
		},
		//获取左侧栏类型
		async getNavType(){
		   //let res = await this.$api.apiType()
		   let res = await  this.$api.apiFoodCate()
		  
		   this.nav= res.list || [];
		   this.cate_id = res.list[0].id;
		   this.getRight()
		   
		},
		//获取右侧内容
		getRight(data){
			
			this.$api.apiFoodRight({
				cate_id:this.cate_id , 
				page:this.page , 
				
			}).then(res => {
				console.log(res)
				this.$set(this.dataObj,this.cate_id,res.list)
				console.log(this.dataObj)
			})
		},
		// 获取时令好文
		getNewsList(){
			this.$api.apiGetNews({}).then(res=>{
				console.log(res.list)
				if(res.code == 200){
					this.newsList = res.list
				}
			})
		},
		
	}
}
</script>
<style lang="scss" scoped>
	// @import "@/uview-ui/index.scss";
	// 文本溢出
	.mb20{margin-bottom: 20rpx;}
	.text-overflow{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 400rpx
	}
	
	.text-overflow3{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
	
	
	.nodata{
		justify-content: center;
		align-items: center;
		font-size: 12px;
		color: #aaa;

	}
	.food{
		padding: 0 30rpx;
		font-size: 24rpx;
		.food-nav{
			.nav-item{
				width: 100rpx;
				height: 40rpx;
				border-radius: 40rpx;
				font-size: 24rpx;
				color: #CAC8C8;
				border: 1px solid;
				text-align: center;
				line-height: 40rpx;
				margin-right: 10px;
				&.active{
					background-color: #CFA972;
					color: #fff;
				}
			}
		}
		.food-top{
			box-sizing: border-box;
			width: 100%;
			height: 160rpx;
			background: url('http://imgsg.qichuanqing.cn/v1/solor/db88881163e7c470e55fd95664362ad.png') no-repeat;
			background-size: 100% 100%;
			font-size: 26rpx;
			color: #fff;
			padding: 30rpx;
			border-radius: 10px;
			&.wuweiimg{
				background: url('http://imgsg.qichuanqing.cn/v1/solor/df7ec705130c0f15bde08e5859cf310.png') no-repeat;
			}
		}
		
		.food-item{
			width: 100%;
			border-radius: 10px;
			box-sizing: border-box;
			padding: 20rpx;
			box-shadow:3px 0px 9px 0px rgba(66,86,87,0.14);
			.food-title{
				align-items: center;
				font-size: 26rpx;
				color: #162A2B;
				margin-bottom: 10px;
				.fang{
					width: 10px;
					height: 10px;
					background-color: #162A2B;
					transform:rotate(45deg);
					margin-right: 10px;
				}
			}
			.food-text{
				color: #425657;
			}
		}
	}
	.solarterm{
		color: #162A2B;
		.season-img{
			width: 100%;
			height: 400rpx;
		}
		.season-head{
			font-size: 22rpx;
			text-align: center;
			padding: 20rpx 0;
		}
		.season-center{
			border-top: 1px solid #5C6C6D;
			height: 560rpx;
			.season-left{
				width: 50%;
				box-sizing: border-box;
				border-right: 1px solid #5C6C6D;
				align-items: center;
				justify-content: center;
				.season-left-img{
					width: 90rpx;
					height: 240rpx;
				}
			}
			.season-right{
				width: 50%;
				color: #000000;
				.season-right-top-warp{
					width: 50%;
					justify-content: center;
					border-bottom: 1px solid #5C6C6D;
					.season-right-top{
						margin: 40rpx 0;
						box-sizing: border-box;
						width: 56rpx;
						border: 1px solid;
						border-radius: 56rpx;
						text-align: center;
						line-height: 36rpx;
						font-size: 30rpx;
						padding: 10rpx 0;
					}
				}
				.season-right-bottom-warp{
					width: 50%;
					align-items: center;
					box-sizing: border-box;
					.t{
						width: 20rpx;
						height: 20rpx;
						border-radius: 50%;
						background-color: #000;
						margin-top: 30rpx;
					}
					.c{
						width: 80rpx;
						height: 80rpx;
						border: 1px solid;
						font-weight: bold;
						border-radius: 50%;
						text-align: center;
						line-height: 80rpx;
						font-size: 60rpx;
						margin: 14rpx 0;
					}
					.b{
						font-size: 20rpx;
						font-weight: bold;
						width: 40rpx;
					}
				}
				
			}
		}
	}
	.article{
		background-color: #fff;margin-top: 20rpx;
		padding: 0 30rpx;
		.title{
			font-size: 26rpx;
			align-items: center;
			padding: 20rpx 0;
			.fang{
				width: 10px;
				height: 10px;
				background-color: #000;
				transform:rotate(45deg);
				margin-right: 10px;
			}
		}
		.article-list{
			.article-item{
				padding: 15rpx 0;
				.img{
					width: 230rpx;
					height: 160rpx;
					border-radius: 10px;
					background-color: red;
					
				}
				.right{
					flex: 1;
					box-sizing: border-box;
					padding-left: 20rpx;
					justify-content: space-between;
					.name{
						font-size: 24rpx;
						color: #162A2B;
					}
					.time{
						color: #CAC8C8;
						font-size: 22rpx;
					}
				}
				
			}
		}
	}
	.doctor-list{
		box-sizing: border-box;
		padding: 0rpx 20rpx;
		.doctor{
			box-sizing: border-box;
			padding: 30rpx 0rpx;
			border-bottom: 1px solid #E5E5E5;
			.avatar{
				width: 94rpx;
				height: 94rpx;
				border-radius: 50%;
			}
			.right{
				margin-left: 26rpx;
				.name{
					font-size: 32rpx; 
					color: #333033;
				}
				.level{
					color: #CFA972;
					border: 1px solid;
					border-radius: 10px;
					font-size: 20rpx;
					height: 30rpx;
					line-height: 32rpx;
					padding: 0px 5px;
					margin-left: 10px;
				}
				.hospital{
					font-size: 24rpx;
					color: #5F5C5F;
					margin-top: 10rpx;
					margin-bottom: 8rpx;
				}
			}
		}
	}
	.linain{
		height: 100%;
		.top{
			background-color: #E7F2F3;
			width: 100%;
			height: 400rpx;
			box-shadow:-1px 4px 8px 0px rgba(64,84,85,0.16);
			border-bottom-right-radius:50%;
			border-bottom-left-radius:50%;
			align-items: center;
			justify-content: center;
			.logo{
				width: 200rpx;
				height: 200rpx;
			}
			.name{
				text-align: center;
				font-size: 32rpx;
				color: #414041;
			}
		}
		.bottom{
			flex-wrap: wrap;
			.item{
				width: 50%;
				box-sizing: border-box;
				height: 340rpx;
				color: #fff;
				font-size: 24rpx;
				padding: 0 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.one,.four{
				background:linear-gradient(0deg,rgba(231,242,243,1),rgba(205,226,227,1));
				color: #5C7576;
			}
			.two{
				background: url('http://imgsg.qichuanqing.cn/v1/home/shanshi/e1e407c9ab9a6fe4ed89f678ac28401.png') no-repeat;
				background-size: 100% 100%;
			}
			.three{
				background: url('http://imgsg.qichuanqing.cn/v1/home/shanshi/a6fe71cfa4b5e7a4617238e5c29d745.png') no-repeat;
				background-size: 100% 100%;
			}
		}	
	}
	.warpper{
		height: 100%;
	}
	
	.warp{
		height: 100vh;
		overflow: hidden;
		.nav{
			flex-basis: 120rpx;
			background-color: #162A2B;
			
			.nav-item{
				font-size: 26rpx;
				color: #CFA972;
				height: 55rpx;
				line-height: 55rpx;
				box-sizing: border-box;
				padding-left: 36rpx;
				border-left: 6rpx solid #162A2B;
				&.active{
					border-left: 6rpx solid;
				}
			}
		}
		.right{
			display: flex;
			flex-direction: column;
			flex: 1;
			.search{
				height:65rpx;
				border:1px solid #eee;
				background:rgba(255,255,255,1);
				box-shadow:3px 4px 8px 0px rgba(188,197,195,0.36);
				border-radius:65rpx;
				margin: 0 10rpx;
			}
			.typewarp{
				box-sizing: border-box;
				padding: 0 35rpx;
				flex-wrap: wrap;
				box-shadow: 1px 1px 1px #eee;
				height: 330rpx;
				.type{
					
					width: 90rpx;
					height: 90rpx;
					box-sizing: border-box;
					border-radius: 50%;
					box-shadow:3px 4px 8px 0px rgba(176,192,196,0.36); 
					font-size: 24rpx;
					text-align: center;
					line-height: 90rpx;
					margin: 10rpx 0;
					margin-right: 145rpx;
					&.on{
						box-shadow:1px 1px 15px 0px rgba(255,215,0,0.7);
						transform: scale(1.2);
						transition: all 0.3;
					}
					&:nth-child(3n){
						margin-right: 0;
						//background-color: #007AFF;
					}
				}
			}
			.scoll-h{
				flex: 1;
				box-sizing: border-box;
				overflow: hidden;
				.scroll-Y{
					height: 100%;
					.list-item{
						justify-content: space-between;
						padding: 10rpx ;
						border-bottom: 1px solid #E5E5E5;
						box-sizing: border-box;
						.list-img{
							width: 180rpx;
							height: 180rpx;
							border-radius:10rpx;
						}
						.list-contian{
							flex: 1;
							box-sizing: border-box;
							padding-left: 22rpx;
							justify-content: space-between;
							.goods-name{
								font-size: 26rpx;
								color: #414041;
							}
							.describe{
								font-size: 20rpx;
								color: #CAC8C8;
							}
							.authorNews{
								font-size: 22rpx;
								justify-content: space-between;
								align-items: center;
								color: #949494;
							}
							.send-time{
								width: 126rpx;
								//width:fit-content;
								text-align: center;
								font-size: 18rpx;
								color: #CFA972;
								border: 1px solid;
								border-radius: 12rpx;
							}
							.price{
								color: #162A2B;
								font-size: 26rpx;
							}
						}
					}
					
					
				}
			}
		}
	
	}
	
.empty-view{width:280rpx; height:280rpx; border-radius:280rpx; background-color:#F6F7F8; margin-top:100rpx;}
.empty-img{width:220rpx; height:200rpx; margin:40rpx; border-radius:200rpx;}
.grace-text-small{margin-top:10px;}
</style>
