<template>
  <!-- 轮播图组件 -->
  <van-swipe
    v-if="banners.length"
    class="my-swipe"
    :autoplay="2000"
    indicator-color="white"
  >
    <van-swipe-item v-for="(item, index) in banners" :key="index">
      <!-- <img :src="item.img_url" alt="">--><!--普通加载图片方式-->
      <img
        v-lazy="item.img_url"
        alt=""
      /><!--懒加载：在页面出现的时候显示一张缓存图片，等到页面加载完，再轮播其他图片-->
    </van-swipe-item>
  </van-swipe>
</template>
<script>
export default {
  name: "HomeSwiper",
  props: {
    banners: Array,
    default() {
      return [];
    },
  },
};
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 179px !important;
}
</style>
