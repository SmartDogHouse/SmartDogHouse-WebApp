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
            <v-list-item-title>Cibo oggi</v-list-item-title>
            <v-list-item-subtitle
              >{{$store.state.selectedDogStats.foodTotal}}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Acqua oggi</v-list-item-title>
            <v-list-item-subtitle
              >{{$store.state.selectedDogStats.waterTotal}}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Cibo nel tempo</v-list-item-title>
            <v-list-item-subtitle
              >{{timeRangeConsumedFood}}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Acqua nel tempo</v-list-item-title>
            <v-list-item-subtitle
              >{{timeRangeConsumedWater}}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item>
        <v-list-item-content>
          <StatsChart
            :lineChartData="foodAndWaterChartData"
            :name="lineChartFoodName"
          />
          <v-datetime-picker
            label="Giorno iniziale"
            v-model="lowerDateForFoodAndWater"
          >
          </v-datetime-picker>
          <v-datetime-picker
            label="Giorno finale"
            v-model="upperDateForFoodAndWater"
          >
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
            <v-list-item-subtitle
              >{{$store.state.selectedDogStats.lastHB}}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Temperatura</v-list-item-title>
            <v-list-item-subtitle
              >{{$store.state.selectedDogStats.lastTemp}}</v-list-item-subtitle
            >
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
            <v-btn
              @click="requestHealthValues"
              depressed
              small
              class="px-8 py-4"
            >
              Richiedi
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list flat subheader three-line>
        <template v-if="checkPermissions('vet') || checkPermissions('manager')">
          <h2 class="mx-5"><strong>Sezione salute cane specifico</strong></h2>
          <v-subheader><strong>Soglie impostabili</strong></v-subheader>
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
              tick-size="2"
              :min="sliderTemperature.valLower"
              :max="sliderTemperature.maxUpper"
            ></v-slider>
          </v-list-item>

          <!-- Slider lower heartbeat -->
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

          <!-- Slider lower food -->
          <v-list-item>
            <v-slider
              v-model="sliderFoodThreshold.valLower"
              :label="sliderFoodThreshold.labelLower"
              :thumb-color="sliderFoodThreshold.color"
              thumb-label="always"
              step="10"
              ticks="always"
              tick-size="1"
              :min="sliderFoodThreshold.minLower"
              :max="sliderFoodThreshold.maxLower"
            ></v-slider>
          </v-list-item>

          <!-- Slider upper food -->
          <v-list-item>
            <v-slider
              v-model="sliderFoodThreshold.valUpper"
              :label="sliderFoodThreshold.labelUpper"
              :thumb-color="sliderFoodThreshold.color"
              thumb-label="always"
              step="10"
              ticks="always"
              tick-size="1"
              :min="sliderFoodThreshold.valLower"
              :max="sliderFoodThreshold.maxUpper"
            ></v-slider>
          </v-list-item>

          <!-- Slider lower water -->
          <v-list-item>
            <v-slider
              v-model="sliderWaterThreshold.valLower"
              :label="sliderWaterThreshold.labelLower"
              :thumb-color="sliderWaterThreshold.color"
              thumb-label="always"
              step="10"
              ticks="always"
              tick-size="1"
              :min="sliderWaterThreshold.minLower"
              :max="sliderWaterThreshold.maxLower"
            ></v-slider>
          </v-list-item>

          <!-- Slider upper water -->
          <v-list-item>
            <v-slider
              v-model="sliderWaterThreshold.valUpper"
              :label="sliderWaterThreshold.labelUpper"
              :thumb-color="sliderWaterThreshold.color"
              thumb-label="always"
              step="10"
              ticks="always"
              tick-size="1"
              :min="sliderWaterThreshold.valLower"
              :max="sliderWaterThreshold.maxUpper"
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
            <v-spacer />

            <v-time-picker v-model="selectedTimeVet"></v-time-picker>
            <v-spacer />
          </v-list-item>

          <v-list-item>
            <v-spacer />
            <v-btn @click="addRationsVet" depressed small class="px-8 py-4">
              Aggiungi
            </v-btn>
            <v-spacer />
          </v-list-item>

          <v-list-item>
            <v-spacer />

            <v-btn @click="cleanFoodVet" depressed small class="px-8 py-4">
              Pulisci
            </v-btn>
            <v-spacer />
          </v-list-item>

          <v-slider
            v-model="sliderFoodQtaVet.val"
            :label="sliderFoodQtaVet.label"
            :thumb-color="sliderFoodQtaVet.color"
            thumb-label="always"
            step="50"
            ticks="always"
            tick-size="1"
            :min="sliderFoodQtaVet.min"
            :max="sliderFoodQtaVet.max"
          ></v-slider>

          <v-virtual-scroll
            :items="healthFoodHours"
            height="200"
            item-height="64"
          >
            <template v-slot:default="{ item }">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.Time }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.Qta }} gr
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </template>
        <template
          v-if="checkPermissions('foodAttendant') || checkPermissions('manager')"
        >
          <h2><strong>Sezione cibo tutti i cani</strong></h2>

          <v-list-item>
            <v-spacer />

            <v-time-picker v-model="selectedTimeEmployee"></v-time-picker>
            <v-spacer />
          </v-list-item>

          <v-list-item>
            <v-spacer />

            <v-btn
              @click="addRationsEmployee"
              depressed
              small
              class="px-8 py-4"
            >
              Aggiungi
            </v-btn>
            <v-spacer />
          </v-list-item>

          <v-list-item>
            <v-spacer />

            <v-btn @click="cleanFoodEmployee" depressed small class="px-8 py-4">
              Pulisci
            </v-btn>
            <v-spacer />
          </v-list-item>

          <v-slider
            v-model="sliderFoodQtaEmployee.val"
            :label="sliderFoodQtaEmployee.label"
            :thumb-color="sliderFoodQtaEmployee.color"
            thumb-label="always"
            step="50"
            ticks="always"
            tick-size="1"
            :min="sliderFoodQtaEmployee.min"
            :max="sliderFoodQtaEmployee.max"
          ></v-slider>

          <v-list-item>
            <v-select
              :items="sliderSize.size"
              filled
              v-model="sliderSize.selectedSize"
              label="Taglia animale"
            ></v-select>
          </v-list-item>

          <v-virtual-scroll
            :items="healthFoodDSize"
            height="200"
            item-height="64"
          >
            <template v-slot:default="{ item }">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong
                      v-if="item.Size === 'Piccola'"
                      class="red--text text--lighten-1"
                      >Piccola</strong
                    >
                    <strong
                      v-if="item.Size === 'Media'"
                      class="blue--text text--lighten-1"
                      >Media</strong
                    >
                    <strong
                      v-if="item.Size === 'Grande'"
                      class="green--text text--lighten-1"
                      >Grande</strong
                    >
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.Time }} -- {{ item.Qta }} gr
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </template>
      </v-list>

      <v-divider />

      <v-list-item-action>
        <v-btn @click="updateDogs" depressed small class="px-8 py-4">
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
      selectedTimeVet: "12:00",
      selectedTimeEmployee: "12:00",
    //  datesForFood: ['2020-01-01', '2021-01-01'],D
      healthStates: ["In salute", "In degenza", "In terapia","In osservazione"],
      healthFoodHours: [{"Time":"12:00","Qta":300},{"Time":"18:00","Qta":500}],
      healthFoodDSize: [{"Size":"Piccola","Time":"10:00","Qta":100},
                        {"Size":"Piccola","Time":"11:00","Qta":200},
                        {"Size":"Media","Time":"12:00","Qta":300},
                        {"Size":"Media","Time":"13:00","Qta":400},
                        {"Size":"Grande","Time":"14:00","Qta":500},
                        {"Size":"Grande","Time":"15:00","Qta":600}
                        ],
      datesForFood: [],
      timeRangeConsumedWater: 0,
      timeRangeConsumedFood: 0,
      lowerDateForFoodAndWater: "",
      upperDateForFoodAndWater: "",
      lowerDateForHealth: "",
      upperDateForHealth: "",
      menuFood: false,
      menuHealth: false,
      healthChartData:[],
      foodAndWaterChartData: [],
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
        color: "brown",
      },
      sliderFoodThreshold: {
        labelLower: "Inferiore cibo",
        labelUpper: "Superiore cibo",
        minLower: 50,
        minUpper: 50,
        valLower: 50,
        valUpper: 50,
        maxUpper: 5000,
        maxLower: 5000,
        color: "blue",
      },
      sliderWaterThreshold: {
        labelLower: "Inferiore acqua",
        labelUpper: "Superiore acqua",
        minLower: 500,
        minUpper: 500,
        valLower: 500,
        valUpper: 500,
        maxUpper: 4000,
        maxLower: 4000,
        color: "green",
      },
      sliderFoodQtaVet: {
        label: "Qta cibo",
        min: 50,
        val: 50,
        max: 2000,
        color: "orange",
      },
      sliderFoodQtaEmployee: {
        label: "Qta cibo",
        min: 50,
        val: 50,
        max: 2000,
        color: "grey",
      },
      sliderSize: {
        selectedSize: "Piccola",
        size: ["Piccola", "Media", "Grande"],
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
          this.sliderFoodThreshold.valLower = x.daily_food_lower_bound
          this.sliderFoodThreshold.valUpper = x.daily_food_lower_bound
          this.sliderWaterThreshold.valLower = x.daily_water_lower_bound
          this.sliderWaterThreshold.valUpper = x.daily_water_lower_bound
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
          return "Piccola"
        case 2:
         return "Media"
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
         return "patient"
        case "In terapia":
          return "curing"
        case "In osservazione":
          return "under observation"
        case "healthy":
          return "In salute"
        case "patient":
         return "In degenza"
        case "curing":
          return "In terapia"
        case "under observation":
          return "In osservazione"
        default:
          return "In salute"
      }
    },
    checkPermissions(name) {
      return this.$props.permissions.includes(name)
    },
    async updateDogs() {

      //Update ESP if temp and HB treshold are changed
     if(this.$store.state.selectedDog.heartbeat_lower_bound !== this.sliderHeartbeat.valLower ||
        this.$store.state.selectedDog.heartbeat_upper_bound !== this.sliderHeartbeat.valUpper ||
        this.$store.state.selectedDog.temp_lower_bound !== this.sliderTemperature.valLower ||
        this.$store.state.selectedDog.temp_upper_bound !== this.sliderTemperature.valUpper){
          await this.axios.post("/send/mqtt/",{
            "topic" :`ESP/${this.$store.state.selectedDog.chip_id}`,
            "payload" : {"hbLower":this.sliderHeartbeat.valLower,
                         "hbUpper":this.sliderHeartbeat.valUpper,
                         "tempLower":this.sliderTemperature.valLower,
                         "tempUpper":this.sliderTemperature.valUpper}
            })
        }

      //Update dogs food and water threashold
       var payload = {
                  "chip_id": this.$store.state.selectedDog.chip_id,
                  "lower_bound": this.sliderWaterThreshold.valLower,
                  "upper_bound": this.sliderWaterThreshold.valUpper,
                  "type": 'water',
                }
        await this.axios.post("/set/ranges/cons/dog", payload)
        payload.lower_bound = this.sliderFoodThreshold.valLower,
        payload.upper_bound = this.sliderFoodThreshold.valUpper,
        payload.type = 'food'
        await this.axios.post("/set/ranges/cons/dog", payload)


      //Send to esp the new schedule
      if(this.healthFoodHours.length > 0){
        //Update dogs food-vet by size
        for(const el in this.healthFoodHours){
          await this.axios.post("/set/schedule/size", {"chip_id": this.$store.state.selectedDog.chip_id,"time": el.Time,"grams": el.Qta})
        }
        //Send to esp the new schedule
        await this.axios.post("/send/mqtt/",{
          "topic" :`ESP/${this.$store.state.selectedDog.chip_id}`,
          "payload" : this.healthFoodHours
        })

      }else if(this.healthFoodDSize.length > 0){
        //Update dogs food-employee by size
        for(const el in this.healthFoodDSize){
          await this.axios.post("/set/schedule/size", {"size": el.Size,"time": el.Time,"grams": el.Qta})
        }
        //Send to esp the new schedule
        await this.axios.post("/send/mqtt/",{
          "topic" :`ESP/${this.$store.state.selectedDog.chip_id}`,
          "payload" : this.healthFoodDSize.filter(el => el.Size == this.getDogSizeTraslation(this.$store.state.selectedDog.dog_size)).map(
            el => {return {"Time": el.Time,"Qta": el.Qta} })
        })
      }

      //Set new dog status if changed
      if(this.getDogHealthState(this.$store.state.selectedDog.status) !== this.healthRdios){
        await this.axios.post("/set/dog/status", {"chip_id": this.$store.state.selectedDog.chip_id,"status": this.getDogHealthState(this.healthRdios)})
      }
   },
    addRationsVet() {
      this.healthFoodHours.push({"Time": this.selectedTimeVet, "Qta": this.sliderFoodQtaVet.val})
    },
    cleanFoodVet() {
      this.healthFoodHours = []
    },
    cleanFoodEmployee() {
      this.healthFoodDSize = []
    },
    addRationsEmployee() {
      this.healthFoodDSize.push({"Size": this.sliderSize.selectedSize  ,"Time": this.selectedTimeEmployee, "Qta": this.sliderFoodQtaEmployee.val})
    },
    /*types: wcons, fcons, hb, temp*/
    async requestFoodValues() {
      this.foodAndWaterChartData = []
      if(this.lowerDateForFoodAndWater && this.upperDateForFoodAndWater && this.$store.state.selectedDog.chip_id){
        const types = ['fcons','wcons']
        const names = ['Cibo','Acqua']
        for (const x of Array(2).keys()) {
          const resFood = await this.axios
            .get("/view/logs/dog",{
              params: {
                'type': types[x],
                'dog': this.$store.state.selectedDog.chip_id,
                'lowerT': new Date(this.lowerDateForFoodAndWater).toISOString().slice(0, 19),
                'upperT': new Date(this.upperDateForFoodAndWater).toISOString().slice(0, 19)
              }
            })

            if(resFood.data.length > 0){
              var foodStats = {
                name: names[x],
                data: []
              }
              if(types[x] === 'fcons'){
                this.timeRangeConsumedFood = resFood.data.map(el => el.val).reduce((acc,nextVal) => acc+nextVal)
              }else{
                this.timeRangeConsumedWater = resFood.data.map(el => el.val).reduce((acc,nextVal) => acc+nextVal)
              }
              resFood.data.map(el => [el.time_stamp,el.val]).forEach(element => {
                foodStats.data.push(element)
              });
              this.foodAndWaterChartData.push(foodStats)
            }
        }
      }
    },
    async requestHealthValues() {
      this.healthChartData = []
      if(this.lowerDateForHealth && this.upperDateForHealth && this.$store.state.selectedDog.chip_id){
        const types = ['hb','temp']
        const names = ['Battiti','Temperatura']
        for (const x of Array(2).keys()) {
          const resHealth = await this.axios
            .get("/view/logs/dog",{ params: {'type': types[x], 'dog': this.$store.state.selectedDog.chip_id, 'lowerT': new Date(this.lowerDateForFoodAndWater).toISOString().slice(0, 19), 'upperT': new Date(this.upperDateForFoodAndWater).toISOString().slice(0, 19)} })

            if(resHealth.data.length > 0){
              var HealthStats = {
                name: names[x],
                data: []
              }
              resHealth.data.map(el => [el.time_stamp,el.val]).forEach(element => {
                HealthStats.data.push(element)
              });
              this.healthChartData.push(HealthStats)
            }
        }
      }
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
