<template>
<!-- Represent the list of all command for the manager, it also contains some information, such as humidity temperature and structure food consumption-->
  <div class="Administration">
    <v-card>
      <v-row class="ma-4">
        <v-col cols="6">
          <StatsChart
            :columnChartData="consumption"
            :name="columnChartName"
            :chartType="'column'"
          />
        </v-col>

        <v-col cols="6">
          <StatsChart
            :lineChartData="umidityAndTemperatureHistory"
            :name="linemnChartName"
            :chartType="'line'"
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {
      StatsChart: () => import("../components/StatsChart"),
  },
  props: {

  },
    data() {
    return {
      consumption: [['Cagnino', 44], ['Cagnone', 23]],
      umidityAndTemperatureHistory: [['Cagnino', 44], ['Cagnone1', 233],['Cagnino1', 443], ['Cagnone', 234]],
      columnChartName: "Statistiche consumi",
      linemnChartName: "Statistiche umidita e temperatura"

    };
  },
  methods: {

  },
};
</script>

<style scoped></style>
