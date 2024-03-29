<template>
  <!-- Represent the main view for each user on the website, it switches the component page based to the user privilege, hiding and showing the respective buttons -->
  <div>
    <v-app-bar app color="grey" flat>
      <v-tabs centered class="ml-n9" color="orange darken-4">
        <v-tab v-for="link in links" :key="link" @click="changeView(link)">
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-app-bar-nav-icon
        id="openDrawner"
        color="orange darken-4"
        @click.stop="openDrawner"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      height="100vh"
      align="center"
      justify="center"
      absolute
      bottom
      temporary
    >
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="no-active">
          <v-list-item class="noActive" @click.stop="logOut">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey">
      <div v-switch="view">
        <v-container v-case="links[0]">
          <AdministrationCommands :consumption="consumption" />
          <v-divider />
          <EnvStats :umidity="umidity" :temperature="temperature" />
          <v-row>
            <v-col>
              <v-sheet rounded="lg" min-height="268">
                <dogScroller
                  @dogChoosed="onClickDog"
                  @dogRemoved="dogRemoved"
                  :names="names"
                  :codes="codes"
                ></dogScroller>
              </v-sheet>
            </v-col>

            <v-col cols="12" sm="7">
              <v-sheet rounded="lg" min-height="268">
                <dogView :permissions="['manager']" />
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-case="links[1]">
          <NotificationsTab
            class="my-4"
            :notifications="notifications"
            :owner="links[1]"
          />
          <v-row>
            <v-col cols="12" sm="5">
              <v-sheet rounded="lg" min-height="268">
                <dogScroller
                  @dogChoosed="onClickDog"
                  @dogRemoved="dogRemoved"
                  :names="names"
                  :codes="codes"
                ></dogScroller>
              </v-sheet>
            </v-col>

            <v-col cols="12" sm="7">
              <v-sheet rounded="lg" min-height="268">
                <dogView :permissions="['foodAttendant']" />
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-case="links[2]">
          <NotificationsTab
            @selected="removeNotification"
            class="my-4"
            :notifications="notifications"
            :owner="links[2]"
          />
          <v-row>
            <v-col cols="12" sm="5">
              <v-sheet rounded="lg" min-height="268">
                <dogScroller
                  @dogChoosed="onClickDog"
                  @dogRemoved="dogRemoved"
                  :names="names"
                  :codes="codes"
                ></dogScroller>
              </v-sheet>
            </v-col>

            <v-col cols="12" sm="7">
              <v-sheet rounded="lg" min-height="268">
                <dogView :permissions="['vet']" />
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-case="links[3]">
          <v-divider />
          <EnvStats :umidity="umidity" :temperature="temperature" />
          <NotificationsTab
            @selected="removeNotification"
            class="my-4"
            :notifications="notifications"
            :owner="links[3]"
          />
          <v-row>
            <v-col>
              <CameraFrame />
            </v-col>
          </v-row>
        </v-container>
        <v-container v-case="links[4]">
          <v-row>
            <v-col>
              <h1>Work in progress!</h1>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </div>
</template>

<script>
export default {
  components: {
    EnvStats: () => import("../components/EnvStats"),
    NotificationsTab: () => import("../components/NotificationsTab"),
    AdministrationCommands: () => import("../components/AdministrationCommands"),
    CameraFrame: () => import("../components/CameraFrame"),
    dogScroller: () => import("../components/DogScroller"),
    dogView: () => import("../components/DogView"),
  },
  data: () => ({
    connection: null,
    notifications: [],
    temperature : "34",
    umidity : "34",
    view:"",
    consumption: [],
    names: [],
    codes: [],
    drawer: false,
    group: null,
    links: ["Gestore", "Addetto cibo", "Addetto alla salute","Addetto alla videosorveglianza", "Altro addetto"],
  }),
  props: {},
 async created() {
    this.connection = new WebSocket("wss://b0ran4che9.execute-api.eu-west-2.amazonaws.com/Prod")
    this.connection.onmessage = this.notificationArrived

    this.connection.onopen = function(event) {
      console.log("Successfully connected to the echo websocket server..." + event)
    }
    //Keep-alive socket every 120 sec
    var conns = this.connection
    setInterval(function() {
      if(conns){
          conns.send({"data":"Keep-Alive-Msg"});
      }
      }, 120000);

       var res = await this.axios.get("/view/logs/dog/total",{
          params: {
            'dog': 'c01',
            'lowerT': "2021-01-01T00:00",
            'upperT': "2021-12-31T22:00"
          }
        })
      this.consumption = [['Acqua', res.data.waterTotal],['Cibo',res.data.foodTotal]]

    this.$store.dispatch("loadDogs");
    this.changeView("Gestore")
  },

  beforeDestroy() {
    this.connection.onclose = function () {}; // disable onclose handler first
    this.connection.close();
  },

  watch: {
    group() {
      this.drawer = false;
    },
    "$store.state.dogs"(x) {
      this.names = x.map(v => v.name)
      this.codes = x.map(v => v.chip_id)
  }
  },
  methods: {
    async onClickDog (value) {
       this.$store.dispatch("clear");

      this.$store.state.selectedDog = this.$store.state.dogs.find(dog => dog.chip_id === value)
      var lowerT = new Date().toISOString().slice(0, 14)
      var upperT = new Date().toISOString().slice(0, 14)
      lowerT = `${lowerT}00:00`
      upperT = `${upperT}23:59`
      var foodTotal = 0
      var waterTotal = 0
      var lastHB = 0
      var lastTemp = 0

      const todayFoodConsumption = await this.axios
            .get("/view/logs/dog/total",{ params: {'dog': this.$store.state.selectedDog.chip_id, 'lowerT': lowerT, 'upperT': upperT} })

      const lastHealthDetections = await this.axios
            .get("/view/logs/dog/last",{ params: {'dog': this.$store.state.selectedDog.chip_id} })

      if(todayFoodConsumption.status == 200){
        foodTotal = todayFoodConsumption.data.foodTotal
        waterTotal = lastHealthDetections.data.waterTotal
      }
      if(lastHealthDetections.status == 200 && lastHealthDetections.data.length > 0 ){
        lastHB = lastHealthDetections.data[0].last_hb
        lastTemp = lastHealthDetections.data[0].last_temp
      }
        this.$store.dispatch("saveDogsStats",{"foodTotal": foodTotal, "waterTotal": waterTotal,"lastHB":lastHB,"lastTemp":lastTemp});

    },
    async dogRemoved(value){
        var res = await this.axios.post("/set/dog/remove", {"chip_id":value})
        if(res.status == 200){
          this.$router.go()
        }
    },
    notificationArrived (event) {
      const msg = JSON.parse(event.data).Notify
      if(msg){
        console.log("Notification arrived")
        var max_of_array =  this.notifications.length === 0 ? 1 : Math.max.apply(Math, this.notifications.map(obj => obj.name))+1;

        this.notifications.push({"name":max_of_array, "msg":msg})
      }else{
        console.log("Keep alive arrived")
      }
    },
    logOut() {
      this.$router.push("/Login").catch(() => {});
    },
    openDrawner(){
      this.drawer = !this.drawer
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'})
    },
    changeView(str) {
      this.view = str
    },
    removeNotification(not) {
      this.notifications = this.notifications.filter(el => el.name !== not.name)
      var range = 0
      this.notifications = this.notifications.map(val => {
        var tmp = val
        tmp.name = range
        range += 1
        return tmp
      })

    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noActive::before {
  opacity: 0;
}
</style>
