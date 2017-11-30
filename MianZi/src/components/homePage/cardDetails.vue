<template>
<div>
  <!-- <div class="tit"> <i  class="arrow"   @click="$router.go(-1)"></i> <div class="name">{{cardData.cardName}} </div></div> -->
  <div class="card">
    <div class="cardImg">
      <div class="photo">  
        <div class="carImgInfo"> 
          <!-- <img  v-lazyload="{shopImg:cardData.imageOne,imgType:'member'}"  alt=""> -->
            <img  :src="cardData.imageOne" alt="">
        </div>
       <div class="cardInfo">
         <div class="cardName"><span>{{cardData.cardName}}</span></div>
         <div class="price"><span>￥{{cardData.initMoney}}</span></div>
         <div class="discount">{{cardData.deductionMoney}}折</div>
       </div>
       <img class="logo2" src="../../assets/image/logo2.png" alt="">
      </div>
      <div class="equity">会员卡权益</div>
    </div>
  </div>
  <div class="service">
    <div class="service_1">
       <span class="cardlogo"></span>
      <div>
        <div class="service_2">全店通用</div>
        <div class="service_3">{{cardData.deductionMoney}}折</div>
      </div>
    </div>
    <div>
      <router-link :to="{ path: '/product',query:{shopType:0}}"> <span>查看服务 <i class="arrow"></i> </span></router-link>
    </div>
  </div>
  <div class="buy" >
    <div @click="toBuy" class="buyBtn">去支付￥{{cardData.initMoney}}</div>
  </div>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      cardData: ''
    };
  },
  created() {
    this.getCardDetails();
  },
  methods: {
    getCardDetails() {
      var _this = this;
      this._ajax({
        url: this.fn.xqq + "card/getCardTypeById",
        method: "post",
        data: {
          id: this.$route.query.id
        },
        callback(db) {
          if (db.errorCode === "200") {
            _this.cardData = db.datas;
          } else {
            _this.fn.tip("服务器繁忙");
          }
        }
      });
    },
    toBuy() {
      var _this = this;
      this._ajax({
        url: this.fn.xqq + "orders/subOrdersCard",
        method: "post",
        data: {
          cardTypeId: this.cardData.id,
          remarks: ""
        },
        callback(db) {
          var data = db.datas;
          if (db.errorCode === "200") {
            _this.$router.push({
              path: "payment",
              query: {
                orderNo: data.orderNo,
                amountTotal: data.amountTotal,
                id: data.id,
                isMemberCard: false,
                cardTypeId: data.cardTypeId
              }
            });
          } else {
            _this.fn.tip(db.msg);
            if (db.errorCode === "999") {
              setTimeout(function() {
                _this.$router.push({ path: "/login/loginin" });
              }, 1500);
            }
          }
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.tit {
  height: 2.5rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .arrow {
    transform: rotate(225deg);
    position: absolute;
    top: 1rem;
    left: 0.75rem;
    width: 0.6rem;
    height: 0.6rem;
    border-right: 0.08rem solid #000;
    border-top: 0.08rem solid #000;
  }
  .name {
    font-size: 0.9rem;
    font-weight: 500;
  }
}
.card {
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  .cardImg {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    .photo {
      position: relative;
      .carImgInfo {
        width: 17.25rem;
        height: 9rem;
        img {
          border-radius: 0.5rem;
        }
      }
      .logo2 {
        position: absolute;
        width: 2.85rem;
        height: 0.6rem;
        top: 1rem;
        left: 1rem;
      }
      .cardInfo {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        text-align: left;
        .cardName {
          margin-top: 3rem;
          padding: 0 1.25rem;
          font-size: 1.8rem;
          font-weight: 300;
        }
        .price {
          padding: 0.5rem 1.25rem;
        }
        .discount {
          padding: 0 1.25rem;

          font-weight: 400;
          font-size: 0.65rem;
          text-align: right;
        }
      }
    }
    .equity {
      padding: 1rem 0;
      padding-bottom: 0.5rem;
      font-size: 0.8rem;
      color: #000;
    }
  }
}
.service {
  padding: 0 1rem;
  height: 3rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  .service_1 {
    display: flex;
    align-items: center;
  }
  .service_2 {
    font-size: 0.7rem;
    font-weight: 400;
  }
  .service_3 {
    font-size: 0.5rem;
    font-weight: 400;
    color: #08acd0;
    text-align: left;
  }
  .cardlogo {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url("../../assets/image/icon/cardlogo.png") no-repeat center
      center;
    background-size: 100% 100%;
    margin-right: 1rem;
  }
}
.buy {
  background-color: #fdfdfd;
  height: 17rem;
  .buyBtn {
    height: 2.2rem;
    width: 16rem;
    margin: 0 1.375rem;
    background-color: #08acd0;
    border-radius: 1.1rem;
    position: fixed;
    bottom: 1.5rem;
    left: 0;
    z-index: 10000;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
  }
}
</style>
