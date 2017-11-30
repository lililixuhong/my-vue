<template>
  <div>
    <!-- <input type="text" v-model="message" name="" id=""> -->
</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "abcdefg"
    };
  },
  computed: {
    message() {

    }
  },
  filters: {
    reversal(value) {
      return value
        .split("")
        .reverse()
        .join("");
    },
    upper(value) {
      return value.toLocaleUpperCase();
    }
  },
  methods: {}
};
</script>

<style <style lang="scss" scoped>
@import "~@/assets/css/util";
div {
  font-size: px2rem(50);
}
</style>
