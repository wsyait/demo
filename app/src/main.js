import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carouse';
import Pagination from '@/components/Pagination';
//第一个参数：全局组建的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name,Pagination);
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store';
//测试
/* import {reqCategoryList} from '@/api';
reqCategoryList(); */

//引入mockServer.js----mock数据
import '@/mock/mockServer';
//引入swiper的样式  引样式不用a from b 
import "swiper/css/swiper.css"
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  //注册路由：底下KV都一样所以省略v
  //注册路由信息;写完之后，组件身上都有了$route和$router属性
  router,
  //注册仓库:组件实例的身上会多一个属性$store的属性
  store
}).$mount('#app')


