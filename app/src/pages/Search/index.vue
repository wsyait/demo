<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 按钮加一个× 这是面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTradeMark">×</i>
            </li>
            <!-- 属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector这是属于search的子组件-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id" >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"> -->
                      <!-- 在路由跳转的时候切记别忘记带id（params参数） -->
                      <router-link :to="`/detail/${good.id}`">
                        <img :src="good.defaultImg" />
                      </router-link>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     /></a>
                  </div>
                  <div class="price">
                    <strong>2
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :total="total" :pageSize="searchParams.pageSize" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
    //全局组件上面有TypeNav和Pagination 可千万别写这里了 不然就报错啦
  },
  data() {
    return {
      //带给服务器参数=---定义成响应式数据--一上来不带有数据 所以都是空的
      searchParams: {
        //一级分类
        category1Id: "",
        //二级分类的id
        category2Id: "",
        //三级分类的id
        category3Id: "",
        //分类的名字
        categoryName: "",
        //用户输入的关键字
        keyword: "",
        //排序：初始状态应该是综合降序
        order: "1:asc",
        //分页器代表是第几页
        pageNo: 3,
        //代表一页展示几个数据
        pageSize: 10,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  /*   beforeCreate(){},
  created(){}, */
  //当组件挂载完毕之前执行一次（先于mounted之前）
  beforeMount() {
    //复杂写法
    /* this.searchParams.category1Id=this.$route.query.category1Id;
    this.searchParams.category2Id=this.$route.query.category2Id;
    this.searchParams.category3Id=this.$route.query.category3Id;
    this.searchParams.categoryName=this.$route.query.categoryName;
    this.searchParams.keyword=this.$route.params.keyword; */

    //在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会
    //就会返回查询的数据）Object.assign ES6新增语法 合并对象
    //this.searchParams = JSON.parse(JSON.stringify(Object.assign({}, this.searchParams, this.$route.query, this.$route.params)));
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    //先测试一下接口返回的数据
    //如果这个action的dipatch在这里只能发一次数据，而我们需要根据传的参数不同发多次参数
    //我们可以把注释的封装成一个函数并写在methods里面，从而实现多次调用
    /*  this.$store.dispatch("getSearchList", {}); */
    //在发请求之前带给服务器参数（searchParams参数发生变化有数值带给服务器）
    this.getData();
  },
  computed: {
    //mapGetters里面的写法：传递的数组，因为getters计算是没有划分模块【home/search】
    ...mapGetters(["goodsList"]),
    isOne() {
      //写那个上面的时候不用写this 这里需要写this
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
        //得把仓库中的数据映射成组建的数据，需要用mapstate
    //获取search模块展示的产品一共多少数据

    ...mapState({
      total:state=>state.search.searchList.total
    }),
  },
  methods: {
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removeCategoryName() {
      //把带给服务器的参数置空了，还需要向服务器发请求 获取默认数值、
      //由于此时带给服务器的参数可有可无空字符串还是会带给服务器(占宽带) 而带成undefined 则不会带给服务器
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      this.getData();
      //地址栏也需要改，进行路由跳转(现在路由跳转只是跳转到自己这里)
      //没有else因为params空字符串的时候也是true(前面配置过要么有参数有么空字符串)
      //严谨：本意是删除query，如果路径中出现params不应该删除，路由跳转的时候应该带着
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //删除关键字
    removeKeyword() {
      //给服务器带的参数searcParams的kyword置空
      this.searchParams.keyword = undefined;
      //再次发请求
      this.getData();
      //通知兄弟组件Hearder清除关键词
      this.$bus.$emit("clear");
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    trademarkInfo(trademark) {
      // 1.整理品牌字段的参数  "ID:品牌名称"
      // 注意错误  下面那个要用ESC下面的单引号
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发请求
      this.getData();
    },
    //删除品牌的信息
    removeTradeMark() {
      //给服务器带的参数searcParams的trademarks置空
      this.searchParams.trademark = undefined;
      //再次发请求
      this.getData();
    },
    attrInfo(attr, attrValue) {
      //["属性ID:属性值:属性名"]
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组还要去重
      // if语句里面如果只有一个语句，则可以省略大括号
      // if (this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props);
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      this.getData();
      // 再次发请求
    },
    removeAttr(index) {
      //再次整理数据
      this.searchParams.props.splice(index, 1);
      //再次请求数据
      this.getData();
    },
    //排序的操作
    //flag形参：他是一个标记，代表用户点击的是综合（1）还是（2）（用户点击的时候传过来的）
    changeOrder(flag) {
      let originOrder = this.searchParams.order;
      //这里获取最开始的状态
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      //准备一个新的order属性值
      let newOrder = "";
      //这个语句能确定点击的一定是综合
      if (flag == originFlag) {
        //三元表达式 如果是desc则变成asc 如果不是则变成desc
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        //点击的是价格
        newOrder = `${flag}:${"desc"}`;
      }
      //将新的order赋予searchParams
      this.searchParams.order = newOrder;
      //再次发请求
      this.getData();
    },
    //自定义事件的回调函数--获取当前第几页
    getPageNo(pageNo){
      //整理带给服务器的参数
  this.searchParams.pageNo = pageNo;
    //再次发请求
    this.getData();
    },

    //数据监听：监听组件实例身上的属性的属性值变化
    watch: {
      $route(newValue, oldValue) {
        //监听路由的信息是否发生变化，如果发生变化，再次发起请求，需要再次整理带给服务器参数
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        this.getData();
        //每一次请求完毕，应该把相应的123级分类的id置空，让他接受下一次相应的123id
        //分类的名字和关键字不用清理：因为每一次路由发生变化的时候，都会赋予新的数据
        this.searchParams.category1Id = "";
        this.searchParams.category2Id = "";
        this.searchParams.category3Id = "";
      },
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>