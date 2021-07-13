import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    dogs: [],
    selectedDog: {},
    selectedDogStats: {"foodTotal": 0, "waterTotal": 0,"lastHB":0,"lastTemp":0}
  },
  mutations: {
    SAVE_DOGS(state, schemas) {
      state.dogs = schemas;
    },
    SAVE_DOG_STATS(state, schemas){
      state.selectedDogStats = schemas;
    },
  },
  actions: {
     loadDogs({ commit }) {
      Vue.axios
        .get("/view/dogs")
        .then((response) => {
          console.log(response.data)
          commit("SAVE_DOGS", response.data);
        })
        .catch(() => {
          commit("SAVE_DOGS", 0);
        });
    },
    saveDogsStats({ commit }, dogStats) {
      commit("SAVE_DOG_STATS", dogStats);
    },

  }
});
