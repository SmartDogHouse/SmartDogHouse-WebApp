import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js"; // path to vuetify export
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store/store";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App)
}).$mount("#app");
