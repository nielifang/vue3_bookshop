<template>
  <div id="home">
    <nav-bar>
      <!-- <template v-slot:left>&lt;</template> -->
      <template v-slot:default> 图书兄弟 </template>
    </nav-bar>
    <TabControl
      v-show="isTabFixed"
      @tabClick="tabClick"
      :titles="['畅销', '新书', '精选']"
    ></TabControl>
    <div class="wrapper">
      <div class="content">
        <div ref="banref">
          <home-swiper :banners="banners"></home-swiper>
          <!-- <div class="banners">
            <img src="~assets/images/img.png" alt="" />
          </div> -->
          <recommend-view :recommends="recommends"></recommend-view>
        </div>
        <TabControl
          @tabClick="tabClick"
          :titles="['畅销', '新书', '精选']"
        ></TabControl>
        <goods-list :goods="showGoods"></goods-list>
      </div>
    </div>
    <BackTop @bTop="bTop" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted, reactive, computed, watchEffect, nextTick } from "vue";
import NavBar from "components/common/navbar/NavBar";
import BackTop from "components/common/backtop/BackTop";
import RecommendView from "./ChildComps/RecommendView";
import HomeSwiper from "./ChildComps/HomeSwiper";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList.vue";
import { getHomeAllData, getHomeGoods } from "network/home";
import BScroll from "better-scroll";
import { Toast } from "vant";
export default {
  name: "Home",
  components: {
    HomeSwiper,
    NavBar,
    RecommendView,
    TabControl,
    GoodsList,
    BackTop,
  },
  setup() {
    let isTabFixed = ref(false);
    const recommends = ref([]);
    const titles = ["畅销", "新书", "精选"];
    // 商品列表数据模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      recommend: { page: 1, list: [] },
      new: { page: 1, list: [] },
    });
    let currentType = ref("sales");
    let isShowBackTop = ref("false");
    let banref = ref(null);
    let banners = ref([]);
    const showGoods = computed(() => {
      return goods[currentType.value].list;
    });
    let bscroll = reactive({});

    onMounted(() => {
      Toast.loading({ message: "我很慢，你要忍耐一下...", forbidClick: true });
      getHomeAllData().then((res) => {
        recommends.value = res.goods.data;
        banners.value = res.slides;
      });
      getHomeGoods("sales").then((res) => {
        goods.sales.list = res.goods.data;
      });
      getHomeGoods("recommend").then((res) => {
        goods.recommend.list = res.goods.data;
      });
      getHomeGoods("new").then((res) => {
        goods.new.list = res.goods.data;
      });
      // 创建BScoll的对象
      bscroll = new BScroll(document.querySelector(".wrapper"), {
        probeType: 3, // 0,1,2,3  3:表示只要在运动就会触发scroll事件
        click: true, //是否允许点击
        pullUpLoad: true, //上拉加载更多
      });
      // 拉加载数据,触发pullUpLoad事件
      bscroll.on("pullingUp", (position) => {
        const page = goods[currentType.value].page + 1;
        getHomeGoods(currentType.value, page).then((res) => {
          goods[currentType.value].list.push(...res.goods.data);
          goods[currentType.value].page += 1;
        });
        // 完成上拉,等数据请求完成，将数据展示出来
        bscroll.finishPullUp();
        // 重新计算高度
        bscroll.refresh();
        // console.log(
        //   "当前内容高度",
        //   document.querySelector(".content").clientHeight
        // );
      });

      //  7 触发滚动事件 - scroll 事件 - 位置 position
      bscroll.on("scroll", (position) => {
        isShowBackTop.value = isTabFixed.value =
          -position.y > banref.value.offsetHeight;
      });
    });

    const tabClick = (index) => {
      let types = ["sales", "new", "recommend"];
      currentType.value = types[index];
      nextTick(() => {
        // 重新计算高度
        bscroll && bscroll.refresh();
      });
    };
    const bTop = () => {
      bscroll.scrollTo(0, 0, 500);
    };
    // // 监听任何一个变量有变化
    watchEffect(() => {
      nextTick(() => {
        // 重新计算高度
        bscroll && bscroll.refresh();
      });
    });
    return {
      recommends,
      titles,
      tabClick,
      goods,
      showGoods,
      isTabFixed,
      isShowBackTop,
      banref,
      bTop,
      banners,
    };
  },
};
</script>
<style scoped>
.banners img {
  width: 100%;
  height: auto;
  margin-top: 45px;
}
#home {
  position: relative;
  height: 100vh;
}
.wrapper {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
