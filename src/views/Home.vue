<template >
  <div>
    <v-app-bar app color="grey" flat>
      <v-tabs centered class="ml-n9" color="orange darken-4">
        <v-tab v-for="link in links" :key="link" @click="changeView(link)">

          {{ link }}
        </v-tab>
      </v-tabs>
      <v-app-bar-nav-icon
        color="orange darken-4"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="no-active">
          <v-list-item class="noActive" @click.stop="logOut">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey" >
      <div v-switch="view">
        <v-container v-case="'1'">
          <v-row>
            <v-col cols="12" sm="5">
              <v-sheet rounded="lg" min-height="268">
                
                <dogScroller @dogChoosed="onClickDog" :names="names" :codes="codes"></dogScroller>
              </v-sheet>
            </v-col>

            <v-col cols="12" sm="7">
              <v-sheet rounded="lg" min-height="268">
                <dogView :dogData="actualDog"></dogView>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-case="'2'">
            <h1> dsaasdsasdsda</h1>
        </v-container>
      </div>
    </v-main>
  </div>
</template>

<script>
export default {
  components: {
    //  StatsChart: () => import("../components/StatsChart"),

    dogScroller: () => import("../components/DogScroller"),
    dogView: () => import("../components/DogView"),
  },
  data: () => ({
    dogs: [{}],
    view:"1",
    names: [],
    codes: [],
    actualDog: {},
    drawer: false,
    group: null,
    links: ["Gestore", "Addetto cibo", "Addetto alla salute","Addetto alla videosorveglianza", "Altro addetto"],
  }),
  props: {},
  created() {
    this.$store.dispatch("load");
  },
  watch: {
    group() {
      this.drawer = false;
    },
    "$store.state.dogs"(x) {
      this.dogs = x;
      this.names = this.dogs.map(x => x.name.S)
      this.codes = this.dogs.map(x => x.id_chip.S)
  }
  },
  methods: {
    onClickDog (value) {
      console.log(this.dogs.find(dog => dog.id_chip.S === value))
      this.actualDog = this.dogs.find(dog => dog.id_chip.S === value)
    },
    logOut() {
      this.$router.push("/Login").catch(() => {});
    },
    changeView(str) {
      this.view = "2"
      console.log(str)
      console.log(this.dogs)
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