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
    SAVE_FIXED(state, schemas) {
      state.fixed = schemas;
    },
    SAVE_DONATION(state, schemas) {
      state.donation = schemas;
    },
    SAVE_DOGS(state, schemas) {
      state.dogs = schemas;
    },
    SAVE_WITHDRAWAL(state, schemas) {
      state.withdrawal = schemas;
    },
    SAVE_ALL(state, schemas) {
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
    }
  },
  actions: {
    loadShortWithdrawal({ commit }) {
      Vue.axios
        .get("/api/stats/withdrawal")
        .then((response) => {
          commit("SAVE_WITHDRAWAL", response.data);
        })
        .catch(() => {
          // throw new Error(`API ${e}`);
          commit("SAVE_WITHDRAWAL", 0);
        });
    },
    loadShortFixed({ commit }) {
      Vue.axios
        .get("/api/iot/device")
        .then((response) => {
          commit("SAVE_FIXED", response.data.quantity);
        })
        .catch(() => {
          // throw new Error(`API ${e}`);
          commit("SAVE_FIXED", 0);
        });
    },
    loadShortDonation({ commit }) {
      Vue.axios
        .get("/api/stats/donation")
        .then((response) => {
          commit("SAVE_DONATION", response.data);
        })
        .catch(() => {
          commit("SAVE_DONATION", 0);
          // throw new Error(`API ${e}`);
          // console.log(e);
        });
    },

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
    },
    loadAllStats({ commit }) {
      Vue.axios
        .get("/api/stats/all")
        .then((response) => {
          commit("SAVE_ALL", response.data);
        })
        .catch((err) => {
          // throw new Error(`API ${e}`);
          console.log(err);
        });
    }
  }
});
