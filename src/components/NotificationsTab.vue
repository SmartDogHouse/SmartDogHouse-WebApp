<template>
  <!-- Represent the notifications tab for the user, a black text area where each text line has its own button for clean the notification -->
  <div class="Notification">
    <v-card class="mx-auto" min-width="10vw" tile>
      <h2>Notifiche</h2>
      <v-divider />

      <div v-for="item in notifications" :key="item.name">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
            <v-list-item-subtitle>
              {{item.msg}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action @click="onButtonClick(item.name)">
            <v-btn depressed small class="px-8 py-4">
              <v-icon color="orange darken-4" center> mdi-window-close </v-icon>
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
      owner: String
  },
    data() {
    return {
    };
  },
  methods: {
    onButtonClick (name) {
      this.$emit('selected', {"name":name ,"owner": this.owner})
    }
  }
};
</script>

<style scoped></style>
