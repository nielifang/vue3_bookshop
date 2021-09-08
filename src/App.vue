<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <!-- <router-view /> -->
    <div id="nav">
      <router-link class="tab-bar-item" to="/home">
        <i class="iconfont icon-home"></i>
        <div>首页</div>
      </router-link>
      <router-link class="tab-bar-item" to="/category">
        <i class="iconfont icon-leimupinleifenleileibie"></i>
        <div>分类</div>
      </router-link>
      <router-link class="tab-bar-item" to="/shopcart">
        <van-badge :content="$store.state.cartCount" max="9">
          <i class="iconfont icon-gouwuche"></i>
        </van-badge>
        <div>购物车</div>
      </router-link>
      <router-link class="tab-bar-item" to="/profile">
        <i class="iconfont icon-user"></i>
        <div>我的</div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { onMounted } from "vue";
export default {
  setup() {
    const store = useStore(); // 获取对象
    onMounted(() => {
      store.dispatch("updateCart"); // ⚪️ 分发，状态管理，更新购物车数量 cartCount
    });
  },
};
</script>

<style lang="scss">
@import "assets/css/base.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  // padding: 30px;
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgb(100, 100, 100, 0.1);
  a {
    color: var(--color-text);
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: var(--font-size);
  }
  .tab-bar-item i {
    font-size: 20px;
  }
}
</style>
