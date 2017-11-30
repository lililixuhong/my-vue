<template>
  <div id="app">
    <router-view></router-view>

    <Loading v-if="$store.getters.loading"></Loading>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    this.fn.htmlSize();
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import './assets/css/common.scss';
</style>
