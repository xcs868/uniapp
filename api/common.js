import { get, post } from './http';

//发送验证码
export const apiCode = data => post('v1/user/sendsms', data);

//注册/登录 绑定手机
export const apiRegister = data => post('v1/user/register ', data);

//注册/登录 wx绑定手机
export const apiWxRegister = data => post('v1/user/weixin_login', data);
export const apiIsVip = data => post('v1/user/is_vip', data);

//登录 code发送给后台
export const apiLogin = data => post('v1/user/weixin_mp_callback ', data);

//修改用户信息
export const apiUserEdit = data => post('v1/user/edit ', data);

//获取用户家庭成员
export const apiUserFamily = data => post('v1/user/user_family', data);
export const apiUserDelFamily = data => post('v1/user/del_family', data);


//添加家人体质
export const apiAddFamily = data => post('v1/user/add_family ', data);

export const apiWeixinBind = data => post('v1/user/weixinbind ', data);
//首页轮播
export const apiBannar = data => post('v1/home/banner_list ', data);
//首页最新三条时令好文
export const apiGetNews = data => post('v1/home/get_news ', data);


//热门商品
export const apiHotGoods = data => post('v1/home/get_hot_goods ', data);

//首页分组
export const apiGorp = data  => post('v1/home/cate_gorp', data);

//首页推荐商品
export const apiRecommend = data  => post('v1/home/recommend', data);

//选择体质，获取体质数据
 //体质
export const apiSelfContion = data  => post('v1/home/self_contion', data);
export const apiUserConsition = data  => post('v1/home/get_consiton', data);
export const apiSubConsition = data  => post('v1/user/select_consiton', data);

export const  apiType = data  => post('v1/home/get_grop_left', data);

//分类  右边内容
export const  apiGoods = data  => post('v1/cate/get_goods_right', data);

/**
 * 购物车相关
 * */
 //添加购物车
export const  apiAddCart = data  => post('v1/cart/add_cart', data);
 //获取购物车数据
export const  apiCartList = data  => post('v1/cart/get_cart_list', data);
//删除购物车商品
export const  apiDelCart = data  => post('v1/cart/del_cart', data);




/**
 * 商品相关
 * */
//获取单个商品数据
export const  apiGetGoodsDetail = data  => post('v1/goods/get_goods', data);
//收藏商品
export const  apiAddGoodsCollection = data  => post('v1/goods/add_collection', data);
//用户评价
export const  apiGetAssessList = data  => post('v1/goods/get_assess_list', data);

//推荐
//体质分类
export const  apiConsiton = data  => post('v1/user/get_consiton', data);
//内容
export const  apiGoodsRecommend = data  => post('v1/cate/goods_recommend', data);



/* 收货地址联系人 */
//获取联系人详细地址
export const  apiOneAddress = data  => post('v1/order/one_address', data);

//增加联系人地址
export const  apiAddAddress = data  => post('v1/order/add_address', data);

//修改联系人地址
export const  apiEditAddress = data  => post('v1/order/edit_address', data);

//联系人地址列表
export const  apiAddress = data  => post('v1/order/get_address', data);

//省市区数据
export const  apiRegion = data  => post('v1/region', data);







//微信小程序支付授权
export const  apiPayCallback = data  => post('v1/charge/pay_callback', data);
//微信小程序支付授权
export const  apiPayOrder = data  => post('v1/charge/create_order', data);
//微信小程序医生支付授权
export const  apiDoctorPayOrder = data  => post('v1/doctor/create_order', data);


//订单列表
export const  apiOrderList = data  => post('v1/order/order_list', data);
//订单详情
export const  apiOrderDetails = data  => post('v1/order/get_goods_details', data);
//付款
export const  apiPay = data  => post('v1/charge/pay_order', data);
//确认收货
export const  apiConfirmReceipt = data  => post('v1/order/confirm_receipt', data);



/**
 * 个人中心
 * */

 
 
 //用户信息
export const  apiUserInfo = data  => post('v1/user/userinfo', data);
//医生信息
export const  apiDoctorInfo = data  => post('v1/doctor/userinfo', data);
//积分列表
export const  apiGetRecoed = data  => post('v1/doctor/get_recoed', data);
//积分兑换余额
export const  apiExchageBalacne = data  => post('v1/doctor/exchage_balacne', data);
//余额记录
export const  apiGetBalanceList = data  => post('v1/doctor/get_balance_list', data);

//热门文章
export const  apiHotList = data  => post('v1/news/hot_list', data);
//文章
export const  apiGetList = data  => post('v1/news/get_list', data);
//文章详情
export const  apiGetRead = data  => post('v1/news/read', data);
//文章关注
export const  apiNewsFollow = data  => post('v1/news/user_follow', data);






//取消/删除 订单 user_id , order_id , state [1-取消订单2-删除订单]
export const  apiRemoveOrder = data  => post('v1/order/remove_order', data);


//充值VIP
export const  apiChargeVip = data  => post('v1/charge/charge_vip', data);


/*评价*/
//商品列表
export const  apiGetAssess = data  => post('v1/goods/get_assess', data);
//评价
export const  apiCreatedAssess = data  => post('v1/goods/created_assess', data);


export const  apiGetUserColection = data  => post('v1/user/get_user_clooction', data);
export const  apiRemoveUserColection = data  => post('v1/user/remove_clooction', data);



/**
 * 商品分类详情页
 * */
export const  apiGetGoodsCateDetails = data  => post('v1/goods/get_cate_list', data);

/**
 * 获取公共内容
 * */
export const  apiGetNewsRead = data  => post('v1/news/read', data);

export const  apiDoctorAuthImg = data  => post('v1/doctor/auth_upload', data);
export const  apiDoctorFansList = data  => post('v1/doctor/fans_list', data);
export const  apiDoctorRemoveFans = data  => post('v1/doctor/remove_fans', data);



// 邀请记录
export const  apiGetRecommendList = data  => post('v1/user/get_recommend_list', data);
export const  apiGetMyRecommendList = data  => post('v1/user/my_recommend_list', data);

export const  apiSelfContent = data  => post('v1/home/get_self', data);


//膳识

export const  apiFoodCate = data  => post('v1/cate/food_cate', data);
export const  apiFoodRight = data  => post('v1/cate/food_right ', data);
//节气
export const  apiSolar = data  => post('v1/solar/name', data);