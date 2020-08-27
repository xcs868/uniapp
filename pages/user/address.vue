<template>
	<view class="warp">
		<v-contact-list
			:list="contactList" 
			:currentIndex="currentIndex" 
			@edit="edit"
			@addContact="showAdd = true" 
			@select="select"></v-contact-list>
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
	export default {
		data(){
			return {
				user_id : uni.getStorageSync('USER_ID'),
				showEdit:false,
				showAdd:false,
				currentIndex:'',  //当前联系人下标
				currentContact:{}, //当前联系人
				editContact:{}, //修改的联系人
				contactList:[] 
			}
		},
		onLoad(){
			this.getContactList()
		},
		methods:{
			apiEdit(item){
				this.$api.apiEditAddress({
					user_id:this.user_id,
					...item
				}).then(res => {
					if(res.code == 200){
						this.myToast(res.msg)
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
						this.showEdit = true
					}
				})
			},
			select(currentContact){
				this.currentContact = currentContact;
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
			}
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
		components: {
			vContactList,
			vEditContact
		},
	}
	
</script>

<style>
</style>
