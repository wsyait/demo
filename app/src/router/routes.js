import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
//路由配置信息
export default [
    {
        //detail组件进行路由跳转的时候需要params参数，params参数传参需要占位(用了skuid)
        path: "/detail/:skuid",
        component: Detail,
        meta: { show: true }

    },
    {           //path路径上的单词都要小写
        path: "/shopcart",
        component: ShopCart,
        meta: { show: true }

    }
    ,
    {
        //path路径上的单词都要小写
        path: "/addcartsuccess",
        name:'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }

    },
    {
        path: "/home",
        component: Home,
        //路由元信息key不能瞎写：只能叫做meta
        meta: { show: true }

    }
    ,
    {
        path: "/search/:keyword?",
        component: Search,
        meta: { show: true },
        name: "search"
    },
    {
        path: "/login",
        component: Login
    }
    , {
        path: "/register",
        component: Register
    }, {
        path: "*",
        redirect: "/home"

    }/* ,
    {
        path:"/home/typenav",
        component:TypeNav
    }
*/   // 自己瞎写的


]