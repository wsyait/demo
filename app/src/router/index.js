//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
//使用插件
Vue.use(VueRouter);
//引入路由组件

/* import TypeNav from '@/pages/Home/TypeNav' */ //自己瞎写的
/* import { component } from 'vue/types/umd'; */

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;

//重写push|replace
//第一个参数：告诉原来push方法，你往哪里跳（传递哪些参数）
//call||apply区别
//相同点;都可以调用函数一次，都可以篡改函数的上下文一次
//不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

//配置路由
export default new VueRouter({
    //配置路由
    //此处 kv一致 routes: routes  可以省略v
    routes,
    //滚动条位置，y:0使他跳转时在最上方
    scrollBehavior (to, from, savedPosition) {
        return {y:0};
      }
})