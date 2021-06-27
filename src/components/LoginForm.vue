<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login form</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-account"
          name="login"
          label="Login"
          type="text"
        ></v-text-field>
        <v-text-field
          id="password"
          prepend-icon="mdi-map-marker"
          name="password"
          label="Password"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" v-on:click="tryLogIn">Login</v-btn>
      <v-btn color="primary" v-on:click="tryLogIn1">Test</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {},
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),
  methods: {
    tryLogIn() {
      this.$router.push("/Home").catch(() => {});

      this.axios.get("/req/auth",{ crossdomain: true }).then((response) => {
        console.log(response.data);
      });
    },
        tryLogIn1() {
   //   this.$router.push("/Home").catch(() => {});

      this.axios.get("/req/auth",{ crossdomain: true }).then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>

