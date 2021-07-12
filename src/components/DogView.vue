<template>
  <!-- Represent the list of all dogs, each dog contain a button for choose it-->
  <div>
    <v-card class="mx-auto" max-width="400">
      <v-card-title class="white--text orange darken-4">
        <v-spacer />
        Dati cane
        <v-spacer />
      </v-card-title>

      <v-list subheader three-line>
        <v-subheader>Info</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Nome</v-list-item-title>
            <v-list-item-subtitle
              >{{$store.state.selectedDog.name}}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>ID</v-list-item-title>
            <v-list-item-subtitle
              >{{$store.state.selectedDog.chip_id}}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Taglia</v-list-item-title>
            <v-list-item-subtitle
              >{{getDogSizeTraslation($store.state.selectedDog.dog_size)}}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Gabbia</v-list-item-title>
            <v-list-item-subtitle
              >{{$store.state.selectedDog.cage_id}}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list subheader three-line>
        <v-subheader>Consumi</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Cibo</v-list-item-title>
            <v-list-item-subtitle>XXX</v-list-item-subtitle>
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
          <StatsChart
            :lineChartData="foodAndWaterChartData"
            :name="lineChartFoodName"
          />
          <v-datetime-picker label="Giorno iniziale" v-model="lowerDateForFoodAndWater">
          </v-datetime-picker>
          <v-datetime-picker label="Giorno finale" v-model="upperDateForFoodAndWater">
          </v-datetime-picker>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-btn @click="requestFoodValues" depressed small class="px-8 py-4">
            Richiedi
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-divider />

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
            <StatsChart
              :lineChartData="healthChartData"
              :name="lineChartHealthName"
            />
            <v-datetime-picker
              label="Giorno iniziale"
              v-model="lowerDateForHealth"
            >
            </v-datetime-picker>
            <v-datetime-picker
              label="Giorno finale"
              v-model="upperDateForHealth"
            >
            </v-datetime-picker>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn @click="requestHealthValues" depressed small class="px-8 py-4">
              Richiedi
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list flat subheader three-line>
        <v-subheader><strong>Soglie impostabili</strong></v-subheader>

        <v-subheader> <strong>Sezione salute</strong></v-subheader>
        <!-- Slider lower temperature -->
        <v-list-item>
          <v-slider
            v-model="sliderTemperature.valLower"
            :label="sliderTemperature.labelLower"
            :thumb-color="sliderTemperature.color"
            thumb-label="always"
            step="1"
            ticks="always"
            tick-size="4"
            :min="sliderTemperature.minLower"
            :max="sliderTemperature.maxLower"
          ></v-slider>
        </v-list-item>
        <!-- Slider upper temperature -->

        <v-list-item>
          <v-slider
            v-model="sliderTemperature.valUpper"
            :label="sliderTemperature.labelUpper"
            :thumb-color="sliderTemperature.color"
            thumb-label="always"
            step="1"
            ticks="always"
            tick-size="4"
            :min="sliderTemperature.valLower"
            :max="sliderTemperature.maxUpper"
          ></v-slider>
        </v-list-item>
        <!-- Slider upper heartbeat -->

        <v-list-item>
          <v-slider
            v-model="sliderHeartbeat.valLower"
            :label="sliderHeartbeat.labelLower"
            :thumb-color="sliderHeartbeat.color"
            thumb-label="always"
            step="1"
            ticks="always"
            tick-size="1"
            :min="sliderHeartbeat.minLower"
            :max="sliderHeartbeat.maxLower"
          ></v-slider>
        </v-list-item>
        <!-- Slider upper heartbeat -->

        <v-list-item>
          <v-slider
            v-model="sliderHeartbeat.valUpper"
            :label="sliderHeartbeat.labelUpper"
            :thumb-color="sliderHeartbeat.color"
            thumb-label="always"
            step="1"
            ticks="always"
            tick-size="1"
            :min="sliderHeartbeat.valLower"
            :max="sliderHeartbeat.maxUpper"
          ></v-slider>
        </v-list-item>
        <v-list-item>
          <v-radio-group v-model="healthRdios">
            <v-radio v-for="item in healthStates" :key="item" :value="item">
              <template v-slot:label>
                <strong class="primary--text">{{item}}</strong>
              </template>
            </v-radio>
          </v-radio-group>
        </v-list-item>
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

        <template
          v-if="checkPermissions('foodAttendant') || checkPermissions('manager')"
        >
          <v-subheader><strong>Sezione cibo</strong></v-subheader>

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
          <v-subheader><strong>Sezione taglie</strong></v-subheader>
          <v-list-item>
            <v-select
              :items="sliderSize.size"
              filled
              v-model="sliderSize.selectedSize"
              label="Taglia animale"
            ></v-select>
          </v-list-item>

          <v-col>
            <h2>Piccolo</h2>
            <h4>222</h4>
            <h2>Medio</h2>
            <h4>444</h4>
            <h2>Grande</h2>
            <h4>667</h4>
          </v-col>
        </template>
      </v-list>

      <v-divider />

      <v-list-item-action>
        <v-btn @click="sendStats" depressed small class="px-8 py-4">
          Applica
        </v-btn>
      </v-list-item-action>
    </v-card>
  </div>
</template>

