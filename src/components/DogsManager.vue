<template>
<!-- Represent one statistics chart, line, pie, or column -->
  <div class="mx-3" id="stats">
    <v-dialog
      :fullscreen="$vuetify.breakpoint.mobile"
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="dialog"
      class="d-flex align-stretch"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-hover v-slot:default="{ hover }">
          <v-card
            v-bind="attrs"
            v-on="on"
            :elevation="hover ? 12 : 2"
            class="flex-column d-flex align-stretch justify-space-between mx-auto"
            id="zoom"
            width="110%"
          >
            <v-card-title class="justify-center blue-grey darken-4 text-center">Aggiungi un Cane</v-card-title>
          </v-card>
        </v-hover>
      </template>

      <v-card>
        <v-toolbar dark color="indigo">
          <v-spacer />
          <v-toolbar-title class="font-weight-bold text--white"
            >Inserisci dati cane</v-toolbar-title
          >
          <v-spacer />
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <template>
          <v-card class="mx-auto" height="100%" width="100%">
            <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="Nome"
                    required
                  ></v-text-field>
              
                  <v-text-field
                    v-model="ID"
                    :counter="5"
                    :rules="iDRules"
                    label="ID"
                    required
                  ></v-text-field>
                  
                  <v-text-field
                    v-model="cage"
                    :counter="5"
                    :rules="cageRules"
                    label="Gabbia"
                    required
                  ></v-text-field>
                    <v-divider />
                    <h3>Stato di salute</h3>
                    <v-radio-group v-model="defaultValueGroupHealth">
                      <v-radio
                        v-for="val in healthStates"
                        :key="val"
                        :label="`${val}`"
                        :value="val"
                      ></v-radio>
                    </v-radio-group>
                    <v-divider />
                    <h3>Taglia</h3>
                    <v-radio-group v-model="defaultValueGroupSize">
                      <v-radio
                        v-for="val in dogsSize"
                        :key="val"
                        :label="`${val}`"
                        :value="val"
                      ></v-radio>
                    </v-radio-group>
                </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Invia
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<style>
#zoom {
  transition: transform 0.4s ease;
}
#zoom:hover,
#zoom:focus {
  transform: scale(1.03);
}
</style>
<script>
import Vue from "vue";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
Vue.use(Chartkick.use(Chart));
export default {
  data: () => ({
    defaultValueGroupHealth : "In salute",
    defaultValueGroupSize : "Piccola",
    dialog: false,
    ID: "",
    name: "",
    cage:"",
    valid: true,
    healthStates: ["In salute", "In degenza", "In terapia","In osservazione"],
    dogsSize: ["Piccola", "Media", "Grande"],
    nameRules: [
      v => !!v || 'Obbligatorio',
      v => (v && v.length <= 10) || 'Il nome deve essere più corto di 10 caratteri',
    ],
    iDRules: [
      v => !!v || 'Obbligatorio',
      v => (v && v.length <= 10) || 'Il chip ID deve essere più corto di 10 caratteri',
    ],
    cageRules: [
      v => !!v || 'Obbligatorio',
      v => (v && v.length <= 3) || 'Il numero della gabbia deve essere più corto di 3 numeri',
    ],
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
  }
};
</script>
