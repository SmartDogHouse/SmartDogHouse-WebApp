import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    fixed: 0,
    withdrawal: 0,
    donation: 0,
    dogs: [{}],
    all: [],
    pieData: []
  },
  mutations: {
    SAVE_DOGS(state, schemas) {
      state.dogs = schemas;
    },
   /* SAVE_ALL(state, schemas) {
      state.pieData = schemas.statsDev;

      let donationMap = schemas.statsDon;
      let requestMap = schemas.statsReq;

      var newLineChartData = [
        {
          name: "Donazioni",
          data: {}
        },
        {
          name: "Ritiri",
          data: {}
        }
      ];

      donationMap.forEach((array) => {
        newLineChartData[0].data[array[0]] = array[1];
      });

      requestMap.forEach((array) => {
        newLineChartData[1].data[array[0]] = array[1];
      });
      state.all = newLineChartData;
    }*/
  },
  actions: {
     load({ commit }) {
      Vue.axios
        .get("/req/dogs")
        .then((response) => {
          console.log(response.data.body.Items);
          commit("SAVE_DOGS", response.data.body.Items);
        })
        .catch(() => {
          commit("SAVE_DOGS", 0);
        });
    }
  }
});
