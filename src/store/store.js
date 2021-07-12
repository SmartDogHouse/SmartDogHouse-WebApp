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
        .get("/req/dogs")
        .then((response) => {
          commit("SAVE_DOGS", response.data.body);
        })
        .catch(() => {
          commit("SAVE_DOGS", 0);
        });
    },
    loadFoodAndWater({ commit }, arg) {
      Vue.axios
        .get("/view/cons/food",{ params: arg })
        .then((response) => {
          console.log(response)
          commit("LOAD_FOOD_AND_WATER", response.data.body);
        })
        .catch(() => {
          commit("LOAD_FOOD_AND_WATER", 0);
        });
    },

    loadHeartBeatAndTemperature({ commit }) {
      Vue.axios
        .get("/req/dogs")
        .then((response) => {
          commit("LOAD_HEART_BEAT_AND_TEMPERATURE", response.data.body);
        })
        .catch(() => {
          commit("LOAD_HEART_BEAT_AND_TEMPERATURE", 0);
        });
    }
 

  }
});
