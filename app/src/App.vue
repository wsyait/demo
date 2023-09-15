<template>
  <div> 
    <Header></Header> 
    <!-- 路由组件出口的地方-->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在登录，注册隐藏 -->
    <!-- //方式1 不够灵活 要是组件多写的会很长 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <!-- 方式二 利用路由元信息 -->
    <Footer v-show="$route.meta.show"></Footer> 
  </div>
</template>

<script>
//引入
import Header from './components/Header'
import Footer from './components/Footer'
  export default {
    name:'',
    components:{
      Header,
      Footer
    },
    mounted(){
      //派发一个action 获取商品分类的三级列表的数据---这时候仓库就有了数据（在typeNav使用前）
      this.$store.dispatch("categoryList");
    },
  }
</script>

<style scoped>

</style>