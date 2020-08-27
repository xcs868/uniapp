## 模版

```
<template>
	<view class="content">
		<check-xi @nextAnswer="nextAnswer" @checkOption="checkOption" :questionList="questionList"></check-xi>
	</view>
</template>
```

```

<script>
import checkXi from '@/components/xi-check/check.vue'
export default {
		components:{
			checkXi
		},
		data() { //模拟数据
			return {
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
						title:'生物灭绝又叫生物绝种。历史上一共有几次大灭绝？', //题目名称
						imageList:['https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1588056060&di=67dc5595a44e90101f524bae2273cc0a&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg'], //图片地址
						question_option:[
							{
								id:1,//答案id
								name:'A',//答案选项名
								content:'一次',//答案内容
								active:0//选中状态
							},
							{id:2,name:'B',content:'二次',active:0},
							{id:3,name:'C',content:'三次',active:0},
							{id:4,name:'D',content:'四次',active:0},
							]//选项集
					}, {
						id:2,
						type:'checkbox',
						number:2,
						title:'生物大灭绝是指大规模的集群灭绝，生物灭绝又叫生物绝种。历史上一共有几次大灭绝？',
						imageList:[],
						question_option:[
							{id:1,name:'A',content:'一次',active:0},
							{id:2,name:'B',content:'二次',active:0},
							{id:3,name:'C',content:'三次',active:0},
							{id:4,name:'D',content:'四次',active:0},
							]
					}, {
						id: 3,
						type: 'write',
						number: 3,
						title: '生物大灭绝是指大规模的集群灭绝，生物灭绝又叫生物绝种。历史上一共有_____次大灭绝？',
						imageList: [
							'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1588056060&di=67dc5595a44e90101f524bae2273cc0a&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg'
						],
						question_key: '' //绑定的答案输入字段
					}
				]
			}
		},
		methods: {
			/**
			 * 绑定选择答案事件
			 */
			nextAnswer(e){
				  console.log('next',e);
			},
			checkOption(e){
				  console.log('check',e);
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

