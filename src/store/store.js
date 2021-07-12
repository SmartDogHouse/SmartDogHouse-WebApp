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
    selectedDog: {},
    all: [],
    pieData: []
  },
  mutations: {
    SAVE_DOGS(state, schemas) {
      state.dogs = schemas;
    },
    LOAD_HEART_BEAT_AND_TEMPERATURE(){
      
    },
    LOAD_FOOD_AND_WATER(){
        
    },
  },
  actions: {
     load({ commit }) {
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
  }
});
