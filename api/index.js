//批量导出
const requireApi = require.context('.',false,/.js$/);

const apiObj = {}
requireApi.keys().forEach((key, index) => {
	if(key === './index.js' || key === './http.js')return
	Object.assign(apiObj,requireApi(key))
})


export default apiObj