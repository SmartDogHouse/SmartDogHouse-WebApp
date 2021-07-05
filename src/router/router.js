import Vue from "vue";
import VueRouter /*, { RouteConfig }*/ from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login,
    alias: "/"
  },
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  //Avoid 404 pages
  {
    path: "*",
    redirect: "/Login"
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/", //process.env.BASE_URL,
  routes
});

export default router;
