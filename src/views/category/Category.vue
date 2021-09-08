<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品分类</template>
    </nav-bar>
    <div id="mainbox">
      <div class="ordertab">
        <van-tabs v-model="active" @click="tabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
        </van-tabs>
      </div>
      <van-sidebar v-model="activeKey" class="leftmenu">
        <van-collapse v-model="activeName">
          <van-collapse-item
            v-for="item in categories"
            :key="item.id"
            :title="item.name"
            :name="item.name"
          >
            <van-sidebar-item
              v-for="sub in item.children"
              :title="sub.name"
              :key="sub.id"
              @click="getGoods(sub.id)"
            />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
      <div class="goodslist">
        <div class="content">
          <van-card
            v-for="item in showGoods"
            @click="itemClick(item.id)"
            :key="item.id"
            :num="item.comments_count"
            :tag="item.comments_count >= 0 ? '流行' : '标签'"
            :price="item.price"
            :desc="item.update_at"
            :title="item.title"
            :thumb="item.cover_url"
            :lazy_load="true"
          />
        </div>
      </div>
    </div>
    <BackTop @bTop="bTop" v-show="isShowBackTop"></BackTop>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import { ref, reactive, onMounted, computed, watchEffect, nextTick } from "vue";
import { getCategory, getCategoryGoods } from "network/category";
import BScroll from 'better-scroll';
import BackTop from "components/common/backtop/BackTop";
import {useRouter} from 'vue-router';
export default {
  name: "Category",
  components: {
    NavBar,
    BackTop
  },
  setup() {
    let activeKey = ref(0); //标签索引
    let activeName = ref(["1"]); // 二级索引
    let categories = ref([]); // 分类数据
    let active = ref(1);
    // 当前的排序条件
    let currentOrder = ref("sales");
    // 当前分类的id
    let currentCid = ref(0);
    let bscroll = reactive({})
    // 数据模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] },
    });
    let isShowBackTop = ref(false)
    const router = useRouter()
    const showGoods = computed(() => {
      return goods[currentOrder.value].list;
    });
    const init = () => {
      getCategoryGoods("sales", currentCid.value).then((res) => {
        goods.sales.list = res.goods.data;
      });
      getCategoryGoods("price", currentCid.value).then((res) => {
        goods.sales.list = res.goods.data;
      });
      getCategoryGoods("comments_count", currentCid.value).then((res) => {
        goods.comments_count.list = res.goods.data;
      });
    };
    onMounted(() => {
      getCategory().then((res) => {
        categories.value = res.categories;
      });
      getCategoryGoods("sales", currentCid.value).then((res) => {
        goods.sales.list = res.goods.data;
      });
      bscroll = new BScroll(document.querySelector(".goodslist"),{
        probeType:3,
        click:true,
        pullUpLoad:true
      })
      // 注册滚动事件
      bscroll.on('scroll',(position)=>{
        isShowBackTop.value = -position.y > 300
      })
       // 下拉加载更多
       bscroll.on("pullingUp",()=>{
         const page = goods[currentOrder.value].page + 1;
          getCategoryGoods(currentOrder.value, currentCid.value,page).then((res) => {
            goods[currentOrder.value].list.push(...res.goods.data)
            goods[currentOrder.value].page += 1;
      });
         bscroll.finishPullUp()
          bscroll.refresh()
       })
    });
    // 排序选项卡
    const tabClick = (index) => {
      let orders = ["sales", "price", "comments_count"];
      currentOrder.value = orders[index];
      getCategoryGoods(currentOrder.value, currentCid.value).then((res) => {
        goods[currentOrder.value].list = res.goods.data;
        nextTick(()=>{
        bscroll && bscroll.refresh()
      })
      });
    };
    // 通过分类得到商品
    const getGoods = (cid) => {
      currentCid.value = cid;
      init();
    };
    const bTop = ()=>{
      bscroll.scrollTo(0,0,300)
    }
    watchEffect(()=>{
      nextTick(()=>{
        bscroll && bscroll.refresh()
      })
    })
   

    return {
      activeKey,
      activeName,
      categories,
      active,
      tabClick,
      currentOrder,
      getGoods,
      currentCid,
      showGoods,
      goods,
      bscroll,
      bTop,
      isShowBackTop,
      itemClick:((id)=>{
        router.push({path:'/detail',query:{id}})
      })
    };
  },
};
</script>
<style lang="scss" scoped>
#mainbox {
  margin-top: 45px;
  display: flex;
  .ordertab {
    // width: 100px;
    height: 50px;
    flex: 1;
    float: right;
    top: 45px;
    right: 0;
    left: 130px;
    z-index: 9;
  }
  .leftmenu {
    width: 130px;
    position: fixed;
    top: 95px;
    left: 0;
  }
  .goodslist {
    height: 100vh;
    flex: 1;
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0;
    padding: 10px;
   text-align: left;
  }
}
 .van-card__thumb{
   width: 68px;
}
</style>
