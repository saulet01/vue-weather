import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axios from "axios";
window.axios = axios;
// import wow from "wow.js";
Vue.config.productionTip = false;

const WOW = require("wowjs");

window.wow = new WOW.WOW({
  live: false
});

// window.wow.init();

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
