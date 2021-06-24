<template>
  <v-app id="inspire">
    <div id="app">
      <v-main slot="body">
        <router-view> </router-view>
        <transition name="slide"> </transition>
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
