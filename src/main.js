import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js"; // path to vuetify export
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store/store";
import VSwitch from 'v-switch-case';
import DatetimePicker from 'vuetify-datetime-picker'

//Don't forget stage in URL!!!!
//const baseURL = "http://127.0.0.1:8010/proxy/";
const baseURL = "https://sd2go08n7j.execute-api.eu-west-2.amazonaws.com/Prod/";

Vue.use(VueAxios, axios);
Vue.use(DatetimePicker)

// (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'
 


Vue.axios.defaults.baseURL = baseURL;

Vue.config.productionTip = false;
Vue.use(VSwitch)
new Vue({
  vuetify,
  store,
  router,
  axios,
  DatetimePicker,
  render: (h) => h(App)
}).$mount("#app");
