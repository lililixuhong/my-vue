<template>
<div>
      <div class='y-mask-white-dialog' v-if='isMask'>
      </div>
      <div class="info">
         <div class='y-message  animated zoomIn' >
          <span class="message" v-html="msg">
          </span>
        </div>
      </div>
</div>

</template>

<script>
export default {
  name: "yMessage",
  props: {
    msg: String,
    timeout: Number,
    callback: Function,
    icon: String,
    isMask: Boolean
  },
  data() {
    return {
      show: true
    };
  }
};
</script>

<style   scoped>
.y-mask-white-dialog {
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 999;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  animation: zoomIn 0.5s;
}
.info {
  position: fixed;
  z-index: 1000;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.y-message {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 4rem;
  max-width: 8rem;
  width: 100%;
  min-height: 4rem;
  max-height: 8rem;
  padding: 0.5rem;
  font-size: 14px;
  text-align: center;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  animation: zoomIn 0.5s;
  line-height: 1.5;
}

@keyframes zoomIn {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}

.message {
  padding: 1rem 0;
  letter-spacing: 1px;
}
</style>