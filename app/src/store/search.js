//search模块的小仓库
import {reqGetSearchInfo} from "@/api";
const state = {
    //先在search组件进行mounted进行测试一下 看返回的是啥类型的数据 根据返回结果得知是对象
    searchList:{}
};
const actions={
    //获取search模块的数据 action里面参数第一个是上下文
    async getSearchList({commit},params={}){
        //当前这个reqgetSerchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参：是当用户激发action的时候，第二个参数传递过来的，至少是一个空对象
       let result=await reqGetSearchInfo(params);
       if(result.code==200){
        commit('GETSEARCHLIST',result.data);
       }

    }
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList= searchList
    }
};
//getters 是计算属性（计算属性就是利用已有的属性造出新的属性） 在项目中，为了简化仓库中的数据
//可以把我们将来在组件当中需要用的数据简化一下（将来组件在获取数据的时候就方便了）
const getters = {
    //当前形参state,是当前仓库中的state，并非大仓库中的那个state
    goodsList(state){
    //这样书写是有问题的，断网的情况下不会存在goodlist的 从而造成undefined无法遍历
    //当然有网 可以获取服务器的数据就没有问题
    //所以计算的属性的属性值可加一个[] 
      return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList||[];
    },
    attrsList(state){
        return state.searchList.attrsList;
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}
