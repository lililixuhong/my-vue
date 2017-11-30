<template>
<div>
    <div class="Card" >
            <div>
                <span  :class="{active:active===0}" @click="toggleCard(0)">服务</span>
            </div>
             <div>
                <span :class="{active:active===1}" @click="toggleCard(1)">会员卡</span>
            </div>
             <div>
                <span :class="{active:active===2}" @click="toggleCard(2)">疗程卡</span>
            </div>
    </div>
    <div v-if="active===0">
      <service></service>
    </div>
    <div v-if="active===1">
      <member></member>
    </div>
    <div v-if="active===2">
      <course></course>
    </div>
</div>
   
</template>

<script>
import service from "./prodcutService.vue";
import member from "./memberCard.vue";
import course from "./courseCard.vue";
export default {
  components: { service, member, course },
  data() {
    return {
      active: 0
    };
  },
  created() {
    if (this.$route.query.shopType != undefined) {
      this.active = this.$route.query.shopType - 0;
    }
  },
  methods: {
    toggleCard(num) {
      this.active = num;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Card {
  display: flex;
  height: 2rem;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  > div {
    flex: 1;
    span {
      display: inline-flex;
      align-items: center;
      height: 100%;
      &.active {
        color: #1fafd4;
        border-bottom: 2px solid #1fafd4;
      }
    }
  }
}
.CardList {
  padding: 0.75rem;
  .cardData {
    width: 100%;
    height: 9rem;
  }
}
</style>
