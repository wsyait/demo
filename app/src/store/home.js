import { reqCategoryList, reqGetBannerList,reqFloorList} from '@/api';
//home模块的小仓库
const state = {
    //state中的默认初始值被瞎写 根据接口的返回值(服务器)确定值的类型
    categoryList: [],
    bannerList:[],
    floorList:[]
};
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    //（在最上面引入了req这个函数，然后调用这个函数）这个函数能够向服务器发请求并获取数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    //获取首页轮播图的数据
    //async getBannerList()是一个异步函数，用于获取轮播图列表数据。在函数体内部使用了await关键字等待reqGetBannerList()函数执行完成。
    //假设reqGetBannerList()函数返回一个Promise对象，表示异步请求的结果。通过使用await关键字，可以暂停函数的执行，直到reqGetBannerList()函数返回的Promise对象被解析（即异步操作完成）。
    async getBannerList({commit}) {
        let result = await reqGetBannerList();
        if(result.code==200){
            commit('GETBANNERLIST',result.data);
        }
    },
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code==200){
            //提交mutation
            commit('GETFLOORLIST',result.data);
        }
    }
 
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList;
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
