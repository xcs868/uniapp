<template>
	<view class="answer__content">
		<block v-if="newOptList[showQuestionIndex].imageList.length > 0">
			<view class="answer__banner">
				<swiper :indicator-dots="true" :autoplay="true">
					<block v-for="(item,index) in newOptList[showQuestionIndex].imageList" :key="index">
						<swiper-item>
							<image :src="item" mode="aspectFill"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</block>

		<block>
			<view class="answer__question">
				<view class="question_title">
					<!-- <view class="title__number">{{newOptList[showQuestionIndex].number || (showQuestionIndex + 1)}}.</view> -->
					<view>
						（{{newOptList[showQuestionIndex].type == 'write' ? '填空' : (newOptList[showQuestionIndex].type == 'radio' ? '单选' : (newOptList[showQuestionIndex].type == 'checkbox' ? '多选' : ''))}})
						{{newOptList[showQuestionIndex].title}}
					</view>
				</view>

				<view class="question__option">
					<block v-if="newOptList[showQuestionIndex].type == 'radio' || newOptList[showQuestionIndex].type == 'checkbox'">
						<block v-for="(item,index) in newOptList[showQuestionIndex].question_option" :key="index">
							<view :style="item.active ? optActiveStyle : optStyle" class="question__option__item" @tap="checkOption" :data-id="item.id">
								<view class="question__option__item__number">
									{{item.name}} .
								</view>
								<view>{{item.content}}</view>
							</view>
						</block>
					</block>
					
					<block v-if="newOptList[showQuestionIndex].type == 'write'">
						<view class="item__key__box">
							答案：<input class="write_input" placeholder="请填写你的答案" v-model="newOptList[showQuestionIndex].question_key"/>
						</view>
						
						
					</block>
					
				</view>
			</view>
		</block>
		<view class="answer__next__btn" :style="nextStyle" @tap="nextQuestionBtn">
			{{isEnd ? '提  交' : '下 一 题'}}
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			questionList: {//数据列表
				type: Array,
				default: ()=>{
					return [
						{
							id:1,
							type:'radio',
							number:1,
							title:'1生物大灭绝是指大规模的集群灭绝，生物灭绝又叫生物绝种。历史上一共有几次大灭绝？',
							imageList:['https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1588056060&di=67dc5595a44e90101f524bae2273cc0a&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg'],
							question_option:[
								{id:1,name:'A',content:'一次',active:0},
								{id:2,name:'B',content:'二次',active:0},
								{id:3,name:'C',content:'三次',active:0},
								{id:4,name:'D',content:'四次',active:0},
							]
						}
					]
				}
				
			},
			colorStyle: {
				type:Object,
				default: ()=>{
					return {
					nextBac:'#C9784F',
					nextCol:'#FFFFFF',
					optBac:'#EEB67A',
					optCol:'#232131',
					optBacActive:'#C9784F',
					optColActive:'#FFFFFF',
					}
				}
			}

		},
		data() {
			return {
				newOptList:[],//初始化数据
				showQuestionIndex: 0, //当前展示题号
				isEnd: false, //是否为最后一题
			};
		},
		watch: {
			questionList(newValue,oldValue){
				this.newOptList = newValue
				// console.log(newValue,'newValue')
				// console.log(oldValue,'oldValue')
			}
		},
		computed: {
			nextStyle(){
				return `background:${this.colorStyle.nextBac};color:${this.colorStyle.nextCol};`
			},
			optStyle(){
				return `background:${this.colorStyle.optBac};color:${this.colorStyle.optCol};`
			},
			optActiveStyle(){
				return `background:${this.colorStyle.optBacActive};color:${this.colorStyle.optColActive};`
			}
		},
		created() {
			// console.log(this.questionList,'this.questionList')
			this.newOptList = this.questionList
		},
		methods: {
			checkOption(e) { //选择事件
				let checkOpt = this.questionList[this.showQuestionIndex]
				this.checkActive(e.currentTarget.dataset.id)

				//返回数据
				let opt = {
					id: this.questionList[this.showQuestionIndex].id,
					value: e.currentTarget.dataset.id
				}
				this.$emit("checkOption",opt);
			},
			checkActive(_id) { //选择答案事件处理
				let newOpt = this.questionList
				let checkOpt = newOpt[this.showQuestionIndex].question_option
				if (newOpt[this.showQuestionIndex].type == 'radio') {
					checkOpt.map((item, i) => {
						if (item.id == _id) {
							item.active = !item.active
						} else {
							item.active = false
						}
					})
				} else if (newOpt[this.showQuestionIndex].type == 'checkbox') {
					checkOpt.map((item, i) => {
						if (item.id == _id) {
							item.active = !item.active
						}
					})
				}
				
				this.questionList = newOpt
			},
			nextQuestionBtn(e) { //下一题
				if (!this.checkTest()) {
					return wx.showToast({
						title: '请先作答',
						icon: 'none'
					})
				}

				//构建返回数据
				let opt = {
					current_id: this.showQuestionIndex,
					isEnd: this.isEnd
				}

				if (!this.isEnd) {
					let newList = this.questionList
					if (this.showQuestionIndex < newList.length - 1) {
						this.showQuestionIndex = this.showQuestionIndex + 1
						if (this.showQuestionIndex == newList.length - 1) {
							this.isEnd = true
						}
					}
				} else {
					return this.formatKey(opt)
				}

				this.$emit("nextAnswer",opt);
			},
			checkTest() { //答案选择验证
				let check_res = false
				if(this.questionList[this.showQuestionIndex].type == 'write')
				{
					if(this.questionList[this.showQuestionIndex].question_key.trim() !== '')
					{
						check_res = true
					}
				}
				else
				{
					let check_opt = this.questionList[this.showQuestionIndex]
					check_opt.question_option.map((item, i) => {
						if (item.active) {
							return check_res = true
						}
					})
				}
				return check_res
				
			},
			formatKey(opt) { //答案整理返回
				let newAnswer = []
				let newList = this.questionList
				let formatCheck_res = []

				newList.map((item, i) => {
					let key_res = []
					let test_item = {
						id: item.id,
						keyFormat: []
					}
					let test = []
					if(item.type == 'write')
					{
						key_res.push(item.question_key.trim())
						test_item.keyFormat.push(item.question_key.trim())
					}
					else
					{
						item.question_option.map((item_s, i_s) => {
							if (item_s.active) {
								key_res.push(item_s)
								test_item.keyFormat.push(item_s.id)
							}
						})
					}
					
					formatCheck_res.push(test_item)

					newAnswer.push({
						id: item.id,
						type: item.type,
						number: item.number,
						title: item.title,
						keyRes: key_res,
					})
				})

				opt.checkRes = {
					check_res: newAnswer,
					keyFormat: formatCheck_res
				}
				this.$emit('nextAnswer',opt)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}

	view {
		box-sizing: border-box;
	}

	.answer__content {
		width: 100%;
	}

	.answer__banner {
		width: 100%;
		height: 388upx;
	}

	.answer__banner swiper,
	.answer__banner swiper swiper-item {
		width: 100%;
		height: 100%;
	}

	.answer__banner swiper swiper-item image {
		width: 100%;
		height: 100%;
	}

	.answer__question {
		width: 100%;
		padding: 0 50upx 100upx;
		margin-top: 30upx;
	}

	.answer__question .question_title {
		display: flex;
		width: 100%;
		font-size: 28upx;

	}

	.answer__question .title__number {
		padding-top: 0upx;
		min-width: 34upx;
	}

	.answer__question .question__option {
		width: 100%;
		margin-top: 13upx;
	}

	.answer__question .question__option__item {
		display: flex;
		width: 100%;
		padding: 23upx 98upx;
		margin-top: 30upx;
		font-size: 26upx;
		color: #232131;
		background: #EEB67A;
		border-radius: 14upx;
		overflow: hidden;
	}

	.answer__question .question__option__item .question__option__item__number {
		padding-top: 4upx;
		margin-right: 10upx;
	}

	.answer__next__btn {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		color: #ffffff;
		font-size: 30upx;
		text-align: center;
		background: #C9784F;
	}

	.question__option__active {
		color: #FFFFFF !important;
		background-color: #C9784F !important;
	}
	
	.item__key__box {
		display: flex;
		width: 100%;
		margin-top: 30upx;
		
		.write_input{
			width: 400upx;
			font-size: 28upx;
			color: #333333;
			text-align: center;
			border-bottom: 1upx solid #999999;
		}
	}
</style>
