import Vue from 'vue'
var Fly = require('../plugins/tools/fly.js');
var fly = new Fly
const devURL = 'https://xiaoxiao-api.qichuanqing.cn';
const proURL = 'https://xiaoxiao-api.qichuanqing.cn';
const baseURL = process.env.NODE_ENV == 'development' ?  devURL : proURL



Vue.prototype.$baseURL = fly.config.baseURL = baseURL;
//添加请求拦截器
fly.interceptors.request.use((config,promise)=>{
	let token = uni.getStorageSync('token') || '';
	if(token){
		config.headers['authorization'] = token;
	}
	
	uni.showLoading({
		title:'loading...',
		mask: true
	})
	
	return config;
	
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
		uni.hideLoading()
		let code = response.data.code;
		switch (code) {
			case 200:
				return Promise.resolve(response.data);
			// 401: 未登录
			// 未登录则跳转登录页面，并携带当前页面的路径
			// 在登录成功后返回当前页面，这一步需要在登录页操作。                
			case 401: 	
			    uni.showToast({
					title: '请您登录后再进行操作',
					icon: 'none',
					mask: true,
			    });	
				setTimeout(function(){
					uni.navigateTo({
						url:'/pages/login/login'
					})
				},2000)
				return Promise.resolve(response.data);
			// 403 token过期
			// 登录过期对用户进行提示
			// 清除本地token和清空vuex中token对象
			// 跳转登录页面                
			case 403:
				uni.showToast({
					title: '登录信息过期,请重新登录',
					icon: 'none',
					mask: true,
				});	
				// 清除token
				uni.removeStorageSync('token');
				// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面      
			   setTimeout(function(){
					uni.navigateTo({
						url:'/pages/login/login'
					})
			  },2000)
			  break;
			  return Promise.resolve(response.data)
			// 404请求不存在
			case 404:
				uni.showToast({
					title: '网络请求不存在',
					icon: 'none',
					mask: true,
				});	
				break;
			// 其他错误，直接抛出错误提示
			default:
				// uni.showToast({
				// 	title: response.data.msg,
				// 	icon: 'none',
				// 	mask: true,
				// });
				return Promise.resolve(response.data);
		} 
    },
    (err) => {
		// console.log(err,'err')
		// if (err.response.status) {            	
		// }    
    }
)

Vue.prototype.$http = fly;

export function get(url, params={}){    
    return new Promise((resolve, reject) =>{        
        fly.get(url, params).then(res => {
            resolve(res);
        }).catch(err =>{
            reject(err)        
    })    
});}

export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        fly.post(url, params).then(res => {
            resolve(res);
        }).catch(err =>{
            reject(err)
        })
    });
}