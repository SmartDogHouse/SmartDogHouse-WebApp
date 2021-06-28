<template>
  <div>
    <v-card class="mx-auto" max-width="400">
      <v-card-title class="white--text orange darken-4">
        <v-spacer/>
          Dati cane
        <v-spacer/>
      </v-card-title>

      <v-list subheader three-line>
        <v-subheader>Info</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Nome</v-list-item-title>
            <v-list-item-subtitle>{{dogData.name}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>ID</v-list-item-title>
            <v-list-item-subtitle>{{dogData.id_chip}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list subheader three-line>
        <v-subheader>Consumi</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Cibo</v-list-item-title>
            <v-list-item-subtitle>VVV</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Acqua</v-list-item-title>
            <v-list-item-subtitle>XXX</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item>
        <v-list-item-content>
          <StatsChart :lineChartData ="foodChartData" :name="lineChartHealthName"/>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list subheader three-line>
        <v-subheader>Parametri vitali</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Battiti</v-list-item-title>
            <v-list-item-subtitle>XXX</v-list-item-subtitle>
          </v-list-item-content>
          <!--          <v-list-item-action>
            <v-btn @click="" depressed small class="px-8 py-4">
              <v-icon color="orange darken-4" center> mdi-open-in-new </v-icon>
            </v-btn>
          </v-list-item-action> -->
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Temperatura</v-list-item-title>
            <v-list-item-subtitle>XXX</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <StatsChart :lineChartData ="healthChartData" :name="lineChartFoodName"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list flat subheader three-line>
        <v-subheader>Soglie impostabili</v-subheader>

        <v-list-item-group v-model="settings" multiple active-class="">
          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>In degenza</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>In terapia</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
          <v-list-item>
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>In osservazione</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
          <v-list-item>
            <v-slider
              v-model="sliderPatient.val"
              :label="sliderPatient.label"
              :thumb-color="sliderPatient.color"
              thumb-label="always"
              step="50"
              ticks="always"
              tick-size="4"
              :min="sliderPatient.min"
              :max="sliderPatient.max"
            ></v-slider>
          </v-list-item>

          <v-list-item>
            <v-slider
              v-model="sliderSize.val"
              :label="sliderSize.label"
              :thumb-color="sliderSize.color"
              thumb-label="always"
              step="50"
              ticks="always"
              tick-size="4"
              :min="sliderSize.min"
              :max="sliderSize.max"
            ></v-slider>
          </v-list-item>
          <v-list-item>
            <v-select
              :items="sliderSize.taglia"
              filled
              v-model="sliderSize.tagliaSelezionata"
              label="Taglia animale"
            ></v-select>
          </v-list-item>
      </v-list>
    </v-card>
    <v-overlay :absolute="absolute" :value="overlay">
      <v-btn color="success" @click="overlay = false"> Hide Overlay </v-btn>
    </v-overlay>
  </div>
</template>

<script>
export default {

  components: {
    StatsChart: () => import("../components/StatsChart"),
  },
  props: {
    dogData: Object,
  },
  data() {
    return {
      healthChartData:[],
      foodChartData: [
      {
        name: "Cibo",
        data: [
          ["2016", 3],
          ["2017", 6],
          ["2018", 7],
          ["2019", 7],
        ],
      },
      {
        name: "Acqua",
        data: [
          ["2016", 5],
          ["2017", 2],
          ["2018", 11],
          ["2019", 9],
        ],
      },
      {
        name: "Zio peppe",
        data: [
          ["2016", 1],
          ["2017", 21],
          ["2018", 31],
          ["2019", 41],
        ],
      },
    ],
      lineChartFoodName : "Consumi cibo e acqua",
      lineChartHealthName : "Rilevazioni vitali",
      sliderPatient: {
        label: "Qta cibo degenza",
        min: 50,
        val: 100,
        max: 1000,
        color: "red",
      },
      sliderSize: {
        label: "Qta cibo taglia",
        min: 50,
        val: 100,
        max: 1000,
        color: "red",
        tagliaSelezionata: "piccolo",
        taglia: ["Piccolo", "Medio", "Grande", "Gigantico"],
      },

      settings: [],
      absolute: true,
      overlay: false,
    };
  },
  methods: {
    fixScreen() {
      document.documentElement.style.overflow = "hidden";
      document.body.scroll = "no";
    },
    genRandomIndex(length) {
      return Math.ceil(Math.random() * (length - 1));
    },
    items() {
      const namesLength = this.names.length;
      const colorsLength = this.colors.length;

      return Array.from(Array(namesLength).keys(), (v) => {
        const name = this.names[v];
        const codes = this.codes[v];

        return {
          color: this.colors[this.genRandomIndex(colorsLength)],
          fullName: `${name} ${codes}`,
          initials: `${name[0]} ${codes[0] + codes[1]}`,
        };
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
