import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { MessageBox } from "element-ui";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    meta: {},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    meta: {
      auth: false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // 权限控制登录  auth-- 是否需要登录
  if (to.meta && to.meta.auth && !store.state.user.isLogin) {
    loginModal();
    next(false);
  } else {
    next();
  }
});

function loginModal() {
  MessageBox.confirm("此时此刻需要您登录", "温馨提示", {
    confirmButtonText: "去登录",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      router.push("/Home");
    })
    .catch(() => {});
}

export default router;