<script>
export default {

  components: {
    StatsChart: () => import("../components/StatsChart"),
  },
  props: {
    permissions: {
        type: Array,
        default:()=> []
      }
  },
  data() {
    return {
    //  datesForFood: ['2020-01-01', '2021-01-01'],D
      healthStates: ["In salute", "In degenza", "In terapia","In osservazione"],
      datesForFood: [],
      lowerDateForFoodAndWater: "",
      upperDateForFoodAndWater: "",
      lowerDateForHealth: "",
      upperDateForHealth: "",
      menuFood: false,
      menuHealth: false,
      healthChartData:[],
      foodAndWaterChartData: [
     /** {
        name: "Cibo",
        data: [
          ["2016", 3],
          ["2017", 6],
          ["2018", 7],
          ["2019", 7],
        ],
      },
      {
        name: "Acqua1",
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
      },**/
    ],
      lineChartFoodName : "Consumi cibo e acqua",
      lineChartHealthName : "Rilevazioni vitali",
      sliderTemperature: {
        labelLower: "Inferiore temperatura",
        labelUpper: "Superiore temperatura",
        minLower: 35,
        minUpper: 35,
        valLower: 35,
        valUpper: 35,
        maxUpper: 45,
        maxLower: 45,
        color: "purple",
      },
      sliderHeartbeat: {
        labelLower: "Inferiore battiti",
        labelUpper: "Superiore battiti",
        minLower: 60,
        minUpper: 60,
        valLower: 60,
        valUpper: 60,
        maxUpper: 140,
        maxLower: 140,
        color: "blue",
      },
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
        selectedSize: "piccolo",
        size: ["Piccolo", "Medio", "Grande"],
      },
      healthRdios: '',
    };
  },
  created: function () {
    this.cleanAll()
  },
  watch:{
    "$store.state.selectedDog"(x) {
          this.sliderHeartbeat.valLower = x.heartbeat_lower_bound
          this.sliderHeartbeat.valUpper = x.heartbeat_upper_bound
          this.sliderTemperature.valLower = x.temp_lower_bound
          this.sliderTemperature.valUpper = x.temp_upper_bound
          this.healthRdios = this.getDogHealthState(x.status)
          console.log(x.heartbeat_lower_bound)
    },
  },
  methods: {
    fixScreen() {
      document.documentElement.style.overflow = "hidden";
      document.body.scroll = "no";
    },
    getDogSizeTraslation(size) {
      switch (size) {
        case 1:
          return "Piccolo"
        case 2:
         return "Medio"
        case 3:
          return "Grande"
        default:
          return ""
      }
    },
    getDogHealthState(state) {
      switch (state) {
        case "In salute":
          return "healthy"
        case "In degenza":
         return "healthy"
        case "In terapia":
          return "healthy"
        case "In osservazione":
          return "healthy"
        case "healthy":
          return "In salute"
        case "healthy1":
         return "In degenza"
        case "healthy2":
          return "In terapia"
        case "healthy3":
          return "In osservazione"
        default:
          return "In salute"
      }
    },
    checkPermissions(name) {
      return this.$props.permissions.includes(name)
    },
    sendStats() {

    },
    async requestFoodValues() {
      if(this.lowerDateForFoodAndWater && this.upperDateForFoodAndWater){
          console.log(new Date(this.lowerDateForFoodAndWater).toISOString().slice(0, 19))
          console.log(new Date(this.upperDateForFoodAndWater).toISOString().slice(0, 19))
          //this.$store.dispatch("loadFoodAndWater",{'lowerT': new Date(this.lowerDateForFoodAndWater).toISOString().slice(0, 19), 'upperT': new Date(this.upperDateForFoodAndWater).toISOString().slice(0, 19)});
        
       const resFood = await this.axios
        .get("/view/logs/dog",{ params: {'type': 'fcons', 'dog': 'c02', 'lowerT': new Date(this.lowerDateForFoodAndWater).toISOString().slice(0, 19), 'upperT': new Date(this.upperDateForFoodAndWater).toISOString().slice(0, 19)} })

        if(resFood.data.length > 0){
          var foodStats = {
            name: "Cibo",
            data: []
          }
            
          resFood.data.map(el => [el.time_stamp,el.val]).forEach(element => {
            foodStats.data.push(element)
          });
          this.foodAndWaterChartData.push(foodStats)
        }
                                      /*types: wcons, fcons, hb, temp*/
       const resWater = await this.axios
        .get("/view/logs/dog",{ params: {'type': 'wcons','dog': 'c02', 'lowerT': new Date(this.lowerDateForFoodAndWater).toISOString().slice(0, 19), 'upperT': new Date(this.upperDateForFoodAndWater).toISOString().slice(0, 19)} })
        
        if(resWater.data.length > 0){
          var waterStats = {
            name: "Acqua",
            data: []
          }
            
          resWater.data.map(el => [el.time_stamp,el.val]).forEach(element => {
            waterStats.data.push(element)
          });
          this.foodAndWaterChartData.push(waterStats)
        }
      }
    },
    requestHealthValues() {
        //this.$store.dispatch("loadHeartBeatAndTemperature");
    },
    cleanAll() {
      this.lowerDateForFoodAndWater = new Date() 
      this.upperDateForFoodAndWater = new Date(this.lowerDateForFoodAndWater)
      this.upperDateForFoodAndWater.setDate(this.upperDateForFoodAndWater.getDate() + 1000)
      this.lowerDateForFoodAndWater.setDate(this.lowerDateForFoodAndWater.getDate() - 1000)

      this.lowerDateForHealth = new Date()
      this.upperDateForHealth = new Date(this.lowerDateForHealth)
      this.upperDateForHealth.setDate(this.upperDateForHealth.getDate() + 1000)
      this.lowerDateForHealth.setDate(this.lowerDateForHealth.getDate() - 1000)
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
<style scoped></style>
