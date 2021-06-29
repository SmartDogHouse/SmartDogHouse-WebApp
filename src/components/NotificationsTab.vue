<template>
  <div class="Notification">
      <v-card class="mx-auto" min-width="10vw" tile>
          <h2>Notifiche</h2>
          <v-divider />

          <div v-for="item in notifications" :key="item.msg">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>{{item.name}}</v-list-item-title>
              <v-list-item-subtitle>
                {{item.msg}}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn depressed small class="px-8 py-4">
                <v-icon color="orange darken-4" center>
                  mdi-window-close
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          </div>
        </v-card>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
      notifications: Array,
  },
    data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped></style>
