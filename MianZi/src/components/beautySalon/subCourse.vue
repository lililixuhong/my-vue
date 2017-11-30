<!--提交订单页-->
<template>
    <div class="submitOrder">
        <section>
            <div class="serviceTime">
                <div>服务时间</div>
                <div>下单后可预约服务时间</div>
            </div>
        </section>
        <!--服务商品信息-->
        <section class="commodityInformation">
            <div class="courseCard">
                <div class="left"> 
                    <img class="logo2" src="../../assets/image/logo2.png" alt="">
                    <img :src="courseData.imageThree" alt="">
                </div>
                 <div class="right"><span>{{courseData.name}}</span><span class="price">￥{{courseData.sellingPrice}}</span></div>
            </div>
            <div class="remarks">
                <h3>备注</h3>
                <textarea v-model="remarks" rows="4" cols="50">
                </textarea>
            </div>
        </section>

        <!--底部-->
        <footer>
            <div class="paymentContent">
                <span class="paymentTitle">待支付：</span>
                <span class="paymentSymbol">￥</span>
                <span class="paymentMoney">{{courseData.sellingPrice}}</span>
            </div>
            <div class="confirmPayment" @click="confirmPayment">提交订单</div>
        </footer>
    </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      purchaseNowData: {
        goodImages: ""
      }, //立即购买数据
      goodsId: "", //商品id
      remarks: "", //备注信息

      courseData: ""
    };
  },
  created() {
    // 获取服务信息数据
    this.getCourseCard();
  },
  methods: {
    getCourseCard() {
      var _this = this;
      this._ajax({
        url: this.fn.xqq + "course/courseList",
        method: "post",
        data: {
          type: "1",
          pageSize: -1,
          id: this.$route.query.id
        },
        callback(db) {
          if (db.errorCode === "200") {
            _this.courseData = db.datas.list[0];
          } else {
            _this.fn.tip("服务器繁忙");
          }
        }
      });
    },
    // 确认购买
    confirmPayment() {
      var _this = this;
      var data = {
        courseCardId: this.$route.query.id,
        remarks: _this.remarks
      };
      _this._ajax({
        url: _this.fn.wyl + "orders/subOrdersCourseCard",
        method: "post",
        data: data,
        callback(db) {
          if (db.errorCode == 200) {
            var data = db.datas;
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
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/common.scss";
@import "~@/assets/css/util";
.submitOrder {
  background: $theme-background-gray;
}

.submitOrder section {
  /*height: 5.5rem;*/
  background: #ffffff;
  padding-left: 0.75rem;
}

.submitOrder section:first-child {
  margin-bottom: 0.5rem;
}

/*服务地址*/

.submitOrder section .storeAddress {
  display: flex;
  height: 4.275rem;
  border-bottom: 0.025rem solid #e6e6e6;
}

/*服务时间*/

.submitOrder section .serviceTime {
  height: 2.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submitOrder section .serviceTime div:first-child {
  margin-right: 0.75rem;
  font-family: PingFangSC;
  font-size: 0.75rem;
  font-weight: 7.5rem;
  color: #333333;
}

.submitOrder section .serviceTime div:last-child {
  margin-right: 0.75rem;
  font-family: PingFangSC;
  font-size: 0.6rem;
  font-weight: 7.5rem;
  color: #cccccc;
}

.submitOrder section .storeAddress .storeAddressTitle {
  flex: 0 0 10%;
  line-height: 4.275rem;
  font-family: PingFangSC;
  font-size: 0.75rem;
  font-weight: 7.5rem;
  text-align: left;
  color: #333333;
}

.submitOrder section .storeAddress .storeAddressContent {
  flex: 0 0 80%;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.submitOrder section .storeAddress .storeAddressContent div {
  flex: 1;
  width: 100%;
}

.submitOrder section .storeAddress .storeAddressContent div:first-child {
  position: relative;
  font-size: 0.7rem;
  font-weight: 800;
  color: $theme-blue;
}

.submitOrder section .storeAddress .storeAddressContent div:first-child > span {
  position: absolute;
  right: 0;
  bottom: 0;
}

.submitOrder section .storeAddress .storeAddressContent div:last-child {
  vertical-align: bottom;
  font-family: PingFangSC;
  font-size: 0.65rem;
  font-weight: 7.5rem;
  color: #666666;
  padding-top: 0.35rem;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 10rem;
}

.submitOrder section .storeAddress .storeAddressIcon {
  flex: 0 0 10%;
  line-height: 4.275rem;
  padding-right: 0.45rem;
}

/*商品信息部分*/

.submitOrder .commodityInformation {
  height: 14.6rem;
  /*display: flex;*/
}

.submitOrder .commodityInformation .gateItemShell {
  height: 4.05rem;
  display: flex;
}

.submitOrder .commodityInformation .gateItemShell {
  border-bottom: 0.025rem solid #e6e6e6;
  padding: 0.75rem 0;
}

.submitOrder .commodityInformation .gateItemShell .gateImg {
  flex: 0 0 2.475rem;
  height: 2.475rem;
}

.submitOrder .commodityInformation .gateItemShell .gateBot {
  flex: 0 0 3.475rem;
  text-align: right;
  padding-right: 0.75rem;
  font-family: PingFangSC;
  font-size: 0.75rem;
  font-weight: 7.5rem;
  color: $price-color;
}

.submitOrder .commodityInformation .gateItemShell .gateTop {
  flex: 1 1 auto;
  padding-left: 0.575rem;
  /*height: 2rem;*/
  font-family: PingFangSC;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.07rem;
  color: #333333;
  text-align: left;
}

/*备注信息*/

.submitOrder .commodityInformation .remarks {
  height: 1.525rem;
  padding-top: 0.8rem;
  padding-right: 0.75rem;
}

.submitOrder .commodityInformation .remarks h3 {
  font-family: PingFangSC;
  font-size: 0.75rem;
  font-weight: 7.5rem;
  color: #333333;
}

.submitOrder .commodityInformation .remarks textarea {
  margin-top: 0.65rem;
  font-family: PingFangSC;
  font-size: 0.6rem;
  font-weight: 7.5rem;
  color: #666666;
  border: 0.025rem solid #e6e6e6;
  -webkit-appearance: none;
}

.submitOrder .lineHidden {
  white-space: normal;
  width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.submitOrder .remarks h3 {
  text-align: left;
}

.submitOrder .remarks textarea {
  height: 5rem;
  width: 100%;
  border: 0.025rem solid gray;
}

.submitOrder footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 2.45rem;
  line-height: 2.45rem;
  background: #ffffff;
  display: flex;
}

.submitOrder footer div {
  flex: 1;
}

.submitOrder footer div:first-child {
  background: #ffffff;
  flex: 0 0 70.93333333333334%;
}

.submitOrder footer .confirmPayment {
  background-color: $theme-blue;
  font-family: PingFangSC;
  font-size: 0.75rem;
  font-weight: 7.5rem;
  color: #ffffff;
}

.submitOrder footer .paymentContent {
  text-align: right;
  padding-right: 0.75rem;
  font-family: PingFangSC;
  font-size: 0.8rem;
  font-weight: 7.5rem;
  color: #333333;
}

.submitOrder footer .paymentContent .paymentSymbol {
  color: $price-color;
  font-weight: $font-weight;
}
.submitOrder footer .paymentContent .paymentMoney {
  color: $price-color;
  font-weight: $font-weight;
}
.courseCard {
  display: flex;
  padding: 0.75rem 0;
  .left {
    position: relative;
    @include wh(230,120);
    .logo2 {
      @include center;
      @include wh(114,24);
    }
  }
  .right {
    padding: 0 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > span {
      padding: 0.1rem 0;
      text-align: left;
      @include sc(30);
      &.price {
        @include sc(24,#08bae3);
      }
    }
  }
}
</style>