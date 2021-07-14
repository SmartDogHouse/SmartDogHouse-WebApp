<template>
<!-- Represent the list of all information about one dog, it provides some functionality for modify the dog status.
It changes the functionality given based on the privilege provided-->
  <div>
    <v-card class="mx-auto" max-width="400">
      <v-card-title class="white--text orange darken-4">
        <v-spacer />
        Cani registrati
        <v-spacer />
      </v-card-title>
      <DogsManager/>
      <v-card-text class="pt-4">
        Seleziona un cane da visualizzare
      </v-card-text>
      <v-divider />
      <v-virtual-scroll :items="items()" :item-height="50" height="300">
        <template v-slot:default="{ item }">
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar :color="item.color" size="56" class="white--text">
                {{ item.initials }}
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.fullName }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                @click="emitButtonPressed(item.id)"
                depressed
                small
                class="px-8 py-4"
              >
                <v-icon color="orange darken-4" center>
                  mdi-open-in-new
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {
        DogsManager: () => import("../components/DogsManager.vue")
  },
  props: {
    names: Array,
    codes: Array,
  },
  data: () => (
    {
    colors: [
      "#2196F3",
      "#90CAF9",
      "#64B5F6",
      "#42A5F5",
      "#1E88E5",
      "#1976D2",
      "#1565C0",
      "#0D47A1",
      "#82B1FF",
      "#448AFF",
      "#2979FF",
      "#2962FF",
    ],
  }),
  methods: {
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
          id: `${codes}`,
          initials: `${name[0]} ${codes[0] + codes[1]}`,
        };
      });
    },
    emitButtonPressed(name){
      this.$emit('dogChoosed', name)
    },
    addDogs(name){
      this.$emit('dogChoosed', name)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
