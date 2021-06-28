<template>
  <div class="Administration">
     <StatsChart :pieChartData ="{'2017-05-13': 2, '2017-05-14': 5}" :name="'lineChartFoodName'"/>
  </div>
</template>

<script>
export default {
  components: {
      StatsChart: () => import("../components/StatsChart"),
  },
  name: "",
  props: {

  },
    data() {
    return {
    };
  },
  methods: {

  },
};
</script>

<style scoped></style>
