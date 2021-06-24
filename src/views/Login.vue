<template>
  <div>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="mx-auto">
          <v-img :aspect-ratio="16 / 9" src="/assets/Smh0.png"></v-img>
          <v-spacer> </v-spacer>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <LoginForm></LoginForm>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  components: {
    LoginForm: () => import("../components/LoginForm.vue"),
  },
};
</script>