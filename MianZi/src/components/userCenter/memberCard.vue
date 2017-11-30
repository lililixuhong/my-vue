
<template>
    <div class="courseCard">
      <div>
        <div class="cards" v-if="cardList.length>0">
            <div v-for="(item, index) in cardList" :key="index"   @click.stop.prevent="tocard(item)" class="card">
                <!-- <img class="cardInfo" :src="item.cardType.imageOne" alt=""> -->
                <img class="cardInfo" v-lazyload="{shopImg:item.cardType.imageOne,imgType:'member'}">
                <div class="nameInfo">
                    <img class="backgroundImg" src="../../assets/image/logo2.png" alt="">
                    <div class="nameImg">
                        <span>{{item.cardName}}</span> <img @click.stop.prevent="shwoCode(item)" class="erweimaImg"  src="../../assets/image/erweima.png" alt="">
                    </div>
                    <div class="cardCode">{{item.cardNumber}}</div>
                </div>
            </div>
        </div>
        <div v-else class="nodata">暂无会员卡</div>
    </div>

    <div class="dialogCode" v-if="dialog">
            <div class="codeImg">
                <div class="codeInfoOne">
                  <div>
                    <span>{{codeData.cardName}}</span>
                    <span >余额：<i style="color:#08bae3">{{codeData.availableMoney}}</i> </span>
                  </div>
                </div>
                <span @click="dialog = false">X</span>
                <div class="erCanvas">
                    <qrcode :value="qrcode" v-if="qrcode" :options="{ size: codeSize }"></qrcode>
                </div>
                <div class="codeInfoTwo">
                  <p >{{codeData.cardNumber}}</p>
                  <p style="color: #999999;">卡有效期：永久</p>
                </div>
            </div>
    </div>
    <div class="marsk" v-if="dialog"></div>
    </div>
</template>

<script>
import Qrcode from "vue-qrcode";

export default {
  components: { Qrcode },
  data: function() {
    return {
      qrcode: "dsafsdafasds",
      dialog: false,
      cardList: [],
      codeData: "",
      codeSize: ""
    };
  },
  created() {
    this.getCard();
  },
  methods: {
    getCard() {
      var self = this;
      self._ajax({
        url: self.fn.wyl + "card/cardList",
        method: "post",
        data: {},
        callback(db) {
          if (db.errorCode == 200) {
            self.cardList = db.datas;
          } else {
            self.fn.tip(db.msg);
          }
        }
      });
    },
    tocard(item) {
      this.$router.push({ path: "/CardDetail/" + item.id });
    },
    shwoCode(item) {
      this.codeData = item;
      this.codeSize = 7.5 * this.fn.htmlSize();
      var self = this;
      self._ajax({
        url: self.fn.wyl + "card/cardDetail",
        method: "post",
        data: {
          id: item.id
        },
        callback(db) {
          if (db.errorCode == 200) {
            var data = db.datas;
            // this.erWeiMaNumber =
            self.qrcode = `cardId=${data.id}; cardNumber=${data.cardNumber}; key=${data.key}; deductionMoney=${data.deductionMoney};`;
            self.dialog = true;
          } else {
            self.fn.tip(db.msg);
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.courseCard {
  .cards {
    margin: 0.75rem;
    margin-bottom: 0;
    height: 9rem;
    position: relative;
    text-align: left;
    color: #fff;
    .card {
      position: relative;
      margin: 0.3rem 0;
      .cardInfo {
        border-radius: 0.3rem;
        vertical-align: middle;
      }
      .nameInfo {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        padding-left: 1rem;
        .nameImg {
          font-size: 1.25rem;
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 1.5rem;
          padding-top: 2.3rem;
        }
        .cardCode {
          padding-top: 0.75rem;
        }
        > img.backgroundImg {
          margin-top: 1rem;
          width: 2.85rem;
          height: 0.6rem;
        }
        .erweimaImg {
          width: 1.4rem;
          height: 1.4rem;
          vertical-align: middle;
        }
      }
    }
  }
}

.nodata {
  font-size: 0.9rem;
  position: fixed;
  top: 40%;
  left: 0;
  width: 100%;
  text-align: center;
}

.marsk {
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 90;
  background-color: #000;
  opacity: 0.5;
}
.dialogCode {
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  .erCanvas {
    img,
    canvas {
      vertical-align: middle;
    }
  }
  .codeImg {
    position: relative;
    background-color: #fff;
    width: 14rem;
    height: 15.5rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .codeInfoOne {
      position: absolute;
      top: 0;
      left: 0;
      height: 3rem;
      width: 100%;
      border-bottom: 1px solid #ececec;
      > div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.75rem;
        span {
          font-size: 0.75rem;
          font-weight: 500;
        }
      }
    }
    .codeInfoTwo {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4rem;
      width: 100%;
      font-size: 0.6rem;
      > p {
        padding-top: 1rem;
      }
    }
    > span {
      position: absolute;
      z-index: 200;
      left: 0;
      right: 0;
      bottom: -3rem;
      margin: auto;
      width: 2rem;
      height: 2rem;
      border: 1px solid #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
