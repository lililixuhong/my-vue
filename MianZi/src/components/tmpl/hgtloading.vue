<template>
  <div>
    <div class="mask disFlex-center">
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .4);
  z-index: 999999999999;
}

.loading {
  width: 4rem;
  height: 2rem;
  margin: 0 auto; 
}

.loading span {
  display: inline-block;
  width: 0.4rem;
  height: 100%;
  border-radius: 0.2rem;
  background: lightgreen;
  -webkit-animation: load 1s ease infinite;
}

@-webkit-keyframes load {
  0%,
  100% {
    height: 2rem;
    background: lightgreen;
  }
  50% {
    height: 3.5rem;
    margin: -0.75rem 0;
    background: lightblue;
  }
}

.loading span:nth-child(2) {
  -webkit-animation-delay: 0.2s;
}

.loading span:nth-child(3) {
  -webkit-animation-delay: 0.4s;
}

.loading span:nth-child(4) {
  -webkit-animation-delay: 0.6s;
}

.loading span:nth-child(5) {
  -webkit-animation-delay: 0.8s;
}
</style>