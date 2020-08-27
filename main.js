import Vue from 'vue'
import App from './App'
import api from '@/api/index';

Vue.prototype.$api = api;
import uView from "uview-ui";
Vue.use(uView);
import  "@/common/iconfont.css";
/**
 * 页面跳转
 * url 跳转链接
 */
Vue.prototype.navigateToAction = function (url, isLogin = false) {
	uni.navigateTo({
		url: url,
		success: res => {},
		fail: () => {},
		complete: () => {}
	});
}

/**
 * alert提示
 * title 提示框标题
 * content 提示框内容
 * isShowCalcel 是否显示取消按钮
 */
Vue.prototype.confirmAlert = function (title, content, isShowCancel,cb) {
	// #ifndef APP-PLUS
	uni.showModal({
		title: title,
		content: content,
		showCancel: isShowCancel,
		cancelText: '取消',
		confirmText: '确定',
		success: res => {
			if (res.confirm) {
			    cb && cb()
			}
		},
		fail: () => {},
		complete: () => {}
	});
	// #endif
}

/**
 * toast提示
 * title 提示内容
 * duration 显示时间 单位：毫秒
 */
Vue.prototype.myToast = function (title, duration = 2000) {
	// #ifndef APP-PLUS
	uni.showToast({
		title: title,
		icon: 'none',
		mask: false,
		duration: duration
	});
	// #endif
}

import Tools from './plugins/tools/Tools.js';
Vue.prototype.$Tools = new Tools();

Vue.prototype.$webImgUrl = 'http://imgsg.qichuanqing.cn'

 Vue.filter('money', function(val) {
     val = val.toString().replace(/\$|\,/g,'');
     if(isNaN(val)) {
       val = "0";  
     } 
     let sign = (val == (val = Math.abs(val)));
     val = Math.floor(val*100+0.50000000001);
     let cents = val%100;
     val = Math.floor(val/100).toString();
     if(cents<10) {
        cents = "0" + cents
     }
     for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
         val = val.substring(0,val.length-(4*i+3))+',' + val.substring(val.length-(4*i+3));
     }
 
     return (((sign)?'':'-') + val + '.' + cents);
 })
 
Vue.config.productionTip = false
App.mpType = 'app'


const app = new Vue({
    ...App
})
app.$mount()
