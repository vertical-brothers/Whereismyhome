import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import BoardView from "@/views/BoardView.vue";
import UserView from "@/views/UserView.vue";
import AptView from "@/views/AptView.vue";
import StarView from "@/views/StarView.vue";
import AdminView from "@/views/AdminView";

import MainHome from "@/components/home/MainHome.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
import BoardModify from "@/components/board/BoardModify.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import KakaoMap from "@/components/apt/map/KakaoMap.vue";
import AptDetail from "@/components/apt/info/AptOverlay.vue";

import UserLogin from "@/components/user/UserLogin";
import UserRegister from "@/components/user/UserRegister";
import UserMypage from "@/components/user/UserMypage";

import StarList from "@/components/star/StarList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    // redirect: "/",
    children: [
      {
        path: "/main",
        name: "main",
        component: MainHome,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/board",
    name: "board",
    component: BoardView,
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "list",
        component: BoardList,
      },
      {
        path: "detail/:no",
        name: "detail",
        component: BoardDetail,
      },
      {
        path: "write",
        name: "write",
        component: BoardWrite,
      },
      {
        path: "modify/:no",
        name: "modify",
        component: BoardModify,
      },
    ],
  },
  {
    path: "/apt",
    name: "apt",
    component: AptView,
    // redirect: "/apt/",
    children: [
      {
        path: "map",
        name: "map",
        component: KakaoMap,
      },
      {
        path: "AptDetail",
        name: "AptDetail",
        component: AptDetail,
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    children: [
      {
        path: "login",
        name: "login",
        component: UserLogin,
      },
      {
        path: "join",
        name: "join",
        component: UserRegister,
      },
      {
        path: "mypage",
        name: "mypage",
        component: UserMypage,
      },
    ],
  },
  {
    path: "/star",
    name: "star",
    component: StarView,
    children: [
      {
        path: "list",
        name: "starList",
        component: StarList,
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
