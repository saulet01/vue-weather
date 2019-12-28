import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  state: {
    selectedComponent: "",
    getCity: {},
    errorCode: ""
  },
  mutations: {
    SET_STATIC_CITY(state, res) {
      state.getCity = res.data;
      switch (res.data.weather[0].description) {
        case "rain":
        case "shower rain":
        case "thunderstorm":
        case "moderate rain":
        case "broken clouds":
          state.selectedComponent = "app-rainy";
          break;

        default:
          state.selectedComponent = "app-sunny";
          break;
      }
    }
  },
  actions: {
    findNewCity({ commit, state }, searchNewCity) {
      state.errorCode = "";
      axios
        .get(
          "http://api.openweathermap.org/data/2.5/weather?q=" +
            searchNewCity +
            "&APPID=686aeb1eff8cb88780f2fbb1b51b06f8&units=metric"
        )
        .then(res => {
          commit("SET_STATIC_CITY", res);
        })
        .catch(error => {
          state.errorCode = error.response.data.cod;
        });
    }
  },
  getters: {
    getStaticCity: state => {
      return state.getCity;
    },
    getComponent: state => {
      return state.selectedComponent;
    },
    getErrorCode: state => {
      return state.errorCode;
    }
  },
  modules: {}
});
