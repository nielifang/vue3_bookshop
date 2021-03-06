import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vant/lib/index.css";
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Badge,
  Sidebar,
  SidebarItem,
  Collapse,
  CollapseItem,
  Tab,
  Tabs,
  Card,
  Image as VanImage,
  Tag,
  Button,
  Form,
  Field,
  CellGroup,
  CheckboxGroup,
  Stepper,
  Checkbox,
  SwipeCell,
  SubmitBar,
  AddressEdit,
  AddressList,
  Popup,
  Icon,
} from "vant";
createApp(App)
  .use(store)
  .use(router)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload, {
    loading: require("./assets/images/default.png"),
  })
  .use(Badge)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Collapse)
  .use(CollapseItem)
  .use(Tab)
  .use(Tabs)
  .use(Card)
  .use(VanImage)
  .use(Tag)
  .use(Button)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(CheckboxGroup)
  .use(Stepper)
  .use(Checkbox)
  .use(SwipeCell)
  .use(SubmitBar)
  .use(AddressEdit)
  .use(AddressList)
  .use(Popup)
  .use(Icon)
  .mount("#app");
