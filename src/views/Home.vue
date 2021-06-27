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
              
              <dogScroller :names="names" :codes="codes"></dogScroller>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="7">
            <v-sheet rounded="lg" min-height="268">
              <dogView :names="names" :codes="codes"></dogView>
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
    view:"1",
    names: ["Lana", "Merinox", "Puppa"],
    codes: ["11222", "33344", "67999"],
    drawer: false,
    group: null,
    links: ["Gestore", "Addetto cibo", "Addetto alla salute","Addetto alla videosorveglianza", "Altro addetto"],
  }),
  props: {},

  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    logOut() {
      this.$router.push("/Login").catch(() => {});
    },
    changeView(str) {
      this.view++
      console.log(str)
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
