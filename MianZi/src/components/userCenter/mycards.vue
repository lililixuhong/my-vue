<template>
<div>
        <!-- // 等待 权权开发此处接口 -->
    <div class="Card">
            <div>
                <span  :class="{active:active===0}" @click="toggleCard(0)">会员卡</span>
            </div>
             <div>
                <span :class="{active:active===1}" @click="toggleCard(1)">疗程卡</span>
            </div>
    </div>
    <div v-if="active===0">
       <member></member>
    </div>
      <div v-if="active===1">
       <course></course>
    </div>
    <div class="mycards" v-if="false">
        <div v-if="cardList">
            <router-link v-for="(item, index) in cardList" :key="index"  :to="'/cardDetail/' + item.id" class="card">
                <div class="cardInfo">
                    <p class="cardType">{{item.cardName}}</p>
                    <p>尊贵服务·会员专享</p>
                </div>
                <p class="cardCode">No.{{item.cardNumber}}</p>
            </router-link>
        </div>
        <div v-else class="nodata">暂无会员卡</div>
    </div>
</div>
   
</template>

<script>
import member from "./memberCard.vue";
import course from "./courseCard.vue";

export default {
  name: "hello",
  data() {
    return {
      title: this.$route.name,
      cardList: "",
      active: 0
    };
  },
  components: { member, course },
  mounted() {
    var self = this;
    self._ajax({
      url: self.fn.wyl + "card/cardList",
      method: "post",
      data: {},
      callback(db) {
        if (db.errorCode == 200) {
          self.cardList = db.datas.length ? db.datas : "";
        } else {
          self.fn.tip(db.msg);
        }
      }
    });
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
@import "../../assets/css/userCenter/index.scss";
.Card {
  display: flex;
  height: 2rem;
  border-bottom: 1px solid #cecece;
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
</style>
