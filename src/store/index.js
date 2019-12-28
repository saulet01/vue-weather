import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
// Vue.use(axios);
window.axios = axios;

export default new Vuex.Store({
  state: {
    getNewYork: {}
  },
  mutations: {
    SET_NEW_YORK(state, city) {
      state.getNewYork = city;
    }
  },
  actions: {
    loadCity({ commit }) {
      axios
        .get(
          "api.openweathermap.org/data/2.5/weather?q=New York&APPID=686aeb1eff8cb88780f2fbb1b51b06f8"
        )
        .then(res => {
          commit("SET_NEW_YORK", res);
        });
    }
  },
  modules: {}
});
