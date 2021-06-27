import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js"; // path to vuetify export
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store/store";
import VSwitch from 'v-switch-case';
const baseURL = "https://r7y084ribd.execute-api.eu-west-2.amazonaws.com";

Vue.use(VueAxios, axios);


Vue.axios.defaults.baseURL = baseURL;

Vue.config.productionTip = false;
Vue.use(VSwitch)
new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App)
}).$mount("#app");
