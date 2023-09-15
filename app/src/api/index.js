//当前这个模块：API进行统一的管理
import requests from './request';
import mockRequests from './mockAjax';

//三级联动接口
///api/product/getBaseCategoryList  get 无参数


//对外暴露一个函数，只要外部调用这个函数，就像服务器发起Ajax请求，获取咱们的三级菜单数据，
//当前咱们这个函数只需要把服务器返回结果返回即可。
export const reqCategoryList = ()=>{
    //发请求:axios发请求返回结果Promise对象
    return requests({url:'/product/getBaseCategoryList',method:'get'});
};//切记：当前函数执行需要把服务器返回结果返回
//export const reqCategoryList=()=>request.get('/product/getBaseCategoryList');
//获取banner(Home首页轮播图接口)
export const reqGetBannerList=()=>mockRequests.get('/banner');
//获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor');
//获取搜索模块数据 地址：/api/list  请求方式：post 参数要带
//当前这个接口（获取搜索模块的数据），给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params})

//获取产品详情信息的接口 URL:/api/item/{ skuId }  请求方式：get   
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'})

//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }   POST请求
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

//获取购物车列表数据接口
//URL:/api/cart/cartList   method:get
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'});
