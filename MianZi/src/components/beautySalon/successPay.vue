<!--支付成功页-->
<template>
    <div class="successPay">
        <header>
            <div class="imgArea">
                <img :src="paymentSuccess"/>
            </div>
            <p>{{paymentMessage}}</p>
        </header>

        <section  v-if='ordersDetails.type==="0"' class="information">
            <div class="informationTop">
                <img src="../../assets/image/beautySalon/invalid-name1 (3).png"/>
                <span>{{ordersDetails.sysOfficeName}}<i class="arrow"></i></span>
                <span class="pendingPayment">{{ordersDetails.status == 0 ? '待服务' : "待付款"}}</span>
            </div>
            <div class="informationMid ">
                <div class="informationMidBox clear">
                    <div class="imgBox">
                        <img v-bind:src="ordersDetails.goodImages" />
                    </div>
                    
                    <div class="details">
                        <div class="detailsTop">
                            
                            <span>{{ordersDetails.goodsName}}</span>
                            <del>￥<span>{{ordersDetails.amountTotal}}</span></del>
                        </div>
                        <div class="detailsBot">
                            <span>实付：</span>
                            <span class="red">￥{{ordersDetails.amountPay ? ordersDetails.amountPay : '0'}}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div class="informationBot">
                <div v-if="ordersDetails.status == 0"><a :href="'tel:' + ordersDetails.sysOfficePhone">预约服务时间</a></div>
                <div v-else><router-link :to='{ path: "/payment", query: { amountTotal: ordersDetails.amountTotal, orderNo: ordersDetails.orderNo, id: ordersDetails.id } }'>去支付</router-link></div>
                <div class="seeOrder"><router-link :to="{ path: '/orders', query: { type:ordersDetails.status }}">查看订单</router-link></div>
            </div>
        </section>
