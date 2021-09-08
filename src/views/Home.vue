<template>
  <div class="home">
    <nav-bar>
      <template v-slot:left>&lt;</template>
      <template v-slot:default> 图书兄弟 </template>
    </nav-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted } from "vue";
import { getHomeAllData } from "../network/home";
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Home",
  components: {
    NavBar,
  },
  setup() {
    const banner = ref([]);
    onMounted(() => {
      getHomeAllData().then((res) => {
        banner.value = res.goods.data;
        console.log(banner.value);
      });
    });
    return {
      banner,
    };
  },
};
</script>
