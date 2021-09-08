<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品详情:{{ id }}</template>
    </nav-bar>
    <van-image
      style="margin-top: 50px"
      width="100%"
      lazy-load
      :src="detail.cover_url"
    >
    </van-image>
    <van-card
      style="text-align: left"
      :num="detail.stock"
      :price="detail.price + '.00'"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag plain type="danger">推荐</van-tag>
      </template>
      <template #footer>
        <van-button type="warning" @click="handleAddCart"
          >加入购物车</van-button
        >
        <van-button type="danger" @click="goToCart">立即购买</van-button>
      </template>
    </van-card>
    <van-tabs v-model="active">
      <van-tab title="概述">
        <div class="content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评">
        <div class="content" v-html="detail.details"></div
      ></van-tab>
      <van-tab title="相关图书">
        <div class="content">
          <GoodsList :goods="like_goods"></GoodsList>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs } from "vue";
import { getDetail } from "network/detail";
import { addCart, modifyCart } from "network/cart";
import { Toast } from "vant";
import { useStore } from "vuex";
import GoodsList from "components/content/goods/GoodsList.vue";
export default {
  name: "Detail",
  components: {
    NavBar,
    GoodsList,
  },
  setup() {
    let active = ref(0);
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let id = ref(0);
    let book = reactive({
      detail: {},
      like_goods: [],
      comments: [],
    });
    onMounted(() => {
      id.value = route.query.id;
      getDetail(id.value).then((res) => {
        book.detail = res.goods;
        book.like_goods = res.like_goods;
      });
    });
    // 添加购物车
    const handleAddCart = () => {
      addCart({ goods_id: book.detail.id, num: 1 }).then((res) => {
        if (res.status == "204" || res.status == "201") {
          Toast.success("添加成功");
          //设置store种的购物车数量
          store.dispatch("updateCart");
        }
      });
    };
    //立即购买
    const goToCart = () => {
      addCart({ goods_id: book.detail.id, num: 1 }).then((res) => {
        if (res.status == "204" || res.status == "201") {
          Toast.success("添加成功");
          store.dispatch("updateCart");
          router.push({ path: "./shopcart" });
        }
      });
    };
    return {
      id,
      book,
      ...toRefs(book),
      active,
      handleAddCart,
      goToCart,
    };
  },
};
</script>
<style scoped lang="scss">
.content {
  padding: 10px;
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>
