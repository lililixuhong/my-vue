<!--支付成功页-->
<template>
    <div class="successPayBuyCard">
        <header>
            <div class="header_top">
              尊敬的会员，
              <span class="name"></span>卡券已到账
            </div>
            <div class="header_bottom">— 尽享{{cardData.deductionMoney}}折优惠 —</div>
        </header>

        <section>
           <!-- <img  v-lazyload="{shopImg:cardData.imageOne,imgType:'member'}" /> -->
            <img  :src="cardData.imageOne" />
            <div class="cardInfo">
              <div class="carImg"><img src="../../assets/image/logo2.png" alt=""></div>
              <div class="name">{{cardData.cardName}}</div>
              <div class="price">￥{{cardData.initMoney}}</div>
              <div class="zhe">{{cardData.deductionMoney}}折</div>
            </div>
        </section>
        <!--底部-->
        <footer>
            <div class="footer_top"><router-link :to="{ path: '/orders', query: { type:4 }}">查看订单</router-link></div>
            <div class="footer_bottom"><router-link :to="{ path: '/'}">去购物</router-link></div>
        </footer> 
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      cardData: ""
    };
  },
  created() {
    this.getOrdersDetails();
  },
  methods: {
    getOrdersDetails() {
      //24b8a9af828c4c4e9a3848efebf1f79c
      var _this = this;
      _this._ajax({
        url: _this.fn.xqq + "card/getCardTypeById",
        method: "post",
        data: {
          id:this.$route.query.cardTypeId
        },
        callback(db) {
          if (db.errorCode == 200) {
            _this.cardData = db.datas;
          } else {
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/common.scss";
.successPayBuyCard {
  background: #f4f4f2;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
}
.successPayBuyCard header {
  height: 5.15rem;
  padding-top: 1.6625rem;
}
.successPayBuyCard header .header_top {
  font-family: PingFangSC;
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: 0.8px;
  color: #2f3232;
}
.successPayBuyCard header .header_top span {
  font-size: 1.2rem;
  line-height: 1;
  letter-spacing: 1px;
  font-weight: 300;
}
.successPayBuyCard header .header_bottom {
  margin-top: 0.28rem;
  font-family: PingFangSC;
  font-size: 0.7rem;
  font-weight: 300;
  line-height: 1.71;
  letter-spacing: 0.7px;
  color: #656766;
}

.successPayBuyCard footer .footer_top {
  display: inline-block;
  width: 16rem;
  height: 2.2rem;
  line-height: 2.2rem;
  margin-top: 1.5rem;
  border-radius: 1.1rem;
  border: solid 2px #08bae3;

  font-family: PingFangSC;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 3.2px;
  color: #08bae3;
}

.successPayBuyCard footer .footer_bottom {
  display: inline-block;
  width: 16rem;
  height: 2.2rem;
  line-height: 2.2rem;
  margin-top: 0.75rem;
  border-radius: 1.1rem;
  border: solid 2px #08bae3;
  background: #08bae3;

  font-family: PingFangSC;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 3.2px;
  color: #ffffff;
}
.successPayBuyCard section {
  width: 17.25rem;
  margin: 0 auto;
  height: 9rem;
  position: relative;
  div.cardInfo {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    .carImg {
      height: 3.5rem;
      > img {
        width: 2.85rem;
        height: 0.6rem;
        position: absolute;
        top: 1rem;
        left: 1rem;
      }
    }
    .name {
      font-size: 1.8rem;
      font-weight: 300;
      text-align: left;
      padding-left: 1.5rem;
    }
    .price {
      text-align: left;
      font-size: 0.65rem;
      font-weight: 300;
      padding-left: 1.5rem;
      padding-top: 0.2rem;
    }
    .zhe {
      text-align: right;
      padding-right: 1.25rem;
      padding-top: 0.5rem;
      font-size: 0.65rem;
      font-weight: 300;
    }
  }
}
</style>
