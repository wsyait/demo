import { reqCartList } from "@/api";
const state={};
const mutations={};
const actions={
    //获取购物车列表数据
   async getCartList(commit){
    let result = await reqCartList();
    //测试是否能够获取个人的购物车的数据
    console.log(result)
    }
};
const getters={};
export default {
    state,
    mutations,
    actions,
    getters,
}
