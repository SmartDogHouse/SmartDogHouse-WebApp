<template>
      <v-row class="ma-4">
        <v-col cols="6">
          <h1>Umidità</h1>
          <h3>{{umidity}}%</h3>
        </v-col>
        <v-col cols="6">
          <h1>Temperatura</h1>
          <h3>{{temperature}}°C</h3>
        </v-col>
      </v-row>
</template>

<script>
export default {
  components: {    
  },
  props: {
    umidity: String,
    temperature: String,
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
