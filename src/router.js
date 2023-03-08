//import { createRouter, createWebHistory } from "vue-router";
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";
import Login from "./views/login.vue";
import Favoritos from "./views/favoritos.vue";
import Edit from "./views/editList.vue";
import forgotPassword from "./views/forgotPassword.vue";
import newUser from "./views/newUser.vue";
Vue.use(Router);

const originalPush = Router.prototype.push;

// Rewrite the push method on the prototype and handle the error message uniformly

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const originalReplace = Router.prototype.replace;

// Rewrite the push method on the prototype and handle the error message uniformly

Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

/*
//Rotas Básicas para Funcionamento do Módulo
*/

let routes = [
  {
    path: "/",
    name: "app",
    //component: () => ('./views/home.vue')
    component: Home,
    meta: { transition: "slide-left" },
  },
  {
    path: "/home",
    name: "app",
    //component: () => ('./views/home.vue')
    component: Home,
    meta: { transition: "slide-left" },
  },
  {
    path: "/login",
    name: "login",
    //component: () => ('./views/login.vue')
    component: Login,
    meta: { transition: "slide-left" },
  },
  {
    path: "/favoritos",
    name: "favoritos",
    //component: () => ('./views/favoritos.vue')
    component: Favoritos,
    meta: { transition: "slide-left" },
  },
  {
    path: "/edit",
    name: "editList",
    //component: () => "./views/editList.vue",
    component: Edit,
    meta: { transition: "slide-left", requiresAuth: true },
  },
  {
    path: "/forgotPassword",
    name: "forgotPassword",
    //component: () => "./views/editList.vue",
    component: forgotPassword,
    meta: { transition: "slide-left" },
  },
  {
    path: "/newUser",
    name: "newUser",
    //component: () => "./views/editList.vue",
    component: newUser,
    meta: { transition: "slide-left" },
  },
];
//

const router = new Router({
  routes: routes,
  mode: "history",
  duplicateNavigationPolicy: "ignore",
});

// const router = Router.createRouter({
//   history: Router.createWebHistory(),
//   routes
// })

export default router;
