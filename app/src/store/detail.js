import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
//封装游客身份模块uuid----生成一个随机的字符串（不能再变了）
import {getUUID} from '@/utils/uuid_token';
const state = {
    //这里goodinfo是什么，得看接口文档里面的data是什么数据类型
    goodInfo: {},
    //游客的临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
const actions = {
    //获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data)
        }
    },
    //将产品添加到购物车中
    //加入购物车的||修改某一个产品的个数
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //加入购物车返回的解构，前端带一些参数给服务器（需要存储这些数据）
        //服务器写入数据成功，并没有返回其他的数据，只是返回code=200,代表这次操作成功
        //因为服务器没有返回其余数据，因此咱们不需要三连环存储数据
        //async函数返回的结果一定是一个promise（要么成功要么失败）
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        //当前的这个函数，如果执行返回promise
        //代表服务器加入购物车成功
        if (result.code == 200) {
            //返回的是成功的标记
            return "OK"
        } else {
            //代表加入购物车失败，返回失败的痕迹
            return Promise.reject(new Error('faile'));
            /*   if(result.code==200){
                 commit("RE",result.data)
          */
        };
    },
};
//getters为简化数据而生
const getters = {
    //路径导航简化的数据
    categoryView(state) {
        //比如：state.goodInfo初始状态空对象，空对象的categoryView这个属性值是undefined,
        //所以写个或，这样当前的categoryView至少是一个空对象，假的报错就不会有了
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //产品售卖属性的简化
    /*    skuSaleAttrList(state){
           return state.goodInfo.skuSaleAttrValueList||{};
       } */

};
export default {
    state,
    actions,
    mutations,
    getters,
};