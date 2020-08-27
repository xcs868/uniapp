/**
 * 网络请求管理 基于fly
 */
var Fly = require('./fly.js');
var fly = new Fly;

class Request {
	request(path, data, config = {}) {
		//添加请求拦截器
		fly.interceptors.request.use((config1,promise)=>{
			if (!config.noLoading) {
				// #ifndef APP-PLUS
				uni.showLoading({
					// title:'loading...',
					mask: true
				})
				// #endif
				// #ifdef APP-PLUS
				// plus.nativeUI.showWaiting('');
				// #endif
			}	
			
			return config1;
			
		})
		//添加响应拦截器，响应拦截器会在then/catch处理之前执行
		fly.interceptors.response.use(
			(response,promise) => {
				//只将请求结果的data字段返回
				// #ifndef APP-PLUS
				uni.hideLoading()
				// #endif
				// #ifdef APP-PLUS
				plus.nativeUI.closeWaiting();
				// #endif
				return response.data
			},
			(err,promise) => {
				//发生网络错误后会走到这里
				//promise.resolve("ssss")
				// #ifndef APP-PLUS
				uni.showToast({
					title: '网络连接出现问题，请刷新或稍后再试',
					icon: 'none',
					mask: true,
					duration: 2000
				});
				// #endif
				
				// #ifdef APP-PLUS
				plus.nativeUI.toast('网络连接出现问题，请刷新或稍后再试');
				// #endif
			}
		)
		
		// 网络请求默认全局配置
		fly.config.baseURL = 'https://api.kags.cn';
		fly.config.timeout = 30000;
		fly.config.method = 'POST';
		
		// 环境判断
		switch(config.env) {
			case 'lyl' : fly.config.baseURL = 'https://lyl-api.kags.cn';break;
			case 'lwf' : fly.config.baseURL = 'https://lwf-api.kags.cn';break;
			case 'xzy' : fly.config.baseURL = 'https://xzy-api.kags.cn';break;
			case 'dev' : fly.config.baseURL = 'https://api-dev.kags.cn';break;
			default : fly.config.baseURL = 'https://api.kags.cn';
		}
		
		// 请求方式
		if(config.method) {
			fly.config.method = config.method;
		}
		
		// 请求头
		if(config.header) {
			fly.config.headers = config.header;
		}
		
		return fly.request(path, data);
	}
}

export default Request;