<!-- 疗程卡信息页面 -->
        <div class="courseCard information"  v-if='ordersDetails.type==="5"'>
            <div class="informationTop">
                <img src="../../assets/image/beautySalon/invalid-name1 (3).png"/>
                <span>{{ordersDetails.sysOfficeName}}<i class="arrow"></i></span>
                <span class="pendingPayment">{{ordersDetails.status == 4 ? '已完成' : ""}}</span>
            </div>
            <div class="informationMid ">
                <div class="informationMidBox clear">
                    <div class="imgBox">
                        <img v-bind:src="ordersDetails.goodImages" />
                        <img class="logo2" src="../../assets/image/logo2.png" alt="">
                    </div>
                    
                    <div class="details">
                        <div class="detailsTop">
                            
                            <span>{{ordersDetails.goodsName}}</span>
                            <del>￥<span>{{ordersDetails.amountTotal}}</span></del>
                        </div>
                        <div class="detailsBot">
                            <span>实付：</span>
                            <span class="red">￥{{ordersDetails.amountPay ? ordersDetails.amountPay : '0'}}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div class="informationBot">
                <div v-if="ordersDetails.status == 0"><router-link :to="{path:'beautySalon'}">选择门店</router-link></div>
                <div v-else><router-link :to='{ path: "/payment", query: { amountTotal: ordersDetails.amountTotal, orderNo: ordersDetails.orderNo, id: ordersDetails.id } }'>去支付</router-link></div>
                <div class="seeOrder"><router-link :to="{ path: '/UserCenter'}">我的卡包</router-link></div>
            </div>
        </div>
        <!--底部-->
         <footer>
             <router-link :to="{ path: '/'}">完成</router-link>
        </footer> 
    </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      paymentSuccess: require("../../assets/image/mianzi.png"), //支付成功
      orderNo: "",
      id: "",
      paymentMessage: "",
      ordersDetails: {
        goodImages: "",
        addressPhone: "",
        goodsName: "",
        amountTotal: "", //价格
        sysOfficePhone: "", //手机
        status: "" //支付状态
      }
    };
  },
  created() {
    this.orderNo = this.$route.query.orderNo; //订单编号
    this.id = this.$route.query.id; //订单id
    this.getOrdersDetails();
  },
  methods: {
    getOrdersDetails() {
      var _this = this;
      _this._ajax({
        url: _this.fn.wyl + "orders/ordersDetails",
        method: "post",
        data: { id: _this.id },
        callback(db) {
          if (db.errorCode == 200) {
            _this.ordersDetails = db.datas;
            _this.ordersDetails.goodImages = _this.ordersDetails.goodImages.split(
              "|"
            )[0];
            //订单状态 0:支付 1未支付 2退款 3:待服务(不维护) 4:已完成 5取消订单
            if (_this.ordersDetails.status == 0||_this.ordersDetails.status == 4) {
              _this.paymentMessage = "支付成功";
              document.title = "支付成功";
              _this.paymentSuccess = require("../../assets/image/beautySalon/success.png");
            } else {
              _this.paymentMessage = "支付失败,请重新购买！";
              document.title = "支付失败";
              _this.paymentSuccess = require("../../assets/image/beautySalon/fail.png");
            }
          } else {
            _this.fn.tip(db.msg, "12rem");
            _this.$router.push({ path: "/orders", query: { type: 1 } });
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
.successPay {
  background: #f0f0f0;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
}
.successPay header {
  height: 10rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border-bottom: 0.025rem solid #e6e6e6;
  background: #ffffff;
}
.successPay header .imgArea {
  height: 6.2rem;
  padding-top: 2.325rem;
}
.successPay header img {
  width: 3.95rem;
  height: 3.95rem;
}
.successPay header p {
  font-size: 0.75rem;
  color: #666666;
  letter-spacing: 0.075rem;
  font-family: PingFangSC;
}
.successPay .information {
  height: 7.5rem;
  padding-top: 0.7rem;
  background: #ffffff;
}

.successPay .information .informationTop {
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: left;
  margin-bottom: 0.675rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.successPay .information .informationTop img {
  height: 0.65rem;
  line-height: 0.65rem;
  width: 0.7rem;
}
.successPay .information .informationTop span {
  font-family: PingFangSC;
  font-size: 0.6rem;
  letter-spacing: 0.06rem;
  height: 0.6rem;
  color: #666666;
  position: relative;
  bottom: 0.08rem;
  left: 0.25rem;
}
.successPay .information .informationTop span i {
  height: 0.35rem;
  width: 0.35rem;
  margin-bottom: 0.1rem;
  margin-left: 0.2rem;
}
.successPay .information .informationTop .pendingPayment {
  float: right;
  color: $theme-blue;
}
.successPay .information .informationMid {
  height: 3.8rem;
  background: #fafafa;
  text-align: left;
  display: flex;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.successPay .information .informationMid img {
  height: 3rem;
  width: 3rem;
}
.successPay .information .informationMid .informationMidBox {
  margin-top: 0.4rem;
  width: 100%;
}
.successPay .information .informationMid .informationMidBox .imgBox {
  display: inline-block;
  float: left;
}

.successPay .information .informationMid .informationMidBox .details {
  display: inline-block;
  height: 3rem;
  width: 13.25rem;
  float: left;
  margin-left: 1rem;
}
.successPay
  .information
  .informationMid
  .informationMidBox
  .details
  .detailsTop {
  height: 1.5rem;
  width: 100%;
}
.successPay
  .information
  .informationMid
  .informationMidBox
  .details
  .detailsTop
  span {
  font-size: 0.75rem;
  color: #333333;
  font-family: PingFangSC;
}
.successPay
  .information
  .informationMid
  .informationMidBox
  .details
  .detailsTop
  del {
  float: right;
  font-size: 0.6rem;
  color: #999999;
}
.successPay
  .information
  .informationMid
  .informationMidBox
  .details
  .detailsTop
  del
  span {
  font-size: 0.6rem;
  color: #999999;
  letter-spacing: 0.06rem;
}
.successPay
  .information
  .informationMid
  .informationMidBox
  .details
  .detailsBot {
  height: 1.5rem;
  width: 100%;
  margin-top: 0.57rem;
}
.successPay
  .information
  .informationMid
  .informationMidBox
  .details
  .detailsBot
  > span {
  font-size: 0.6rem;
  color: #333333;
  font-family: PingFangSC;
}
.successPay
  .information
  .informationMid
  .informationMidBox
  .details
  .detailsBot
  > span {
  color: $price-color;
}
.successPay .information .informationBot {
  height: 2.2rem;
  line-height: 2.2rem;
  background: #ffffff;
  display: flex;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.successPay .information .informationBot div {
  flex: 1;
  line-height: 1.2rem;
  font-size: 0.6rem;
  font-family: PingFangSC;
  color: #666666;
  letter-spacing: 0.06rem;
}

.successPay .information .informationBot .seeOrder {
  border-left: 0.025rem solid #e6e6e6;
  color: $theme-blue;
}
.successPay footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 2.45rem;
  line-height: 2.45rem;
  background: $theme-blue;
  width: 100%;
  font-size: 0.8rem;
  color: #f0f0f0;
  letter-spacing: 0.08rem;
  font-family: PingFangSC;
}
.courseCard.information{
    .informationMidBox {
        float: none;
        display: flex;
    }
    .imgBox{
        @include wh(230,120);
        position: relative;
        img{
            height: 100%;
            width: 100%;
        }
        img.logo2{
             @include center;
             @include wh(114,24);
        }
    }
}
</style>
