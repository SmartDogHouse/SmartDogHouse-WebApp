<template>
  <!-- Represent the classic the form for add one dog-->
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
            <v-card-title class="justify-center blue-grey darken-4 text-center" data-cy="insertNewDog"
              >Aggiungi un Cane</v-card-title
            >
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
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="name"
                  :counter="10"
                  :rules="nameRules"
                  label="Nome"
                  required
                  data-cy="dogName"
                ></v-text-field>

                <v-text-field
                  v-model="ID"
                  :counter="5"
                  :rules="iDRules"
                  label="ID"
                  required
                  data-cy="dogID"
                ></v-text-field>

                <v-text-field
                  v-model="cage"
                  :counter="5"
                  :rules="cageRules"
                  label="Gabbia"
                  required
                  data-cy="dogCage"
                ></v-text-field>
                <v-divider />
                <h3>Stato di salute</h3>
                <v-radio-group v-model="defaultValueGroupHealth">
                  <v-radio
                    v-for="val in healthStates"
                    :key="val.Ita"
                    :label="`${val.Ita}`"
                    :value="val.Eng"
                  ></v-radio>
                </v-radio-group>
                <v-divider />
                <h3>Taglia</h3>
                <v-radio-group v-model="defaultValueGroupSize">
                  <v-radio
                    v-for="val in dogsSize"
                    :key="val.Size"
                    :label="`${val.Size}`"
                    :value="val.Value"
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
    defaultValueGroupHealth : "healthy",
    defaultValueGroupSize : 1,
    dialog: false,
    ID: "",
    name: "",
    cage:"",
    valid: true,
    healthStates: [{"Ita":"In salute","Eng":"healthy"}, {"Ita":"In degenza","Eng":"patient"}, {"Ita":"In terapia","Eng":"curing"},{"Ita":"In osservazione","Eng":"under observation"}],
    dogsSize: [{"Size":"Piccola","Value":1}, {"Size":"Media","Value":2}, {"Size":"Grande","Value":3}],
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
      if(this.valid){
        this.sendDog()
      }
    },
    async sendDog(){
      var payload = {
          "chip_id": this.ID,
          "name": this.name,
          "size": this.defaultValueGroupSize,
          "status": this.defaultValueGroupHealth,
          "cage": this.cage
        }

       var res = await this.axios.post("/set/new/dog", payload)
        if(res.status == 200){
          this.dialog = false
          this.$router.go()
        }
    }
  }
};
</script>
