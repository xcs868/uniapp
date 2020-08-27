import Vue from 'vue'

class Tools {
	//检测登录状态
	isLogin () {
		if(!uni.getStorageSync('USER_ID')) {
			return false;
		} else {
			return true;
		}
	}
	
	
	/**
	 * 字符串全部替换函数
	 * @param {Object} str 字符串主体
	 * @param {Object} prestr 被替换的字符串
	 * @param {Object} newstr 替换的字符串
	 */
	replaceStr(str, prestr, newstr) {
		return str.replace(new RegExp(prestr, 'g'), newstr);
	}
	
}

export default Tools