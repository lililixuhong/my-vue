
<template>
    <div class="courseCard">
      <div>
        <div class="cards" v-if="cardList.length>0">
            <div v-for="(item, index) in cardList" :key="index"   @click.stop.prevent="tocard(item)" class="card">
                <!-- <img class="cardInfo"  :src="item.imageOne" alt=""> -->
                <img v-if="item.isValid||item.surplusDay===0" class="cardInfo" v-lazyload="{shopImg:item.imageOne,imgType:'member'}">
                <img class="cardInfo" v-if="!item.isValid||!item.surplusDay===0" src="../../assets/image/courseDefault.png" alt="">
                <div class="cardNumber" v-if="!item.isValid||!item.surplusDay===0">{{item.isValid?"次数不足":"卡已过期"}}</div>
                <div class="nameInfo">
                    <img class="backgroundImg" src="../../assets/image/logo2.png" alt="">
                    <div class="nameImg">
                        <span>{{item.courseName}}</span> 
                        <img v-if="item.isValid||item.surplusDay===0" @click.stop.prevent="shwoCode(item)" class="erweimaImg"  src="../../assets/image/erweima.png" alt="">
                    </div>
                    <div class="cardCode">{{item.courseNumber}}</div>
                </div>
            </div>
        </div>
        <div v-else class="nodata">暂无会员卡</div>
    </div>
<!-- 二维码 -->
    <div class="dialogCode" v-if="dialog">
            <div class="codeImg">
                <div class="codeInfoOne">
                  <div>
                    <span>{{codeData.courseName}}</span>
                    <span ><i style="color:#08bae3">{{codeData.amount}}次</i></span>
                  </div>
                </div>
                <span @click="dialog = false">X</span>
                <div class="erCanvas">
                    <qrcode :value="qrcode" v-if="qrcode" :options="{ size: codeSize }"></qrcode>
                </div>
                <div class="codeInfoTwo">
                  <p >{{codeData.courseNumber}}</p>
                  <p style="color: #999999;">卡有效期：{{codeData.validDay}}天</p>
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
        url: self.fn.wyl + "course/myCourseList",
        method: "post",
        data: {
          pageSize: -1,
          type: 0
        },
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
      this.$router.push({ path: "/courseCardDetail/", query: { id: item.id } });
    },
    shwoCode(item) {
      this.codeData = item;

      this.codeSize = 7.5 * this.fn.htmlSize();
      var self = this;

      self._ajax({
        url: self.fn.wyl + "course/myCourseErWei",
        method: "post",
        data: {
          courseCardId: item.id
        },
        callback(db) {
          if (db.errorCode == 200) {
            var data = db.datas;

            self.qrcode = `cardId=${data.courseMember.id}; cardNumber=${data
              .courseMember.courseNumber}; key=${data.keyStr};`;
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
@import "~@/assets/css/util";
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
      .cardNumber{
        position: absolute;
        right: 1rem;
        bottom: .75rem;
        @include wh(124,40);
        @include sc(24, #c2c5cc);
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
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
