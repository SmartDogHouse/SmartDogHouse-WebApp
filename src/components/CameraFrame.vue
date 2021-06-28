<template>
  <div class="camera">
    <v-row min-width="100%">
      <v-col min-width="100%">
        <v-card class="mx-auto" min-width="50vw" tile>
          <v-list-item>
            <v-list-item-content>
              <v-img
                src="https://picsum.photos/510/300?random"
                aspect-ratio="1.4"
              ></v-img>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Three-line item</v-list-item-title>
              <v-list-item-subtitle>
                Secondary line text Lorem ipsum dolor sit amet,
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                consectetur adipiscing elit.
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-select
                :items="cameras"
                filled
                v-model="actualCamera"
                label="Camera"
              ></v-select>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  components: {    
  },
  name: "",
  props: {
    names: Array,
    codes: Array,
  },
    data() {
    return {
      cameras: ["Cam1","Cam2"],
      actualCamera: "",
    };
  },
  methods: {
    genRandomIndex(length) {
      return Math.ceil(Math.random() * (length - 1));
    }
  },
};
</script>

<style scoped></style>
