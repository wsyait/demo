<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <Carousel :list="bannerList"/>
        <!--banner轮播-->
<!--         <div class="swiper-container" ref="mySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(carouse, index) in bannerList"
              :key="carouse.id"
            >
              <img :src="carouse.imgUrl" />
            </div>
          </div>
         如果需要分页器 
          <div class="swiper-pagination"></div>

      如果需要导航按钮 
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div> -->
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引包
export default {
  name: "",
  mounted() {
    //mounted:组件挂载完毕，正常说组件结构（dom）已经全有了
    //为什么组件实例swiper直接书写不可以，因为结构还不完整，
    //派发action:通过Vuex发送ajax请求，将数据存储在仓库中
    this.$store.dispatch("getBannerList"); //此时仓库中还没有getBannerList 需要到store中
    //在new swiper实例之前，前面中的结构必须要，现在把new swiper实例放在mounted这里发现不行
    //why？ 因为dispatch涉及到异步语句，结构还不完整 v-for是动态数据遍历服务器的数据,
    //（顺序：发ajax请求获取数据-初始化swiper-修改仓库中的bannerlist数据，
    //所以swiper创建实例时，组件没数据）
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },
/*   watch: {
    //监听bannerlist数据的变化，因为这条数据发生过变化---由空数组变为数组里面有四个元素
    //handler事件处理
    bannerList: {
      immediate: true,
      handler(newValue, oldValue) {
        //现在咱们通过watch监听bannerlist属性的属性值的变化
        //如果执行handler方法，代表组件实例身上这个属性的属性值已经有了（数组：四个元素）
        //当前这个函数执行，结构还不完整，只能保证bannerlist数据已经有了，但是不能保证v-for已经结束
        //v-for执行完毕，才有结构，在watch中无法保证
        this.$nextTick(() => {
          //当你执行这个回调的时候：保证服务器数据回来了，v-for执行完毕了，轮播图有了
          //下面获取节点'.swiper-container' 可以写成document.querySelector("'.swiper-container'")
          //或者用mySwiper '.swiper-container',
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //点击小球就可以切换页面
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
                   scrollbar: {
            el: '.swiper-scrollbar',
        }, 
          });
        });
      },
    },
  }, */
};
</script>

<style scoped lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(./images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>