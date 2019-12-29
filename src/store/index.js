import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
Vue.use(axios);

export default new Vuex.Store({
  state: {
    selectedComponent: "",
    getCity: {},
    errorCode: "",
    worldCities: []
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
    },
    GET_WORLD_COUNTRIES(state, res) {
      state.worldCities = res;
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
    },
    getGlobalCities({ commit }) {
      let firstAPICall = fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=Rome&APPID=686aeb1eff8cb88780f2fbb1b51b06f8&units=metric"
      );
      let secondAPICall = fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=Moscow&APPID=686aeb1eff8cb88780f2fbb1b51b06f8&units=metric"
      );
      let thirdAPICall = fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=Beijing&APPID=686aeb1eff8cb88780f2fbb1b51b06f8&units=metric"
      );
      let fourAPICall = fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=686aeb1eff8cb88780f2fbb1b51b06f8&units=metric"
      );

      Promise.all([firstAPICall, secondAPICall, thirdAPICall, fourAPICall])
        .then(values => Promise.all(values.map(value => value.json())))
        .then(finalVals => {
          commit("GET_WORLD_COUNTRIES", finalVals);
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
    },
    getWorldCities: state => {
      return state.worldCities;
    }
  },
  modules: {}
});
