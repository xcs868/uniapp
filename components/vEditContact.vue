<template>
	<view class="warp flex-column">
		<view class="group-warp">
			<u-cell-group>
				<u-field class="item" v-model="contact.name"
					label="姓名"
					placeholder="请填写姓名" 
					required
					:field-style="fieldStyle"></u-field>
						
				<u-field
					class="item"
					v-model="contact.mobile"
					label="手机号码"
					placeholder="请填写手机号"
					:field-style="fieldStyle"
					required
					maxlength="11"
					type="number"></u-field>
				
				<u-field
					class="item"
					v-model="areName"
					label="地区"
					placeholder="请选择地区"
					:disabled="true" 
					:field-style="fieldStyle"
					
					@click="show = true"
					required></u-field>	
					<u-select v-model="show" 
					mode="mutil-column-auto" 
					:list="list" 
					:defaultValue="def"
					@confirm="confirm"></u-select>
				<u-field
					class="item"
					v-model="contact.address_name"
					label="详细地址"
					placeholder="街道门牌/楼层房间号等信息"
					:field-style="fieldStyle"
					required></u-field>	
			</u-cell-group>	
			<view class="def-warp flex-row">
				<view class="def-key">设为默认收货地址</view>
				<view class=""><u-switch v-model="send_status"></u-switch></view>
			</view>
			
		</view>
		<u-button type="error" class="btn" @click="submit">确认</u-button>
	</view>
</template>
<script>
	export default {
		props:{
			editContact:{
				type:Object,
				default(){
					return {}
				}
			},
			isEdit:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				show:false,
				areName:'', //省市区中文名称
				fieldStyle:{
					width:'480rpx',
				},
				list:[],
				def:[0,0,0],  //默认省市区
				send_status:false,//是否设为默认
				contact:{
					name:'',    //姓名
					mobile:'',  //手机
					address_name:'',  //详细地址
					code:'', //地址code
				}
				
			}
		},

		watch:{
			editContact:{
				handler(newval){
					this.editContact = newval
					this.getContact()
				},
				immediate: true
			}
			
			
		},

		created(){
			
			this.$api.apiRegion().then(res => {
				if(res.code == 200){
					this.list = res.result
				}
			})
		},
		mounted(){
			//this.getContact()
		},
		methods:{
			getContact(){
				let {name, mobile,code, codeIndex, address_name, send_status } = this.editContact
				if(this.isEdit){
					this.send_status = Boolean(send_status)
					this.contact.name = name;
					this.contact.mobile = mobile;
					this.contact.address_name = address_name;
					this.contact.code = code;
					this.filterCode(codeIndex)
				}
			},
			filterCode(codeIndex = []){
				let arr = [], areName = '';
				
				codeIndex.forEach((item) => {
					arr.push(item.index)
					areName += item.label
				})
				this.def = arr;
				this.areName = areName
				
			},
			submit(){
				let {name,  
					mobile,  
					address_name,  
					code} = this.contact;
				if(!name){
					this.myToast('请输入姓名')
					return
				}
				if(!(/^1[3456789]\d{9}$/.test(mobile))){
					this.myToast('请输入合法的手机号')
					return
				}
				if(!code){
					this.myToast('请选择省市区')
					return
				}
				if(!address_name){
					this.myToast('请输入详细地址')
					return
				}
				if(this.isEdit){
					this.$emit('apiEdit',{
						id:this.editContact.id,
						name,
						mobile,  
						address_name,  
						code,
						send_status:Number(this.send_status)
					})
					return
				}
				this.$emit('apiAdd',{
					name,
					mobile,  
					address_name,  
					code,
					send_status:Number(this.send_status)
				})
			},
			confirm(e){
				console.log(e)
				let [province, city, area] = e;
				//城市code
				this.contact.code = area.value || area.valut;
				this.areName = province.label + city.label + area.label
				
			},
			
		}
	}
</script>
<style lang="scss" scoped>
	.warp{
		min-height: 100vh;
		background-color: #F9F9F9;
		box-sizing: border-box;
		.group-warp{
			margin:15px;
			border-radius: 10px;
			overflow: hidden;
			
		}
		.btn{
			margin: 30px auto;
			width: 700rpx;
		}
		.item{
			background: #fff;
			border-bottom: 1px solid #eee;	
			
		}
		.def-warp{
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			padding: 10rpx 28rpx;
			.def-key{
				font-size: 28rpx;
				color: #303133;
			}
		}
	}
</style>