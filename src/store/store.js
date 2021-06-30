import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    fixed: 0,
    withdrawal: 0,
    donation: 0,
    dogs: [],
    all: [],
    pieData: []
  },
  mutations: {
    SAVE_DOGS(state, schemas) {
      state.dogs = schemas;
    },
  },
  actions: {
     load({ commit }) {
      Vue.axios
        .get("/req/dogs")
        .then((response) => {
          commit("SAVE_DOGS", response.data.body);
        })
        .catch(() => {
          commit("SAVE_DOGS", 0);
        });
    }
  }
});
