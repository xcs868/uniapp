
<template>
	<view class="content">
		<check-xi @nextAnswer="nextAnswer" @checkOption="checkOption" :questionList="questionList"></check-xi>
		
		<dialog-amswer-box :show="DialogShow"  :titleHeight="60" @confirm="confirm" :contionValue="value"></dialog-amswer-box>	
	</view>
</template>
<script>
import checkXi from '@/components/mybox/xi-check/xi-check.vue'
import dialogAmswerBox from "@/components/mybox/dialog-box/dialog-answer-box.vue";
export default {
		components:{
			checkXi,
			dialogAmswerBox
		},
		onLoad(e) {
			let uid = uni.getStorageSync('USER_ID') ? uni.getStorageSync('USER_ID') : 0
			this.user_id = e.user_id ? e.user_id : uid;
			let sex = e.sex;
			//此处应选择男，女后调api接口
			this.getSelfContent(sex)
		},
		data() { //模拟数据
			return {
				user_id:0,
				value:'',
				DialogShow:false,
				colorStyle: { // 颜色修改自定义 -- 若需修改必须全部都要有！！！
					nextBac: '#C9784F', //下一题按钮背景色
					nextCol: '#FFFFFF', //下一题按钮背字体颜色
					optBac: '#EEB67A', //选项按钮背景色
					optCol: '#232131', //选项按钮字体颜色
					optBacActive: '#C9784F', //选项按钮背景色 - 选中
					optColActive: '#FFFFFF', //选项按钮字体颜色-选中
				},
				questionList:[
					{
						id:1, //题目id
						type:'radio',//单选 checkbox - 多选 ； write - 填空 
						number:1, //题目序号 - 非必要
						title:'您手脚发凉吗？', //题目名称
						imageList:['http://imgsg.qichuanqing.cn/v1/home/banner/3.png'], //图片地址
						question_option:[
							{id:1,name:'A',content:'没有',active:0},
							{id:2,name:'B',content:'很少',active:0},
							{id:3,name:'C',content:'有时',active:0},
							{id:4,name:'D',content:'经常',active:0},
							{id:5,name:'E',content:'总是',active:0},
							]//选项集
					}
				]
			}
		},
		methods: {
			confirm(){
				let user_id = this.user_id;
				this.DialogShow = false
				return this.navigateToAction('/pages/user/body?user_id='+user_id)
			},
			/**
			 * 绑定选择答案事件
			 */
			nextAnswer(e){
				  var user_id = this.user_id;
				  if(e.isEnd){
					// console.log(e,'E')
					let arr = e.checkRes.keyFormat
					// let params = arr.map(item => {
					// 	return item.keyFormat[0]
					// })
					this.$api.apiSelfContion({
						user_id,
						data:JSON.stringify(arr)
					}).then(result => {
						// console.log(result,'result')
						if(result.code == 200){
							this.$api.apiSubConsition({
								user_id,
								cid:result.data.id,
							}).then(ress => {
								console.log(ress)
								this.DialogShow = true
								this.value = result.data.name
							})
						}else{
							this.myToast(res.msg)
						}
					})
				  }
			},
			checkOption(e){
				  console.log('check',e);
			},
			getSelfContent(sex){
				this.$api.apiSelfContent({
					sex
				}).then(res => {
					console.log(res)
					this.questionList =  res.data;
				})
				
			}
		}
	}
</script>
```

## 返回数据

​	

```
console.log('next',e);

current_id: 0 // 当前题目id
isEnd: true/false //是否是最后一题目---true（是最后一题）

//格式化答案输出。id-题目id；keyFormat-对应题目的答案id集
check_res: [] //为格式化的原始数据 
keyFormat: [
	{id: 1, keyFormat: [1]},
	{id: 2, keyFormat: [1,2]},
	{id: 2, keyFormat: ['填空答案']}
]

console.log('check',e);
id: 4 // 当前题目id
value: 3 // 对应id 选择的选项id
```

