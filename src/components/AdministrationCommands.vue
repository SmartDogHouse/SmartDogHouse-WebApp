<template>
  <div class="Administration">
   
  </div>
</template>

<script>
export default {
  components: {},
  name: "",
  props: {
    names: Array,
    codes: Array,
  },
    data() {
    return {
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
