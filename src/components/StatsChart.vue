<template>
  <div class="mx-3" id="stats">
    <v-dialog
      :fullscreen="$vuetify.breakpoint.mobile"
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="dialog"
      class="d-flex align-stretch"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-hover v-slot:default="{ hover }">
          <v-card
            v-bind="attrs"
            v-on="on"
            :elevation="hover ? 12 : 2"
            class="flex-column d-flex align-stretch justify-space-between mx-auto"
            id="zoom"
            width="110%"
          >
            <v-card-title class="justify-center">Statistiche</v-card-title>
            <line-chart class="my-4 mx-auto" :data="lineChartData"></line-chart>
          </v-card>
        </v-hover>
      </template>

      <v-card>
        <v-toolbar dark color="indigo">
          <v-toolbar-title class="font-weight-bold text--white"
            >Statistiche in dettaglio</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <template>
          <v-card class="mx-auto" height="100%" width="100%">
            <v-card-text>
              <v-card
                class="flex-column d-flex align-stretch mx-auto my-2"
                width="95%"
              >
                <v-card-title class="justify-center"
                  >Grafico andamento donazioni e ritiri</v-card-title
                >
                <line-chart :data="lineChartData"></line-chart>
              </v-card>
              <v-card
                class="flex-column d-flex align-stretch mx-auto my-2"
                width="95%"
              >
                <v-card-title class="justify-center"
                  >Grafico tipologia device ritirati</v-card-title
                >
                <pie-chart :data="this.pieChartData"></pie-chart>
              </v-card>
              <v-card
                class="flex-column d-flex align-stretch mx-auto my-2"
                width="95%"
              >
                <v-card-title class="justify-center">
                  Grafico donazioni e ritiri accettati e rifiutati
                </v-card-title>
                <column-chart
                  :stacked="true"
                  :data="columnChartData"
                ></column-chart>
              </v-card>
            </v-card-text>
          </v-card>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<style lang="scss">
#zoom {
  transition: transform 0.5s ease;
}
#zoom:hover,
#zoom:focus {
  transform: scale(1.03);
}
</style>
<script>
import Vue from "vue";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
Vue.use(Chartkick.use(Chart));
export default {
  /*watch: {
    "$store.state.stats.pieData"(x) {
      this.pieChartData = [...x];
    },
    "$store.state.stats.all"(x) {
      this.lineChartData = x;
    },
  },
  created() {
    this.$store.dispatch("stats/loadAllStats");
  },*/
  data: () => ({
    dialog: false,
    lineChartData: [],
    columnChartData: [
      {
        name: "Donazioni",
        stack: "stack1",
        data: [
          ["2016", 3],
          ["2017", 6],
          ["2018", 7],
          ["2019", 7],
        ],
      },
      {
        name: "Ritiri",
        stack: "stack1",
        data: [
          ["2016", 5],
          ["2017", 2],
          ["2018", 11],
          ["2019", 9],
        ],
      },
      {
        name: "Donazioni e ritiri rifiutati",
        stack: "stack1",
        data: [
          ["2016", 1],
          ["2017", 21],
          ["2018", 31],
          ["2019", 41],
        ],
      },
    ],
    pieChartData: [],
  }),
};
</script>