<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      :key="index"
      @click="itemClick(index)"
      :class="{ active: index == currentIndex }"
    >
      <span>{{ item }}</span>
    </div>
    <!-- <div class="tab-control-item active">
      <span>新书</span>
    </div>
    <div class="tab-control-item">
      <span>精选</span>
    </div> -->
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    let currentIndex = ref(0);
    const itemClick = (index) => {
      currentIndex.value = index;
      emit("tabClick", index);
    };
    return {
      currentIndex,
      itemClick,
    };
  },
};
</script>
<style lang="scss" scoped>
.tab-control {
  height: 40px;
  line-height: 40px;
  display: flex;
  font-size: 14px;
  text-align: center;
  background-color: #fff;
  width: 100%;
  position: sticky;
  top: 45px;
  z-index: 10;
  .tab-control-item {
    flex: 1;
    span {
      padding: 5px;
    }
  }
  .active {
    color: var(--color-tint);
    span {
      border-bottom: 3px solid var(--color-tint);
    }
  }
}
</style>
