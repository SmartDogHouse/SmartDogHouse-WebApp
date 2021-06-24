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
  {
    path: "*",
    redirect: "/Login"
  }
  /*{
    path: "/404",
    component: Page404
  },
  {
    path: "/Dona",
    name: "Donate",
    component: Donate
  },
  {
    path: "/Ricevi",
    name: "Receive",
    component: Receive
  },
  {
    path: "/Info",
    name: "Info",
    component: Info
  },
  {
    path: "/Admin",
    name: "Admin",
    //lazy
    component: () => import("../views/Admin.vue")
  },
  {
    path: "/Richieste/Donazione",
    name: "Withdrawals",
    //lazy
    component: () => import("../views/Withdrawals.vue")
  },
  {
    path: "/Richieste/Ritiro",
    name: "Donations",
    //lazy
    component: () => import("../views/Donations.vue")
  },
  {
    path: "/Impara",
    name: "Learn",
    component: Learn
  },
  {
    path: "*",
    redirect: "/404"
  }*/
];

const router = new VueRouter({
  mode: "history",
  base: "/", //process.env.BASE_URL,
  routes
});

export default router;
