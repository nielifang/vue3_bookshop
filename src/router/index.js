import { createRouter, createWebHistory } from "vue-router";
import { Notify, Toast } from "vant";
import store from "../store";
const Home = () => import("../views/home/Home");
const Category = () => import("../views/category/Category");
const Detail = () => import("../views/detail/Detail");
const Profile = () => import("../views/profile/Profile");
const ShopCart = () => import("../views/shopcart/ShopCart");
const Register = () => import("../views/profile/Register");
const Login = () => import("../views/profile/Login");

const routes = [
  {
    path: "/",
    name: "DefaultHome",
    component: Home,
    meta: { title: "图书兄弟" },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { title: "图书兄弟" },
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
    meta: { title: "图书兄弟-商品分类" },
  },

  {
    path: "/detail",
    name: "Detail",
    component: Detail,
    meta: { title: "图书兄弟-商品详情" },
  },
  {
    path: "/shopcart",
    name: "ShopCart",
    component: ShopCart,
    meta: { title: "图书兄弟-购物车", isAuthRequired: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { title: "图书兄弟-个人中心", isAuthRequired: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { title: "图书兄弟-用户注册" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "图书兄弟-用户登录" },
  },

  {
    path: "/address",
    name: "Address",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/profile/Address"),
    meta: {
      title: "地址管理",
      isAuthRequired: true,
    },
  },
  {
    path: "/addressedit",
    name: "AddressEdit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/profile/AddressEdit"),
    meta: {
      title: "地址编辑",
      isAuthRequired: true,
    },
  },

  {
    path: "/createorder",
    name: "CreateOrder",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/order/CreateOrder"),
    meta: {
      title: "订单详情",
    },
  },
  {
    path: "/order",
    name: "Order",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/order/Order"),
    meta: {
      title: "订单详情",
    },
  },
  {
    path: "/orderdetail",
    name: "OrderDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/order/OrderDetail"),
    meta: {
      title: "订单详情",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  // 如果没有登录，在这里跳转到login页面
  if (to.meta.isAuthRequired && !store.state.user.isLogin) {
    Notify("您还未登录，请先登录");
    return next("/login");
  } else {
    next();
  }
  document.title = to.meta.title;
  // next();
});
export default router;
